<template>
  <div class="a-header">
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
    back: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    bgColor: {
      type: String,
      default: '#fff'
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
.a-header {
  display: table;
  width: 100vw;
  height: 48px;
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
}
</style>
