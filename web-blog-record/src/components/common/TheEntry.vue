<template>
  <div class="navbar-right">
    <ul v-if="auth" class="nav navbar-nav github-login">
      <li>
        <a v-dropdown href="javascript:;">
          <span v-if="user">
            <img v-if="user.avatar" :src="user.avatar" class="avatar-topnav">
            <span v-if="user.name">{{ user.name }}</span>
          </span>
          <span v-else>佚名</span>
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <!-- 编辑资料 -->
          <li>
            <router-link to="/users/edit">
              <i class="fa fa-cog text-md i-middle"></i>
              编辑资料
            </router-link>
          </li>
          <li>
            <router-link to="/articles/create">
              <i class="fa fa-paint-brush text-md"></i>
              创作文章
            </router-link>
          </li>
          <li v-if="user">
            <router-link :to="`/${user.username}`">
              <i class="fa fa-file-o text-md i-middle"></i>
              个人专栏
            </router-link>
          </li>
          <li v-if="user && user.is_admin">
            <router-link :to="`/admin/manage`">
              <i class="fa fa-list-ul text-md i-middle"></i>
              后台管理
            </router-link>
          </li>


          <li><a href="javascript:;" @click="logout"><i class="fa fa-sign-out text-md"></i>退出</a></li>
        </ul>
      </li>
    </ul>
    <div v-else class="nav navbar-nav github-login">
      <router-link to="/auth/login" class="btn btn-default login-btn">
        <i class="fa fa-user"></i> 登 录
      </router-link>
      <router-link to="/auth/register" class="btn btn-default login-btn">
        <i class="fa fa-user-plus"></i> 注 册
      </router-link>
    </div>
  </div>
</template>

<script>


  export default {
    name: 'TheEntry',
    computed: {
      auth() {
        return this.$store.state.auth
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      logout() {
        this.$swal({
          text: '你确定要退出吗?',
          confirmButtonText: '退出'
        }).then((res) => {
          if (res.value) {
            this.$store.dispatch('logout')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>