<template>
 
    <NavBar />
    <v-main class="mt-2">

      <v-container class="ml-auto  mr-auto pt-0 mt-0">
        <Headlines :data=headlinesData />
      </v-container>

    </v-main>

</template>

<script>
import NavBar from '../components/NavBar.vue';
import Headlines from '../components/Headlines.vue';
import headlines from "../defaults/headlines";
export default ({
  name: 'HomeView',
  components: {
    Headlines, NavBar
  },
  data() {
    return {
      headlinesData: headlines
    }
  }

})
</script>
