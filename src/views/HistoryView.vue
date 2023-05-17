<template>
  <v-main>
    <v-card class="d-flex justify-center mt-4 align-center" flat>
      <v-container class="ml-auto mr-auto pt-0 mt-0">
        <v-row align="start" justify="center">
          <v-col cols="12" lg="6" md="8" sm="10">
            <!-- <div class="pb-3">
              <div class="text-center" v-if="allVisited.length">{{ allVisited.length }} recently viewed.</div>
              <div class="text-center" v-else>No activity found.</div>
            </div> -->

            <v-col cols="12" v-for="v in allVisited" :key="v.id">
              <v-card v-if="v" rounded="lg" elevation="1" variant="elevated">
                <div class="d-flex align-stretch justify-space-between">
                  <v-col cols="6" sm="8" md="8" lg="8" xl="8">
                    <!-- Display article title -->
                    <v-card-title class="pa-0 text-subtitle">
                      {{ v.title }}...
                    </v-card-title>

                    <v-card-text class="text-caption pa-0" v-if="v.description"
                      >{{ v.description.substring(0, 60) }}...</v-card-text
                    >
                    <!-- Display truncated article description -->

                    <v-card-actions class="pa-0">
                      <v-btn
                        rounded="pill"
                        size="small"
                        variant="outlined"
                        :to="{
                          name: 'article.show',
                          params: {
                            id: v.id,
                          },
                        }"
                      >
                        <!-- Button to navigate to the article again -->
                        Read again
                      </v-btn>
                    </v-card-actions>
                  </v-col>

                  <div class="pa-2">
                    <!-- Display article image -->
                    <v-avatar size="150" rounded="0">
                      <v-img :src="v.urlToImage" cover></v-img>
                    </v-avatar>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HistoryView',
  // Method to handle deactivating the view
  methods: {
    onDeactivate() {
      this.dialog = false
      this.$emit('dialogClosed')
      this.$router.push('/')
    },
  },
  computed: {
    ...mapGetters(['getAllVisited']),
    // Retrieve all visited articles and sort them by the updatedAt timestamp in descending order

    allVisited() {
      const sorted = this.getAllVisited.sort(
        (a, b) => b.updatedAt - a.updatedAt
      )
      return sorted
    },
  },
}
</script>
