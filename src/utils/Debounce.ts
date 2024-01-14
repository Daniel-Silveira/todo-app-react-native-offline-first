export const debounce = (callback: () => void, delay: number) => {
  let timeoutId: NodeJS.Timeout

  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(callback, delay)
  }
}
