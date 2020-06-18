<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请注册</h3>
        </div>

        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <el-input v-model.trim="username" @blur="checkUsername" placeholder="请输入用户名"
              prefix-icon="el-icon-user-solid">
            </el-input>
          </div>
          <div class="form-group">
            <el-input v-model.trim="password" id="password" @blur="checkPassword" type="password" placeholder="请填写密码"
              prefix-icon="el-icon-warning">
            </el-input>
          </div>
          <div class="form-group">
            <el-input v-model.trim="cpassword" @blur="confirmPass" type="password" placeholder="请填写确认密码"
              prefix-icon="el-icon-success">
            </el-input>
          </div>
          <div class="form-group">
            <input v-model.trim="captcha" v-validator.required="{ title: '图片验证码' }" type="text" class="form-control"
              placeholder="请填写验证码">
          </div>
          <div class="thumbnail" title="点击图片重新获取验证码" @click="getCaptcha">
            <div class="captcha vcenter" v-html="captchaTpl"></div>
          </div>
          <button type="submit" class="btn btn-lg btn-success btn-block" @click="register">
            <i class="fa fa-btn fa-sign-in"></i> 注册
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { register, userInfo } from 'network/user.js'
  import createCaptcha from '@/utils/createCaptcha'
  import ls from '@/utils/localStorage'

  export default {
    name: 'Register',
    data() {
      return {
        captchaTpl: '', // 验证码模板
        localCaptcha: '',
        username: '', // 用户名
        password: '', // 密码
        cpassword: '', // 确认密码
        captcha: '', // 验证码
        checkuser: false,
        checkpass: false,
        checkcpass: false

      }
    },
    created() {
      this.getCaptcha()
    },
    methods: {
      checkUsername() {
        console.log(this)
        let regex = /^[a-zA-Z]+\w*\s?\w*$/
        if (!regex.test(this.username)) {
          this.$message.error('用户名要求以字母开头的单词字符！');
          this.checkuser = false
        } else {
          this.checkuser = true
        }
      },
      checkPassword() {
        let regex = /^\w{6,16}$/
        if (!regex.test(this.password)) {
          this.$message.error('密码要求 6 ~ 16 个单词字符！');
          this.checkpass = false
        } else {
          this.checkpass = true
        }
      },
      confirmPass() {
        if (this.password != this.cpassword) {
          this.$message.error('密码不匹配！');
          this.checkcpass = false
        } else {
          this.checkcpass = true
        }
      },


      getCaptcha() {
        const { tpl, captcha } = createCaptcha(6)
        this.captchaTpl = tpl
        this.localCaptcha = captcha
      },
      register(e) {
        this.$nextTick(() => {
          const target = e.target.type === 'submit' ? e.target : e.target.parentElement
          if (target.canSubmit) {
            this.submit()
          }
        })
      },
      submit() {
        if (this.captcha.toUpperCase() !== this.localCaptcha) {
          this.$message.error('验证码不正确');
          this.getCaptcha()
        } else {
          if (!this.checkuser) {
            this.$message.error('用户名要求以字母开头的单词字符');
          } else if (!this.checkpass) {
            this.$message.error('密码要求 6 ~ 16 个单词字符！');
          } else if (!this.checkcpass) {
            this.$message.error('密码不匹配!');
          } else {
            const user = {
              username: this.username,
              password: this.password,
              avatar: `https://api.adorable.io/avatars/200/${this.username}.png`
            }
            register(user.username, user.password, user.avatar).then(res => {

              userInfo(this.username).then(res => {
                console.log(res.data);
                let user = {
                  id: res.data[0],
                  username: res.data[1],
                  avatar: res.data[2],
                  is_admin: res.data[3]
                }
                this.login(user)
              }).catch(err => {
                console.log(err)
              })

            }).catch(err => {
              this.$message.error('该用户已存在');
            })
          }

          // 
          // if (localUser) {
          //   if (localUser.name === user.name) {
          //     this.showMsg('用户名已存在')
          //   } else {
          //     this.login(user)
          //   }
          // } else {
          //   this.login(user)
          // }
        }
      },
      login(user) {
        this.$store.dispatch('login', user)
        this.$message({
          message: '注册成功',
          type: 'success'
        });

      },

    }
  }
</script>

<style scoped>
  .thumbnail {
    width: 170px;
    margin-top: 10px;
    cursor: pointer;
  }

  .thumbnail .captcha {
    height: 46px;
    background: #E1E6E8;
  }

  .captcha {
    font-size: 24px;
    font-weight: bold;
    user-select: none;
  }

  .form-control {
    border: 1px solid #DCDFE6;
    height: 40px;
  }

  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: rgb(108, 166, 205);
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(108, 166, 205, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(108, 166, 205, 0.6);
  }

  .btn-success {
    background-color: rgba(108, 166, 205, .8);
    border-color: rgba(108, 166, 205, .8);
  }

  .btn-success:hover {
    background-color: rgb(108, 166, 205);
    border-color: rgb(108, 166, 205);
  }
</style>