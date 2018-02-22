<template>
  <div class="theme">
    <chat-header title="themes" :height="48"/>
    <div class="content">
      <div class="theme-select">
        <chat-card 
          v-for="(i, index) in themes" 
          :key="index"
          :class="{'active':theme == i.name}"
          :img-url="i.img"
          :text-content="i.description"
          :has-label="i.isvip"
          :has-tag="theme == i.name"
          @click="changeTheme(index)"
        >
          <div slot="label">vip</div>
        </chat-card>
      </div>
      <chat-dialog 
        :show.sync="dialogShow" 
        title="remind" 
        :type="0" 
        content="This theme just be applied for VIP, click [Confirm] and upgrade your account to VIP." 
        @positive-btn-click="dialogPositive"
      />
    </div>
  </div>
</template>
<script>
import ChatHeader from '@/components/chat_header.vue';
import ChatDialog from '@/components/chat_dialog.vue';
import ChatCard from '@/components/chat_card.vue';
export default {
  data: () => ({
    dialogShow: false,
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
    ChatCard,
    ChatHeader, 
    ChatDialog,
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
  }
}
</style>
