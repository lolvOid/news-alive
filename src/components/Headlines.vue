<template>
   <HeadlineCard :data="data"/>
</template>

<script>
import HeadlineCard from './HeadlineCard.vue';
export default {
  name: "Headlines",
  components:{HeadlineCard},
  props: ['data'],
  data() {
    return {
     
    }
  }

}
</script>