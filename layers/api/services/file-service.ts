// import Application from "../models/Application";
import { ApiBaseService } from './api-base-service'

export default class FileService extends ApiBaseService {
  async file(path: string): Promise<BlobPart> {
    return await this.call<string>(path, {
      credentials: 'omit'
    })
  }

  async uploadFile<T = unknown>(path: string, data: FormData) {
    return await this.call<T>(path, {
      method: 'post',
      body: data
    })
  }

  async storage(path: string) {
    return await this.call(`/storage/${path}`)
  }
}
