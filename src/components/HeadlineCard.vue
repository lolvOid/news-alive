<template>

    <v-col v-for="v in data" cols="12" md="4" sm="6" lg="3" xl="2">
      <v-card border class="rounded-0 mb-2 fill-height" density="comfortable" :prepend-avatar="formatIcon(v.url)"
        :title="v.title" variant="text">
        <v-img :src="v.urlToImage" height="128" cover></v-img>
        <template v-slot:subtitle>
          <v-icon icon="mdi:mdi-clock-outline"></v-icon>
          {{ formatDuration(v.publishedAt) }}
        </template>
        <v-card-text>
          {{ v.description ? v.description.substring(0, 100) + '... ' : '' }}
          <router-link :to="{
            name:'article.show',
            params:{
              id:v.id,
            }
          }" custom v-slot="{ navigate }">
            <button role="link" class="font-weight-bold"   @click="navigate">
              Read More
            </button>
          </router-link>

        </v-card-text>

        <!-- <template v-slot:actions>
          <v-btn  class="floating" color="black" variant="text">Read More</v-btn>
         
        </template> -->
      </v-card>
    </v-col>

</template>

<script>
import moment from 'moment'
export default {
  name: 'HeadlineCard',
  props: ['data'],
  

  data() {
    return {}
  },
  methods: {
  
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    formatTime(time) {
      return moment(time).format('HH:MMa')
    },
    formatDuration(date) {
      const now = moment()
      const past = moment(date)
      const diff = moment.duration(now.diff(past))
      const minDuration = diff.asMinutes().toFixed(0)
      const dayDuration = diff.asDays().toFixed(0)
      const timeDuration = diff.asHours().toFixed(0)
      const yearDuration = diff.asYears().toFixed(0)
      const monthDuration = diff.asMonths().toFixed(0)
      let format = ''
      if (minDuration >= 60) {
        if (timeDuration >= 24) {
          format = dayDuration + 'd ago'
          if (dayDuration > 31) {
            format = monthDuration + 'mth ago'
            if (monthDuration > 12) {
              format = yearDuration + 'y ago'
            }
          }
        }
      } else {
        format = minDuration + 'm ago'
      }
      return format
    },
    formatIcon(url = '') {
 
      const origin = new URL(url).origin

      return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=128`
    },
  },
}
</script>
