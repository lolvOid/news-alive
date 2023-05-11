<template>
  <v-row   class="fill-height " align="stretch" id="container">

    <v-col v-for="v in data" cols="12" md="4" sm="6" lg="2" xl="2">

      <v-card border class=" rounded-0 mb-2 fill-height"  density="comfortable"
        :prepend-avatar="formatIcon(v.url)" :subtitle="formatDate(v.publishedAt)"
        :title="v.title"
        variant="text">
        <v-img :src=v.urlToImage height="128" cover></v-img>

        <v-card-text > 
        
         {{v.description}}
        </v-card-text>

        <template v-slot:actions>
          <v-btn color="black" variant="text">Read More</v-btn>
          <v-btn color="black" variant="text">Edit</v-btn>
        </template>
      </v-card>
    </v-col>

  </v-row>
</template>
 
<script>
import moment from "moment";
export default {
  name: "HeadlineCard",
  props: ['data'],
  data() {
    return {
      
    }
  },
  methods:{
    formatDate(date){
      return moment(date).format("DD/MM/YYYY");
    },
    formatIcon(url=''){
      const origin = new URL(url).origin;
       
      return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=128`;
    }
  }

}
</script>