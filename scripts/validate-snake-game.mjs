import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const indexHtmlPath = path.join(repoRoot, 'index.html');
const gameJsPath = path.join(repoRoot, 'game.js');

const requiredSkinFields = [
  'headColor1',
  'headColor2',
  'bodyColor1',
  'bodyColor2',
  'foodColor1',
  'foodColor2',
  'glowColor',
  'foodGlow',
  'eyeColor',
];

function uniq(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    if (seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}

function sorted(items) {
  return [...items].sort((a, b) => a.localeCompare(b));
}

function formatSet(items) {
  return `[${sorted(items).join(', ')}]`;
}

function extractSkinsFromIndexHtml(html) {
  const tags = html.match(/<[^>]*\bclass\s*=\s*["'][^"']*\bskin-option\b[^"']*["'][^>]*>/gi) ?? [];
  const skins = [];
  for (const tag of tags) {
    const skinMatch = tag.match(/\bdata-skin\s*=\s*["']([^"']+)["']/i);
    if (!skinMatch) continue;
    skins.push(skinMatch[1].trim());
  }
  return skins;
}

function findSkinsObjectText(js) {
  const patterns = [
    /(?:^|\s)(?:const|let|var)\s+skins\s*=\s*\{/m,
    /(?:^|\s)skins\s*=\s*\{/m,
  ];

  let matchIndex = -1;
  let matchLength = 0;
  for (const re of patterns) {
    const m = js.match(re);
    if (!m) continue;
    matchIndex = m.index ?? -1;
    matchLength = m[0].length;
    break;
  }

  if (matchIndex < 0) {
    throw new Error('无法在 game.js 中定位 skins 对象定义');
  }

  const openBraceIndex = js.indexOf('{', matchIndex + matchLength - 1);
  if (openBraceIndex < 0) {
    throw new Error('无法在 game.js 中定位 skins 对象起始 {');
  }

  let i = openBraceIndex;
  let depth = 0;
  let inString = null;
  let escape = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (; i < js.length; i++) {
    const ch = js[i];
    const next = js[i + 1];

    if (inLineComment) {
      if (ch === '\n') inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        i++;
      }
      continue;
    }

    if (inString) {
      if (escape) {
        escape = false;
        continue;
      }
      if (ch === '\\') {
        escape = true;
        continue;
      }
      if (ch === inString) {
        inString = null;
      }
      continue;
    }

    if (ch === '/' && next === '/') {
      inLineComment = true;
      i++;
      continue;
    }
    if (ch === '/' && next === '*') {
      inBlockComment = true;
      i++;
      continue;
    }

    if (ch === "'" || ch === '"' || ch === '`') {
      inString = ch;
      continue;
    }

    if (ch === '{') {
      depth++;
      continue;
    }
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        return js.slice(openBraceIndex, i + 1);
      }
      continue;
    }
  }

  throw new Error('无法在 game.js 中找到 skins 对象的匹配 }');
}

function tokenizeJsObject(code) {
  const tokens = [];
  const len = code.length;

  let i = 0;
  while (i < len) {
    const ch = code[i];
    const next = code[i + 1];

    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    if (ch === '/' && next === '/') {
      i += 2;
      while (i < len && code[i] !== '\n') i++;
      continue;
    }

    if (ch === '/' && next === '*') {
      i += 2;
      while (i < len && !(code[i] === '*' && code[i + 1] === '/')) i++;
      i += 2;
      continue;
    }

    if (ch === '{' || ch === '}' || ch === ':' || ch === ',') {
      tokens.push({ type: ch });
      i++;
      continue;
    }

    if (ch === "'" || ch === '"') {
      const quote = ch;
      i++;
      let value = '';
      let raw = quote;
      let escape = false;
      for (; i < len; i++) {
        const c = code[i];
        raw += c;
        if (escape) {
          escape = false;
          value += c;
          continue;
        }
        if (c === '\\') {
          escape = true;
          continue;
        }
        if (c === quote) {
          i++;
          break;
        }
        value += c;
      }
      tokens.push({ type: 'string', value, raw });
      continue;
    }

    if (/[A-Za-z_$]/.test(ch)) {
      let value = ch;
      i++;
      while (i < len && /[A-Za-z0-9_$]/.test(code[i])) {
        value += code[i];
        i++;
      }
      tokens.push({ type: 'identifier', value });
      continue;
    }

    if (/[0-9]/.test(ch)) {
      let value = ch;
      i++;
      while (i < len && /[0-9.]/.test(code[i])) {
        value += code[i];
        i++;
      }
      tokens.push({ type: 'number', value });
      continue;
    }

    tokens.push({ type: 'unknown', value: ch });
    i++;
  }

  return tokens;
}

function parseObjectTokens(tokens, startIndex = 0) {
  let index = startIndex;

  const expect = (type) => {
    const token = tokens[index];
    if (!token || token.type !== type) {
      const got = token ? token.type : 'EOF';
      throw new Error(`解析失败：期望 ${type}，实际 ${got}`);
    }
    index++;
    return token;
  };

  const parseKey = () => {
    const token = tokens[index];
    if (!token) throw new Error('解析失败：意外 EOF（key）');
    if (token.type === 'identifier' || token.type === 'string') {
      index++;
      return token.type === 'string' ? token.value : token.value;
    }
    throw new Error(`解析失败：不支持的 key token ${token.type}`);
  };

  const parseValue = () => {
    const token = tokens[index];
    if (!token) throw new Error('解析失败：意外 EOF（value）');

    if (token.type === '{') {
      return parseObject();
    }

    if (token.type === 'string') {
      index++;
      return { kind: 'string', value: token.value, raw: token.raw };
    }

    if (token.type === 'number') {
      index++;
      return { kind: 'number', value: token.value };
    }

    if (token.type === 'identifier') {
      index++;
      return { kind: 'identifier', value: token.value };
    }

    index++;
    return { kind: 'unknown', value: token.value };
  };

  const parseObject = () => {
    expect('{');
    const map = new Map();
    while (true) {
      const token = tokens[index];
      if (!token) throw new Error('解析失败：意外 EOF（object）');
      if (token.type === '}') {
        index++;
        break;
      }
      const key = parseKey();
      expect(':');
      const value = parseValue();
      map.set(key, value);
      const next = tokens[index];
      if (next?.type === ',') {
        index++;
      }
    }
    return { kind: 'object', value: map };
  };

  const root = parseObject();
  return { root, endIndex: index };
}

function extractSkinsFromGameJs(js) {
  const skinsObjectText = findSkinsObjectText(js);
  const tokens = tokenizeJsObject(skinsObjectText);
  const { root } = parseObjectTokens(tokens, 0);

  if (root.kind !== 'object') {
    throw new Error('skins 解析结果不是对象');
  }

  const skins = new Map();
  for (const [skinKey, skinValue] of root.value.entries()) {
    if (skinValue?.kind !== 'object') {
      skins.set(skinKey, { kind: 'not_object', value: skinValue });
      continue;
    }
    skins.set(skinKey, skinValue.value);
  }
  return skins;
}

function isHexColor(value) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

function parseRgbaNumbers(m) {
  const r = Number(m[1]);
  const g = Number(m[2]);
  const b = Number(m[3]);
  const a = m[4] === undefined ? undefined : Number(m[4]);
  return { r, g, b, a };
}

function isValidRgbInt(n) {
  return Number.isFinite(n) && Number.isInteger(n) && n >= 0 && n <= 255;
}

function isValidAlpha(n) {
  return Number.isFinite(n) && n >= 0 && n <= 1;
}

function isRgbaColor(value) {
  const m = value.match(/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/i);
  if (!m) return false;
  const { r, g, b, a } = parseRgbaNumbers(m);
  return isValidRgbInt(r) && isValidRgbInt(g) && isValidRgbInt(b) && isValidAlpha(a);
}

function isRgbaPrefix(value) {
  const m = value.match(/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*$/i);
  if (!m) return false;
  const { r, g, b } = parseRgbaNumbers(m);
  return isValidRgbInt(r) && isValidRgbInt(g) && isValidRgbInt(b);
}

function isValidColor(value) {
  if (typeof value !== 'string') return false;
  const v = value.trim();
  return isHexColor(v) || isRgbaColor(v) || isRgbaPrefix(v);
}

async function main() {
  const errors = [];

  const [indexHtml, gameJs] = await Promise.all([
    fs.readFile(indexHtmlPath, 'utf8'),
    fs.readFile(gameJsPath, 'utf8'),
  ]);

  const htmlSkinList = extractSkinsFromIndexHtml(indexHtml);
  const htmlSkins = uniq(htmlSkinList);

  if (htmlSkins.length === 0) {
    errors.push('index.html 未解析到任何 .skin-option 的 data-skin');
  }

  if (htmlSkins.length !== htmlSkinList.length) {
    errors.push(`index.html 的 data-skin 存在重复：${formatSet(htmlSkinList)}`);
  }

  let skinsMap;
  try {
    skinsMap = extractSkinsFromGameJs(gameJs);
  } catch (e) {
    errors.push(`game.js skins 解析失败：${e instanceof Error ? e.message : String(e)}`);
    skinsMap = new Map();
  }

  const jsSkins = new Set(skinsMap.keys());
  const htmlSkinSet = new Set(htmlSkins);

  const onlyInHtml = sorted([...htmlSkinSet].filter((k) => !jsSkins.has(k)));
  const onlyInJs = sorted([...jsSkins].filter((k) => !htmlSkinSet.has(k)));

  if (onlyInHtml.length > 0 || onlyInJs.length > 0) {
    errors.push(
      `skin key 集合不一致：index.html=${formatSet(htmlSkinSet)} game.js=${formatSet(jsSkins)}`,
    );
    if (onlyInHtml.length > 0) errors.push(`仅在 index.html 中存在：${onlyInHtml.join(', ')}`);
    if (onlyInJs.length > 0) errors.push(`仅在 game.js 中存在：${onlyInJs.join(', ')}`);
  }

  for (const skinKey of sorted(jsSkins)) {
    const skinFields = skinsMap.get(skinKey);
    if (!(skinFields instanceof Map)) {
      errors.push(`game.js skins.${skinKey} 不是对象`);
      continue;
    }

    for (const field of requiredSkinFields) {
      if (!skinFields.has(field)) {
        errors.push(`skins.${skinKey} 缺少字段：${field}`);
      }
    }

    for (const field of requiredSkinFields) {
      const rawValue = skinFields.get(field);
      if (!rawValue) continue;
      if (rawValue.kind !== 'string') {
        errors.push(`skins.${skinKey}.${field} 不是字符串：${rawValue.kind}`);
        continue;
      }
      if (!isValidColor(rawValue.value)) {
        errors.push(`skins.${skinKey}.${field} 颜色格式不合法：${rawValue.raw}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error('[validate-snake-game] FAIL');
    for (const e of errors) console.error(`- ${e}`);
    process.exit(1);
  }

  console.log('[validate-snake-game] OK');
  process.exit(0);
}

main().catch((e) => {
  console.error('[validate-snake-game] FAIL');
  console.error(`- 脚本异常：${e instanceof Error ? e.stack ?? e.message : String(e)}`);
  process.exit(1);
});
