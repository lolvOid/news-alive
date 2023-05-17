<template>
  <v-main class="mt-0">
    <v-container>
      <v-row align="start" justify="center">
        <v-col cols="12" lg="8" sm="12" xs="12" xl="8">
          <v-alert
            color="orange"
            variant="outlined"
            type="warning"
            title="Title is so long!"
            v-if="checkTitle()"
            text="Article title is more than 255 characters long. Please edit the title."
          ></v-alert>

          <v-card
            class="mx-auto rounded-0"
            max-width="100%"
            flat
            v-if="article"
          >
            <v-container>
              <v-card-title class="text-h6 mb-1"
                >{{ article.title }}
              </v-card-title>

              <v-card-text class="text-caption mb-1">
                {{ formatDate(article.publishedAt) }} |
                <strong>{{ article.source.name }}</strong> by
                <span v-html="processedContent(article.author)"></span>
              </v-card-text>

              <v-img
                class="align-end text-white"
                height="auto"
                :src="
                  article.urlToImage ? article.urlToImage : placeholderImage
                "
                :lazy-src="
                  article.urlToImage ? article.urlToImage : placeholderImage
                "
                cover
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                      color="grey-lighten-4"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </template>
              </v-img>

              <v-card-subtitle
                class="mt-4 text-wrap"
                v-html="processedContent(article.description)"
              >
              </v-card-subtitle>

              <v-card-text>
                <div
                  class="text-wrap"
                  v-html="processedContent(article.content)"
                ></div>
              </v-card-text>

              <v-card-actions>
                <v-card-actions>
                  <v-btn
                    color="black"
                    variant="outlined"
                    :href="article.url"
                    target="_blank"
                  >
                    Read More
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="outlined"
                    @click=";(editDialog = true), setId(article.id)"
                    >Edit Title</v-btn
                  >
                </v-card-actions>
              </v-card-actions>
            </v-container>
          </v-card>
          <v-card
            class="mx-auto rounded-0"
            max-width="100%"
            flat
            v-else-if="visited"
          >
            <v-container>
              <v-card-title class="text-h6 text-wrap mb-1"
                >{{ visited.title }}
              </v-card-title>

              <v-card-text class="text-caption mb-1">
                {{ formatDate(visited.publishedAt) }} |
                <strong>{{ visited.source.name }}</strong> by
                <span v-html="processedContent(visited.author)"></span>
              </v-card-text>

              <v-img
                class="align-end text-white"
                height="auto"
                :src="
                  visited.urlToImage ? visited.urlToImage : placeholderImage
                "
                :lazy-src="
                  visited.urlToImage ? visited.urlToImage : placeholderImage
                "
                cover
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                      color="grey-lighten-4"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </template>
              </v-img>

              <v-card-subtitle
                class="mt-4 text-wrap"
                v-html="processedContent(visited.description)"
              >
              </v-card-subtitle>

              <v-card-text>
                <div
                  class="text-wrap"
                  v-html="processedContent(visited.content)"
                ></div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="black"
                  variant="outlined"
                  :href="visited.url"
                  target="_blank"
                >
                  Read More
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  variant="outlined"
                  @click=";(editDialog = true), setId(visited.id)"
                  >Edit Title</v-btn
                >
              </v-card-actions>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

  <EditTitleDialog
    :id="currentHeadlineId"
    v-model="editDialog"
    @dialogClosed="editDialog = false"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import HeadlineCard from '../components/HeadlineCard.vue'
import EditTitleDialog from '../components/EditTitleDialog.vue'

export default {
  name: 'Details',
  components: { HeadlineCard, EditTitleDialog },
  data() {
    return {
      rules: [(v) => v.length <= 255 || 'Max 255 characters'],
      value: 'Title',
      dialog: false,
      editDialog: false,
      currentHeadlineId: '',
      placeholderImage:
        'https://dummyimage.com/400x300.jpg?text=Image%20Not%20Available',
    }
  },
  computed: {
    ...mapGetters(['getHeadline', 'getVisited']),
    article() {
      return this.getHeadline(this.getId)
    },
    visited() {
      return this.getVisited(this.getId)
    },
    getId() {
      return this.$route.params.id
    },
  },

  mounted() {
    if (this.article) this.createVisited(this.article)
  },
  methods: {
    ...mapActions(['createVisited']),
    setId(value) {
      this.currentHeadlineId = value
    },
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY-HH:MM A')
    },
    processedContent(content) {
      return content
        ? content.replace(/<a href="(.*?)">(.*?)<\/a>/g, '<a :href="$1">$2</a>')
        : ''
    },
    checkTitle() {
      const headline = this.article || this.visited
      if (headline) {
        if (headline.title.length > 255) {
          return true
        }
      }
      return false
    },
  },
}
</script>
