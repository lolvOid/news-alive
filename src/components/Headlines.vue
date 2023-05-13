<template>
  <v-row class="fill-height mb-5" justify="start" align="stretch" id="container">
    <HeadlineCard :data="data"  />
  </v-row>
</template>

<script>
import HeadlineCard from './HeadlineCard.vue';
export default {
  name: "Headlines",
  components: { HeadlineCard },
  
  props: ['data'],

  methods: {
    
  }

}
</script>