require('./bootstrap');

window.Vue = require('vue');
import Vuetify from "../plugins/vuetify"
import store from "./store";
import router from "./router";

Vue.component('home-component', require('./components/HomeComponent.vue').default);
Vue.component('login-component', require('./components/LoginComponent.vue').default);



const app = new Vue({
    el: '#app',
    vuetify: Vuetify,
    store,
    router

});
