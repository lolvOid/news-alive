<template>
  <NavBar :sources="sources" @onfilter="onFilter" @onsearch="onSearch" />
  <v-main class="mt-4">
    <v-container class="ml-auto mr-auto pt-0 mt-0">
      <Headlines :data="headlines"  @ondetails="(v)=>$emit('ondetails',v)"/>
      
    </v-container>
  </v-main>
</template>

<script>

import Headlines from '../components/Headlines.vue'
import NavBar from '../components/NavBar.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'HomeView',
  components: {
    Headlines,NavBar,
  },
 
  data() {
    return {
      filterId:"",
      query:"",
   
    }
  },
  computed: {
    ...mapGetters([
      'allHeadlines',
      'allSources']),
    headlines() {
      if(this.filterId){
        return this.allHeadlines.filter((h)=>h.source.id===this.filterId)
      }
      return this.allHeadlines;
    },
    sources(){
      return this.allSources;
    }
   
  },
  methods:{
      ...mapActions(['fetchHeadlines','fetchHeadlinesBySearch']),
      onFilter(value){
        this.filterId = value;
      
      },
      
      onSearch(value){
        
        this.query = value;
        this.filterId = "";
        this.fetchHeadlinesBySearch( this.query );
      
      }
  },

  mounted() {
    this.hidden= false;
      this.fetchHeadlines();
   
    
  },
}
</script>
