<template>
  <div class="users-show">
    <div class="col-md-3 main-col">
      <div class="box">
        <div class="padding-md">
          <div class="list-group text-center">
            <router-link to="/users/edit" class="list-group-item">
              <i class="text-md fa fa-list-alt"></i>
              个人信息
            </router-link>
            <router-link to="/users/edit_avatar" class="list-group-item">
              <i class="text-md fa fa-picture-o"></i>
              修改头像
            </router-link>
            <router-link to="/users/edit_password" class="list-group-item">
              <i class="text-md fa fa-lock"></i>
              修改密码
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
    name: 'UsersEdit',
    data() {
      return {
        // links: [
        //   {
        //     name: 'edit',
        //     title: '个人信息',
        //     icon: 'list-alt'
        //   },
        //   {
        //     name: 'edit_avatar',
        //     title: '修改头像',
        //     icon: 'picture-o'
        //   },
        //   {
        //     name: 'edit_password',
        //     title: '修改密码',
        //     icon: 'lock'
        //   }
        // ]
      }
    },
    computed: {

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