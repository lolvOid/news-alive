<template>
  <v-toolbar
    flat
    color="white"
    fixed
    density="comfortable"
    elevate-on-scroll
   
  >
    <v-btn
      icon="mdi:mdi-chevron-left"
      class="hidden-xs-only"
      @click="$router.back()"
    >
    </v-btn>

    <v-toolbar-title v-if="article">{{ article.title }}</v-toolbar-title>
    <!-- <v-btn class="hidden-xs-only"> Edit </v-btn> -->
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      width="500px"
      persistent
    >
      <template v-slot:activator="{ props }">
        <v-btn class="hidden-xs-only" color="black" v-bind="props"> Edit</v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h6">Edit Title</span>
        </v-card-title>
        <v-card-text style="padding: 0 !important">
          <v-container>
            <v-textarea
            v-if="article"
              counter
              placeholder=" "
              :rules="rules"
              :model-value='article.title'
              variant="filled"
              auto-grow
              rows="2"
              row-height="25"
              shaped
            ></v-textarea>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="black" variant="text" @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <v-spacer></v-spacer> -->
  </v-toolbar>
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
