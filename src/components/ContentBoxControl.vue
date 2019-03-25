<template>
  <div class="control-box">
    <div>
      <Link :value="depth === 1 ? 'Comment': 'Reply'" @click="toggle" type="primary"/>
      <Link value="Delete" @click="deleteChild" class="control-box__delete" v-show="showDelete"/>
    </div>
    <Link :value="secondaryText" @click="toggle" type="secondary"/>
  </div>
</template>
<script>
import { getPlural } from '../utils/CommonUtils';

import Link from './Link';

export default {
  methods: {
    toggle() {
      this.$emit('toggleChild');
    },
    getPlural,
    deleteChild() {
      this.$emit('deleteChild');
    },
  },
  props: {
    depth: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    showDelete: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Link,
  },
  computed: {
    secondaryText() {
      // for depth > 2 we are not storing nested replies
      if (this.depth > 2) {
        return '';
      }
      return `${this.count} ${this.depth === 1 ? getPlural('Comment', 'Comments', this.count) : getPlural('Reply',
        'Replies', this.count)}`;
    },
  },
};
</script>
<style>

  .control-box {
    display: flex;
    justify-content: space-between;
  }

  a.control-box__link-left{
    color: #ff7133;
  }

  a.control-box__link-left:visited {
    color: #ff7133;
  }

  .control-box__link-right {
    margin-left: auto;
  }
  .control-box__delete {
    margin-left: 10px;
  }
</style>
