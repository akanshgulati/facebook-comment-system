<template>
  <div v-if="content" class="content-box">
    <!-- Post Meta -->
    <PostMeta :meta="content"></PostMeta>

    <!-- Post Content and Controls -->
    <div class="content-box__indent">
      <div class="content__description" v-html="content.content"></div>
      <ContentBoxControl v-on:toggleChild="toggleChild" :count="childCount" :depth="depth"/>
    </div>

    <!-- Indented replies or comment -->
    <div class="content-box__indent">
      <transition mode="out-in">
        <Loading v-if="isLoading" text-only="true"></Loading>

        <div v-else-if="showChild" class="content-box__nested">
          <!-- Indented comments or replies -->
          <NewPost v-on:onSend="addChild" :init-content="replyData"></NewPost>

          <Link v-if="content.nodes && childCount" :value="hideChildText" size="small" @click="toggleChild"></Link>

          <transition-group>
            <ContentBox
              v-for="(childNode) in sortedNestedContent"
              :content="childNode"
              :depth="depth + 1"
              :key="childNode.id"
              v-on:reply="onReply"
            />
          </transition-group>
        </div>
      </transition>
    </div>

  </div>
</template>
<script>
  import PostMeta from './PostMeta';
  import NewPost from './NewPost';
  import Loading from './Loading';
  import ContentBoxControl from './ContentBoxControl';
  import Link from './Link';

  import { GetContents, SetContent, UpdateContent } from '../utils/HttpUtils';
  import { generateId, getPlural } from '../utils/CommonUtils';
  /* import CommentWrapper from '../components/CommentWrapper.vue' */

  export default {
    name: 'ContentBox',
    components: {
      PostMeta,
      NewPost,
      Loading,
      ContentBoxControl,
      Link
    },
    data() {
      return {
        showChild: false,
        isNewContentBoxVisible: false,
        replyData: {},
        isLoading: false
      };
    },
    methods: {
      getPlural,
      loadChild() {
        this.isLoading = true;
        const self = this;

        GetContents(this.content.depth + 1, this.content.id)
          .then((data) => {
            self.$set(self.content, 'nodes', data || []);
            self.showChild = true;
            self.isLoading = false;
          });
      },
      toggleChild() {
        if (this.content.depth <= 2) {
          if (!this.showChild) {
            this.loadChild();
          } else {
            this.showChild = false;
          }
          return;
        }

        this.$emit('reply', { replyTo: 'akansh' });
      },
      addChild(data) {
        // Updating content locally and in storage
        this.content.comments++;
        UpdateContent(this.content, 'comments', this.content.comments);
        // adding a node
        const child = {
          content: data.content,
          postedOn: data.postedOn,
          depth: this.content.depth + 1,
          parent: this.content.id,
          comments: 0,
          id: generateId()
        };
        this.content.nodes.push(child);
        // Update local storage
        SetContent(child);
      },
      onReply(data) {
        const content = `@${data.replyTo}`;
        this.replyData = {
          on: +new Date(),
          content
        };
      }
    },
    computed: {
      hideChildText() {
        return `Hide ${this.depth === 1 ? getPlural('Comment', 'Comments', this.childCount) : getPlural('Reply',
          'Replies', this.childCount)}`;
      },
      childCount() {
        return this.content.comments || 0;
      },
      sortedNestedContent() {
        if (this.content && this.content.nodes) {
          return this.content.nodes.sort((a, b) => b.postedOn - a.postedOn);
        }
        return [];
      }
    },
    props: ['content', 'depth']
  };
</script>
<style>
  .content-box {
    margin: 10px 0;
  }

  .content__description {
    margin: 10px 0;
  }

  .content-box__indent {
    margin-left: 60px;
  }

  .content-box__nested {
    border-top: 1px solid #e0e4ea;
    padding: 10px 0;
    margin-top: 10px;
  }
</style>
