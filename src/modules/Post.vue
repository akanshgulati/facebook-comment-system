<template>
  <div class="post">


  </div>
</template>
<script>


  export default {
    data() {
      return {
        url: "static/faces/2.jpg"
      };
    },
    components: {
      UserIcon,
      PostMeta
    }
  };
</script>
<style>
  .post__info {
    padding: 0 20px;
  }

  .post__info__content {
    margin-top: 10px;
    margin-left: 60px;
  }
</style>
