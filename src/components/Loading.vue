<template>
  <svg width="200px" height="200px" viewBox="0 0 100 100" v-if="!textOnly">
    <circle cx="50" cy="50" fill="none" stroke="#ff7133" stroke-width="3" r="10"
            stroke-dasharray="47.12388980384689 17.707963267948966"
            transform="rotate(347.9 50.0001 50)">
      <animateTransform attributeName="transform" type="rotate"
                        calcMode="linear" values="0 50 50;360 50 50"
                        keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite">
      </animateTransform>
    </circle>
  </svg>
  <div v-else class="loading__text">Loading...</div>
</template>
<script>
export default {
  props: ['textOnly'],
};
</script>
<style>
  .loading__text {
    color: #929292;
    font-size: 10px;
  }
</style>
