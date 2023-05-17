<template>
  <div class="loading">
    <v-row align="center" justify="center">
      <v-progress-circular :size="40" color="black" indeterminate>
      </v-progress-circular>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'Spinner',
}
</script>
<style scoped>
.loading {
  position: fixed;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 1001;
  margin: 0;
  padding: 0;
  background-color: white;
}
</style>
