import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './css/style.scss'
import './view/hello.vue'
import 'babel-polyfill'
// new Vue({
//     el: '#app',
//     router,
//     components: {
//         App
//     },
//     template: '<App/>'
// })
new Vue({
    router,
    render: h => h(App)
}).$mount("#app")