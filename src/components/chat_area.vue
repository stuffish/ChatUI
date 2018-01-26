<template>
  <div class="chat-area" :style="{height: height + 'px'}">
      <div class="scroller" ref="scroller">
        <div class="content" @touchstart="dragStart($event)" @touchend="dragEnd($event)">
          <div class="loading" ref="loading">
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
    <div class="pre-bottom">
      <input type="text" name="" value="" v-model="preSend">
      <button :class="{disable:sendDisable}" type="button" name="send" @click="send()" @keyup.enter="send()">
        <i class="iconfont icon-send"></i>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      height: {
        type: Number,
        default: 300
      },
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
        chatData: [],
        preSend: '',
        sendDisable: true,
        t: '',
        t1: ''
      }
    },
    created() {
      this.chatData = this.oriData;
      this.$bus.on('new-chat-data', this.addChatData);
    },
    mounted() {
      let sc = this.$refs.scroller;
      this.$nextTick(() => {
        sc.scrollTop = sc.scrollHeight - sc.clientHeight;
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
    methods: {
      addChatData(val) {
        this.chatData.push(val);
        this.$nextTick(() => {
          let sc = this.$refs.scroller;
          this.scrollTo(sc, sc.scrollHeight - sc.clientHeight, 180, ()=>{});
        })
      },
      dragStart(e) {
        clearTimeout(this.t);
      },
      dragEnd(e) {
        let sc = this.$refs.scroller;
        let offset = this.$refs.loading.offsetHeight;
        if (sc.scrollTop <= 20) {
          if (this.loading) {
            return;
          }
          this.loading = true;
          this.scrollTo(sc, 0, 200, () => {
            this.$emit('load-more', (success, topData) => {
              if (success) {
                this.chatData = topData.reverse().concat(this.chatData);
                if (topData.length > 0) {
                  sc.scrollTop = offset;
                  this.loading = false;
                } else {
                  this.loadingTip = 'no more';
                  this.t = setTimeout(() => {
                    this.scrollTo(sc, sc.scrollTop + 42, 150, () => {
                      this.loading = false;
                    });
                  }, 1000);
                }
              } else {
                this.loadingTip = 'bad network';
                this.t = setTimeout(() => {
                  this.scrollTo(sc, sc.scrollTop + 42, 200, () => {
                    this.loading = false;
                  });
                }, 1500);
              }
            });
          });
        } else if(sc.scrollTop > 20 && sc.scrollTop <= 50) {
          this.scrollTo(sc, 42, 150, () => {
            this.loading = false;
          });
        } else {
          clearTimeout(this.t);
          this.loading = false
        }
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
          this.addChatData(msg);
          this.$emit('on-msg-send');
          this.preSend = '';

        }
      },
      scrollTo(el, endHeight, time, callback){
        let startHeight = el.scrollTop;
        let partHeight = (endHeight - startHeight) / (time / 20.0);
        if(endHeight < startHeight) {
          if (this.t1) {
            clearInterval(this.t1);
          }
          this.t1 = setInterval(() => {
            el.scrollTop += partHeight;
            if (endHeight >= el.scrollTop) {
              clearInterval(this.t1);
              callback();
            }
          }, 20);
        } else {
          if (this.t1) {
            clearInterval(this.t1);
          }
          this.t1 = setInterval(() => {
            el.scrollTop += partHeight;
            if (endHeight <= el.scrollTop) {
              clearInterval(this.t1);
              callback();
            }
          }, 20);
        }
      },
      avatarClick(direction) {
        this.$emit('on-avatar-click', direction);
      }
    }
  }
</script>
<style lang="scss">
.chat-area {
  display: flex;
  flex-flow: column;
  height: 100%;
  background: #f1f1f1;
  .scroller {
    position: relative;
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: scroll;
    .content {
      -webkit-overflow-scrolling: touch;
      min-height: calc(100% + 50px);
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
            top: 11px;
            right: calc(100% - 1px);
            border: 6px solid transparent;
            border-right-color: #fff;
            z-index: 5;
          }
          &:after {
            content: "";
            position: absolute;
            top: 11px;
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
              left: calc(100% - 1px);
              border-right-color: transparent;
            }
            &:after {
              left: 100%;
              border-right-color: transparent;
            }
          }
        }
      }
    }
  }
  .own .msg-wrap:before,
  .own .msg-wrap:after {
    border-left-color: #fff;
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
      &:hover {
        transition: .3s;
      }
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
  @keyframes fadeIn{
    0%{
      opacity: 0
    };
    100%{
      opacity: 1
    }
  }
</style>
