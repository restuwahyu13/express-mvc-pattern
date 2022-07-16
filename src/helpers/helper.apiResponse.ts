export interface APIResponse {
  stat_code: number
  stat_message: string
  data?: any
  pagination?: Record<string, any> | null
}

export const apiResponse = (code: number, message: string, data?: any, pagination?: Record<string, any> | null): APIResponse => {
  return {
    stat_code: code,
    stat_message: message,
    data: data || null,
    pagination: pagination || null
  }
}
