<template>
  <div class="posts">
    <transition-group name="list">
      <ContentBox v-for="post in sortedPosts" :content="post" :depth="1" class="post" :key="post.id"></ContentBox>
    </transition-group>
  </div>
</template>

<script>
  import UserIcon from "../modules/UserIcon.vue";
  import PostMeta from "../modules/PostMeta.vue";
  /*import CommentWrapper from './CommentWrapper'*/
  import ContentBox from "../modules/ContentBox.vue";

  export default {
    name: "PostWrapper",
    data() {
      return {
        msg: "Welcome to Your Vue.js App"
      };
    },
    computed: {
      sortedPosts() {
        if (this.posts) {
          return this.posts.sort((a, b) => b.postedOn - a.postedOn);
        }
        return [];
      }
    },
    components: {
      UserIcon,
      PostMeta,
      ContentBox
    },
    props: ["posts"]
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .post {
    margin-top: 20px;
    background: #fff;
    border: 1px solid #e0e4ea;
    border-radius: 10px;
    padding: 10px 20px;
  }

  .post__info {
    padding: 0 20px;
  }

  .post__content {
    margin-left: 60px;
  }

  .post__comments {
    margin-left: 60px;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }

  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(-30px);
  }
</style>
