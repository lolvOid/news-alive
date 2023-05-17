<template>
  <!-- Render a grid layout -->
  <v-row
    class="fill-height mb-5"
    justify="start"
    align="stretch"
    id="container"
  >
    <!-- Loop through each item in the 'data' array -->
    <v-col v-for="v in data" cols="12" md="6" sm="6" lg="4" xl="3">
      <!-- Instantiate the 'HeadlineCard' component and pass data as props -->
      <HeadlineCard :data="v" :highlightText="highlightText" />
    </v-col>
  </v-row>
</template>

<script>
import HeadlineCard from './HeadlineCard.vue'

export default {
  name: 'Headlines',
  components: { HeadlineCard },

  props: ['data', 'highlightText'],
}
</script>
