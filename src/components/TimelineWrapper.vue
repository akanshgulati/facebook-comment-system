<template>
  <div class="timeline-wrapper">
    <transition-group v-if="!isLoading" name="list">
      <TimelineItem
        v-for="timelineItem in timelineData"
        :content="timelineItem"
        :key="timelineItem.id"/>
    </transition-group>

    <Loading v-else></Loading>
  </div>
</template>
<script>
import TimelineItem from './TimelineItem';
import Loading from './Loading';
import { GetContents } from '../utils/HttpUtils';

export default {
  name: 'TimelineWrapper',
  data() {
    return {
      timelineData: [],
      isLoading: true,
    };
  },
  mounted() {
    setInterval(() => {
      GetContents(0).then((data) => {
        this.isLoading = false;
        data.sort((a, b) => b.postedOn - a.postedOn);
        this.$set(this, 'timelineData', data);
      });
    }, 200);
  },
  components: {
    TimelineItem,
    Loading,
  },
};
</script>
<style scoped>
  .timeline-wrapper {
    display: flex;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid #e0e4ea;
    padding: 10px;
    background: white;
    min-width: 400px;
    height: 490px;
    overflow-y: auto;
  }
  .list-enter-active, .list-leave-active {
    transition: all 0.5s linear;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    max-height: 0;
    transform: translateY(-30px);
  }
</style>
