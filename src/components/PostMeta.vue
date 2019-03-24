<template>
  <div class="post__meta">
    <UserIcon :url="url" class="post__meta__icon" size="medium"></UserIcon>
    <div>
      <div class="post__meta__user-name">Akansh Gulati</div>
      <div class="post__meta__time">{{postTime}}</div>
    </div>
  </div>
</template>
<script>
import UserIcon from './UserIcon';
import { getHumanReadableTime } from '../utils/ClockUtils';

export default {
  name: 'PostMeta',
  data() {
    return {
      url: 'static/faces/2.jpg',
      postTime: '',
    };
  },
  components: {
    UserIcon,
  },
  methods: {
    getPostTime(timeStamp) {
      return getHumanReadableTime(timeStamp);
    },
  },
  props: ['meta'],
  beforeMount() {
    this.postTime = this.getPostTime(this.meta.postedOn);
    setInterval(() => {
      this.postTime = this.getPostTime(this.meta.postedOn);
    }, 6000);
  },
};
</script>
<style>
  .post__meta {
    display: flex;
    align-items: center;
  }
  .post__meta__icon {
    margin-right: 20px;
  }
  .post__meta__user-name {
    font-weight: 600;
    font-size: 14px;
    color: #ff7133;
  }
  .post__meta__time {
    font-size: 10px;
    color: #8a8a8a;
  }
</style>
