import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/policies',
    name: 'Policy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Policy.vue'),
  },
  {
    path: '/booking',
    name: 'Booking',
    component: () => import(/* webpackChunkName: "about" */ '../views/Booking.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
