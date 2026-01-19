import type { RoleEnum } from '../models/role'
import type { PermissionsEnum } from '../models/permission'

export const usePermission = () => {
  const { user } = useUser()

  const hasRole = (roles: RoleEnum | RoleEnum[]): boolean => {
    if (typeof roles === 'string') {
      return !!user.value?.roles.includes(roles)
    }

    for (const rolesKey in roles) {
      if (roles[rolesKey] === undefined) {
        return true
      }
      if (hasRole(roles[rolesKey])) {
        return true
      }
    }

    return false
  }

  const hasAnyRole = (roles: RoleEnum[] | RoleEnum): boolean => {
    return hasRole(roles)
  }

  const hasPermissionTo = (permission: PermissionsEnum): boolean => {
    return !!user.value?.permissions.includes(permission)
  }

  const hasAnyPermission = (permissions: PermissionsEnum[] | PermissionsEnum): boolean => {
    if (typeof permissions === 'string') {
      return hasPermissionTo(permissions)
    }

    for (const permissionsKey in permissions) {
      if (permissions[permissionsKey] === undefined) {
        return true
      }
      if (hasPermissionTo(permissions[permissionsKey])) {
        return true
      }
    }

    return false
  }

  const can = (permission: PermissionsEnum): boolean => {
    return hasPermissionTo(permission)
  }

  return {
    hasRole,
    hasAnyRole,
    hasPermissionTo,
    hasAnyPermission,
    can
  }
}
