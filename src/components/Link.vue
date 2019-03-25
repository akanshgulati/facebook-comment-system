<template>
  <a :class="{'primary': type === 'primary', 'secondary': type !== 'primary',
  'small': size === 'small'}"
     @click="onClick">
    {{value}}
  </a>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'secondary',
    },
    value: { type: String, required: true },
    size: {
      type: String,
    },
  },
  methods: {
    onClick($event) {
      this.$emit('click', $event);
    },
  },
};
</script>
<style>
  a {
    cursor: pointer;
  }
  .primary {
    color: #ff7133;
  }
  .primary:visited {
    color: #ff7133;
  }
  .secondary {
    color: #8a8a8a;
  }
  .secondary:visited {
    color: #8a8a8a;
  }
  .small {
    font-size: 10px;
  }
</style>
