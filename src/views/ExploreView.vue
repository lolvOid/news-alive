<template>
  <v-main>
    <v-card class="d-flex justify-center mt-4 align-center" flat>
      <v-container class="ml-auto mr-auto pt-0 mt-0">
        <v-row align="center" justify="center">
          <v-col cols="12" lg="8" xl="8">
            <v-window v-model="tab">
              <!-- Render a v-window-item for each category -->
              <v-window-item
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                <v-row>
                  <v-col cols="12">
                    <!-- Render headlines component with the corresponding data and highlight text -->
                    <Headlines
                      :data="articles"
                      :highlightText="highlightText"
                    />
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import Headlines from '../components/Headlines.vue' // Importing the Headlines component

export default {
  name: 'SearchView',
  components: {
    Headlines,
  },
  emits: ['dialogClosed', 'onFilter'], // Emitting the 'dialogClosed' and 'onFilter' events

  props: {
    articles: Array, // Prop for passing an array of articles
    highlightText: String, // Prop for passing a string to highlight text
    currentTab: null, // Prop for the current selected tab
    dialogFilter: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dialog: this.dialogFilter, // Data property for the dialog filter
      searchText: '', // Data property for the search text
      display: null, // Data property for the display size
      tab: this.currentTab, // Data property for the current tab
    }
  },
  mounted() {
    const { smAndUp } = useDisplay() // Get the display size using Vuetify's useDisplay utility
    this.display = smAndUp // Set the display property based on the screen size
  },
  watch: {
    currentTab(v) {
      this.tab = v // Watch for changes in the currentTab prop and update the tab value
    },
  },
  computed: {
    ...mapGetters(['allSources', 'filteredSources', 'getCategories']),
    sources() {
      return this.allSources // Computed property returning allSources
    },
    categories() {
      return this.getCategories // Computed property returning getCategories
    },
    filteredSources() {
      if (this.searchText) {
        // If search text is provided
        return this.allSources.filter((source) =>
          source.name.toLowerCase().includes(this.searchText.toLowerCase())
        )
      } // Filter allSources based on search text and return filtered results
      return this.allSources // If no search text, return allSources as it is
    },
  },
}
</script>
