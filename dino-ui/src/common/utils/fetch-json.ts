export const fetchJson = async <T>(
  url: string,
  init?: RequestInit,
  expectString = false,
) => {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "Application/json",
      ...(init?.headers ?? []),
    },
  })

  if (!response.ok) {
    console.error("Error: ", response)
    throw response.statusText
  }

  const value = expectString ? await response.text() : await response.json()

  return value as T
}
