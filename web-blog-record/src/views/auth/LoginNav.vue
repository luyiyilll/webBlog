<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
      <el-tabs v-model="activeName" @tab-click="handleClick" stretch="true">
        <el-tab-pane label="用户登录" name="first">
          <user-login :title="title"></user-login>
        </el-tab-pane>
        <el-tab-pane label="管理员登录" name="second">
          <user-login></user-login>
        </el-tab-pane>
      </el-tabs>


    </div>
  </div>
</template>

<script>
  import UserLogin from 'views/auth/Login.vue'
  export default {
    name: 'LoginNav',
    data() {
      return {
        activeName: 'first',
        title: "普通用户"
      }
    },
    components: {
      UserLogin
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
    }
  }
</script>

<style scoped>

</style>