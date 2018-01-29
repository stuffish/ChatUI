<template>
  <div class="theme">
    <chat-header title="themes">
    </chat-header>
    <div class="content">

      <ul class="theme-select">
        <li v-for="(i, index) in themes" class="card" :class="{'active':theme == i.name}" @click="changeTheme(index)">
          <div class="img" :style="{backgroundImage:'url('+ i.img + ')'}">
            <div v-if="i.isvip" class="vip-tag">
              vip
            </div>
          </div>
          <div class="description">
            {{i.description}}
          </div>
          <transition name="fade">
            <div class="tag" v-if="theme == i.name">
            </div>
          </transition>
        </li>
      </ul>
      <chat-dialog :show.sync="dialogShow" title="remind" :type="0" content="This theme just be applied for VIP, click [Confirm] and upgrade your account to VIP." @positive-btn-click="dialogPositive"></chat-dialog>
    </div>
  </div>
</template>
<script>
import ChatHeader from '@/components/chat_header.vue';
import ChatDialog from '@/components/chat_dialog.vue';
export default {
  data: () => ({
    dialogShow: false
  }),
  methods: {
    changeTheme(index) {
      let select = this.themes[index];
      if (select.isvip) {
        this.dialogShow = true;
      } else {
        this.$store.commit('setTheme', select.name);
        localStorage.setItem('theme',select.name);
      }
    },
    dialogPositive() {
      this.$router.push({name: 'Pay'});
    }
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
    themes() {
      return this.$store.state.themes;
    }
  },
  components: {
    ChatHeader, ChatDialog
  }
}
</script>
<style lang="scss">
.theme {
  > .content {
    height: calc(100vh - 48px);
    overflow: scroll;
  }
  .theme-select {
    margin-top: 10px;
    margin-bottom: 10px;
    .card {
      position: relative;
      width: 95vw;
      height: 40vw;
      margin: 0 auto;
      text-align: center;
      border-radius: 5px;
      box-shadow: 0 0 5px -1px #000;
      overflow: hidden;
      transition: background-color .4s;
      .img {
        position: relative;
        width: 100%;
        height: calc(40vw - 30px);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background-size: cover;
        .vip-tag {
          position: absolute;
          right: 0;
          bottom: 0;
          padding: 4px 12px;
          color: #fff;
          background: rgb(246, 52, 52);
          letter-spacing: 1px;
        }
      }
      .description {
        line-height: 30px;
      }
      .tag {
        position: absolute;
        top: 0;
        left: 0;
        width: 90px;
        height: 72px;
        background-image: url(../assets/tag.png);
        background-size: 100% 100%;
      }
      + .card {
        margin-top: 10px;
      }
      &:before {
        content: '';
        position: absolute;
        z-index: 10;
        width: 100%;
        height: calc(40vw - 30px);
        top: 0;
        left: 0;
        background: rgba(#fff, .1);
        opacity: 0;
        transition: .2s;
      }
      &:active:before {
        opacity: 1;
      }
    }
  }
}
</style>
