import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/auth/UserLogin.vue';
import Register from '../pages/auth/UserRegister.vue';
import StudentDashboard from '../pages/student/StudentDashboard.vue';
import TeacherDashboard from '../pages/teacher/TeacherDashboard.vue';
import AdminDashboard from '../pages/admin/AdminDashboard.vue';
import Unauthorized from '../pages/auth/AuthUnauthorized.vue';
import { useAuthStore } from '../store/auth';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/unauthorized', component: Unauthorized },
  {
    path: '/student',
    component: StudentDashboard,
    meta: { requiresAuth: true, roles: ['estudiante'] },
  },
  {
    path: '/teacher',
    component: TeacherDashboard,
    meta: { requiresAuth: true, roles: ['docente'] },
  },
  {
    path: '/admin',
    component: AdminDashboard,
    meta: { requiresAuth: true, roles: ['administrador'] },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const isAuthenticated = !!auth.user;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.roles && !to.meta.roles.includes(auth.user?.role)) {
    next('/unauthorized');
  } else {
    next();
  }
});

export default router;