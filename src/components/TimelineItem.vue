<template>
  <div class="timeline-item">
    <div class="timeline-item__content-type">
      <span>{{content.depth === 1 ? 'Post': 'Comment'}}</span>
      <span class="timeline-item__content-type--deleted" v-show="content.isDeleted">Deleted</span>
    </div>
    <PostMeta :meta="content"></PostMeta>
    <div class="timeline-item__description" v-html="trim(content.content, 150)"></div>
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
    display: flex;
    justify-content: space-between;
  }
  .timeline-item__content-type--deleted {
    color: #e03032;
  }
</style>
