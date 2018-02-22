<template>
  <table class="chat-table">
    <tr v-for="(i,index) in column" @click="click(i, value[index])">
      <td>{{i}}</td>
      <td>{{value[index]}}</td>
    </tr>
  </table>
</template>
<script>
export default {
  name: "",
  props: {
    column: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  data: () => ({

  }),
  methods: {
    click() {
      this.$emit('on-row-click', index, name, value);
    }
  }
}
</script>
<style lang="scss">
table {
  width: 100%;
  color: #555;
  background: #fff;
  tr {
    height: 44px;
    text-indent: 1.5em;
    td {
      vertical-align: middle;
    }
    td:nth-child(2n+1) {
      font-size: 14px;
      opacity: .8;
      width: 100px;
    }
  }
  tr:nth-child(n+2) {
    border-top: 1px solid #e8e8e8;
  }
  tr:active {
    background: #eee;
  }
  + table {
    margin-top: 20px;
  }
}
</style>
