const fetcher = async (url: string) => {
  const response = await fetch(url)
  const res = await response.json()

  return res
}

export default fetcher
