import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Admin from '@/views/Admin.vue';
import EditCourse from '@/views/EditCourse.vue';
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
  },
  {
    path: '/edit-course/:id',
    name: 'edit-course',
    component: EditCourse,
    props: true,
  },
  {
    path:'*',
    name:'NotFound',
    component:NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

