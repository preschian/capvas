import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import screenshot from '../utils/screenshot'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono on Node.js!')
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

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
