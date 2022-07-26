const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home')
  },
  {
    path: '/demo/:id',
    name: 'demo',
    component: () => import('@/views/test/father')
  }
]
export default routes
