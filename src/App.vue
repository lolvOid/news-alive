<template>
  <v-app id="app">
    <NavBar :sources="sources" @onfilter="onFilter" @on-search-clicked="setSearchable"
      v-if="!searchable && currentRoutePath === 'home'" />
    <SearchBar v-if="searchable && currentRoutePath === 'home'" @on-search-clicked="setSearchable" @onsearch="onSearch"
      :sources="sources" @onfilter="onFilter" />
    <HeadlineToolbar v-if="currentRoutePath === 'article.show'"  />
    <router-view :headlines="headlines" :key="$route.path" />

  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import SearchBar from './components/SearchBar.vue';
import HeadlineToolbar from './components/HeadlineToolbar.vue';

import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'App',
  components: { NavBar, SearchBar, HeadlineToolbar },
  data() {
    return {
      filterId: "",
      query: "",
      searchable: false

    }
  },
  computed: {
    ...mapGetters([
      'allHeadlines',
      'allSources']),
    headlines() {
      if (this.filterId) {
        return this.allHeadlines.filter((h) => h.source.id === this.filterId)
      }
      return this.allHeadlines;
    },
    sources() {
      return this.allSources;
    },
    currentRoutePath() {

      return this.$route.name;
    }

  },
  methods: {
    ...mapActions(['fetchHeadlines', 'fetchHeadlinesBySearch']),
    onFilter(value) {
      this.filterId = value;

    },

    onSearch(value) {

      this.query = value;
      this.filterId = "";
      this.fetchHeadlinesBySearch(this.query);

    },
    setSearchable(value) {

      this.searchable = value;


    }
  },

  mounted() {
    this.hidden = false;
    this.fetchHeadlines();


  },

}
</script>
