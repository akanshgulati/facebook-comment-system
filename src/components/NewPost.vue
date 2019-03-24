<template>
  <div class="new-post" @keydown.enter.exact.prevent="onSend">
    <UserIcon :url="userIcon" class="new-post__img"></UserIcon>
    <div class="new-post__content">
      <textarea class="" v-model="content" :placeholder="placeholder" rows="1" @input="onInput"></textarea>
    </div>
    <div class="new-post__control-buttons">
      <div class="new-post__control-buttons__send" @click="onSend">Send</div>
    </div>
  </div>
</template>

<script>
  import UserIcon from "../modules/UserIcon.vue";
  import {generateId} from "../utils/commonUtils";

  export default {
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        content: "",
        userIcon: "/static/faces/1.jpg"
      };
    },
    methods: {
      onSend() {
        if (this.content.length) {
          // sending data
          this.$emit("onSend", {
            content: this.content,
            postedOn: +new Date
          });

          this.content = "";
          this.adjustTextAreaSize();
        }
      },
      adjustTextAreaSize() {
        const textArea = this.$el.querySelector("textarea");
        textArea.style.fontSize = textArea.textLength > 0 ? textArea.textLength > 80 ? "15px" : "20px" : "15px;";
        textArea.style.height = "";
        textArea.style.height = textArea.scrollHeight + "px";
      },
      onInput() {
        this.adjustTextAreaSize();
      },
      focusInput(){
        const textArea = this.$el.querySelector("textarea");
        textArea.focus();
      }
    },
    components: {
      UserIcon
    },
    watch: {
      initContent: function(data) {
        this.content = data.content;
        this.focusInput();
      }
    },
    props: {
      placeholder: {
        type: String,
        default: "Write a comment"
      },
      initContent: {
        type: Object
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .new-post {
    border: 1px solid #e0e4ea;
    border-radius: 10px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    background-color: #fff;
  }

  .new-post__img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    align-self: flex-start;
  }

  .new-post__content {
    flex-grow: 1;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }

  .new-post__content textarea {
    width: 100%;
    height: 100%;
    font-size: 15px;
    outline: 0;
    border: none;
    resize: none;
  }

  .new-post__control-buttons {
    flex-basis: auto;
  }
</style>
