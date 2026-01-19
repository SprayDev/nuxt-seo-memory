import type { RoleEnum } from '~/api/models/role'
import type { PermissionsEnum } from '~/api/models/permission'

declare module '#app' {
  interface NuxtApp {
    $hasRole(roles: RoleEnum | RoleEnum[]): boolean
    $hasPermissionTo(permission: PermissionsEnum): boolean
    $can(permission: PermissionsEnum): boolean
    $hasAnyRole(roles: RoleEnum | RoleEnum[]): boolean
    $hasAnyPermission(permissions: PermissionsEnum | PermissionsEnum[]): boolean
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $hasRole(roles: RoleEnum | RoleEnum[]): boolean
    $hasPermissionTo(permission: PermissionsEnum): boolean
    $can(permission: PermissionsEnum): boolean
    $hasAnyRole(roles: RoleEnum | RoleEnum[]): boolean
    $hasAnyPermission(permissions: PermissionsEnum | PermissionsEnum[]): boolean
  }
}

declare module 'nuxt/schema' {
  type PublicApiType = {
    baseUrl: string
    apiSecretHeaderName: string
    cookieRequestUrl: string
    userUrl: string
    userKey: string
    csrfCookieName: string
    csrfHeaderName: string
    serverCookieName: string
    redirectUnauthenticated: boolean
    redirectUnverified: boolean
    tokenCookieName: string
    adminTokenCookieName: string
    loginAsCookieName: string
    httpAuthHeader: string
    httpAuthType: string
  }

  interface PublicRuntimeConfig {
    referralCookieName: string
    api: PublicApiType
  }
}

export {}
