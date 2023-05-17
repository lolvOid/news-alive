<template>
  <v-bottom-navigation
    :elevation="1"
    grow
    height="85"
    flat
    v-model="toggle"
    active
    mandatory
  >
    <!-- Home Button -->
    <v-btn
      :ripple="false"
      @click=";(toggle = 'home'), (expandList = false), (expandHistory = false)"
      value="home"
      variant="plain"
      :to="{ name: 'home' }"
      style="opacity: 1"
    >
      <v-col class="shrink">
        <v-row align="center" style="position: relative" justify="center">
          <!-- Home Button Badge -->
          <v-scale-transition>
            <v-sheet
              color="black"
              v-if="homeView"
              rounded="pill"
              width="64"
              height="32"
              absolute
              class="text-center mx-auto"
              style="position: absolute"
            >
            </v-sheet>
          </v-scale-transition>
          <!-- Home Button Icon -->
          <v-icon
            style="font-size: 24px"
            icon="mdi:mdi-home"
            :color="homeView ? 'white' : 'grey-darken-2'"
          ></v-icon>
        </v-row>
      </v-col>
      <!-- Home Button Text -->
      <div class="mt-1 text-caption font-weight-bold">Home</div>
    </v-btn>

    <!-- Discover Button -->
    <v-btn
      :ripple="false"
      @click="
        ;(toggle = 'home.discover'), (expandHome = false), (expandList = false)
      "
      value="home.discover"
      :to="{ name: 'home.discover' }"
      variant="plain"
      style="opacity: 1"
    >
      <v-col class="shrink">
        <v-row align="center" style="position: relative" justify="center">
          <!-- Discover Button Badge -->
          <v-scale-transition>
            <v-sheet
              color="black"
              v-if="exploreView"
              rounded="pill"
              width="64"
              height="32"
              absolute
              class="text-center mx-auto"
              style="position: absolute"
            >
            </v-sheet>
          </v-scale-transition>
          <!-- Discover Button Icon -->
          <v-icon
            style="font-size: 24px"
            icon="mdi:mdi-newspaper-variant-multiple"
            :color="exploreView ? 'white' : 'grey-darken-2'"
          >
          </v-icon>
        </v-row>
      </v-col>
      <!-- Discover Button Text -->
      <div class="mt-1 text-caption font-weight-bold">Discover</div>
    </v-btn>

    <!-- History Button -->
    <v-btn
      :ripple="false"
      @click="
        ;(toggle = 'home.history'),
          (expandHome = false),
          (expandHistory = false)
      "
      value="home.history"
      :to="{ name: 'home.history' }"
      variant="plain"
      style="opacity: 1"
    >
      <v-col class="shrink">
        <v-row align="center" style="position: relative" justify="center">
          <!-- History Button Badge -->
          <v-scale-transition>
            <v-sheet
              color="black"
              v-if="historyView"
              rounded="pill"
              width="64"
              height="32"
              absolute
              class="text-center mx-auto"
              style="position: absolute"
            >
            </v-sheet>
          </v-scale-transition>
          <!-- History Button Icon -->
          <v-icon
            style="font-size: 24px"
            icon="mdi:mdi-history"
            :color="historyView ? 'white' : 'grey-darken-2'"
          ></v-icon>
        </v-row>
      </v-col>
      <!-- History Button Text -->
      <div class="mt-1 text-caption font-weight-bold">History</div>
    </v-btn>

    <!-- Search Button -->
    <v-btn
      :ripple="false"
      @click="
        ;(toggle = 'home.search'), (expandHome = false), (expandHistory = false)
      "
      value="home.search"
      :to="{ name: 'home.search' }"
      variant="plain"
      style="opacity: 1"
    >
      <v-col class="shrink">
        <v-row align="center" style="position: relative" justify="center">
          <!-- Search Button Badge -->
          <v-scale-transition>
            <v-sheet
              color="black"
              v-if="searchView"
              rounded="pill"
              width="64"
              height="32"
              absolute
              class="text-center mx-auto"
              style="position: absolute"
            >
            </v-sheet>
          </v-scale-transition>
          <!-- Search Button Icon -->
          <v-icon
            style="font-size: 24px"
            icon="mdi:mdi-magnify"
            :color="searchView ? 'white' : 'grey-darken-2'"
          ></v-icon>
        </v-row>
      </v-col>
      <!-- Search Button Text -->
      <div class="mt-1 text-caption font-weight-bold">Search</div>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'BottomTabNavigation',
  props: ['homeView', 'exploreView', 'historyView', 'searchView'],
  data() {
    return {
      expandHome: this.homeView,
      expandList: this.exploreView,
      expandHistory: this.historyView,
      expandSearch: this.searchView,
      toggle: this.$route.name,
    }
  },
  mounted() {
    this.toggle = this.$route.name
  },
  watch: {
    toggle(v) {
      this.expandHome = v === 'home'
      this.expandList = v === 'home.discover'
      this.expandHistory = v === 'home.history'
      this.expandSearch = v === 'home.search'
    },
  },
}
</script>
