<template>
  <v-dialog
    v-model="dialog"
    scrollable
    rounded="xl"
    :width="display ? '400' : '100%'"
    :fullscreen="!display"
    :scrim="false"
    persistent
  >
    <v-card>
      <v-toolbar color="white">
        <v-toolbar-title>Filters</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" icon="mdi:mdi-close" @click="closeDialog">
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-divider></v-divider>

      <v-text-field
        variant="solo"
        flat
        label="Search Sources"
        prepend-inner-icon="mdi:mdi-magnify"
        single-line
        hide-details
        v-model="searchedSource"
        clearable
        autofocus
      ></v-text-field>
      <v-divider></v-divider>

      <v-card-text :style="{ height: display ? '350px' : 'auto' }">
        <v-list>
          <v-list-item
            v-model="selected"
            :prepend-avatar="s.icon"
            v-for="(s, id) in filteredSources"
            :key="s.id"
            :value="s.id"
            @click="updateSelectedSource(s.id)"
          >
            <v-list-item-title>{{ s.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { useDisplay } from 'vuetify'
import { mapGetters } from 'vuex'

export default {
  emits: ['dialogClosed', 'update:selected-source'],
  props: {
    filterDialog: {
      type: Boolean,
      default: false,
    },
    selectedSource: {
      type: String,
      required: true,
    },
    initialSearch: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      dialog: this.filterDialog,
      searchedSource: '',
      display: null,
      selected: this.selectedSource,
    }
  },

  watch: {
    filterDialog(val) {
      this.dialog = val // Updates the dialog visibility when the prop value changes
    },
    selectedSource(val) {
      this.selected = val // Updates the selected source when the prop value changes
    },
  },

  mounted() {
    const { smAndUp } = useDisplay() // Retrieves the current display size (e.g., small, medium, large)
    this.display = smAndUp // Sets the display size to the obtained value
  },

  methods: {
    closeDialog() {
      this.dialog = false // Closes the dialog
      this.$emit('dialogClosed') // Emits the 'dialogClosed' event
    },

    updateSelectedSource(value) {
      this.$emit('update:selected-source', value) // Emits the 'update:selected-source' event with the selected value
    },
  },

  computed: {
    ...mapGetters(['allSources', 'filteredSources']), // Maps Vuex getters to computed properties
    sources() {
      return this.allSources // Returns all available sources
    },
    filteredSources() {
      if (this.searchedSource) {
        return this.allSources.filter((source) =>
          source.name.toLowerCase().includes(this.searchedSource.toLowerCase())
        ) // Filters the sources based on the searched source name
      }
      return this.allSources // Returns all sources if no search query is present
    },
  },
}
</script>
