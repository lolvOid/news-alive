<template>
  <v-app-bar  color="#fff" flat density="comfortable" fixed >
    <template v-slot:title>
      <router-link
        to="/"
        class="text-decoration-none font-weight-bold text-black"
      >
        ALIVE
      </router-link>
    </template>

    <v-spacer></v-spacer>
    <v-btn icon="mdi:mdi-magnify" @click="$emit('onSearchClicked',true)"></v-btn>
    <v-dialog v-model="dialogFilter" scrollable width="auto">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi:mdi-filter-variant" v-bind="props"> </v-btn>
      </template>
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

    <v-dialog v-model="dialogHistory" scrollable fullscreen :scrim="false">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi:mdi-history" v-bind="props"> </v-btn>
      </template>
      <v-card>
        <v-toolbar color="white">
          <v-btn
            icon="mdi:mdi-chevron-left"
            dark
            @click="dialogHistory = false"
          >
          </v-btn>
          <v-toolbar-title>History</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-divider></v-divider>
        <v-card-text style="height: 350px">
          <v-row align="center" justify="center">
            <v-col cols="12" lg="5" md="8" sm="10">
              <v-row>
                <v-col cols="12">
                  <v-card variant="outlined" rounded="0">
                    <div class="d-flex flex-no-wrap justify-start">
                      <v-avatar class="ma-3" size="125" rounded="0">
                        <v-img src="https://dummyimage.com/100x100.jpg"></v-img>
                      </v-avatar>
                      <div>
                        <v-card-title class="text-h5">
                          Excepteur ipsum consequat incididunt
                        </v-card-title>

                        <v-card-subtitle>
                          Excepteur ipsum consequat incididunt</v-card-subtitle
                        >

                        <v-card-actions>
                          <v-btn
                            class="ms-2"
                            variant="outlined"
                            rounded="0"
                            size="small"
                          >
                            Read
                          </v-btn>
                        </v-card-actions>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

   
  </v-app-bar>
 
</template>
<style type="css">


</style>
<script>
export default {
  name: 'NavBar',
  emits: ['onfilter', 'onSearchClicked'],
  props: ['sources'],
  data() {
    return {

      items: this.sources,
      dialogHistory: false,
      dialogFilter: false,
      
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
