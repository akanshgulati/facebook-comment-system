<template>
  <img :src="url" alt="" class="user-icon"
       :class="{'user-icon--small': size === 'small', 'user-icon--medium': size !== 'small'}">
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    url: {
      required: true,
      type: String,
    },
    size: {
      type: String,
      default: 'small',
    },
  },
};
</script>
<style scoped>
  img.user-icon {
    border-radius: 50%;
  }

  img.user-icon--medium {
    height: 40px;
    width: 40px;
  }

  img.user-icon--small {
    height: 30px;
    width: 30px;
  }
</style>
