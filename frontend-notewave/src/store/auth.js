import { defineStore } from 'pinia';
import mockUsers from '../data/mockUsers.json';

export const useAuthStore = defineStore('auth', {
  state: () => {
    // Initialize localStorage with mock users if it's empty
    if (!localStorage.getItem('registeredUsers')) {
      localStorage.setItem('registeredUsers', JSON.stringify(mockUsers.users));
    }

    return {
      user: JSON.parse(localStorage.getItem('user')) || null,
      registeredUsers: JSON.parse(localStorage.getItem('registeredUsers')) || []
    };
  },
  
  actions: {
    login({ rut, password }) {
      // Buscar el usuario en los usuarios registrados
      const user = this.registeredUsers.find(u => u.rut === rut && u.password === password);
      
      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      // Guardar el usuario actual en el estado y localStorage
      this.user = {
        name: user.name,
        rut: user.rut,
        email: user.email,
        role: user.role
      };
      
      localStorage.setItem('user', JSON.stringify(this.user));
    },

    register({ name, rut, email, password }) {
      // Verificar si el RUT ya está registrado
      if (this.registeredUsers.some(user => user.rut === rut)) {
        throw new Error('El RUT ya está registrado');
      }

      // Verificar si el email ya está registrado
      if (this.registeredUsers.some(user => user.email === email)) {
        throw new Error('El correo electrónico ya está registrado');
      }

      // Crear nuevo usuario
      const newUser = {
        name,
        rut,
        email,
        password,
        role: 'estudiante', // Por defecto, los nuevos registros son estudiantes
        createdAt: new Date().toISOString()
      };

      // Agregar a la lista de usuarios registrados
      this.registeredUsers.push(newUser);
      
      // Guardar en localStorage
      localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));

      // Automáticamente iniciar sesión con el nuevo usuario
      this.user = {
        name: newUser.name,
        rut: newUser.rut,
        email: newUser.email,
        role: newUser.role
      };
      
      localStorage.setItem('user', JSON.stringify(this.user));
    },

    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },

    // Método para reiniciar los usuarios a los valores iniciales del mock
    resetToMockUsers() {
      this.registeredUsers = [...mockUsers.users];
      localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));
      this.logout();
    }
  }
});