<template>
  <v-app>
    <!-- The navigation drawer component -->
    <NavigationDrawer
      :searchResults="headlines.length"
      @on-category-selected="onCategorySelected"
      @on-country-selected="onCountrySelected"
      @on-source-selected="onSourceSelected"
      @on-search="onSearch"
      @on-country-clear="onCountryClear"
      @on-source-clear="onSourceClear"
      @on-category-clear="onCategoryClear"
      @on-search-focused="onFocus"
      @on-wrong-fetch="onWrongFetch()"
      :historyView="$route.name === 'home.history'"
      :exploreView="$route.name === 'home.discover'"
      :homeView="$route.name === 'home'"
      :searchView="$route.name === 'home.search'"
      :detailView="$route.name === 'article.show'"
      :query="searchQuery"
    />
    <!-- The router view component for rendering articles -->
    <router-view
      :articles="headlines"
      :currentTab="this.category"
      v-if="!needLoading"
      :highlightText="highLightText"
      :key="$route.path"
    />
    <!-- The spinner component for indicating loading state -->
    <Spinner v-if="needLoading" />
    <!-- The bottom tab navigation component for mobile view -->
    <Error :error="hasError" :message="errorMessage" />

    <BottomTabNavigation
      v-if="$vuetify.display.mobile"
      :historyView="$route.name === 'home.history'"
      :exploreView="$route.name === 'home.discover'"
      :homeView="$route.name === 'home'"
      :searchView="$route.name === 'home.search'"
    />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Spinner from './components/Spinner.vue'
import Error from './components/Error.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'
import BottomTabNavigation from './components/BottomTabNavigation.vue'
import { event } from 'vue-gtag'

export default {
  name: 'App',
  emits: ['updateQuery'],
  components: {
    NavigationDrawer,

    Spinner,
    Error,
    BottomTabNavigation,
  },
  data() {
    return {
      country: this.$route.name === 'home' ? 'us' : '',
      queryText: '',
      category: this.$route.name === 'home.discover' ? 'business' : '',
      sources: '',
      highLightText: '',
      searchQuery: {},
    }
  },
  computed: {
    ...mapGetters(['allHeadlines', 'isLoading', 'error']),
    hasError() {
      return this.error != ''
    },
    headlines() {
      if (this.sources) {
        return this.allHeadlines.filter((h) => h.source.id === this.sources)
      }
      return this.allHeadlines
    },
    errorMessage() {
      return this.error
    },
    needLoading() {
      return this.isLoading
    },
  },
  methods: {
    ...mapActions(['fetchHeadlines', 'searchHeadlines', 'fetchHeadlinesWrong']),
    onWrongFetch() {
      return this.fetchHeadlinesWrong()
    },
    onCategorySelected(val) {

      this.category = val
      this.updateURLQuery()
    },
    onSourceSelected(val) {
      this.sources = val
      this.updateURLQuery()
    },
    onCountrySelected(val) {
      this.country = val
      console.log(val)
      this.updateURLQuery()
    },
    onCategoryClear(val) {
      this.category = val
      this.updateURLQuery()
    },
    onSourceClear(val) {
      this.sources = val
      this.updateURLQuery()
    },
    onCountryClear(val) {
      this.country = 'us'
      this.updateURLQuery()
    },
    onSearch(val) {
     
      this.queryText = val
      this.updateURLQuery()
    },
    onFocus() {
      this.updateURLQuery()
      this.$router.push({ name: 'home.search', query: this.searchQuery })
    },
    updateURLQuery() {
      const query = {
        category: this.category,
        sources: this.sources,
        country: this.country,
        q: this.queryText,
      }

      this.searchQuery = query
      // Update the route and emit the updated query
      this.$router.push({ name: this.$route.name, query })
      this.$emit('update-query', this.searchQuery)
      this.searchHeadlines(query)
    },
  },

  created() {
    
    const defaultQuery = {}
    // if (!this.$route.query.country || !this.$route.query.category) {
    //   this.$router.replace({ name: 'home', query: defaultQuery });
    // } else {
    this.category = this.$route.query.category // Set the category based on the route query
    this.sources = this.$route.query.sources // Set the sources based on the route query
    this.country = this.$route.query.country ? this.$route.query.country : 'us' // Set the country based on the route query, default to 'us'
    this.queryText = this.$route.query.query

    this.$router.push({ name: 'home.search', query: this.searchQuery })
  },
  watch: {
    searchQuery(val) {
      this.highLightText = val.q != ' ' ? val.q : ''
    },
    $route: {
      handler(route) {
        if(route.name==="home"){
          event('home', { method: 'Google' })

        }else if(route.name==="home.search"){
          event('search', { method: 'Google' })
        }else if(route.name==="home.discover"){
          event('discover', { method: 'Google' })
        }else if(route.name==="history"){
          event('history', { method: 'Google' })
        }
        this.searchHeadlines(route.query)
      },
      immediate: true,
    },
  },
}
</script>
