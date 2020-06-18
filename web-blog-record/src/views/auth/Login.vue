<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">

      <el-tabs v-model="activeName" @tab-click="handleClick" :stretch=true>
        <el-tab-pane label="用户登录" name="first">
        </el-tab-pane>
        <el-tab-pane label="管理员登录" name="second">
        </el-tab-pane>
      </el-tabs>

      <div class="panel panel-default">
        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <!-- <label class="control-label">用户名</label>
            <input v-model.trim="username" v-validator.required="{ title: '用户名' }" type="text" class="form-control"
              placeholder="请填写用户名"> -->
            <el-input v-model.trim="username" placeholder="请输入用户名" prefix-icon="el-icon-user-solid">
            </el-input>
          </div>
          <div class="form-group">
            <el-input v-model.trim="password" id="password" type="password" placeholder="请填写密码"
              prefix-icon="el-icon-success">
            </el-input>
            <!-- <label class="control-label">密码</label>
            <input v-model.trim="password" id="password" v-validator.required="{ title: '密码' }" type="password"
              class="form-control" placeholder="请填写密码"> -->
          </div>
          <br>
          <button @click="submit" type="submit" class="btn btn-lg btn-success btn-block">
            <i class="fa fa-btn fa-sign-in"></i> 登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { login } from 'network/user.js'
  export default {
    name: 'Login',
    data() {
      return {
        username: '', // 用户名
        password: '', // 密码
        activeName: 'first',
        title: '普通用户'

      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab.index);
        if (tab.index == 0) {
          this.title = "普通用户"
        } else {
          this.title = "管理员"
        }
      },

      submit() {
        const user = {
          name: this.username,
          password: this.password
        }
        login(this.username, this.password).then(res => {
          const user = {
            id: res.data.id,
            username: res.data.username,
            password: res.data.password,
            avatar: res.data.avatar,
            is_admin: res.data.is_admin
          }
          this.$store.dispatch('login', user);
          this.$message({
            message: '登录成功',
            type: 'success'
          });

        }).catch(err => {
          this.$message.error('不存在该用户');

        })


      },

    }
  }
</script>

<style>
  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: rgb(108, 166, 205);
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(108, 166, 205, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(108, 166, 205, 0.6);
  }

  .el-tabs__item {
    padding: 0 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 15px;
    font-weight: 500;
    color: #000;
    position: relative;
    background: #fff;
  }

  .el-tabs__content {
    height: calc(100% - 40px);
  }

  .el-tabs--card>.el-tabs__header {
    border-bottom: 1px solid #E4E7ED;
    background-color: gainsboro;
  }

  .el-tabs__item.is-active {
    color: rgb(108, 166, 205);
  }

  .el-tabs__item:hover {
    color: rgb(108, 166, 205);
    cursor: pointer;
  }

  .el-tabs__active-bar {
    background-color: rgb(108, 166, 205);
  }

  .panel {
    border-top: 1px solid rgb(240, 240, 240);
    margin-top: -15px;
  }

  .panel-body {
    padding: 30px 60px;

  }

  .form-group {
    display: flex;
  }

  .control-label {
    width: 80px;
  }

  .form-control {
    flex: 1;
  }

  .btn-success {
    background-color: rgba(108, 166, 205, .8);
    border-color: rgba(108, 166, 205, .8);
  }

  .btn-success:hover {
    background-color: rgb(108, 166, 205);
    border-color: rgb(108, 166, 205);
  }

  .btn-success:active,
  .btn-success.active,
  .open>.btn-success.dropdown-toggle {
    color: #fff;
    background-color: rgb(108, 166, 205);
    background-image: none;
    border-color: rgb(108, 166, 205);
  }
</style>