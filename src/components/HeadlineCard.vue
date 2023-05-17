<template>
  <v-card
    v-if="data"
    class="rounded-0 mb-2 fill-height"
    density="compact"
    variant="elevated"
    elevation="2"
    rounded="lg"
  >
    <v-img
      :lazy-src="data.urlToImage ? data.urlToImage : placeholderImage"
      class="rounded-lg"
      :src="data.urlToImage ? data.urlToImage : placeholderImage"
      height="200"
      cover
      gradient="to top, rgba(0,0,0,0.5), rgba(0,0,0,0)"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>
      <v-toolbar color="rgba(0, 0, 0, 0)">
        <template v-slot:prepend>
          <router-link
            class="text-decoration-none text-black"
            :to="{
              name: 'home.search',
              query: {
                sources: data.source.id ? data.source.id : '',
              },
            }"
          >
            <v-avatar size="36">
              <img :src="data.icon" height="36" />
            </v-avatar>
          </router-link>
        </template>

        <template v-slot:append>
          <v-btn icon variant="text" color="white">
            <v-icon icon="mdi:mdi-dots-vertical"></v-icon>

            <v-menu activator="parent">
              <v-list rounded="xl">
                <v-list-item
                  value="detail"
                  key="detail"
                  prepend-icon="mdi:mdi-page-next"
                  :to="{
                    name: 'article.show',
                    params: {
                      id: data.id,
                    },
                  }"
                >
                  Read
                </v-list-item>
                <v-list-item
                  value="edit"
                  key="edit"
                  prepend-icon="mdi:mdi-pencil-box"
                  @click=";(editDialog = true), setId(data.id)"
                >
                  <template v-slot:append v-if="data.title.length > 255">
                    <v-icon color="orange" icon="mdi:mdi-alert-box"></v-icon>
                  </template>
                  Edit Title
                </v-list-item>

                <v-list-item
                  value="goToSource"
                  key="goToSource"
                  prepend-icon="mdi:mdi-link-variant"
                  :href="data.url"
                  target="_blank"
                >
                  Original Source
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </template>
      </v-toolbar>
    </v-img>

    <v-card-title
      v-if="highlightText"
      v-html="
        formatHighlightText(processedContent(data.title).substring(0, 30))
      "
      class="pb-0 overflow-hidden"
    >
    </v-card-title>

    <v-card-title v-else class="overflow-hidden pb-0">
      <router-link
        class="text-decoration-none text-black"
        :to="{
          name: 'article.show',
          params: {
            id: data.id,
          },
        }"
      >
        <v-tooltip :text="data.title" location="top">
          <template v-slot:activator="{ props }">
            <span v-bind="props" class="overflow-hidden pb-0">
              {{ processedContent(data.title).substring(0, 50) }}...</span
            >
          </template>
        </v-tooltip>
      </router-link>
    </v-card-title>

    <v-card-text class="text-caption pb-0">
      <v-icon icon="mdi:mdi-clock-outline"></v-icon>
      <v-tooltip location="top" :text="formatDate(data.publishedAt)">
        <template v-slot:activator="{ props }">
          <span v-bind="props"> {{ formatDuration(data.publishedAt) }} |</span>
        </template>
      </v-tooltip>
      <v-chip
        class="ma-2"
        size="small"
        :to="{
          name: 'home.search',
          query: {
            sources: data.source.id,
          },
        }"
      >
        {{ data.source.name }}
      </v-chip>
    </v-card-text>

    <v-card-text>
      <span
        v-if="highlightText"
        v-html="
          formatHighlightText(
            processedContent(data.description).substring(0, 50)
          )
        "
      ></span>
      <span
        v-else
        v-html="processedContent(data.description).substring(0, 50) + '...'"
      >
      </span>
      <router-link
        :to="{
          name: 'article.show',
          params: {
            id: data.id,
          },
        }"
        custom
        v-slot="{ navigate }"
      >
        <button role="link" class="font-weight-bold" @click="navigate">
          See More
        </button>
      </router-link>
    </v-card-text>
  </v-card>

  <EditTitleDialog
    :id="currentHeadlineId"
    v-model="editDialog"
    @dialogClosed="editDialog = false"
  />
</template>

<script>
import moment from 'moment'
import EditTitleDialog from './EditTitleDialog.vue'

export default {
  name: 'HeadlineCard',
  props: {
    data: null,
    highlightText: {
      type: String,
      default: '',
    },
  },

  components: { EditTitleDialog },
  data() {
    return {
      editDialog: false,
      currentHeadlineId: '',
      placeholderImage:
        'https://dummyimage.com/400x300.jpg?text=Image%20Not%20Available',
    }
  },
  methods: {
    setId(value) {
      this.currentHeadlineId = value
    },
    formatHighlightText(value) {
      if (value) {
        return value.replace(
          new RegExp(this.escapeRegExp(this.highlightText), 'gim'),
          (match) => `<span class='highlight'>${match}</span>`
        )
      }
      return ''
    },
    escapeRegExp(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
    },
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    formatTime(time) {
      return moment(time).format('HH:MMa')
    },
    processedContent(content) {
      return content
        ? content.replace(/<a href="(.*?)">(.*?)<\/a>/g, '<a :href="$1">$2</a>')
        : ''
    },
    formatDuration(date) {
      const diff = moment.duration(moment().diff(moment(date)))
      const duration =
        diff.asMinutes() < 60
          ? `${diff.asMinutes().toFixed(0)}m`
          : diff.asHours() < 24
          ? `${diff.asHours().toFixed(0)}h`
          : diff.asDays() < 31
          ? `${diff.asDays().toFixed(0)}d`
          : diff.asMonths() < 12
          ? `${diff.asMonths().toFixed(0)}mo`
          : `${diff.asYears().toFixed(0)}y`
      return `${duration} ago`
    },
  },
}
</script>

<style type="css">
.highlight {
  background-color: yellow;
}
</style>
