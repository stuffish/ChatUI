<template>
  <div class="page-main">
    <chat-header title="Contacts" :height="48" :back="false" fixed>
    </chat-header>
    <chat-group :data="list" @on-cell-click="onCellClick">
    </chat-group>
    <chat-pop-bubble @click="onPopClick">
      <i slot="icon" class="iconfont icon-pifu"></i>
    </chat-pop-bubble>
    <div class="mask">
    </div>
  </div>
</template>

<script>
import ChatGroup from '@/components/chat_group.vue'
import ChatHeader from '@/components/chat_header.vue'
import ChatPopBubble from '@/components/chat_pop_bubble.vue'
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
    },
    onPopClick() {
      this.$router.push({path:'/theme'});
    }
  },
  components: {
    ChatHeader,
    ChatGroup,
    ChatPopBubble
  }
}
</script>
<style lang="scss">
.page-main {
  display: block;
  overflow: hidden;
  .chat-group {
    padding-top: 48px;
    height: calc(100vh - 48px);
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
