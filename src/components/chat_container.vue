<template>
  <div class="chat-containter">
    <div class="content" @touchend="dragEnd($event)">
      <div class="loading">
        {{loadingTip}}
      </div>
        <ul class="msg-content">
          <li v-for="(msg, index) in chatData" :class="{'own':msg.direction == 0, 'animateFade':msg.animate}">
              <div class="avatar" :style="{backgroundImage:'url('+ (msg.direction? contactAvatar: ownerAvatar) +')'}" @click='avatarClick(msg.direction)'></div>
              <div class="msg-wrap">
                <div v-if="msg.type=='text'" class="text">
                  {{msg.content}}
                </div>
                <div v-else-if="msg.type=='picture'" class="image">
                  <img :src="msg.content">
                </div>
              </div>
          </li>
        </ul>

    </div>
  </div>
</template>

<script>
import slide from '@/scripts/slide.js'
export default {
  props: {
    contactAvatar: {
      type: String
    },
    ownerAvatar: {
      type: String
    },
    oriData: {
      type: Array
    }
  },
  data() {
    return {
      loading: false,
      loadingTip: 'loading...',
      chatData: []
    }
  },
  created() {
    this.chatData = this.oriData;
    this.$bus.on('new-chat-data', this.addChatData);
  },
  mounted() {
    let self = this;
    let cc = document.getElementsByClassName('chat-containter')[0];
    this.$nextTick(function() {
      cc.scrollTop = cc.scrollHeight - cc.clientHeight;
    })
  },
  methods: {
    addChatData(val) {
      let self = this;
      this.chatData.push(val);
      this.$nextTick(function() {
        let cc = document.getElementsByClassName('chat-containter')[0];
        self.scrollTo(cc, cc.scrollHeight - cc.clientHeight, 180, ()=>{});
      })
    },
    dragEnd(e) {
      let cc = document.getElementsByClassName('chat-containter')[0];
      let offset = document.getElementsByClassName('loading')[0].offsetHeight;
      let set;
      if (cc.scrollTop <= 20) {
        if (this.loading) {
          return;
        }
        this.loading = true;
        this.scrollTo(cc, 0, 200, function(){
          this.$emit('load-more', (success, topData) => {
            if (success) {
              this.chatData = topData.reverse().concat(this.chatData);
              if (topData.length > 0) {
                cc.scrollTop = offset;
                this.loading = false;
              } else {
                this.loadingTip = 'no more';
                set = setTimeout(() => {
                  this.scrollTo(cc, cc.scrollTop + 42, 150, function(){
                    this.loading = false;
                  });
                }, 1000);
              }
            } else {
              this.loadingTip = 'bad network';
              set = setTimeout(() => {
                this.scrollTo(cc, cc.scrollTop + 42, 200, function(){
                  this.loading = false;
                });
              }, 1500);
            }
          });
        });
      } else if(cc.scrollTop > 20 && cc.scrollTop <= 50) {
        self.scrollTo(cc, 42, 150, function(){
          self.loading = false;
        });
      } else {
        clearTimeout(set);
        this.loading = false
      }
    },
    scrollTo(el, endHeight, time, callback){
      let startHeight = el.scrollTop;
      let partHeight = (endHeight - startHeight) / (time / 20.0);
      if(endHeight < startHeight) {
        let set = setInterval(function() {
          el.scrollTop += partHeight;
          if (endHeight >= el.scrollTop) {
            clearInterval(set);
            callback();
          }
        }, 20);
      } else {
        let set = setInterval(function() {
          el.scrollTop += partHeight;
          if (endHeight <= el.scrollTop) {
            clearInterval(set);
            callback();
          }
        }, 20);
      }
    },
    avatarClick(a) {
      if(a)
        this.$emit('on-avatar-click');
      else return;
    }
  }
}
</script>
<style lang="scss">
.chat-containter {
  position: relative;
  width: 100%;
  overflow: scroll;
  .content {
    min-height: calc(100vh - 52px);
    -webkit-overflow-scrolling: touch;
    .loading{
      display: block;
      text-align: center;
      color: #b0b0b0;
      line-height: 50px;
      height: 50px;
     }
    .msg-content{
      padding: 10px 13px;
      li {
        display: block;
        position: relative;
        margin-bottom: 15px;
        left:0;
      }
      .animateFade{
        left: 0;
        animation: fadeIn .5s ease;
      }
      .avatar {
        float: left;
        width: 45px;
        height: 45px;
        margin: 0 10px 0 0;
        background-size: cover;
        border-radius: 50%;
      }
      .msg-wrap {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        padding: 6px 10px;
        margin-left: 5px;
        max-width: calc(100% - 130px);
        min-height: 28px;
        min-width: 30px;
        font-size: 15px;
        word-wrap: break-word;
        word-break: normal;
        background-color: #fff;
        color: #000;
        border-radius: 12px;
        box-shadow: 0px 1px 5px -3px #000;
        &:before {
          content: "";
          position: absolute;
          top: 12px;
          right: 100%;
          border: 5px solid transparent;
          border-right-color: #fff;
          z-index: 5;
        }
        &:after {
          content: "";
          position: absolute;
          top: 12px;
          right: 100%;
          border: 6px solid transparent;
          border-right-color: #fff;
          z-index: 4;
        }
        .text {
          line-height: 2.1;
        }
        .image {
          border-radius: 6px;
          overflow: hidden;
          > img {
            width: 100%;
          }
        }
      }
      .own {
        text-align: right;
        .avatar {
          float: right;
          margin: 0 0 0 10px;
        }
        .msg-wrap {
          text-align: left;
          margin-right: 5px;
          &:before {
            left: 100%;
            border-left-color: #fff;
            border-right-color: transparent;
          }
          &:after {
            left: 100%;
            border-left-color: #fff;
            border-right-color: transparent;
          }
        }
      }
    }
  }
}
@keyframes fadeIn{
  0%{
    opacity: 0
  };
  100%{
    opacity: 1
  }
}
</style>
