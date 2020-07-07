const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      actions: ['getQuotes']
    },
    component: () => import('@/views/Home.vue')
  }
]

export default routes
