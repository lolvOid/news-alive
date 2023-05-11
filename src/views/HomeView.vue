<template>
  <v-layout>
    <v-container class="ml-auto  mr-auto pt-0 mt-0">
      <Headlines :data=headlinesData />
    </v-container>
  </v-layout>
</template>

<script>
import Headlines from '../components/Headlines.vue';
import headlines from "../defaults/headlines";
export default ({
  name: 'HomeView',
  components: {
    Headlines
  },
  data(){
    return {
      headlinesData:headlines
    }
  }

})
</script>
