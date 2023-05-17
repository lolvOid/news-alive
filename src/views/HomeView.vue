<template>
  <v-main>
    <v-card class="d-flex justify-center mt-4 align-center" flat>
      <v-container class="ml-auto mr-auto pt-0 mt-0">
        <v-row align="center" justify="center">
          <v-col cols="12" lg="8" xl="8">
            <Headlines :data="articles" :highlightText="highlightText" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-main>
</template>

<script>
import Headlines from '../components/Headlines.vue'

export default {
  name: 'HomeView',
  components: {
    Headlines,
  },
  props: ['articles', 'highlightText'],
}
</script>
