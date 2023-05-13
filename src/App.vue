<template>
  <v-app id="app">
   
      <router-view    :key="$route.path" />

  </v-app>
</template>

<script>


export default {
  name: 'App',
  
}
</script>
