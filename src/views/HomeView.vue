<template>
 
  <v-main class="mt-4">
    <v-container class="ml-auto mr-auto pt-0 mt-0">
      <Headlines :data="headlines"  />
      
    </v-container>
  </v-main>
</template>

<script>

import Headlines from '../components/Headlines.vue'


export default {
  name: 'HomeView',
  components: {
    Headlines
  },
  props:['headlines']
}
</script>
