<template>
  <div v-if="content" class="content-box">
    <!-- Post Meta -->
    <PostMeta :meta="content"></PostMeta>
    <!-- Post Content and Controls -->
    <div class="post__content">

      <div class="content__description" v-html="content.content"></div>

      <div class="content-box__control" @click="toggleChild">
        <a class="primary--link">{{depth === 1 ? 'Comment': 'Reply'}}</a>
        <a style="margin-left: auto; cursor: pointer">
          {{childCounts}} {{depth === 1 ? getPlural("Comment","Comments", childCounts): getPlural("Reply","Replies", childCounts)}}</a>
      </div>
    </div>
    <!-- Indented replies or comment -->
    <div :style="indent">
      <!-- Indented comments or replies -->
      <div v-if="showChild" style="border-top: 1px solid #e0e4ea; padding: 10px 0; margin-top: 10px;">
        <NewPost v-on:onSend="addChild" :init-content="replyData"></NewPost>

          <a v-if="content.nodes" @click="toggleChild">
            Hide {{depth === 1 ? getPlural("Comment", "Comments", childCounts): getPlural("Reply","Replies",
            childCounts)}}
          </a>

        <transition-group>
          <ContentBox
            v-for="(childNode, index) in sortedNestedContent"
            :content="childNode"
            :depth="depth + 1"
            :key="index"
            v-on:reply="onReply"
          />
        </transition-group>
        <!--<a>Show previous replies</a>-->
        <!--<NewPost v-if="isNewContentBoxVisible && depth !== 1" v-on:onSend="addChild"></NewPost>-->
      </div>
    </div>
  </div>
</template>
<script>
  import PostMeta from './PostMeta'
  import NewPost from '../components/NewPost'
  /*import CommentWrapper from '../components/CommentWrapper.vue'*/

  export default {
    name: 'ContentBox',
    components: {
      PostMeta,
      NewPost
    },
    data() {
      return {
        showChild: false,
        isNewContentBoxVisible: false,
        replyData: {}
      };
    },
    methods: {
      toggleChild(){
        if (this.depth <= 2) {
          this.showChild = !this.showChild;
        } else {
          this.$emit("reply", { replyTo: 'akansh' });
        }
      },
      getPlural(singularString, pluralString, count){
        if (count > 1) {
          return pluralString;
        }
        return singularString;
      },
      addChild(data) {
        this.content.nodes.push({
          content: data.content,
          postedOn: data.postedOn,
          id: this.content.nodes.length + 1,
          nodes: []
        });
      },
      onReply(data) {
        const content = `@${data.replyTo}`;
        this.replyData = {
          on: +new Date,
          content
        };
      }
    },
    computed: {
      indent(){
        return `margin-left: ${1 * 60}px`;
      },
      childCounts(){
        return this.content.comments || 0;
      },
      sortedNestedContent(){
        if (this.content && this.content.nodes) {
          return this.content.nodes.sort((a, b) => b.postedOn - a.postedOn);
        }
        return []
      }
    },
    props: ['content', 'depth']
  }
</script>
<style>
  .content-box__control{
    display: flex;
    justify-content: space-between;
  }
  a.primary--link {
    color: #ff7133;
  }
  a.primary--link:visited {
    color: #ff7133;
  }
  .content__description {
    margin: 10px 0;
  }
</style>
