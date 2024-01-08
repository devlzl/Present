import { test } from '@playwright/test'
import { assertRichText, init } from './utils'

test('rich text basic operation', async ({ page }) => {
  await init(page)
  const richTextElement = page.locator('#slide-wrapper .text-box div[contenteditable=true]')
  await richTextElement.click()
  await page.keyboard.type('hello')
  await assertRichText(richTextElement, 'hello')
})
