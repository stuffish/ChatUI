<template>
  <div :class="theme" id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    theme() {
      return 'theme-'+ this.$store.state.theme;
    }
  }
}
</script>

<style lang="scss">
@import "styles/common.scss";
@import "styles/base/reset.scss";
@import "styles/base/animate.scss";
@import "'//at.alicdn.com/t/font_463713_020jnoxnk4kj4i.css'";
</style>
