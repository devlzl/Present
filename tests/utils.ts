import { expect, Locator, type Page } from '@playwright/test'

export async function init(page: Page) {
  await page.goto('http://localhost:5173')
}

export async function assertRichText(richTextElement: Locator, text: string) {
  const richtext = await richTextElement.innerText()
  expect(richtext).toBe(text)
}
