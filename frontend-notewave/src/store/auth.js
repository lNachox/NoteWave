import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    login({ rut, password }) {
      // Simulación de login con datos mock
      if (rut === '1111' && password === '1234') {
        this.user = { rut, role: 'estudiante' }; // cambiar a 'docente' o 'administrador'
      } else if (rut === '2222' && password === '1234') {
        this.user = { rut, role: 'docente' };
      } else if (rut === '3333' && password === '1234') {
        this.user = { rut, role: 'administrador' };
      } else {
        throw new Error('Credenciales inválidas');
      }
    },
    register({ name, rut, email, password }) {
      // Simulación de registro
      // En una implementación real, esto se conectaría con el backend
      
      // Validar que la contraseña tenga al menos 6 caracteres
      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      
      if (rut === '1111' || rut === '2222' || rut === '3333') {
        throw new Error('El RUT ya está registrado');
      }
      
      // Simular registro exitoso
      // En una implementación real, aquí se enviarían los datos al backend
      console.log('Usuario registrado:', { name, rut, email });
      return Promise.resolve();
    },
    logout() {
      this.user = null;
    },
  },
});