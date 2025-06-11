<template>
  <div class="register">
    <h2>Registro de Usuario</h2>
    <input v-model="name" placeholder="Nombre" />
    <input v-model="rut" placeholder="RUT" />
    <input v-model="email" type="email" placeholder="Correo electrónico" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button @click="handleRegister">Registrarse</button>
    <p>¿Ya tienes una cuenta? <a href="/frontend-notewave/src/pages/auth/UserLogin.vue" @click.prevent="goToLogin">Iniciar sesión</a></p>
    <p v-if="error" class="text-red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';

const name = ref('');
const rut = ref('');
const email = ref('');
const password = ref('');
const error = ref(null);
const router = useRouter();
const auth = useAuthStore();

// Función para validar el RUT chileno
function validarRut(rutValue) {
  // Eliminar puntos, guiones y espacios
  let rutLimpio = rutValue.replace(/\./g, '').replace(/-/g, '').trim();
  
  // Se requiere que tenga al menos dos caracteres (cuerpo y dígito verificador)
  if (rutLimpio.length < 2) return false;
  
  // Separar el cuerpo y el dígito verificador
  const cuerpo = rutLimpio.slice(0, -1);
  let dvInput = rutLimpio.slice(-1).toUpperCase();
  
  // Verificar que el cuerpo sea numérico
  if (!/^\d+$/.test(cuerpo)) return false;
  
  let suma = 0;
  let multiplo = 2;
  
  // Recorrer el cuerpo del RUT de derecha a izquierda
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    const digito = parseInt(cuerpo[i]);
    suma += digito * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  
  // Calcular el dígito verificador esperado
  let dvCalculado = 11 - (suma % 11);
  if (dvCalculado === 11) {
    dvCalculado = '0';
  } else if (dvCalculado === 10) {
    dvCalculado = 'K';
  } else {
    dvCalculado = String(dvCalculado);
  }
  
  return dvCalculado === dvInput;
}

const handleRegister = async () => {
  error.value = null;

  // Validar campos requeridos
  if (!name.value || !rut.value || !email.value || !password.value) {
    error.value = 'Todos los campos son requeridos.';
    return;
  }

  // Validar formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    error.value = 'Por favor ingrese un correo electrónico válido.';
    return;
  }

  // Validar RUT
  if (!validarRut(rut.value)) {
    error.value = 'El RUT ingresado es inválido.';
    return;
  }

  try {
    await auth.register({
      name: name.value,
      rut: rut.value,
      email: email.value,
      password: password.value
    });
    router.push('/login');
  } catch (e) {
    error.value = e.message;
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.register {
  max-width: 300px;
  margin: auto;
  padding: 20px;
}

.register input {
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.register button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
}

.register button:hover {
  background-color: #45a049;
}

.text-red {
  color: red;
}

a {
  color: #4CAF50;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style> 