<template>
  <div class="chat-view">
    <a-header :title="displayName">
    </a-header>
    <div class="main-container">
      <div class="chat-area">
        <chat-container
        v-if="asyncFlag"
        :oriData="chatData"
        :ownerAvatar="ownerAvatar"
        :contactAvatar="contactAvatar"
        @on-avatar-click="onAvatarClick"
        @load-more="loadMore"
        >
      </chat-container>
    </div>
    <div class="pre-bottom">
      <input type="text" name="" value="" v-model="preSend">
      <button :class="{disable:sendDisable}" type="button" name="send" @click="send()" @keyup.enter="send()">
        <i class="iconfont icon-send"></i>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import AHeader from '@/components/a_header.vue'
import ChatContainer from '@/components/chat_container.vue'
import 'vue-resource'
export default {
  name: 'chat',
  data () {
    return {
      contactId: '',
      displayName: '',
      preSend: '',
      sendDisable: true,
      ownerAvatar: '',
      contactAvatar: '',
      chatData: [],
      lastDate: '',
      asyncFlag: false,
      isLaoding: false,
      upperTimes: 0
    }
  },
  mounted() {
    this.contactId = this.$route.query.id;
    this.displayName = this.$route.query.displayName;
    this.$http.get(`/api/chat_data/${this.contactId}`).then((response) => {
      let res = response.data;
      if (res.errno == 0) {
        for (let v of res.data.chatData) {
          v.animate = false;
          this.chatData.push(v);
        }
        if (res.data.chatData.length > 0) {
          this.lastDate = res.data.chatData[0].time;
        } else {
          this.lastDate = (new Date()).getTime();
        }
        this.ownerAvatar = require(`@/assets/${res.data.ownerAvatar}`);
        this.contactAvatar = require(`@/assets/${res.data.contactAvatar}`);
        this.asyncFlag = true;
      }
    })
  },
  watch: {
    preSend(newVal, oldVal) {
      if (newVal != '') {
        this.sendDisable = false;
      } else {
        this.sendDisable = true;
      }
    }
  },
  methods:{
    loadMore(done) {
      let self = this;
      if(self.isLaoding){
        return;
      }
      if(self.isRefreshedAll){
        done(true, []);
        self.isLaoding = false;
        return;
      }
      try {
        this.$http.get(`/api/chat_data/10001/${this.lastDate}`).then(response => {
          if (response.status == 200) {
            let res = response.data;
            if (res.errno == 0) {
              let chatDataMore = res.data.chatDataMore;
              for (let v of chatDataMore) {
                v.animate = true;
              }
              if (chatDataMore.length > 0) {
                this.lastDate = chatDataMore[0].time;
                chatDataMore = chatDataMore.sort((a, b) => b.time - a.time);
              }
              done(true, chatDataMore);
              return;
            }
          } else {
            done(false, []);
          }
        }, response => {
          done(false, []);
        });
      } catch (error) {
        console.log(error);
      }
      self.isLaoding = false;
    },
    send() {
      let msg;
      if (this.preSend != '') {
        msg = {
          direction: 0,
          type: 'text',
          animate: true,
          content: this.preSend,
          time: (new Date).getTime()
        };
        this.$bus.emit('new-chat-data', msg);
        this.preSend = '';
        setTimeout(() => {
          msg = {
            direction: 1,
            type: 'text',
            animate: true,
            content: '[Auto Reply]',
            time: (new Date).getTime()
          };
          this.$bus.emit('new-chat-data', msg);
        }, 800);
      }
    },
    goback () {
      this.$router.goBack()
    },
    onAvatarClick() {
      this.$router.push({name: 'Overview', query: {id : this.contactId}});
    }
  },
  components: {
    AHeader,
    ChatContainer
  }
}
</script>
<style lang="scss">
.chat-view {
  width: 100vw;
  height: 100vh;
  .main-container {
    display: flex;
    height: calc(100vh - 48px);
    flex-flow: column;
    .chat-area {
      display: flex;
      height: 100%;
      flex-grow: 1;
      overflow: hidden;
      background-color: #dedede;
    }
    .pre-bottom {
      display: flex;
      align-items: center;
      height: 50px;
      box-sizing: border-box;
      padding: 0 10px 0 10px;
      background: #eaeaea;
      input {
        box-sizing: border-box;
        text-indent: 4px;
        width: 80%;
        height: 30px;
        padding: 4px 2px 4px 2px;
        border-radius: 6px;
        font-size: 16px;
        border: 1px solid #ddd;
        float: left;
        margin-right: 2.5%;
      }
      button {
        position: relative;
        width: 17.5%;
        height: 30px;
        border-radius: 6px;
        line-height: 22px;
        border: 0;
        i {
          font-size: 27px;
          color: #fff;
        }
        &:active:after {
          opacity: 1;
        }
        &.disable {
          background: #c8c8c8;
          &:active:after {
            opacity: 0;
          }
        }
      }
      button:after {
        position: absolute;
        content:'';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(#000, .2);
        opacity: 0;
        transition: .3s;
      }
    }

  }
}
</style>
