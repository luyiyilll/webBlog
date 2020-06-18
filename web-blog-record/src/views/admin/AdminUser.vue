<template>
  <div class="col-md-9 col-sm-12 col-xs-12 left-col pull-right">
    <div class="panel article-body article-index">
      <div class="panel-body">
        <div class="user-top">
          <div class="user-title">全部用户</div>
          <div class="add-user" @click="dialogFormVisible = true">
            <a href="javascript:;" class="btn btn-primary pull-right">
              <i class="fa fa-plus"></i>
              添加用户
            </a>
          </div>
        </div>

        <el-table :data="userList" style="width: 100%" row-key="id" border lazy
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column prop="avatar" label="头像" width="100" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.avatar" class="img-avatar" min-width="70" height="70" />
            </template>
          </el-table-column>
          <el-table-column prop="username" label="用户名" align="center" width="100">
          </el-table-column>
          <!-- <el-table-column prop="post_date" label="发布时间">
        </el-table-column> -->
          <el-table-column prop="sex" label="性别" width="100" align="center">
          </el-table-column>
          <el-table-column prop="school" label="学校" width="100" align="center">
          </el-table-column>
          <el-table-column prop="introduce" label="个人简介" align="center">
          </el-table-column>
          <el-table-column align="center" width="160">
            <template slot="header" slot-scope="scope">
              操作
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>




        <!-- <ul class="list-group">
          <li v-for="(user,index) in userList" class="list-group-item">
            <img :src="user.avatar" class="avatar avatar-small">
            <router-link :to="`/${user.username}`" class="title">
              第{{ user.id}}位用户-{{user.username}}
            </router-link>
            <span class="meta pull-right">
              <span class="timeago">

                <a href="javascript:;" @click="edit(index)"><i class="fa fa-edit"></i></a>
                <a href="javascript:;" @click="deleteUser(user.id,user.username)"><i class="fa fa-trash-o"></i></a>
              </span>
            </span>
          </li>
        </ul> -->
      </div>
    </div>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" center width="370px">
      <el-form :model="formuser">
        <!-- <div class="form-group flex">
          <img :src="formuser.avatar" class="avatar-preview-img">
          <div class="avatar-address">
            <div class="avatar-pre-title">头像地址链接:</div>
            <input v-model.trim.lazy="formuser.avatar" v-validator.required="{ title: '头像地址' }" type="text"
              class="form-control avatar-input">
          </div>
        </div> -->

        <div class="form-group">
          <el-input v-model.trim="formuser.username" @blur="checkUsername(formuser.username)" placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid">
          </el-input>
        </div>
        <div class="form-group">
          <el-input v-model.trim="formuser.password" id="password" @blur="checkPassword(formuser.password)"
            type="password" placeholder="请填写密码" prefix-icon="el-icon-warning">
          </el-input>
        </div>
        <div class="form-group">
          <el-input v-model.trim="formuser.cpassword" @blur="confirmPass" type="password" placeholder="请填写确认密码"
            prefix-icon="el-icon-success">
          </el-input>
        </div>
        <!-- <div class="form-group">
          <label>性别</label>
          <el-radio v-model="formuser.sex" label="male">男</el-radio>
          <el-radio v-model="formuser.sex" label="female">女</el-radio>
        </div> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>



    <el-dialog title="添加用户" :visible.sync="dialogEditVisible" center width="370px">
      <el-form :model="edituser">
        <div class="form-group flex">
          <img :src="edituser.avatar" class="avatar-preview-img">
          <div class="avatar-address">
            <div class="avatar-pre-title">头像地址链接:</div>
            <input v-model.trim.lazy="edituser.avatar" v-validator.required="{ title: '头像地址' }" type="text"
              class="form-control avatar-input">
          </div>
        </div>
        <!-- <div class="form-group flex">
          <el-input v-model.trim="edituser.username" @blur="checkUsername(edituser.username)" placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid">
          </el-input>
        </div> -->
        <div class="form-group">
          <el-input v-model.trim="edituser.password" id="password" @blur="checkPassword(edituser.password)" type="text"
            placeholder="请填写密码" prefix-icon="el-icon-warning">
          </el-input>
        </div>
        <div class="form-group">
          <label class="label-sex">性别</label>
          <el-radio v-model="edituser.sex" label="male">男</el-radio>
          <el-radio v-model="edituser.sex" label="female">女</el-radio>
        </div>
        <div class="form-group">
          <el-input v-model.trim="edituser.school" type="text" placeholder="请填写学校" prefix-icon="el-icon-s-promotion">
          </el-input>
        </div>
        <div class="form-group">
          <select v-model="value" placeholder="请选择" class="form-control">
            <option value="junior">初中</option>
            <option value="Senior">高中</option>
            <option value="associate ">专科</option>
            <option value="bachelor ">本科</option>
            <option value="master">硕士</option>
            <option value="philosophy ">博士</option>
            <option value="postdoctor">博士后</option>
          </select>
        </div>
        <div class="form-group">
          <el-input v-model.trim="edituser.introduce" type="textarea" placeholder="请填写个人简介"
            prefix-icon="el-icon-warning">
          </el-input>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // 引入 mapState 辅助函数

  import { getAllUsers, register, deleteUser, adminUpdateUser } from 'network/user'

  export default {
    name: 'AdminUser',
    data() {
      return {
        articleList: '',
        user_id: '',
        info: '',
        userList: [],

        formuser: {
          username: '',
          password: '',
          cpassword: '',
          avatar: '',
          sex: 'male'
        },
        checkuser: false,
        checkpass: false,
        checkcpass: false,
        dialogFormVisible: false,
        // formLabelWidth: '120px',

        dialogEditVisible: false,
        edituser: {
          username: '',
          password: '',
          cpassword: '',
          avatar: '',
          sex: '',
          introduce: '',
          school: '',
          edubg: '',
          is_admin: ''
        },
        options: [{
          value: 'junior',
          label: '初中'
        }, {
          value: 'Senior',
          label: '高中'
        }, {
          value: 'associate',
          label: '专科'
        }, {
          value: 'bachelor',
          label: '本科'
        }, {
          value: 'master',
          label: '硕士'
        },
        {
          value: 'philosophy',
          label: '博士'
        },
        {
          value: 'postdoctor',
          label: '博士后'
        }],
        value: '',
        currentUserIndex: 0

      }
    },
    computed: {
      getInfo() {
        return this.info
      },
      user() {
        return this.$store.state.user
      }
    },
    watch: {
      '$route'(to, from) { // 监听路由是否变化
        if (to.params.user !== from.params.user) {
          this.getData() // 重新加载数据
        }
      }
    },
    created() {
      this.getAllUsers()
    },
    methods: {
      getAllUsers() {
        getAllUsers().then(res => {
          let info = []
          res.data.forEach((item, index, array) => {
            let data = {
              id: item[0],
              username: item[1],
              password: item[2],
              avatar: item[3],
              introduce: item[4],
              sex: item[5],
              school: item[6],
              edubg: item[7],
              is_admin: item[8]
            }
            info.push(data)
          })
          this.userList = info
        }).catch(err => {
          console.log(err)
        })
      },


      checkUsername(username) {
        console.log(this)
        let regex = /^[a-zA-Z]+\w*\s?\w*$/
        if (!regex.test(username)) {
          this.$message.error('用户名要求以字母开头的单词字符！');
          this.checkuser = false
        } else {
          this.checkuser = true
        }
      },
      checkPassword(password) {
        let regex = /^\w{6,16}$/
        if (!regex.test(password)) {
          this.$message.error('密码要求 6 ~ 16 个单词字符！');
          this.checkpass = false
        } else {
          this.checkpass = true
        }
      },
      confirmPass() {
        if (this.formuser.password != this.formuser.cpassword) {
          this.$message.error('密码不匹配！');
          this.checkcpass = false
        } else {
          this.checkcpass = true
        }
      },
      addConfirm() {
        if (!this.checkuser) {
          this.$message.error('用户名要求以字母开头的单词字符！');
        } else if (!this.checkpass) {
          this.$message.error('密码要求 6 ~ 16 个单词字符！');
        } else if (!this.checkcpass) {
          this.$message.error('密码不匹配！');
        } else {
          const user = {
            username: this.formuser.username,
            password: this.formuser.password,
            avatar: `https://api.adorable.io/avatars/200/${this.formuser.username}.png`
          }
          register(user.username, user.password, user.avatar).then(res => {
            this.getAllUsers()
            this.dialogFormVisible = false
            this.$message({
              message: '添加用户成功',
              type: 'success'
            });
          }).catch(err => {
            this.$message.error('添加用户失败');
          })
        }

      },
      handleDelete(index, row) {
        let uid = row.id
        let username = row.username
        this.$swal({
          text: '你确定要删除此用户吗?',
          confirmButtonText: '删除'
        }).then((res) => {
          if (res.value) {
            // 此时不用传入 comment
            deleteUser(uid, username).then(res => {
              this.getAllUsers()
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }).catch(err => {
              this.$message.error('删除失败');
            })
          }
        })
      },
      // deleteUser(uid, username) {
      // this.$swal({
      //   text: '你确定要删除此用户吗?',
      //   confirmButtonText: '删除'
      // }).then((res) => {
      //   if (res.value) {
      //     // 此时不用传入 comment
      //     deleteUser(uid, username).then(res => {
      //       this.getAllUsers()
      //       this.$message({
      //         message: '删除成功',
      //         type: 'success'
      //       });
      //     }).catch(err => {
      //       this.$message.error('删除失败');
      //     })
      //   }
      // })
      // },

      handleEdit(index, row) {
        let id = row.id
        this.edituser.password = row.password
        this.checkPassword(this.edituser.password)
        this.edituser.avatar = row.avatar
        this.edituser.sex = row.sex
        this.edituser.school = row.school
        this.value = row.edubg
        this.edituser.introduce = row.introduce
        this.dialogEditVisible = true
      },

      editUser() {

        // if (!this.checkuser) {
        //   this.$message.error('用户名要求以字母开头的单词字符！');
        // } else 
        if (!this.checkpass) {
          this.$message.error('密码要求 6 ~ 16 个单词字符！');
        } else {
          adminUpdateUser(this.userList[this.currentUserIndex].id, this.edituser.password, this.edituser.avatar, this.edituser.sex, this.edituser.school, this.value, this.edituser.introduce).then(res => {
            this.dialogEditVisible = false
            this.getAllUsers()
          }).catch(err => {
            console.log(err)
          })
        }

      }
    },


  }
