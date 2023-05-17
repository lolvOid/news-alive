<template>
  <v-main>
    <v-card class="d-flex justify-center mt-4 align-center" flat>
      <v-container class="ml-auto mr-auto pt-0 mt-0">
        <v-row align-center="start" justify="center">
          <v-col cols="12" lg="8" xl="8">
            <!-- Conditionally render an empty card when there are no articles -->
            <v-card flat v-if="!articles.length">
              <v-card-title> </v-card-title>
            </v-card>
            <!-- Render the 'Headlines' component when there are articles -->
            <Headlines v-else :data="articles" :highlightText="highlightText" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-main>
</template>
<script>
import { mapGetters } from 'vuex'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import Headlines from '../components/Headlines.vue'

export default {
  name: 'SearchView',
  components: {
    Headlines,
  },
  emits: ['dialogClosed', 'onFilter'],
  props: {
    articles: Array,
    highlightText: String,
    currentTab: null, // Current tab value (not provided)
    dialogFilter: {
      type: Boolean,
      default: false,
    },

    data() {
      return {
        dialog: this.dialogFilter, // Set the dialog value based on the dialogFilter prop
        searchText: '', // Text entered in the search input
        display: null, // Display size (null initially)

        tab: this.currentTab,
      }
    },
    mounted() {
      const { smAndUp } = useDisplay() // Set the display size using Vuetify's useDisplay()
      this.display = smAndUp
    },
    methods: {},
    watch: {
      currentTab(v) {
        this.tab = v // Update the tab value when the currentTab prop changes
      },
    },
    computed: {
      ...mapGetters(['allSources', 'filteredSources', 'getCategories']),
      sources() {
        return this.allSources // Get all available sources
      },
      categories() {
        return this.getCategories
      },
      filteredSources() {
        if (this.searchText) {
          // Filter sources based on the search text
          return this.allSources.filter((source) =>
            source.name.toLowerCase().includes(this.searchText.toLowerCase())
          )
        }
        return this.allSources // Return all sources if there's no search text
      },
    },
  },
}
</script>
