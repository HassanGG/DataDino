export const fetchJson = async <T>(url: string, init?: RequestInit) => {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "Application/json",
      ...(init?.headers ?? []),
    },
  })

  if (!response.ok) {
    throw response.statusText
  }

  const json = await response.json()

  return json as T
}
