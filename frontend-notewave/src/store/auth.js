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
    logout() {
      this.user = null;
    },
  },
});