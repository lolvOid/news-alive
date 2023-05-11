<template>

  <v-app id="app">
    
    
      <NavBar/>
      <v-main class="mt-2">  
        <router-view />
      </v-main>
   
  
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  name: 'App',
  components:{
      NavBar
  },
  data: () => ({
    
  }),
}
</script>
