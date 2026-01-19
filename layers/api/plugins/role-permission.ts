export default defineNuxtPlugin((nuxtApp) => {
  const { hasRole, hasAnyRole, hasPermissionTo, hasAnyPermission, can } = usePermission()

  nuxtApp.vueApp.directive('can', {
    mounted(el, binding) {
      if (binding.arg === 'not') {
        if (hasPermissionTo(binding.value)) {
          el.remove()
        }
        return
      }
      if (!hasPermissionTo(binding.value)) {
        el.remove()
      }
    }
  })

  nuxtApp.vueApp.directive('role', {
    mounted(el, binding) {
      if (binding.arg === 'not') {
        if (hasRole(binding.value)) {
          el.remove()
        }
        return
      }
      if (!hasRole(binding.value)) {
        el.remove()
      }
    }
  })

  return {
    provide: {
      hasRole,
      hasPermissionTo,
      hasAnyRole,
      hasAnyPermission,
      can
    }
  }
})
