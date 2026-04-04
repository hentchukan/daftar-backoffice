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

keycloak.onReady = (authenticated) => {
    console.log("Keycloak ready:", authenticated);
};

keycloak.onAuthError = (errorData) => {
    console.error("Keycloak auth error:", errorData);
};

keycloak.onAuthLogout = () => {
    console.warn("Keycloak auth logout detected");
};

keycloak.onAuthRefreshError = () => {
    console.error("Keycloak auth refresh error");
};

keycloak.onTokenExpired = () => {
    console.warn("Keycloak token expired");
};

keycloak.init({
    onLoad: "login-required",
    checkLoginIframe: false,
    enableLogging: true,
}).then((authenticated) => {

    if (!authenticated) {
        console.error("User not authenticated");
        return;
    }

    console.log("Authenticated!", keycloak.token);

    const app = createApp(BackDoor)
        .use(router)
        .use(BackToTop)
        .use(CKEditor);

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
