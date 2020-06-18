<template>
  <div class="users-show">
    <!-- <div @getData='getDatas(arguments)'>
      <Message :show.sync="msgShow" :type="msgType" :msg="msg" />
    </div> -->

    <div class="col-md-3 main-col">
      <div class="box">
        <div class="padding-md">
          <div class="list-group text-center">
            <router-link v-for="link in links" :key="link.name" :to="`/admin/${link.name}`" class="list-group-item">
              <i :class="`text-md ${link.icon}`"></i>
              {{ link.title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>

  export default {
    name: 'AdminNav',
    data() {
      return {
        links: [
          {
            name: 'manage',
            title: '用户管理',
            icon: 'el-icon-user-solid'
          },
          {
            name: 'manage_article',
            title: '文章管理',
            icon: 'el-icon-tickets'
          },
          {
            name: 'manage_comment',
            title: '评论管理',
            icon: 'el-icon-chat-round'
          }
        ]
      }
    },
    computed: {
      // getMsg() {
      //   return this.$store.state.msg;
      // },
      // getMsgType() {
      //   return this.$store.state.msgType;
      // },
      // getMsgShow() {
      //   return this.$store.state.msgShow
      // }

    },
  }
</script>

<style scoped>
  .list-group-item.active,
  .list-group-item.active:hover,
  .list-group-item.active:focus {
    background-color: #6ca6cd;
    border-color: #6ca6cd;
  }
</style>