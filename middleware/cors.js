const allowedOrigins = [
  'http://localhost:3000',
  'https://www.dandrepairshop.com',
  'https://dandrepairshop.com',
  'https://www.google.com',
]

const cors = (req, res, next) => {
  const origin = req.headers.origin

  if (allowedOrigins.includes(origin) || !origin) {
    res.setHeader('Access-Control-Allow-Origin', origin || true)
  } else {
    console.log('Origin not allowed:', origin)
    throw new Error(`[${origin}] - Not allowed by CORS`)
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true') // allow cookies
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // OPTIONS method success status
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
}

module.exports = { cors }