</script>

<style>
  .user-top {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
  }

  .panel {
    margin-top: 0px;
  }


  .user-title {
    padding-left: 12px;
    font-size: 20px;
    font-weight: bold;
  }

  .add-user {
    padding-right: 8px;
    margin-top: 8px;
  }

  .avatar-preview-img {
    min-width: 100px;
    min-height: 100px;
    border-radius: 50%;
    max-width: 100px;
    margin-bottom: 10px;
    border: 5px solid rgba(108, 166, 205, .1);
    box-shadow: 3px 3px 10p rgb(108, 166, 205);
  }

  .flex {
    justify-content: center;
    font-weight: bold;
  }

  .avatar-pre-title {
    font-size: 14px;
    font-weight: 200px;
    padding-left: 10px;
    margin-top: 20px;
    vertical-align: middle;
    padding-bottom: 10px;
  }

  .avatar-address {
    margin-left: 10px;
  }

  .label-sex {
    margin-right: 10px;
  }

  .form-control {
    height: 40px;
    border: 1px solid #DCDFE6;
  }

  .form-control:focus {
    border-color: #00b5ad;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(108, 166, 205, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(108, 166, 205, 0.6);

  }

  .form-control[data-v-38afeea0]:focus {
    border: 1px solid rgb(108, 166, 205);
  }

  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #00b5ad;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(108, 166, 205, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(108, 166, 205, 0.6);
    border: 1px solid rgb(108, 166, 205);
  }


  .img-avatar {
    border: 5px solid rgba(220, 220, 220, .3);
    border-radius: 10px;

  }
</style>