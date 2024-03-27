<template>
   <div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="https://getbootstrap.com/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <h3 style="color: black;">Task<span style="color: orange;">ify</span></h3>
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="https://getbootstrap.com/docs/5.0/examples/headers/#" class="nav-link px-2 link-secondary">Home</a></li>
        <li><a href="https://getbootstrap.com/docs/5.0/examples/headers/#" class="nav-link px-2 link-dark">Features</a></li>
        <li><a href="https://getbootstrap.com/docs/5.0/examples/headers/#" class="nav-link px-2 link-dark">Pricing</a></li>
        <li><a href="https://getbootstrap.com/docs/5.0/examples/headers/#" class="nav-link px-2 link-dark">FAQs</a></li>
        <li><a href="https://getbootstrap.com/docs/5.0/examples/headers/#" class="nav-link px-2 link-dark">About</a></li>
      </ul>

      <div v-if="!store.getUser" class="col-md-3 text-end">
        <router-link to="/AppLogin" class="btn btn-outline-primary me-2">Login</router-link>
        <router-link to="/AppRegister" class="btn btn-primary">Sign-up</router-link>
      </div>
      <div v-else class="col-md-3 text-end">
        <button @click="Logout()" class="btn btn-outline-primary me-2">Logout</button>
      </div>
    </header>
  </div>
</template>

<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/store/auth.js';
import router from '@/router/index.js';

const store = useAuthStore();
// console.log(store.getUser);
// console.log(localStorage.getItem('user').token);
const Logout = async () => {
      await axios.post('http://localhost:8000/api/logout', store.getHeaderConfig)
            .then(response => {
              store.clearStoredData();
                Swal.fire({
                    icon: 'success',
                    title: 'Logout...',
                    text: response.data.message
                });
                router.push('/AppLogin');
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Logout failed:'+error,
                });
            });
};

</script>

<style scoped>

</style>
