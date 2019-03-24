<template>
  <div class="comment-system">
    <NewPost v-on:onSend="sendNewPost" placeholder="What's on mind?" class="comment-system__new-post" :isPrimary="true"></NewPost>
    <transition mode="out-in">
      <Loading v-if="isLoading"></Loading>
      <PostWrapper :posts="postData" v-else></PostWrapper>
    </transition>
  </div>
</template>

<script>
import { GetContents } from '../utils/HttpUtils';

import NewPost from './NewPost';
import PostWrapper from './PostWrapper';
import Loading from './Loading';

export default {
  beforeMount() {
    GetContents().then((data) => {
      this.$set(this, 'postData', data);
      this.isLoading = false;
    });
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      userData: [
        {
          name: 'Akansh Gulati',
          id: 'fa0c645c-cee8-Scb8-U078-935d5e3e3293',
          email: 'akansh@gmail.com',
          username: 'akansh',
          image: 'static/faces/1.jpg',
        },
        {
          name: 'Manish',
          id: '67833f65-ddde-S87d-U46c-b91b9c063958',
          email: 'manish@gmail.com',
          username: 'manish',
          image: 'static/faces/2.jpg',
        },
        {
          name: 'Sajid',
          id: '6a6321c1-9958-S78b-Uc6c-e8f6035b5f60',
          email: 'sajid@gmail.com',
          username: 'sajid',
          image: 'static/faces/2.jpg',
        },
      ],
      postData: [],
      isLoading: true,
    };
  },
  methods: {
    sendNewPost(data) {
      // Add sanitization of post comment
      this.postData.push({
        content: data.content,
        postedOn: data.postedOn,
        id: this.postData.length + 1,
        nodes: [],
      });
    },
  },
  components: {
    NewPost,
    PostWrapper,
    Loading,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .comment-system {
    width: 600px;
    margin: auto;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .comment-system__new-post {
    width: 100%;
  }
</style>
