const CALCULATOR_COOKIE = 'dst_calc_access'
const CALCULATOR_PATH = '/tools/cost-calculator'
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30

function parseCookies(header) {
  return Object.fromEntries(
    (header || '')
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf('=')
        if (index === -1) return [part, '']
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))]
      }),
  )
}

function safeEqual(left, right) {
  if (!left || !right || left.length !== right.length) return false

  let result = 0
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index)
  }

  return result === 0
}

function notFound() {
  return new Response('Not found', {
    status: 404,
    headers: {
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow, noarchive',
    },
  })
}

export const config = {
  matcher: ['/tools/cost-calculator/:path*'],
}

export default function middleware(request) {
  const accessToken = process.env.CALCULATOR_ACCESS_TOKEN || ''
  if (!accessToken) return notFound()

  const url = new URL(request.url)
  if (!url.pathname.startsWith(CALCULATOR_PATH)) return undefined

  const queryToken = url.searchParams.get('access') || url.searchParams.get('token') || ''
  const cookies = parseCookies(request.headers.get('cookie'))

  if (safeEqual(queryToken, accessToken)) {
    url.searchParams.delete('access')
    url.searchParams.delete('token')

    return new Response(null, {
      status: 302,
      headers: {
        location: url.toString(),
        'set-cookie': `${CALCULATOR_COOKIE}=${encodeURIComponent(accessToken)}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=${CALCULATOR_PATH}; HttpOnly; Secure; SameSite=Lax`,
        'cache-control': 'no-store',
        'x-robots-tag': 'noindex, nofollow, noarchive',
      },
    })
  }

  if (safeEqual(cookies[CALCULATOR_COOKIE], accessToken)) {
    return undefined
  }

  return notFound()
}
