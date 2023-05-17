<template>
  <v-app-bar
    color="white"
    flat
    order="1"
    dense
    rounded="0"
    elevation="0"
    app
    density="comfortable"
    :extended="!detailView"
    :extension-height="detailView ? '0' : '90'"
  >
    <v-app-bar-nav-icon
      variant="text"
      @click.stop=";(drawer = true), (rail = true)"
      v-if="!drawer && !detailView"
    ></v-app-bar-nav-icon>
    <template v-slot:prepend v-if="detailView">
      <v-btn icon="mdi:mdi-arrow-left" @click="$router.back()"></v-btn>
    </template>

    <v-row align="center" justify="center">
      <v-col class="mt-3" cols="10" md="6" sm="6" lg="4">
        <v-text-field
          type="search"
          density="compact"
          rounded="xl"
          label="Search stories"
          flat
          v-model="currentQuery.q"
          prepend-inner-icon="mdi:mdi-magnify"
          single-line
          hide-details
          variant="solo-filled"
          ref="searchField"
          append-inner-icon="mdi:mdi-filter-variant"
          clear-icon="mdi:mdi-close"
          clearable
          @focus="$emit('onSearchFocused')"
          @input="(e) => $emit('onSearch', e.target.value)"
          @click:append-inner="openFilterDialog"
        ></v-text-field>
      </v-col>
    </v-row>

    <template v-slot:extension v-if="!detailView">
      <!--  homeView -->
      <v-container v-if="homeView" class="ml-auto mr-auto pt-0 mt-0">
        <v-row align="center" justify="center">
          <v-col cols="12" lg="8" xl="8">
            <div class="ma-2 text-h5">
              <strong>
                Top {{ searchResults }} Stories
                <span v-if="currentQuery.country">
                  in {{ findCountry.name }}
                </span>
              </strong>
            </div>

            <v-slide-group
              mandatory
              center-active
              v-model="selectedCountry"
              selected-class="border-md bg-white"
            >
              <v-slide-group-item
                v-for="item in countries"
                :key="item.code"
                v-slot="{ isSelected, toggle, selectedClass }"
                :value="item.id"
              >
                <v-btn
                  size="small"
                  :prepend-icon="isSelected ? 'mdi:mdi-map-marker' : ''"
                  :class="['ma-2', selectedClass]"
                  rounded
                  :color="isSelected ? 'black ' : 'grey'"
                  @click="toggle"
                >
                  {{ item.name }}
                </v-btn>
              </v-slide-group-item>
            </v-slide-group>
          </v-col>
        </v-row>
      </v-container>
      <!--  exploreView -->
      <v-container v-else-if="exploreView" class="ml-auto mr-auto pt-0 mt-0">
        <v-row align="center" justify="center">
          <v-col cols="12" lg="8" xl="8">
            <div class="ma-2 text-h5">
              <strong> Discover </strong>
            </div>

            <div>
              <v-tabs
                center-active
                height="50px"
                direction="horizontal"
                mandatory
                v-model="selectedCategory"
                grow
                centered
              >
                <v-tab
                  size="small"
                  variant="flat"
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </v-tab>
              </v-tabs>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <!--  historyView -->
      <v-container v-else-if="historyView" class="ml-auto mr-auto pt-0 mt-0">
        <v-row align="center" justify="center">
          <v-col cols="12" lg="8" xl="8">
            <div class="ma-2 text-h5">
              <strong> Recent History</strong>
              <div class="text-caption">
                {{
                  allVisited
                    ? allVisited.length + ' histories found'
                    : 'No histories.'
                }}
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <!--  searchView -->
      <v-container v-else-if="searchView" class="ml-auto mr-auto pt-0 mt-0">
        <v-row align="center" justify="center">
          <v-col cols="12" lg="8" xl="8">
            <div class="ma-2 text-h6">
              <strong> {{ searchResults }} top headlines found. </strong>
            </div>
            <v-chip
              v-if="currentQuery.category"
              class="ma-2"
              closable
              color="green-darken-2"
              label
              @click:close="clearCategory"
            >
              {{ currentQuery.category }}
            </v-chip>

            <v-chip
              class="ma-2"
              closable
              color="green-darken-2"
              v-if="currentQuery.country"
              label
              @click:close="clearCountry"
            >
              {{ currentQuery.country }}
            </v-chip>
            <v-chip
              class="ma-2"
              v-if="currentQuery.sources"
              closable
              color="green-darken-2"
              @click:close="clearSources"
              label
            >
              {{ currentQuery.sources }}
            </v-chip>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-app-bar>

  <v-navigation-drawer
    rounded="0"
    border="0"
    order="0"
    elevation="0"
    v-model="drawer"
    v-if="!detailView"
    color="white"
    :rail="$vuetify.display.smAndUp ? rail : false"
    expand-on-hover
  >
    <v-list class="mx-auto" nav>
      <v-list-item
        class="text-h5"
        value="."
        variant="text"
        rounded="0"
        prepend-icon="mdi:mdi-menu-open"
        @click=";(rail = false), (drawer = false)"
      >
        <v-list-item-title v-if="drawer && !rail">ALIVE NEWS</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-list class="mx-0" nav>
      <v-list-item
        prepend-icon="mdi:mdi-home"
        title="Home"
        :active="homeView"
        :to="{ name: 'home' }"
        value="home"
        rounded="pill"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi:mdi-newspaper-variant-multiple"
        title="Discover"
        :to="{ name: 'home.discover' }"
        :active="exploreView"
        value="discover"
        rounded="pill"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi:mdi-magnify"
        :active="searchView"
        title="Search"
        :to="{ name: 'home.search' }"
        value="search"
        rounded="pill"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi:mdi-history"
        title="Recents"
        :active="historyView"
        :to="{ name: 'home.history' }"
        value="history"
        rounded="pill"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list-subheader v-if="!rail">Filter News</v-list-subheader>

      <v-list-group
        value="Countries"
        prepend-icon="mdi:mdi-web"
        @click=";(drawer = true), (rail = false)"
      >
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="By Country"></v-list-item>
        </template>

        <v-list-item
          v-for="c in countries"
          :value="c.id"
          rounded="pill"
          :active="c.id === selectedCountry"
        >
          <v-list-item-title>
            <flag :iso="c.id" /> &nbsp; {{ c.name }}
          </v-list-item-title>
          <v-list-item-action>
            <v-checkbox
              v-model="selectedCountry"
              :value="c.id"
              hide-details
              hide-input
              class="custom-checkbox"
            ></v-checkbox>
            <label class="custom-label" @click="selectedCountry = c.id"></label>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>

      <v-list-group
        value="Sources"
        prepend-icon="mdi:mdi-text-box-search"
        @click=";(drawer = true), (rail = false)"
      >
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="By Channel"></v-list-item>
        </template>

        <v-list-item
          :prepend-avatar="c.icon"
          v-for="c in sources"
          :active="c.id === selectedSource"
          :value="c.id"
          rounded="pill"
        >
          <v-list-item-title>
            {{ c.name }}
          </v-list-item-title>
          <v-list-item-action>
            <v-checkbox
              v-model="selectedSource"
              :value="c.id"
              hide-details
              hide-input
              class="custom-checkbox"
            ></v-checkbox>
            <label class="custom-label" @click="selectedSource = c.id"></label>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>

      <v-list-group
        value="Categories"
        prepend-icon="mdi:mdi-shape"
        @click=";(drawer = true), (rail = false)"
      >
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="By Category"></v-list-item>
        </template>

        <v-list-item
          :prepend-icon="c.icon"
          v-for="c in categories"
          :active="c.id === selectedCategory"
          :value="c.id"
          rounded="pill"
        >
          <v-list-item-title>
            {{ c.name }}
          </v-list-item-title>
          <v-list-item-action>
            <v-checkbox
              v-model="selectedCategory"
              :value="c.id"
              hide-details
              hide-input
              class="custom-checkbox"
            ></v-checkbox>
            <label
              class="custom-label"
              @click="selectedCategory = c.id"
            ></label>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>

      <v-divider></v-divider>
      <v-list-subheader v-if="!rail">Settings</v-list-subheader>
      <v-list-item
        prepend-icon="mdi:mdi-api"
        title="Wrong API Call"
        value="test"
        rounded="be-xl te-xl"
        @click="() => $emit('onWrongFetch')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi:mdi-github"
        title="About"
        value="about"
        rounded="be-xl te-xl"
        href="https://github.com/lolvOid/news-alive"
        target="_blank"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <FiltersDialog
    :initial-search="initialSearch"
    :filter-dialog="filterDialog"
    :selected-source="selectedSource"
    @dialogClosed="filterDialog = false"
    @update:selected-source="updateSelectedSource"
  />

  <v-main
    style="flex: 0.2 0 auto !important"
    v-if="findSource ? findSource.id != null && searchView : false"
    class="p-0 m-0"
  >
    <v-container>
      <v-row align="center" justify="center" dense>
        <v-col cols="12" lg="8" xl="8">
          <v-card class="mx-auto">
            <v-card-title>
              <v-avatar size="100" color="white" rounded="circle">
                <img :src="findSource.icon" height="100" cover />
              </v-avatar>
              {{ findSource.name }}
            </v-card-title>

            <v-card-subtitle>
              <a :href="findSource.url" class="text-black" target="_blank">
                {{ findSource.url }}
              </a>
            </v-card-subtitle>

            <v-card-text>
              {{ findSource.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import FiltersDialog from './FiltersDialog.vue'

export default {
  name: 'NavigationDrawer',
  components: { FiltersDialog },

  // Define props that will be passed to the component
  props: [
    'homeView',
    'exploreView',
    'historyView',
    'searchView',
    'searchResults',
    'detailView',
    'query',
  ],

  // Define events that will be emitted by the component
  emits: [
    'onSearch',
    'onSearchFocused',
    'onCountrySelected',
    'onCategorySelected',
    'onSourceSelected',
    'onCategoryClear',
    'onCountryClear',
    'onSourceClear',
    'onWrongFetch',
  ],

  // Initialize component data
  data() {
    return {
      drawer: false,
      group: null,
      rail: false,
      filterDialog: false,
      selectedSource: '',
      selectedCountry: 'us',
      selectedCategory: this.$route.name === 'home.discover' ? 'business' : '',
      initialSearch: '',
      currentQuery: this.query,
    }
  },

  // Define component methods
  methods: {
    openFilterDialog() {
      this.filterDialog = true
    },
    updateSelectedSource(value) {
      this.selectedSource = value
      console.log(this.selectedSource)
    },
    clearCategory() {
      this.currentQuery.category = ''
      this.selectedCategory = ''
      this.$emit('onCategoryClear', this.selectedCategory)
    },
    clearCountry() {
      this.currentQuery.country = ''
      this.selectedCountry = ''
      this.$emit('onCountryClear', this.selectedCountry)
    },
    clearSources() {
      this.currentQuery.sources = ''
      this.selectedSource = ''
      this.$emit('onSourceClear', this.selectedSource)
    },
  },

  // Define computed properties
  computed: {
    ...mapGetters([
      'getCountries',
      'allSources',
      'getAllVisited',
      'getCategories',
      'filteredSources',
      'getSource',
    ]),

    categories() {
      return this.getCategories
    },

    countries() {
      return this.getCountries
    },
    sources() {
      return this.allSources
    },
    allVisited() {
      return this.getAllVisited
    },

    findSource() {
      return this.getSource(this.selectedSource || this.currentQuery.sources)
    },
    getCurrentSource() {
      if (this.selectedSource || this.currentQuery.sources) {
        return this.allSources.find(
          (source) =>
            source.id == this.selectedSource || this.currentQuery.sources
        )
      }
    },
    findCountry() {
      return this.countries.find((e) => e.id === this.currentQuery.country)
    },
  },

  // Watch for changes in data or properties
  watch: {
    model() {},
    $route(route) {
      this.currentQuery = route.query
    },
    query(v) {
      console.log(v)
    },
    selectedCountry(val) {
      this.currentQuery.country = val
      this.$emit('onCountrySelected', val)
    },
    selectedCategory(val) {
      this.currentQuery.category = val
      this.$emit('onCategorySelected', val)
    },

    selectedSource(val) {
      this.currentQuery.sources = val
      this.initialSearch = this.findSource ? this.findSource.name : ''
      this.$emit('onSourceSelected', val)
    },
  },

  // Lifecycle hook: created
  created() {
    if (this.$route.name === 'home.discover' && this.selectedCategory === '')
      this.selectedCategory = 'business'
    this.currentQuery = this.$route.query
  },
}
</script>

<style>
.custom-checkbox {
  display: none;
}

.custom-label {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
}
</style>
