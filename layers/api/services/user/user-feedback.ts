import { ApiBaseService } from '#layers/api/services/api-base-service'

export class UserFeedbackService extends ApiBaseService {
  async leaveFeedback(feedback: FormData) {
    return await this.call('/feedback', {
      method: 'POST',
      body: feedback
    })
  }
}
