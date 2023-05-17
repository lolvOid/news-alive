import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: (to, from, next) => {
        const defaultQuery = {
          country: 'us',
        }

        if (to.query.country === defaultQuery.country) {
          next() // Allow navigation without redirection
        } else {
          next({ name: 'home', query: defaultQuery }) // Redirect to same route with default query parameters
        }
      },
      component: () => import('@/views/HomeView.vue'),
      props: true,
    },
    {
      path: '/discover',
      name: 'home.discover',
      beforeEnter: (to, from, next) => {
        const defaultQuery = {
          country: 'us',
          category: 'business',
        }

        if (
          to.query.country === defaultQuery.country &&
          to.query.category === defaultQuery.category
        ) {
          next() // Allow navigation without redirection
        } else {
          next({ name: 'home.discover', query: defaultQuery }) // Redirect to same route with default query parameters
        }
      },
      component: () => import('@/views/ExploreView.vue'),
      props: true,
    },
    {
      path: '/search',
      name: 'home.search',
      beforeEnter: (to, from, next) => {
        const defaultQuery = {
          country: 'us',
        }

        if (to.query.country === defaultQuery.country) {
          next() // Allow navigation without redirection
        } else {
          next({ name: 'home.search', query: defaultQuery }) // Redirect to same route with default query parameters
        }
      },
      component: () => import('@/views/SearchView.vue'),
      props: true,
    },
    {
      path: '/history',
      name: 'home.history',
      component: () => import('@/views/HistoryView.vue'),
      props: true,
    },
    {
      path: '/article/:id',
      name: 'article.show',
      component: () => import('@/views/Details.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404Error',
      component: () => import('@/views/404Error.vue'),
    },
  ],
})

export default router
