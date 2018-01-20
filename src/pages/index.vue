<template>
  <div class="page-main">
    <chat-header title="Contacts" :height="48" :back="false" fixed>
    </chat-header>
    <chat-group :data="list" @on-cell-click="onCellClick">
    </chat-group>
    <router-link class="pop" :to="{ path:'/skin' }">
      <i class="iconfont icon-pifu"></i>
    </router-link>
    <div class="mask">
    </div>
  </div>
</template>

<script>
import ChatGroup from '@/components/chat_group.vue'
import ChatHeader from '@/components/chat_header.vue'
import avatarURL from '@/assets/avatar.jpg'
import 'vue-resource'
export default {
  data() {
    return {
      list: []
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.$http.get('/api/contacts').then((response) => {
        let res = response.data;
        if (res.errno == 0) {
          this.list = res.data;
          for (let item of this.list) {
            item.avatar = require(`@/assets/${item.avatar}`);
          }
        }
      })
    })
  },
  methods: {
    onCellClick(index, item) {
      this.$router.push({path:'/chat', query:{id:item.contacts_id, displayName: item.displayName}});
    }
  },
  components: {
    ChatHeader,
    ChatGroup
  }
}
</script>
<style lang="scss">
.page-main {
  display: block;
  overflow: hidden;
  .chat-group {
    padding-top: 48px;
  }
  .pop {
    display: flex;
    position: fixed;
    z-index: 100;
    width: 42px;
    height: 42px;
    bottom: 18px;
    right: 15px;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 7px -3px #ddd;
    .iconfont {
      font-size: 22px;
    }
  }
  .mask {
    position: fixed;
    z-index: 90;
    pointer-events: none;
    bottom: 0;
    width: 100%;
    height: 25vh;
    background-image:-webkit-linear-gradient(90deg, rgba(#000, .15) 0%, transparent 100%);
    background-image:-moz-linear-gradient(90deg, rgba(#000, .15) 0%, transparent 100%);
    background-image:-o-linear-gradient(90deg, rgba(#000, .15) 0%, transparent 100%);
  }
}
</style>
