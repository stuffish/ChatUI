<template>
  <div class="pay">
    <chat-header title="Pay"></chat-header>
    <div class="logo"></div>
    <img class="qr" src="../assets/qr.jpg" alt="">
    <div class="txt">
      Scan the QR code with AliPay and transfer<br>
      VIP account will unlock automatically
    </div>
  </div>
</template>
<script>
import ChatHeader from '@/components/chat_header.vue';
export default {
  name: "",
  data: () => ({

  }),
  components: {
    ChatHeader
  }
}
</script>
<style lang="scss">
.pay {
  background: #ddd;
  color: #666;
  > *:not(.chat-header) {
    text-align: center;
  }
  .logo {
    position: relative;
    display: block;
    margin: 14vh auto 2vh;
    width: 50px;
    height: 50px;
    border-radius: 9px;
    background-image: url('../assets/alipay.jpg');
    background-size: 100% 100%;
    z-index: 10;
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      right: 120%;
      width: calc(40vw - 50%);
      height: 1px;
      background: #999;
      z-index: 5;
    }
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 120%;
      width: calc(40vw - 50%);
      height: 1px;
      background: #999;
      z-index: 5;
    }
  }
  .qr {
    display: block;
    margin: 0 auto 2vh;
    width: 70vw;
    height: 70vw;
    background-size: 100% 100%;
  }
  .txt {
    line-height: 25px;
  }
}
</style>
