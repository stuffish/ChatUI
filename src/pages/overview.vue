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
        <transition name="fade">
          <ul v-show="menuShow" class="menus">
            <li @click="editAlias">
              Edit alias
            </li>
            <li>
              More...
            </li>
          </ul>
        </transition>
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
    <table>
      <tr v-if="info.accountId">
        <td>Account</td>
        <td>{{info.accountId}}</td>
      </tr>
      <tr v-if="info.alias&&info.nickname">
        <td>Nickname</td>
        <td>{{info.nickname}}</td>
      </tr>
      <tr v-if="info.gender">
        <td>Gender</td>
        <td>{{info.gender}}</td>
      </tr>
      <tr v-if="info.age">
        <td>Age</td>
        <td>{{info.age}}</td>
      </tr>

    </table>
    <table>
      <tr v-if="info.region">
        <td>Region</td>
        <td>{{info.region}}</td>
      </tr>
      <tr v-if="info.tel">
        <td>Tel</td>
        <td>{{info.tel}}</td>
      </tr>
    </table>
    <table>
      <tr v-if="info.tag">
        <td>Tag</td>
        <td>{{info.tag}}</td>
      </tr>
    </table>
    <a-dialog :show.sync="dialogShow" title="Input the new alias" :type="1" :content="info.alias" @positiveBtnClick="dialogPositive"></a-dialog>
  </div>
</template>
<script>
import ADialog from '@/components/a_dialog.vue';
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
      info: {}
    }
  },
  mounted() {
    this.contactId = this.$route.query.id;
    this.$http.get(`/api/user_overview/${this.contactId}`).then((response) => {
      let res = response.data;
      if (res.errno == 0) {
        this.info = res.data;
      }
    })
  },
  methods: {
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
    ADialog
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
}
</style>
