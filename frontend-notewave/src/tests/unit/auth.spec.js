import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '../../store/auth'
import { createPinia, setActivePinia } from 'pinia'

describe('Auth Store Unit Tests', () => {
  beforeEach(() => {
    // Crear una nueva instancia de Pinia para cada test
    setActivePinia(createPinia())
    // Limpiar localStorage antes de cada test
    localStorage.clear()
  })

  describe('Login Functionality', () => {
    it('should login successfully with valid credentials', async () => {
      const auth = useAuthStore()
      const testUser = {
        name: 'Test Student',
        rut: '11111111-1',
        email: 'test@student.com',
        password: '123456',
        role: 'estudiante'
      }

      // Registrar un usuario de prueba
      await auth.register(testUser)

      // Intentar login
      await auth.login({
        rut: testUser.rut,
        password: testUser.password
      })

      expect(auth.user).toBeTruthy()
      expect(auth.user.rut).toBe(testUser.rut)
      expect(auth.user.role).toBe('estudiante')
    })

    it('should fail login with invalid credentials', async () => {
      const auth = useAuthStore()
      
      await expect(auth.login({
        rut: 'invalid-rut',
        password: 'wrong-password'
      })).rejects.toThrow('Credenciales inválidas')
    })
  })

  describe('Registration Functionality', () => {
    it('should register a new user successfully', async () => {
      const auth = useAuthStore()
      const newUser = {
        name: 'New Student',
        rut: '22222222-2',
        email: 'new@student.com',
        password: '123456'
      }

      await auth.register(newUser)

      expect(auth.user).toBeTruthy()
      expect(auth.user.rut).toBe(newUser.rut)
      expect(auth.user.role).toBe('estudiante')
    })

    it('should prevent duplicate RUT registration', async () => {
      const auth = useAuthStore()
      const user = {
        name: 'Test User',
        rut: '33333333-3',
        email: 'test@user.com',
        password: '123456'
      }

      await auth.register(user)

      await expect(auth.register({
        ...user,
        email: 'different@email.com'
      })).rejects.toThrow('El RUT ya está registrado')
    })

    it('should prevent duplicate email registration', async () => {
      const auth = useAuthStore()
      const user = {
        name: 'Test User',
        rut: '44444444-4',
        email: 'test@user.com',
        password: '123456'
      }

      await auth.register(user)

      await expect(auth.register({
        ...user,
        rut: '55555555-5'
      })).rejects.toThrow('El correo electrónico ya está registrado')
    })
  })

  describe('Logout Functionality', () => {
    it('should clear user session on logout', async () => {
      const auth = useAuthStore()
      const user = {
        name: 'Test User',
        rut: '66666666-6',
        email: 'test@user.com',
        password: '123456'
      }

      await auth.register(user)
      expect(auth.user).toBeTruthy()

      auth.logout()
      expect(auth.user).toBeNull()
      expect(localStorage.getItem('user')).toBeNull()
    })
  })
}) 