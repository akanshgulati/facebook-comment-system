<template>
  <div v-if="comments">
    <div v-for="comment in comments" :key="comment.id" v-if="comment">
      <Comment :comment="comment" :depth="depth + 1"></Comment>
    </div>
  </div>
</template>
<script>
/* import Comment from '../modules/Comment.vue' */

export default {
  name: 'CommentWrapper',
  components: {
    /* Comment */
  },
  props: ['comments', 'depth'],
};
</script>
