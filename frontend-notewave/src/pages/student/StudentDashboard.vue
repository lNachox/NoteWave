<template>
  <div class="dashboard">
    <div class="header">
      <h2>Bienvenido, {{ user?.name || 'Estudiante' }}</h2>
      <button @click="handleLogout" class="logout-button">Cerrar Sesión</button>
    </div>
    <div class="content">
      <!-- Aquí irá el contenido del dashboard -->
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../store/auth';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const auth = useAuthStore();
const router = useRouter();

const user = computed(() => auth.user);

const handleLogout = () => {
  auth.logout();
  router.push('/login');
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

.content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>