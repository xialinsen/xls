function clampInt(value, { min, max }) {
  const n = Number.parseInt(String(value), 10)
  if (!Number.isFinite(n)) return null
  if (n < min || n > max) return null
  return n
}

function getString(name) {
  const v = process.env[name]
  if (typeof v !== 'string') return null
  const s = v.trim()
  if (!s) return null
  return s
}

function getSecretMeta(name, { minLen }) {
  const raw = process.env[name]
  const length = typeof raw === 'string' ? raw.length : 0
  const present = length > 0
  const ok = present && length >= minLen
  return { present, length, minLen, ok }
}

function padRight(s, width) {
  const str = String(s)
  if (str.length >= width) return str
  return str + ' '.repeat(width - str.length)
}

function formatRow(cols, widths) {
  return cols.map((c, i) => padRight(c, widths[i])).join('  ')
}

const results = []

const ENV = getString('ENV')
results.push({
  name: 'ENV',
  type: 'env',
  present: ENV !== null,
  value: ENV ?? '',
  detail: ENV ? 'OK' : '缺失或为空'
})

const GAME_TITLE = getString('GAME_TITLE')
results.push({
  name: 'GAME_TITLE',
  type: 'env',
  present: GAME_TITLE !== null,
  value: GAME_TITLE ?? '',
  detail: GAME_TITLE ? 'OK' : '缺失或为空'
})

const INITIAL_SPEED = clampInt(process.env.INITIAL_SPEED, { min: 30, max: 1000 })
results.push({
  name: 'INITIAL_SPEED',
  type: 'env',
  present: process.env.INITIAL_SPEED !== undefined,
  value: INITIAL_SPEED === null ? '' : String(INITIAL_SPEED),
  detail: INITIAL_SPEED === null ? '需为 30~1000 的整数(ms/tick)' : 'OK'
})

const GRID_SIZE = clampInt(process.env.GRID_SIZE, { min: 10, max: 60 })
results.push({
  name: 'GRID_SIZE',
  type: 'env',
  present: process.env.GRID_SIZE !== undefined,
  value: GRID_SIZE === null ? '' : String(GRID_SIZE),
  detail: GRID_SIZE === null ? '需为 10~60 的整数(格/边)' : 'OK'
})

const secrets = [
  { name: 'API_KEY', minLen: 16 },
  { name: 'DB_PASSWORD', minLen: 8 },
  { name: 'ADMIN_TOKEN', minLen: 16 }
].map((s) => ({ name: s.name, meta: getSecretMeta(s.name, { minLen: s.minLen }) }))

for (const s of secrets) {
  results.push({
    name: s.name,
    type: 'secret',
    present: s.meta.present,
    value: '',
    detail: s.meta.present ? `长度=${s.meta.length}，要求>=${s.meta.minLen}` : '缺失'
  })
}

const widths = [14, 8, 8, 28]
process.stdout.write(formatRow(['变量', '类型', '存在', '说明'], widths) + '\n')
process.stdout.write(formatRow(['-'.repeat(2), '-'.repeat(2), '-'.repeat(2), '-'.repeat(2)], widths) + '\n')

for (const r of results) {
  const existsText = r.present ? '是' : '否'
  process.stdout.write(formatRow([r.name, r.type, existsText, r.detail], widths) + '\n')
}

const envOk =
  ENV !== null &&
  GAME_TITLE !== null &&
  INITIAL_SPEED !== null &&
  GRID_SIZE !== null
const secretsOk = secrets.every((s) => s.meta.ok)
const ok = envOk && secretsOk

process.stdout.write('\n')
process.stdout.write(ok ? '校验通过\n' : '校验失败\n')
process.exitCode = ok ? 0 : 1

