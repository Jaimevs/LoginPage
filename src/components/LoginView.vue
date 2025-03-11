<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Iniciar Sesión</h2>
      <form name="login-form" @submit.prevent="login">
        <div class="mb-3">
          <label for="username">Usuario: </label>
          <input
            id="username"
            type="text"
            v-model="input.username"
            placeholder="Ingresa tu usuario"
            :class="{'input-error': errors.username}"
          />
          <div v-if="errors.username" class="error-message">El usuario no puede estar vacío.</div>
        </div>
        <div class="mb-3">
          <label for="password">Contraseña: </label>
          <input
            id="password"
            type="password"
            v-model="input.password"
            placeholder="Ingresa tu contraseña"
            :class="{'input-error': errors.password}"
          />
          <div v-if="errors.password" class="error-message">La contraseña no puede estar vacía.</div>
        </div>
        <button class="btn-submit" type="submit">Login</button>
      </form>
      <h3>Output: {{ output }}</h3>
      <p v-if="isAuthenticated" class="success-message">¡Autenticado correctamente!</p>
    </div>
  </div>

  <p>usuario es: {{ input.username }}</p>
  <p>password es: {{ input.password }}</p>
</template>

<script>
import { SET_AUTHENTICATION, SET_USERNAME } from '@/store/storeconstants';

export default {
  name: 'LoginView',
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      errors: {
        username: false,
        password: false
      },
      isAuthenticated: false,
      output: '' // Definir la variable output para mostrar los mensajes
    };
  },
  methods: {
    login() {
      // Reiniciar errores
      this.errors.username = false;
      this.errors.password = false;
      
      // Validar si los campos están vacíos
      if (this.input.username === "") {
        this.errors.username = true;
      }
      if (this.input.password === "") {
        this.errors.password = true;
      }

      // Si no hay errores, proceder con la autenticación
      if (!this.errors.username && !this.errors.password) {
        this.output = "Autenticación completada";
        this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
        this.$store.commit(`auth/${SET_USERNAME}`, this.input.username);
        this.isAuthenticated = true;
        this.output = "Autenticación completa";
        this.$router.push('/home');
      } else {
        this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
        this.output = "Nombre de usuario y contraseña no pueden estar vacíos";
        this.isAuthenticated = false;
      }
    }
  }
}
</script>

<style scoped>
/* Estilo para el contenedor del formulario */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f7fb;
}

/* Estilo para el formulario */
.login-form {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

/* Estilo para los títulos */
.login-form h2 {
  color: #4a4a4a;
  margin-bottom: 20px;
}

/* Estilo para los campos de texto */
.login-form .mb-3 {
  margin-bottom: 20px;
  text-align: left;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

.login-form input:focus {
  border-color: #6c63ff;
  outline: none;
}

.login-form .input-error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.success-message {
  color: green;
  font-weight: bold;
  margin-top: 20px;
}

/* Estilo para el botón */
.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #5a54e1;
}
</style>
