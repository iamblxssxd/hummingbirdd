import axios from 'axios'

export async function POST(req: Request) {
  const url = new URL(req.url)
  const query = url.searchParams.get('query')

  if (!query) return new Response('Invalid query', { status: 400 })

  const options = {
    method: 'POST',
    url: process.env.API_URL,
    params: {
      word: query,
    },
    headers: {
      Authorization: process.env.API_KEY,
    },
  }

  const result = await axios.request(options)

  return new Response(JSON.stringify(result))
}
