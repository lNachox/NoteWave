<template>
  <div class="mock-data-manager">
    <h4>Gestión de Datos de Prueba</h4>
    <button @click="handleResetMockData" class="reset-button">
      Reiniciar Datos de Prueba
    </button>
    <div class="mock-users-info">
      <h5>Usuarios de Prueba Disponibles:</h5>
      <div class="user-credentials">
        <h6>Estudiantes:</h6>
        <p>1. RUT: 11111111-1, Contraseña: 123456</p>
        <p>2. RUT: 22222222-2, Contraseña: 123456</p>
        
        <h6>Profesores:</h6>
        <p>1. RUT: 33333333-3, Contraseña: 123456</p>
        <p>2. RUT: 44444444-4, Contraseña: 123456</p>
        
        <h6>Administradores:</h6>
        <p>1. RUT: 55555555-5, Contraseña: 123456</p>
        <p>2. RUT: 66666666-6, Contraseña: 123456</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../store/auth';

const auth = useAuthStore();

const handleResetMockData = () => {
  if (confirm('¿Estás seguro de que deseas reiniciar los datos de prueba? Esto eliminará todos los usuarios personalizados.')) {
    auth.resetToMockUsers();
  }
};
</script>

<style scoped>
.mock-data-manager {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.reset-button {
  background-color: #17a2b8;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin: 10px 0;
  transition: background-color 0.3s;
}

.reset-button:hover {
  background-color: #138496;
}

.mock-users-info {
  margin-top: 20px;
  font-size: 14px;
}

.user-credentials {
  margin-left: 15px;
}

h5 {
  color: #2c3e50;
  margin-bottom: 10px;
}

h6 {
  color: #495057;
  margin: 15px 0 5px 0;
}

p {
  margin: 5px 0;
  color: #6c757d;
}
</style> 