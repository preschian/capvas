import { Hono } from 'npm:hono'
import screenshot from './utils/screenshot.ts'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono on Deno!')
})

app.post('/screenshot', async (c) => {
  const { url, width, height, selector, delay } = await c.req.json()

  if (!url) {
    return c.json({ error: 'URL is required' }, 400)
  }

  return screenshot({
    url,
    width,
    height,
    selector,
    delay,
  })
})

Deno.serve(app.fetch)
