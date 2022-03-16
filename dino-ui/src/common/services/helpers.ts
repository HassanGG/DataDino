export const fileToBase64 = async (blob: Blob) => {
  const reader = new FileReader()
  reader.readAsDataURL(blob)

  return new Promise<string>((resolve, reject) => {
    reader.onload = _ => {
      const result = reader.result as string
      const bytes = result.split("base64,")[1]
      return resolve(bytes)
    }
    reader.onerror = error => reject(error)
  })
}
