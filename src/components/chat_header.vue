<template>
  <div class="chat-header" :class="{'fixed': fixed}" :style="{height: height + 'px'}">
    <div class="left">
      <div v-if="back" class="" @click="goBack">
        <i class="iconfont icon-fanhui"></i>
      </div>
    </div>
    <div class="title">
      {{title}}
    </div>
    <div class="option">
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 50
    },
    back: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    }
  },
  methods: {
    goBack() {
      this.$router.goBack()
    }
  }
}
</script>
<style lang="scss">
.chat-header {
  display: table;
  width: 100vw;
  background-size: 100% 100%;
  color: #fff;
  transition: .3s;
  > * {
    display: table-cell;
    vertical-align: middle;
  }
  .left {
    width: 20%;
    overflow: hidden;
    i {
      margin-left: 10px;
    }
  }
  .title {
    text-align: center;
  }
  .option {
    width: 20%;
  }
  &.fixed {
    position: fixed;
    z-index: 500;
  }
  &:after {
    content: '';
    position: absolute;
    height: 90px;
    width: 100vw;
    background: #fff;
  }
}
</style>
