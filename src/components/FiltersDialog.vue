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
      this.dialog = val
    },
    selectedSource(val) {
      this.selected = val
    },
  },

  mounted() {
    const { smAndUp } = useDisplay()
    this.display = smAndUp
  },

  methods: {
    closeDialog() {
      this.dialog = false
      this.$emit('dialogClosed')
    },

    updateSelectedSource(value) {
      this.$emit('update:selected-source', value)
    },
  },

  computed: {
    ...mapGetters(['allSources', 'filteredSources']),
    sources() {
      return this.allSources
    },
    filteredSources() {
      if (this.searchedSource) {
        return this.allSources.filter((source) =>
          source.name.toLowerCase().includes(this.searchedSource.toLowerCase())
        )
      }
      return this.allSources
    },
  },
}
</script>
