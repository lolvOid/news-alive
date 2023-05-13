<template>
 
  <v-main class="mt-0">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" lg="8" sm="12" xs="12" xl="5">
          <v-card class="mx-auto rounded-0" max-width="100%" flat>
            <v-container>
              <div class="text-h6 mb-1" v-if="article">{{ article.title }}</div>
              <div class="text-overline mb-1" v-if="article">
                {{ formatDate(article.publishedAt) }} |
                {{ article.source.name }}
              </div>

              <v-img
                class="align-end text-white"
                height="auto"
                v-if="article"
                :src="article.urlToImage"
                cover
              >
              </v-img>

              <v-card-subtitle class="mt-4 text-wrap" v-if="article">
                {{ article.description }}
              </v-card-subtitle>

              <v-card-text>
                <div class="text-wrap" v-if="article">
                  {{
                    article.content != null
                      ? article.content.substring(0, 200)
                      : ''
                  }}
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="black"
                  v-if="article"
                  :href="article.url"
                  target="_blank"
                >
                  Read More
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'Details',

  data() {
    return {
      rules: [(v) => v.length <= 255 || 'Max 255 characters'],
      value: 'Title',
      dialog: false,
    }
  },
  computed: {
    ...mapGetters(['getHeadline']),
    article() {
      return this.getHeadline(this.getId)
    },
    getId() {
      return parseInt(this.$route.params.id)
    },
  },
  
  methods: {
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY-HH:MM A')
    },
  },
}
</script>

<style type="css"></style>
