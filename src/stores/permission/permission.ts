import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePermissionStore = defineStore('permission', () => {
  const permissions = ref<string[]>([])

  const setPermissions = (perms: string[]) => {
    permissions.value = perms
  }

  const hasPermission = (perm: string) => {
    if (!perm) return true
    return permissions.value.includes(perm)
  }

  const hasAnyPermission = (perms: string[]) => {
    if (!perms.length) return true
    return perms.some(p => permissions.value.includes(p))
  }

  const hasAllPermissions = (perms: string[]) => {
    if (!perms.length) return true
    return perms.every(p => permissions.value.includes(p))
  }

  const clearPermissions = () => {
    permissions.value = []
  }

  return {
    permissions,
    setPermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    clearPermissions,
  }
})
