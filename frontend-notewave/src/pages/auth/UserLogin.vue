<template>
  <div class="login">
    <h2>Iniciar Sesión</h2>
    <input v-model="rut" placeholder="Ingrese su RUT" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button @click="handleLogin">Entrar</button>
    <p>¿No tienes una cuenta? <a @click.prevent="goToRegister">Regístrate aquí</a></p>
    <p v-if="error" class="text-red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';

const rut = ref('');
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

const handleLogin = async () => {
  error.value = null;
  
  // Primero, verifica que el RUT tenga el formato y dígito verificador correctos
  if (!validarRut(rut.value)) {
    error.value = 'El RUT ingresado es inválido.';
    return;
  }
  
  try {
    await auth.login({ rut: rut.value, password: password.value });
    
    // Redirigir según el rol del usuario
    if (auth.user.role === 'estudiante') {
      router.push('/student');
    } else if (auth.user.role === 'docente') {
      router.push('/teacher');
    } else if (auth.user.role === 'administrador') {
      router.push('/admin');
    }
  } catch (e) {
    error.value = e.message;
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style>
.login {
  max-width: 300px; 
  margin: auto; 
  padding: 20px;
}

.login input {
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
}

.login button:hover {
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