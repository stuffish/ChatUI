<template>
  <transition name="fade">
    <div class="chat-menu">
      <ul v-show="show" class="menus">
        <li v-for="(val,index) in menus" @click="click(index, val)">
          {{val}}
        </li>
      </ul>
    </div>
  </transition>
</template>
<script>
export default {
  name: "chat-menu",
  props: {
    menus: {
      type: Array,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({

  }),
  methods: {
    click(index, val) {
      this.$emit('on-menu-click', index, val);
      this.$emit('update:show', false);
    }
  }
}
</script>
<style lang="scss">
.menus {
  position: absolute;
  top: 100%;
  right: 0;
  width: 150px;
  line-height: 45px;
  text-align: center;
  color: #404040;
  box-shadow: 0 0 4px 0 #555;
  background: #fff;
  li {
    display: block;
    width: 100%;
    height: 45px;
    &:active {
      background: #eee;
    }
    + li {
      border-top: 1px solid #e8e8e8;
    }
  }
}
</style>
