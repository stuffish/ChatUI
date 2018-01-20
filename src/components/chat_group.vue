<template>
  <div class="chat-group">
    <chat-cell v-for="(item,index) in data"
    :key="item.key"
    :avatar="item.avatar"
    :nickname="item.displayName"
    :msg="item.msg"
    :time="format(item.time, 'hour')"
    @click="click(index, item)">
    </chat-cell>
    <slot></slot>
  </div>
</template>
<script>
import ChatCell from './chat_cell.vue'
export default {
  name: "chat-group",
  props: {
    data: {
      type: Array
    },
  },
  data: () => ({
  }),
  methods: {
    format(t, str) {
      let time = new Date(t * 1000);
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
    },
    click(index, item) {
      this.$emit('on-cell-click', index, item);
    }
  },
  components: {
    ChatCell
  }
}
</script>
<style lang="scss">
.chat-group {
  height: 100%;
  overflow-y: scroll;
}
</style>
