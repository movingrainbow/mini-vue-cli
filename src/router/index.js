import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '../view/hello.vue'
Vue.use(Router);
const router = new Router({
    routes: [{
        path: '/',
        component: indexPage,
    }]
})
export default router;