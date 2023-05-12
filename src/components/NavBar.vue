<template>
  <v-app-bar color="#fff" flat app density="comfortable" elevate-on-scroll fixed>
    <v-app-bar-title class="font-weight-bold"> ALIVE </v-app-bar-title>

    <v-col :style="{
      width: searchBoxClosed ? '65%' : '100%',
      flex: searchBoxClosed ? '0 0 65%' : '0 0 100%',
    }" sm="8" md="4" lg="4">
      <v-row wrap class="justify-end align-center mr-2">
        <v-text-field v-model.trim="searchText" dense filled rounded="0" clearable placeholder="Search"
          prepend-inner-icon="mdi:mdi-magnify" class="pt-0 mb-0 shrink expanding-search" flat
          :class="{ closed: searchBoxClosed && !searchText }" @keyup.enter="" v-model="searchText"
          @focus="searchBoxClosed = false" @blur="searchBoxClosed = true" absolute></v-text-field>

        <v-dialog v-model="dialogFilter" scrollable width="auto">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi:mdi-filter-variant" v-bind="props">
            </v-btn>
          </template>
          <v-card>

            <v-toolbar color="white">
              
              <v-toolbar-title>Filters</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn variant="text" icon="mdi:mdi-close" @click="dialogFilter = false">
                  
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text style="height: 350px;">
              <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" :value="index"
                  :prepend-avatar="formatIcon(item.url)" @click="dialogFilter = false">
                  <v-list-item-title> {{ item.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>

          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogHistory" scrollable fullscreen
      :scrim="false">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi:mdi-history" v-bind="props">
            </v-btn>
          </template>
          <v-card>

            <v-toolbar color="white">
              <v-btn icon="mdi:mdi-chevron-left" dark @click="dialogHistory = false">
                
              </v-btn>
              <v-toolbar-title>History</v-toolbar-title>
              <v-spacer></v-spacer>
             
            </v-toolbar>
            <!-- <v-card-title>

              <v-row class="pa-3 d-flex align-center justify-space-between ">
                <div><v-icon icon="mdi:mdi-history"></v-icon> &nbsp; <span class="text-h6">History</span></div>
                <v-btn icon="mdi:mdi-close" flat variant="text" @click="dialogHistory = false"></v-btn>
              </v-row>
            </v-card-title> -->
            <v-divider></v-divider>
            <v-card-text style="height: 350px;">

              <v-col cols="12" v-for="(item, index) in items" :key="index">
                <v-card variant="outlined" flat class="rounded-0">
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <v-avatar class="ma-3" size="100" rounded="0">
                      <v-img src="https://dummyimage.com/100x100/dedede/000.jpg?text=Sample"></v-img>
                    </v-avatar>
                    <div>
                      <v-card-title class="text-h5">
                        Headline
                      </v-card-title>
                      <v-card-subtitle>Foster the People</v-card-subtitle>
                      <v-card-actions>
                        <v-btn variant="outlined" rounded="0">
                          Read
                        </v-btn>
                      </v-card-actions>
                    </div>


                  </div>
                </v-card>
              </v-col>

            </v-card-text>

          </v-card>
        </v-dialog>

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
