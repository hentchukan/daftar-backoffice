import { createApp } from 'vue/dist/vue.esm-bundler.js';

import router from './router';
import './assets/css/app.css';

import "vue3-toastify/dist/index.css";
import CKEditor from '@ckeditor/ckeditor5-vue';
import BackToTop from 'vue-backtotop';
import BackDoor from "@/views/BackDoor.vue";

import keycloak from "@/services/keycloak.ts";

const feather = require('feather-icons');
feather.replace();

keycloak.init({ onLoad: "login-required" }).then((authenticated) => {

    if (!authenticated) {
        console.error("User not authenticated");
        window.location.reload(); // Redirect to login
    } else {
        console.log("Authenticated!", keycloak.token);
    }

    const app = createApp(BackDoor)
            .use(router)
            .use(BackToTop)
            .use( CKEditor )
            .mount('#app');

    app.config.globalProperties.$keycloak = keycloak;
    app.mount("#app");

}).catch((err) => {
    console.error("Keycloak initialization error:", err);
});

const appTheme = localStorage.getItem('theme');

// Check what is the active theme and change theme when user clicks on the theme button in header.
if (
	appTheme === 'dark' &&
	document.querySelector('body').classList.contains('app-theme')
) {
	document.querySelector('body').classList.add('bg-primary-dark');
} else {
	document.querySelector('body').classList.add('bg-secondary-light');
}
