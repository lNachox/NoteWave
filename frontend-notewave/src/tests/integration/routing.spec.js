import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import { routes } from '../../router'
import App from '../../App.vue'
import { useAuthStore } from '../../store/auth'

describe('Routing Integration Tests', () => {
  let router
  let wrapper

  beforeEach(() => {
    // Configurar Pinia
    setActivePinia(createPinia())
    
    // Configurar Router
    router = createRouter({
      history: createWebHistory(),
      routes
    })

    // Limpiar localStorage
    localStorage.clear()
  })

  describe('Authentication Flow', () => {
    it('should redirect to login when accessing protected route without authentication', async () => {
      // Montar la aplicación
      wrapper = mount(App, {
        global: {
          plugins: [router]
        }
      })

      // Intentar navegar a una ruta protegida
      await router.push('/student')
      await router.isReady()

      // Debería redirigir a login
      expect(router.currentRoute.value.path).toBe('/login')
    })

    it('should allow access to student dashboard after successful login', async () => {
      const auth = useAuthStore()
      
      // Registrar y loguear un estudiante
      await auth.register({
        name: 'Test Student',
        rut: '11111111-1',
        email: 'test@student.com',
        password: '123456'
      })

      // Montar la aplicación
      wrapper = mount(App, {
        global: {
          plugins: [router]
        }
      })

      // Intentar acceder al dashboard de estudiante
      await router.push('/student')
      await router.isReady()

      // Debería permitir el acceso
      expect(router.currentRoute.value.path).toBe('/student')
    })
  })

  describe('Role-based Navigation', () => {
    it('should prevent student from accessing teacher dashboard', async () => {
      const auth = useAuthStore()
      
      // Registrar y loguear un estudiante
      await auth.register({
        name: 'Test Student',
        rut: '22222222-2',
        email: 'test@student.com',
        password: '123456'
      })

      // Montar la aplicación
      wrapper = mount(App, {
        global: {
          plugins: [router]
        }
      })

      // Intentar acceder al dashboard de profesor
      await router.push('/teacher')
      await router.isReady()

      // Debería redirigir a unauthorized
      expect(router.currentRoute.value.path).toBe('/unauthorized')
    })

    it('should prevent unauthorized access to admin dashboard', async () => {
      const auth = useAuthStore()
      
      // Registrar y loguear un estudiante
      await auth.register({
        name: 'Test Student',
        rut: '33333333-3',
        email: 'test@student.com',
        password: '123456'
      })

      // Montar la aplicación
      wrapper = mount(App, {
        global: {
          plugins: [router]
        }
      })

      // Intentar acceder al dashboard de admin
      await router.push('/admin')
      await router.isReady()

      // Debería redirigir a unauthorized
      expect(router.currentRoute.value.path).toBe('/unauthorized')
    })
  })

  describe('Logout Flow', () => {
    it('should redirect to login after logout', async () => {
      const auth = useAuthStore()
      
      // Registrar y loguear un usuario
      await auth.register({
        name: 'Test User',
        rut: '44444444-4',
        email: 'test@user.com',
        password: '123456'
      })

      // Montar la aplicación
      wrapper = mount(App, {
        global: {
          plugins: [router]
        }
      })

      // Navegar al dashboard
      await router.push('/student')
      await router.isReady()
      expect(router.currentRoute.value.path).toBe('/student')

      // Hacer logout
      auth.logout()

      // Debería redirigir a login
      await router.isReady()
      expect(router.currentRoute.value.path).toBe('/login')
    })
  })
}) 