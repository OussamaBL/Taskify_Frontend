<template>
    <form style="width: 32%;margin: 0 auto;">
        <!-- Email input -->
        <div class="form-outline mb-4">
            <label class="form-label" for="form2Example1">Email address</label>
            <input type="email" id="form2Example1" class="form-control" v-model="data.user.email" />
            
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
            <label class="form-label" for="form2Example2">Password</label>
            <input type="password" id="form2Example2" class="form-control" v-model="data.user.password" />
            
        </div>

        <!-- Submit button -->
        <button @click="Login()" type="button" class="btn btn-primary btn-block mb-4">Login</button>

        <!-- Register buttons -->
        <div class="text-center">
            <p>Not a member? <a href="#!">Register</a></p>
           
        </div>
    </form>
</template>

<script setup>

import { reactive } from "vue";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/store/auth.js';
import router from '@/router/index.js';

const store = useAuthStore();

const data = reactive({
        user: {
          email: '',
          password: ''
        },
    });

const Login = async () => {
    await axios.post('http://localhost:8000/api/login', {
            email: data.user.email,
            password: data.user.password
        })
        .then(response => {
            store.storeUser(response.data.user);
            Swal.fire({
                icon: 'success',
                title: 'Login success',
                text: response.data.message
            });
            router.push('/Tasks');
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Login failed:' + error,
            });
        });
};
</script>
<style>
</style>