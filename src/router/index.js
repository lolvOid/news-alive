import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

// Create the router instance
const router = createRouter({
  history: createWebHashHistory(), // Use hash mode for history

  // Compatibility: Hash-based routing is supported in all modern browsers
  // The router is set to use hash mode for history using `createWebHashHistory()`.
  // This mode adds a hash "#" to the URL, allowing the application to handle routing on the client-side without the need for server configuration.
  routes: [
    // Define the routes

    // Home route
    {
      path: '/',
      name: 'home',
      beforeEnter: (to, from, next) => {
        // Before entering the route
        const defaultQuery = {
          country: 'us',
        }

        // Check if the current query parameters match the default query
        if (to.query.country === defaultQuery.country) {
          next() // Allow navigation without redirection
        } else {
          next({ name: 'home', query: defaultQuery }) // Redirect to the same route with default query parameters
        }
      },
      component: () => import('@/views/HomeView.vue'),
      props: true,
    },

    // Discover route
    {
      path: '/discover',
      name: 'home.discover',
      beforeEnter: (to, from, next) => {
        // Before entering the route
        const defaultQuery = {
          country: 'us',
          category: 'business',
        }

        // Check if the current query parameters match the default query
        if (
          to.query.country === defaultQuery.country &&
          to.query.category === defaultQuery.category
        ) {
          next() // Allow navigation without redirection
        } else {
          next({ name: 'home.discover', query: defaultQuery }) // Redirect to the same route with default query parameters
        }
      },
      component: () => import('@/views/ExploreView.vue'),
      props: true,
    },

    // Search route
    {
      path: '/search',
      name: 'home.search',
      beforeEnter: (to, from, next) => {
        // Before entering the route
        const defaultQuery = {
          country: 'us',
        }

        // Check if the current query parameters match the default query
        if (to.query.country === defaultQuery.country) {
          next() // Allow navigation without redirection
        } else {
          next({ name: 'home.search', query: defaultQuery }) // Redirect to the same route with default query parameters
        }
      },
      component: () => import('@/views/SearchView.vue'),
      props: true,
    },

    // History route
    {
      path: '/history',
      name: 'home.history',
      component: () => import('@/views/HistoryView.vue'),
      props: true,
    },

    // Article route
    {
      path: '/article/:id',
      name: 'article.show',
      component: () => import('@/views/Details.vue'),
    },

    // 404 Error route
    {
      path: '/:pathMatch(.*)*',
      name: '404Error',
      component: () => import('@/views/404Error.vue'),
    },
  ],
})

export default router
