<template>
  <div class="mock-data-manager">
    <h4>Gestión de Datos</h4>
    
    <div class="data-actions">
      <div class="action-group">
        <h5>Exportar/Importar Datos</h5>
        <button @click="exportUserData" class="action-button export-button">
          Exportar Usuarios a Archivo
        </button>
        <div class="import-container">
          <input
            type="file"
            ref="fileInput"
            @change="handleFileSelect"
            accept=".json"
            class="file-input"
          />
          <button @click="triggerFileInput" class="action-button import-button">
            Importar Usuarios desde Archivo
          </button>
        </div>
      </div>

      <div class="action-group">
        <h5>Datos de Prueba</h5>
        <button @click="handleResetMockData" class="action-button reset-button">
          Reiniciar Datos de Prueba
        </button>
      </div>
    </div>

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
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';

const auth = useAuthStore();
const fileInput = ref(null);

const handleResetMockData = () => {
  if (confirm('¿Estás seguro de que deseas reiniciar los datos de prueba? Esto eliminará todos los usuarios personalizados.')) {
    auth.resetToMockUsers();
  }
};

const exportUserData = () => {
  // Obtener usuarios del localStorage
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  
  // Crear el objeto de datos con metadatos
  const exportData = {
    exportDate: new Date().toISOString(),
    version: '1.0',
    users: users
  };

  // Convertir a JSON con formato legible
  const jsonString = JSON.stringify(exportData, null, 2);
  
  // Crear el blob y descargar
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `notewave_users_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const text = await file.text();
    const importedData = JSON.parse(text);

    // Validar el formato del archivo
    if (!importedData.users || !Array.isArray(importedData.users)) {
      throw new Error('Formato de archivo inválido');
    }

    // Validar cada usuario
    for (const user of importedData.users) {
      if (!user.name || !user.rut || !user.email || !user.role) {
        throw new Error('Datos de usuario incompletos o inválidos');
      }
    }

    if (confirm('¿Estás seguro de que deseas importar estos usuarios? Esto reemplazará todos los usuarios actuales.')) {
      // Actualizar localStorage y estado
      localStorage.setItem('registeredUsers', JSON.stringify(importedData.users));
      auth.updateRegisteredUsers(importedData.users);
      alert('Usuarios importados exitosamente');
    }
  } catch (error) {
    alert('Error al importar el archivo: ' + error.message);
  }

  // Limpiar el input
  event.target.value = '';
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

.data-actions {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.action-group {
  flex: 1;
  background-color: white;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.action-group h5 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
}

.action-button {
  width: 100%;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin: 5px 0;
  transition: background-color 0.3s;
}

.export-button {
  background-color: #28a745;
  color: white;
}

.export-button:hover {
  background-color: #218838;
}

.import-button {
  background-color: #17a2b8;
  color: white;
}

.import-button:hover {
  background-color: #138496;
}

.reset-button {
  background-color: #dc3545;
  color: white;
}

.reset-button:hover {
  background-color: #c82333;
}

.file-input {
  display: none;
}

.import-container {
  margin-top: 10px;
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