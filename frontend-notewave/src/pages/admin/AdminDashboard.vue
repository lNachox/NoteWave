<template>
  <div class="dashboard">
    <div class="header">
      <h2>Panel de Administración</h2>
      <button @click="handleLogout" class="logout-button">Cerrar Sesión</button>
    </div>
    
    <div class="content">
      <h3>Usuarios Registrados</h3>
      <div class="users-table-container">
        <table class="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>RUT</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha de Registro</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in registeredUsers" :key="user.rut">
              <td>{{ user.name }}</td>
              <td>{{ user.rut }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>{{ formatDate(user.createdAt) }}</td>
            </tr>
            <tr v-if="registeredUsers.length === 0">
              <td colspan="5" class="no-users">No hay usuarios registrados</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="storage-info">
        <h4>Información del Almacenamiento</h4>
        <button @click="exportUsers" class="export-button">Exportar Usuarios (JSON)</button>
        <p>Ubicación: LocalStorage del navegador</p>
        <p>Cantidad de usuarios: {{ registeredUsers.length }}</p>
      </div>

      <MockDataManager />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../store/auth';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import MockDataManager from '../../components/MockDataManager.vue';

const auth = useAuthStore();
const router = useRouter();

const registeredUsers = computed(() => {
  const usersJson = localStorage.getItem('registeredUsers');
  return usersJson ? JSON.parse(usersJson) : [];
});

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleString();
};

const handleLogout = () => {
  auth.logout();
  router.push('/login');
};

const exportUsers = () => {
  const usersData = JSON.stringify(registeredUsers.value, null, 2);
  const blob = new Blob([usersData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'usuarios_registrados.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.header h2 {
  margin: 0;
  color: #2c3e50;
}

.content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.users-table-container {
  overflow-x: auto;
  margin-bottom: 20px;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.users-table th,
.users-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.users-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.users-table tbody tr:hover {
  background-color: #f8f9fa;
}

.no-users {
  text-align: center;
  color: #6c757d;
  padding: 20px;
}

.logout-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #c82333;
}

.storage-info {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.storage-info h4 {
  margin-top: 0;
  color: #2c3e50;
}

.export-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 15px;
  transition: background-color 0.3s;
}

.export-button:hover {
  background-color: #218838;
}
</style>