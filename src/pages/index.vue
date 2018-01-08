<template>
  <div class="page-main">
    <a-header title="Contacts" :back="false">
    </a-header>
    <div class="list-container">
      <chat-cell v-for="item in list"
      :key="item.key"
      :avatar="item.avatar"
      :nickname="item.displayName"
      :msg="item.msg"
      :time="item.time"
      router-name="Chat"
      :router-params="{id:item.contacts_id, displayName: item.displayName}">
    </chat-cell>
    </div>
    <router-link class="pop" :to="{ path:'/skin' }">

      <i class="iconfont icon-pifu"></i>
    </router-link>
    <div class="mask">
    </div>
  </div>
</template>

<script>
import ChatCell from '@/components/chat_cell.vue'
import AHeader from '@/components/a_header.vue'
import avatarURL from '@/assets/avatar.jpg'
import 'vue-resource'
export default {
  data() {
    return {
      list: [
      ]
    }
  },
  mounted(){
    this.$nextTick(function(){
      this.$http.get('/api/contacts').then((response) => {
        let res = response.data;
        if (res.errno == 0) {
          this.list = res.data;
          for (let item of this.list) {
            item.time =  this.format(new Date(item.time * 1000), 'hour');
            item.avatar = require(`@/assets/${item.avatar}`);
          }
        }
      })
    })
  },
  methods: {
    format(time, str)   {
      let year = time.getYear().toString();
      let month = (time.getMonth() + 1).toString();
      let date = time.getDate().toString();
      let hour = time.getHours().toString();
      let minute = time.getMinutes().toString();
      let second = time.getSeconds().toString();
      if (month.length < 2) {
        month = "0" + month;
      }
      if (date.length < 2) {
        date = "0" + date;
      }
      if (hour.length < 2) {
        hour = "0" + hour;
      }
      if (minute.length < 2) {
        minute = "0" + minute;
      }
      if (str == 'hour') {
        return hour + ":" + minute;
      } else if(str == 'month') {
        return month + "-" + date + " " + hour + ":" + minute;
      }
      return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    }
  },
  components: {
    ChatCell,
    AHeader
  }
}
</script>
<style lang="scss">
.page-main {
  display: block;
  .list-container {
    height: calc(100vh - 48px);
    overflow-y: scroll;
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
