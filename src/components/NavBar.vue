<template>
  <v-app-bar
    color="#fff"
    flat
    app
    density="comfortable"
    elevate-on-scroll
    fixed
  >
    <v-app-bar-title class="font-weight-bold"> ALIVE </v-app-bar-title>

    <v-col
      :style="{
        width: searchBoxClosed ? '65%' : '100%',
        flex: searchBoxClosed ? '0 0 65%' : '0 0 100%',
      }"
      sm="8"
      md="4"
      lg="4"
    >
      <v-row wrap class="justify-end align-center mr-2">
        <v-text-field
          v-model.trim="searchText"
          dense
          filled
          rounded="0"
          clearable
          placeholder="Search"
          prepend-inner-icon="mdi:mdi-magnify"
          class="pt-0 mb-0 shrink expanding-search"
          flat
          :class="{ closed: searchBoxClosed && !searchText }"
          @keyup.enter=""
          v-model="searchText"
          @focus="searchBoxClosed = false"
          @blur="searchBoxClosed = true"
          absolute
        ></v-text-field>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn flat icon="mdi:mdi-filter-variant " v-bind="props"> </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
              :prepend-avatar="formatIcon(item.url)"
            >
              <v-list-item-title> {{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn flat icon="mdi:mdi-history" v-bind="props"> </v-btn>
          </template>

          <v-list>
            <!-- <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
              :prepend-avatar="formatIcon(item.url)"
            >
              <v-list-item-title> {{ item.name }}</v-list-item-title>
            </v-list-item> -->
          </v-list>
        </v-menu>
        
      </v-row>
    </v-col>
  </v-app-bar>
</template>
<style type="css">
.v-input__details {
  display: none !important;
}
.v-input.expanding-search {
  transition: 0.4s ease-out;
}

.v-input.expanding-search {
  max-width: 100% !important;
}

.v-input.expanding-search.closed {
  max-width: 50px !important;
}

.v-field--variant-filled .v-field__overlay {
  background-color: transparent !important;
}

.v-input.expanding-search.closed .v-field__outline {
  opacity: 0 !important;
}

.v-input.expanding-search .v-field__outline {
  opacity: 1 !important;
  transition: 0.4s ease-out;
}
</style>
<script>
import sources from '../defaults/sources'
export default {
  name: 'NavBar',
  data() {
    return {
      searchText: null,
      searchBoxClosed: true,
      items: sources,
    }
  },
  methods: {
    formatIcon(url = '') {
      const origin = new URL(url).origin

      return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=128`
    },
  },
}
</script>
