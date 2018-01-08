<template>
  <transition name="up-appear">
    <div  v-if="show" class="dialog-wrap">
      <div class="a-dialog">
        <div class="title">
          {{title}}
        </div>
        <div class="content">
          <div v-if="type == 0" class="">
            {{dialogContent}}
          </div>
          <div v-else-if="type == 1" class="">
            <input type="text" v-model="dialogContent">
          </div>
        </div>
        <div class="btns">
          <button class="positive-btn" type="button" name="button0" @click="positiveBtnClick">{{positiveBtn}}</button>
          <button class="negative-btn" type="button" name="button1" @click="negativeBtnClick">{{negativeBtn}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "",
  props: {
    type: {
      type: Number,
      default: 0
    },
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    positiveBtn: {
      type: String,
      default: 'Confirm'
    },
    negativeBtn: {
      type: String,
      default: 'Cancel'
    }
  },
  data() {
    return {
      dialogContent: ''
    }
  },
  methods: {
    positiveBtnClick() {
      this.$emit('positiveBtnClick', this.dialogContent);
    },
    negativeBtnClick() {
      this.$emit('negativeBtnClick');
      this.$emit('update:show', false);
    }
  },
  watch: {
    show(curVal, oldVal) {
      if (curVal) {
        this.dialogContent = this.content;
      }
    }
  }
}
</script>
<style lang="scss">
@import '../styles/base/animate.scss';
.dialog-wrap {
  display: flex;
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
.a-dialog {
  $colorBorder: #ddd;
  width: 210px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 7px -3px #000;
  box-sizing: border-box;
  overflow: hidden;
  .title {
    box-sizing: border-box;
    height: 42px;
    padding: 10px;
    line-height: 22px;
    color: #fff;
  }
  .content {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    background: #fff;
    line-height: 20px;
    input {
      width: 100%;
      height: 30px;
      line-height: 35px;
      text-indent: 4px;
      border: 0;
      border-bottom: 1px solid;
      background: transparent;
    }
  }
  .btns {
    display: flex;
    width: 100%;
    height: 35px;
    box-shadow: 0 -1px 3px -2px #000;
    button {
      flex: 1;
      border: 0;
      background: #eee;
      transition: .3s;
      color: #484848;
      + button {
        border-left: 1px solid $colorBorder;
      }
    }
    .positive-btn:active {
      color: #fff;
      background: #59c59e;
    }
    .negative-btn:active {
      color: #fff;
      background: #f15858;
    }
  }
}
// @media (max-width:320px) {
//   .a-dialog {
//     width: 170px;
//     margin-left: -85px;
//   }
// }
</style>
