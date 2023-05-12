<template>
  <v-app-bar color="#fff" flat app density="comfortable" elevate-on-scroll fixed>

<v-app-bar-title class="font-weight-bold">

  ALIVE
</v-app-bar-title>
  
    <v-col   :style="{width: searchBoxClosed ? '65%' : '100%', flex: searchBoxClosed? '0 0 65%':'0 0 100%'}"  sm="8" md="4" lg="4"  >
   
      
      <v-row wrap class="justify-end align-center mr-2">
     
      </v-row>
    </v-col>
   




  </v-app-bar>
</template>
<style type="css">
.v-input__details{
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
  name: 'Toolbar',
  data() {
    return {

      searchText: null,
      searchBoxClosed: true,
      items: sources,
    }
  },
  methods:{
    formatIcon(url=''){
      const origin = new URL(url).origin;
       
      return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=128`;
    }
  }
}
</script>
