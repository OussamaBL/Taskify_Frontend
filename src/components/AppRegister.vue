<template>
    <div style="width: 32%;margin: 0 auto;">
         <div class="form-outline mb-4">
            <label class="form-label" for="form2Example1">Name</label>
            <input type="text" id="form2Example1" class="form-control" v-model="data.user.name" />
            
        </div>

        <!-- Email input -->
        <div class="form-outline mb-4">
            <label class="form-label" for="form2Example1">Email address</label>
            <input type="email" id="form2Example1" class="form-control" v-model="data.user.email" />
            
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
            <label class="form-label" for="form2Example2">Password</label>
            <input type="password" id="form2Example2" class="form-control" v-model="data.user.password"  />
            
        </div>

        <!-- Submit button -->
            <button type="button" @click="register()" class="btn btn-primary btn-block mb-4">Sign up</button>

        <!-- Register buttons -->
        <div class="text-center">
            <p>Not a member? <router-link to="/AppLogin">Login</router-link>
            </p>
           
        </div>
    </div>
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
          name:'',
          email: '',
          password: ''
        },
    });

const register = async () => {
    await axios.post('http://localhost:8000/api/register', {
            name: data.user.name,
            email: data.user.email,
            password: data.user.password
        })
        .then(response => {
            store.storeUser(response.data.user);
            alert(response.data.user.data.name);
            alert(store.getToken);

            Swal.fire({
                icon: 'success',
                title: 'Register success',
                text: response.data.message
            });
            // Access router instance using $router
            router.push('/Tasks');
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Registration failed:' + error,
            });
        });
};
</script>


<style>
</style>