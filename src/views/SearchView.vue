<template>
  <v-main>
    <v-card class="d-flex justify-center mt-4 align-center" flat>
      <v-container class="ml-auto mr-auto pt-0 mt-0">
        <v-row align-center="start" justify="center">
          <v-col cols="12" lg="8" xl="8">
            <v-card flat v-if="!articles.length">
              <v-card-title> </v-card-title>
            </v-card>
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
    currentTab: null,
    dialogFilter: {
      type: Boolean,
      default: false,
    },

    data() {
      return {
        dialog: this.dialogFilter,
        searchText: '',
        display: null,

        tab: this.currentTab,
      }
    },
    mounted() {
      const { smAndUp } = useDisplay()
      this.display = smAndUp
    },
    methods: {},
    watch: {
      currentTab(v) {
        this.tab = v
      },
    },
    computed: {
      ...mapGetters(['allSources', 'filteredSources', 'getCategories']),
      sources() {
        return this.allSources
      },
      categories() {
        return this.getCategories
      },
      filteredSources() {
        if (this.searchText) {
          return this.allSources.filter((source) =>
            source.name.toLowerCase().includes(this.searchText.toLowerCase())
          )
        }
        return this.allSources
      },
    },
  },
}
</script>
