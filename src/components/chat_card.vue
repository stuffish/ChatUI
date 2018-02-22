<template>
  <div class="chat-card" @click="click()">
    <div class="img" :style="{backgroundImage:'url('+ imgUrl + ')'}">
        <div v-if="hasLabel" class="vip-tag">
          <slot name="label"/>
        </div>
    </div>
    <div v-if="textContent" class="description">
      {{textContent}}
    </div>
    <transition name="fade">
      <div class="tag" v-if="hasTag">
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  // TODO: add props
  props: {
    imgUrl: {
      type: String,
    },
    hasLabel: {
      type: Boolean,
      default: false,
    },
    textContent: {
      type: String
    },
    hasTag: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({}),
  methods: {
    click() {
      this.$emit("click");
    }
  },
};
</script>
<style lang="scss">
.chat-card {
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
  + .chat-card {
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
</style>


