import {
    createRouter,
    createWebHashHistory
} from 'vue-router';
import homeBase from './public/home-base.vue';


/**
 * 路由路径配置
 */
const routes = [{
    path: "/",
    component: homeBase
}, {
    path: "/login",
    component:() => import('./public/welcome.vue')
}];


//路由设置
export default createRouter({
    history: createWebHashHistory(),
    routes,
})