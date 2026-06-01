import type { Directive, DirectiveBinding } from 'vue'
import { usePermissionStore } from '@/stores/permission/permission'

export const vPermission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const store = usePermissionStore()
    const { value } = binding

    if (!value) return

    const hasPermission = typeof value === 'string'
      ? store.hasPermission(value)
      : Array.isArray(value)
        ? binding.modifiers?.all
          ? store.hasAllPermissions(value)
          : store.hasAnyPermission(value)
        : false

    if (!hasPermission) {
      el.parentNode?.removeChild(el)
    }
  },
}
