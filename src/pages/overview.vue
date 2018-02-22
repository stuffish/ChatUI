<template>
  <div class="overview">
    <div class="top">
      <div class="title">
        <div class="back" @click="goBack">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="option" @click="displayMenus">
          <i class="iconfont icon-gengduo"></i>
        </div>
        <chat-menu :show="menuShow" :menus="menus" @on-menu-click="onMenuClick"></chat-menu>
      </div>
        <div class="avatar" :style="{backgroundImage:'url(' + info.avatarImg + ')'}">
        </div>
        <div class="display-name">
          <span v-if="info.alias" class="">
            {{info.alias}}
          </span>
          <span v-else>
            {{info.nickname}}
          </span>
        </div>
    </div>
    <chat-table :column="tableColumn1" :value="tableValue1"></chat-table>
    <chat-table :column="tableColumn2" :value="tableValue2"></chat-table>
    <chat-table :column="tableColumn3" :value="tableValue3"></chat-table>
    <chat-dialog :show.sync="dialogShow" title="Input the new alias" :type="1" :content="info.alias" @positiveBtnClick="dialogPositive"></chat-dialog>
  </div>
</template>
<script>
import ChatMenu from '@/components/chat_menu.vue';
import ChatTable from '@/components/chat_table.vue';
import ChatDialog from '@/components/chat_dialog.vue';
import default_bg from '@/assets/bg0.jpg';
import pink_bg from '@/assets/bg1.jpg';
import dark_bg from '@/assets/bg2.jpg';
import gold_bg from '@/assets/bg3.jpg';
export default {
  name: "",
  data() {
    return {
      contactId: '',
      menuShow: false,
      dialogShow: false,
      info: {},
      menus: ['Edit alias', 'More...'],
      tableColumn1: ['Account', 'Nickname', 'Gender', 'Age'],
      tableValue1: [],
      tableColumn2: ['Region', 'Tel'],
      tableValue2: [],
      tableColumn3: ['Tag'],
      tableValue3: [],
    }
  },
  mounted() {
    this.contactId = this.$route.query.id;
    this.$http.get(`/api/user_overview/${this.contactId}`).then((response) => {
      let res = response.data;
      if (res.errno == 0) {
        this.info = res.data;
        this.tableValue1.push(this.info.accountId);
        this.tableValue1.push(this.info.nickname);
        this.tableValue1.push(this.info.gender);
        this.tableValue1.push(this.info.age);
        this.tableValue2.push(this.info.region);
        this.tableValue2.push(this.info.tel);
        this.tableValue3.push(this.info.tag);
      }
    })
  },
  methods: {
    onMenuClick(index, val) {
      if (index == 0) {
        this.editAlias();
      }
    },
    goBack() {
      this.$router.goBack();
    },
    displayMenus() {
      this.menuShow = !this.menuShow;
    },
    editAlias() {
      this.menuShow = false;
      this.dialogShow = true;
    },
    dialogPositive(rs) {
      this.info.alias = rs;
      this.dialogShow = false;
    },
    dialogNegative() {
      this.dialogShow = false;
    }
  },
  components: {
    ChatDialog,
    ChatMenu,
    ChatTable
  }
}
</script>
<style lang="scss">
.theme-default .top {
  background: url(../assets/bg0.jpg);
}
.theme-pink .top {
  background: url(../assets/bg1.jpg);
}
.theme-dark .top {
  background: url(../assets/bg2.jpg);
}
.theme-gold .top {
  background: url(../assets/bg3.jpg);
}
.overview {
  min-height: 100vh;
  background: #e4e4e4;
  .top {
    height: 270px;
    background-position: top;
    background-size: cover;
    color: #fff;
    .title {
      display: flex;
      position: relative;
      align-items: center;
      height: 48px;
      color: #fff;
      .back {
        width: 20%;
        > i{
          margin-left: 10px;
        }
      }
      .option {
        position: absolute;
        right: 0;
        width: 20%;
        > i {
          float: right;
          margin-right: 10px;
        }
      }
      .display-name {
        font-size: 24px;
      }

    }
    .avatar {
      height: 120px;
      width: 120px;
      margin: 26px auto 0;
      border-radius: 50%;
      border: 3px solid rgba(#fff, .8);
      overflow: hidden;
      background-size: cover;
      background-position: center;
    }
    .avatar + div {
      text-align: center;
      margin-top: 17px;
    }
  }
}
</style>
