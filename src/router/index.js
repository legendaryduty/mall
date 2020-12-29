import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('views/home/Home');
const Type = () => import('views/type/Type');
const Cart = () => import('views/cart/Cart');
const Profile = () => import('views/profile/Profile');
const Detail = () => import('views/detail/Detail');

Vue.use(VueRouter);

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/type',
    component:Type
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
