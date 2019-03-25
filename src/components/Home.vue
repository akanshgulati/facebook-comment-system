<template>
  <div class="comment-system">
    <NewPost
      v-if="!isLoading"
      v-on:onSend="sendNewPost"
      placeholder="What's on mind?"
      class="comment-system__new-post"
      :isPrimary="true"/>

    <transition mode="out-in">
      <Loading v-if="isLoading"></Loading>
      <PostWrapper :posts="postData" v-else></PostWrapper>
    </transition>
  </div>
</template>

<script>
import { GetContents, SetContent, GetUsers } from '../utils/HttpUtils';
import { generateId } from '../utils/CommonUtils';

import NewPost from './NewPost';
import PostWrapper from './PostWrapper';
import Loading from './Loading';

export default {
  beforeMount() {
    Promise.all([GetContents(), GetUsers()])
      .then((data) => {
      this.$set(this, 'postData', data[0]);
      this.$store.dispatch('setUsers', data[1]);
      this.$store.commit('setCurrentUser', data[1][0]);
      this.isLoading = false;
    });
  },
  data() {
    return {
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
      currentUser: ''
    };
  },
  methods: {
    sendNewPost(data) {
      const content = {
        content: data.content,
        postedOn: data.postedOn,
        depth: 1,
        comments: 0,
        id: generateId(),
        userId: this.$store.state.currentUser.id
      };
      this.postData.push(content);
      SetContent(content);
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
    width: 700px;
    margin: auto;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .comment-system__new-post {
    align-self: stretch;
  }
</style>
