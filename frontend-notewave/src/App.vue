<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <LoginPage/>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import LoginPage from './pages/auth/UserLogin.vue'

/*
export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
  */
export default {
  name: 'App',
  components: {
    LoginPage
  }
} 
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
