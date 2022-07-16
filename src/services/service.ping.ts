import { StatusCodes as status } from 'http-status-codes'

import { Service } from '@helpers/helper.di'
import { apiResponse, APIResponse } from '@helpers/helper.apiResponse'

@Service()
export class PingService {
  constructor() {}

  async ping(): Promise<APIResponse> {
    try {
      const metadata: Record<string, any> = {
        headerTitle: 'model view controller architecture',
        contentTitle: 'learn nodejs'
      }

      return Promise.resolve(apiResponse(status.OK, 'Users already to use', metadata, null))
    } catch (e: any) {
      return Promise.reject(apiResponse(e.stat_code || status.BAD_REQUEST, e.stat_message || e.message))
    }
  }
}
