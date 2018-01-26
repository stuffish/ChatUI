<template>
  <div class="page-chat">
    <chat-header :title="displayName">
    </chat-header>
        <chat-area
        v-if="asyncFlag"
        :height="mHeight"
        :oriData="chatData"
        :ownerAvatar="ownerAvatar"
        :contactAvatar="contactAvatar"
        @on-avatar-click="onAvatarClick"
        @load-more="loadMore"
        @on-msg-send="onMsgSend"
        >
      </chat-area>
    
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import ChatHeader from '@/components/chat_header.vue'
import ChatArea from '@/components/chat_area.vue'
import 'vue-resource'
export default {
  name: 'chat',
  data () {
    return {
      contactId: '',
      displayName: '',
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
  computed: {
    mHeight() {
      return (window.innerHeight||document.documentElement.clientHeight) - 48;
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
    goback () {
      this.$router.goBack()
    },
    onAvatarClick(direction) {
      if (direction == 1) {
        this.$router.push({name: 'Overview', query: {id : this.contactId}});
      }
    },
    onMsgSend() {
      setTimeout(() => {
        let msg = {
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
  components: {
    ChatHeader,
    ChatArea
  }
}
</script>
<style lang="scss">
.page-chat {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
