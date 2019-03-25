<template>
  <div style="background-color: white;">
    <div class="timeline-item">
      <div class="timeline-item__content-type">{{content.depth === 1 ? 'Post': 'Comment'}}</div>
      <PostMeta :meta="content"></PostMeta>
      <div class="timeline-item__description" v-html="trim(content.content, 150)"></div>
  </div>
  </div>
</template>
<script>
import PostMeta from './PostMeta';
import { trim } from '../utils/CommonUtils';

export default {
  data() {
    return {

    };
  },
  methods: {
    trim,
  },
  name: 'TimelineItem',
  components: { PostMeta },
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style>
  .timeline-item {
    border-bottom: 1px solid #e0e4ea;
    padding: 20px;
  }
  .timeline-item__description {
    margin-left: 60px;
  }
  .timeline-item__content-type {
    font-size: 10px;
    color: #8a8a8a;
    font-weight: 900;
    margin-bottom: 10px;
  }
</style>
