export function pickFile(accept: string): Promise<File | undefined> {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.style.display = 'none'
    input.type = 'file'
    input.accept = accept
    document.body.append(input)
    input.addEventListener('change', () => {
      resolve(input.files?.[0])
      input.remove()
    })
    input.addEventListener('cancel', () => {
      resolve(undefined)
      input.remove()
    })
    input.click()
  })
}
