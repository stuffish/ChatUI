<template>
  <div class="pop-bubble" @click="click">
    <div class="bubblu-icon">
      <slot name="icon"></slot>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    click() {
      this.$emit('click');
    }
  }
}
</script>
<style type="text/css" lang="scss">
.pop-bubble {
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
  .bubblu-icon > * {
    font-size: 22px;
  }
}
</style>