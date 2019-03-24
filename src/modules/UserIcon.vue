<template>
  <img :src="url" alt="">
</template>
<script>
  export default {
    data(){
      return {}
    },
    props: {
      url: {
        required: true,
        type: String
      }
    }
  }
</script>
<style scoped>
  img {
    max-height: 40px;
    max-width: 40px;
    border-radius: 50%;
  }
</style>
