interface ApiResponse<T> {
  data: T
  status: number
}

export const simulateApiCall = <T>(
  success: boolean = true,
  data: T | null = null
): Promise<ApiResponse<T>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({ data: data as T, status: 200 })
      } else {
        reject({ error: 'Não foi possivel conectar com o servidor', status: 500 })
      }
    }, 1000)
  })
}
