const http = require('node:http')
const { readFile } = require('node:fs/promises')
const path = require('node:path')

const PORT = 3000

function clampInt(value, { min, max, fallback }) {
  const n = Number.parseInt(String(value), 10)
  if (!Number.isFinite(n)) return fallback
  if (n < min) return min
  if (n > max) return max
  return n
}

function getNonSecretConfig() {
  const env = typeof process.env.ENV === 'string' && process.env.ENV.length > 0 ? process.env.ENV : 'development'
  const gameTitle =
    typeof process.env.GAME_TITLE === 'string' && process.env.GAME_TITLE.length > 0 ? process.env.GAME_TITLE : '贪吃蛇'
  const initialSpeed = clampInt(process.env.INITIAL_SPEED, { min: 30, max: 1000, fallback: 100 })
  const gridSize = clampInt(process.env.GRID_SIZE, { min: 10, max: 60, fallback: 21 })

  return { env, gameTitle, initialSpeed, gridSize }
}

function getSecretMeta(name, { minLen }) {
  const raw = process.env[name]
  const length = typeof raw === 'string' ? raw.length : 0
  const present = length > 0
  const ok = present && length >= minLen
  return { present, length, minLen, ok }
}

function getSecretSummary() {
  return {
    API_KEY: getSecretMeta('API_KEY', { minLen: 16 }),
    DB_PASSWORD: getSecretMeta('DB_PASSWORD', { minLen: 8 }),
    ADMIN_TOKEN: getSecretMeta('ADMIN_TOKEN', { minLen: 16 })
  }
}

function safeJsonForHtml(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c')
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (ext === '.html') return 'text/html; charset=utf-8'
  if (ext === '.css') return 'text/css; charset=utf-8'
  if (ext === '.js') return 'text/javascript; charset=utf-8'
  if (ext === '.json') return 'application/json; charset=utf-8'
  if (ext === '.png') return 'image/png'
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.svg') return 'image/svg+xml; charset=utf-8'
  return 'application/octet-stream'
}

async function serveIndexHtml(res) {
  const filePath = path.join(__dirname, 'index.html')
  const html = await readFile(filePath, 'utf8')

  const config = getNonSecretConfig()
  const payload = {
    ...config,
    secrets: getSecretSummary()
  }

  const rendered = html.replace('__CONFIG_JSON__', safeJsonForHtml(payload))

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store'
  })
  res.end(rendered)
}

async function serveStaticFile(res, relPath) {
  const safeRel = relPath.replaceAll('\\', '/')
  const root = __dirname
  const filePath = path.normalize(path.join(root, safeRel))

  if (!filePath.startsWith(root)) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Bad Request')
    return
  }

  const data = await readFile(filePath)
  res.writeHead(200, {
    'Content-Type': contentTypeFor(filePath),
    'Cache-Control': 'no-store'
  })
  res.end(data)
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)
    const pathname = decodeURIComponent(url.pathname)

    if (pathname === '/favicon.ico') {
      res.writeHead(204)
      res.end()
      return
    }

    if (pathname === '/') {
      await serveIndexHtml(res)
      return
    }

    if (pathname === '/config') {
      const config = getNonSecretConfig()
      const payload = { ...config, secrets: getSecretSummary() }
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store'
      })
      res.end(JSON.stringify(payload))
      return
    }

    if (pathname === '/game.js' || pathname === '/style.css') {
      await serveStaticFile(res, pathname.slice(1))
      return
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not Found')
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Internal Server Error')
  }
})

server.listen(PORT, () => {
  process.stdout.write(`Server listening on http://localhost:${PORT}\n`)
})
