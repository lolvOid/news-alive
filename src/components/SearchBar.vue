<template>
  <v-app-bar color="#fff" flat density="comfortable">
    <v-toolbar-items>
      <v-btn class="d-lg-none d-md-none" icon="mdi:mdi-chevron-left" @click="$emit('onSearchClicked', false)"></v-btn>

    </v-toolbar-items>
    <v-container class="mr-4">
      <v-row align="center" justify="center">
        <v-col class="pa-0" cols="12" md="8" sm="7" lg="6">
          <v-text-field autofocus density="compact" variant="outlined" label="Search News, Articles, Headlines" flat
            clearable prepend-inner-icon="mdi:mdi-magnify" single-line hide-details
            @input="(e) => this.$emit('onsearch', e.target.value)" ref='searchField' append-icon="mdi:mdi-filter-variant"
             @click:append="dialogFilter = true"></v-text-field>
          
        </v-col>
        <v-btn class="d-none d-lg-block d-md-block" @click="$emit('onSearchClicked', false)">Cancel</v-btn>
      </v-row>
    </v-container>
   
    <v-dialog v-model="dialogFilter" scrollable width="auto">
     
      <v-card>
        <v-toolbar color="white">
          <v-toolbar-title>Filters</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              variant="text"
              icon="mdi:mdi-close"
              @click="dialogFilter = false"
            >
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text style="height: 350px">
          <v-list>
            <v-list-item
              :prepend-avatar="s.icon"
              v-for="(s, id) in sources"
              :key="s.id"
              :value="s.id"
              @click="$emit('onfilter', s.id)"
            >
              <v-list-item-title> {{ s.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  
  </v-app-bar>
</template>
<style type="css"></style>
<script>
export default {
  name: 'SearchBar',
  emits: ['onfilter','onsearch', 'onSearchClicked'],
  props: ['sources'],
  data() {
    return {
      dialogFilter: false,

    }
  },
  mounted() {
    this.$refs["searchField"].focus()
  },
  methods: {

  },
}
</script>
