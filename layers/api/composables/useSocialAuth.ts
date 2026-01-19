import { useCodeClient } from 'vue3-google-signin'
import type { ImplicitFlowSuccessResponse, ImplicitFlowErrorResponse } from 'vue3-google-signin'

export const useSocialAuth = () => {
  const loading = ref<boolean>(false)
  const toast = useSendicoToast()

  const { socialLogin } = useAuth()

  const handleOnError = (errorResponse: ImplicitFlowErrorResponse) => {
    console.log('Error: ', errorResponse)
  }

  const handleOnSuccess = async (response: ImplicitFlowSuccessResponse) => {
    loading.value = true
    const errorData = await socialLogin('google', response)
    loading.value = false
    if (errorData?.error?.message) {
      toast.error(errorData.error.message)
    }
  }

  const { isReady, login: googleLogin } = useCodeClient({
    onSuccess: handleOnSuccess,
    onError: handleOnError
  })

  return {
    isReady,
    googleLogin,
    loading
  }
}
