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
      postData: [],
      isLoading: true,
      currentUser: '',
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
        userId: this.$store.state.currentUser.id,
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
