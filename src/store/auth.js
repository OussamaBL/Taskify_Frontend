import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: '',
        // isAuthenticated: '',
    }),
    getters: {
        getUser: (state) => state.user,
        getToken: (state) => state.user.token,
        getHeaderConfig(state) {
            const config = {
                headers: {
                    "Authorization" : `Bearer ${state.user.token}`,
                    "Accept": "application/json",
                }
            }  
            return config;
        }
    },
    actions: {
        setUser() {
            if (localStorage.getItem('user')) {
                this.user = JSON.parse(localStorage.getItem('user'));
            }
        },
        storeUser(user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.user = user;
        },
        clearStoredData() {
            localStorage.removeItem('user');
            this.user = '';
        },
    },
});