import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('@/views/Login.vue');
const Home = () => import('@/views/Home.vue');
const Welcome = () => import('@/views/Welcome.vue');
const AllUsers = () => import('@/views/AllUsers.vue');
const AddUsers = () => import('@/views/AddUser.vue');
const Data = () => import('@/views/Data.vue');




Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    redirect:'/welcome',
    component: Home,
    children:[
      {
        path:"/welcome",
        component: Welcome
      },
      {
        path:"/allusers",
        component: AllUsers
      },
      {
        path:"/addUsers",
        component: AddUsers
      },
      {
        path:"/data",
        component: Data
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

// 全局路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path == "/login"){
    return next()
  }
  let token = window.sessionStorage.getItem("token");
  if(!token){
    return next({path:"/login"});
  }
  next();
})

export default router
