import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/map',
        name: 'map',
        component: async () => await import('@/pages/map.vue'),
        meta: {
          title: 'Map'
        }
      },
      {
        path: '/route',
        name: 'route',
        component: async () => await import('@/pages/route.vue'),
        children: [
          { 
            path: '', 
            name: 'route-list', 
            component: async () => await import('@/pages/route/route-list.vue'),
            meta: {
              title: 'Route List'
            }
          },
          { 
            path: 'add-route', 
            name: 'add-route',
            component: async () => await import('@/pages/route/add-route.vue'),
            meta: {
              title: 'Add Route'
            } 
          }
        ],
        meta: {
          title: 'Route'
        }
      },
      {
        path: '/recommend',
        name: 'recommend',
        component: async () => await import('@/pages/recommend.vue'),
        meta: {
          title: 'Recommend'
        }
      },
      {
        path: '/account',
        name: 'account',
        component: async () => await import('@/pages/account.vue'),
        meta: {
          title: 'Account'
        }
      },
    ]
})

router.beforeEach(async (to, from, next) => {
  nprogress.start()
  document.title = (to.meta.title || import.meta.env.VITE_PAGE_TITLE) as string
  next()
})

router.afterEach((to, from) => {
  if (to.path === '/redirect') {
      if (from && from.path !== '/redirect') {
          router.replace({
              path: from.path,
              query: from.query
          })
      }
  }
  nprogress.done()
})

export default router