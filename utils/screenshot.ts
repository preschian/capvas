import { launch } from 'puppeteer'

export default async function ({ width = 300, height = 300, url = '', selector = 'canvas', delay = 0 }) {
  // Launch the browser
  const browser = await launch({})

  // Open a new page
  const page = await browser.newPage()
  await page.goto(url)
  await page.setViewport({
    height,
    width,
  })

  // Delay n seconds to wait for the page to load
  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, delay))
  }

  // Take a screenshot of the element
  const element = await page.$(selector)
  const image = await element?.screenshot()

  // Close the browser
  await browser.close()

  return new Response(image, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}