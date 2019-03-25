<template>
  <div v-if="!isLoading" class="home">
    <div class="comment-system">
    <NewPost
      v-if="!isLoading"
      v-on:onSend="sendNewPost"
      placeholder="What's on your mind?"
      class="comment-system__new-post"
      :isPrimary="true"/>

    <transition mode="out-in">
      <Loading v-if="isLoading"></Loading>
      <PostWrapper :posts="postData" v-else></PostWrapper>
    </transition>
  </div>

    <div class="timeline-block">
      <TimelineWrapper></TimelineWrapper>
    </div>
  </div>
</template>

<script>
import { GetContents, SetContent, GetUsers } from '../utils/HttpUtils';
import { generateId } from '../utils/CommonUtils';

import NewPost from './NewPost';
import PostWrapper from './PostWrapper';
import Loading from './Loading';
import TimelineWrapper from './TimelineWrapper';

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
    TimelineWrapper,
    NewPost,
    PostWrapper,
    Loading,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    display: flex;
    justify-content: space-around;
    max-width: 1200px;
    margin: 0 auto;
  }
  a {
    color: #42b983;
  }

  .comment-system {
    flex-shrink: 0;
    width: 700px;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .comment-system__new-post {
    align-self: stretch;
  }

  .timeline-block {
    margin-left: 100px;
  }
</style>
