import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import welcome from './public/welcome.vue'
import homeBase from './public/home-base.vue'

/**
 * 路由路径配置
 */
const routes = [{
    path: "/",
    component: welcome
}, {
    path: "/home",
    component: homeBase
}];


//路由设置
export default createRouter({
    history: createWebHashHistory(),
    routes,
})