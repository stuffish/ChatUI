<template>
  <router-link class="chat-cell" :to="{ name: routerName, query: routerParams}">
    <!-- <img class="avatar" :src="avatar" alt=""> -->
    <div class="avatar" :style="{backgroundImage:'url('+avatar+')'}">
    </div>
    <div class="content">
      <div class="nickname">
        {{nickname}}
      </div>
      <div class="msg">
        {{msg}}
      </div>
    </div>
    <div class="time">
      {{time}}
    </div>
    <slot></slot>

  </router-link>
</template>
<script>
export default {
  name: "",
  props: {
    avatar: {
      type: String
    },
    nickname: {
      type: String
    },
    msg: {
      type: String
    },
    time: {
      type: String
    },
    link: {
      type: String
    },
    routerName: {
      type: String
    },
    routerParams: {
      type: Object
    }
  },
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>
.chat-cell {
  display: flex;
  position: relative;
  align-items: center;
  height: 70px;
  .avatar {
    width: 55px;
    height: 55px;
    margin-left: 4%;
    margin-right: 15px;
    border-radius: 8%;
    float: left;
    background-size: cover;
  }
  .nickname {
    font-size: 16px;
    margin-bottom: 7px;
  }
  .msg {
    font-size: 14px;
    color: #aaa;
  }
  .time {
    position: absolute;
    right: 4%;
    margin-top: -15px;
    float: right;
    color: #aaa;
    font-size: 14px;
  }
  &:nth-child(n+2):before {
    content: '';
    position: absolute;
    top: 0px;
    left: 4%;
    width: 96%;
    height: 1px;
    background: #ddd;
  }
  + .chat-cell {
  }
}
</style>
