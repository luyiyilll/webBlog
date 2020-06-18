<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
      <div class="panel-body">
        <h4><b>个人资料</b></h4>
        <hr>
        <div class="form-horizontal" data-validator-form>
          <!-- <div class="flex">
            <div class="avatar-box">
              <img :src="avatar" alt="头像" class="avatar">
            </div>
            <div class="username">
              <div class="">
                <span>第{{id}}用户：{{username}}</span>
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="update-avatar">修改头像</div>
            <div class="border"></div>
          </div> -->
          <div class="form-group ">
            <label class="col-sm-2 control-label">学校</label>
            <div class="col-sm-6">
              <input v-model.trim="school" type="text" class="form-control">
            </div>
          </div>

          <div class="form-group ">
            <label class="col-sm-2 control-label">学历</label>
            <div class="col-sm-6">
              <select v-model="college" class="form-control">
                <option value="">未选择</option>
                <option value="junior">初中</option>
                <option value="Senior">高中</option>
                <option value="associate ">专科</option>
                <option value="bachelor ">本科</option>
                <option value="master">硕士</option>
                <option value="philosophy ">博士</option>
                <option value="postdoctor">博士后</option>
              </select>
            </div>
          </div>

          <div class="form-group ">
            <label class="col-sm-2 control-label">性别</label>
            <div class="col-sm-6">
              <select v-model="sex" class="form-control">
                <option value="">未选择</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
          </div>
          <!-- <div class="form-group">
            <label class="col-sm-2 control-label">兴趣</label>
            <div class="col-sm-6">
              <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </div>
          </div> -->
          <div class="form-group">
            <label class="col-sm-2 control-label">个人简介</label>
            <div class="col-sm-6">
              <textarea v-model.trim="introduction" type="text" class="form-control"></textarea>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-6">
              <button type="submit" class="btn btn-primary" @click="updateProfile">应用修改</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { update } from 'network/user.js'
  export default {
    name: 'EditProfile',
    data() {
      return {
        id: '',
        avatar: '',
        username: '', // 用户名
        school: '',//学校
        college: '',//学历
        sex: '', // 性别
        introduction: '', // 个人简介,
        // hobbies: [], // 兴趣

        // dynamicTags: ['标签一', '标签二', '标签三'],
        // inputVisible: false,
        // inputValue: '',
        // count: 0,


      }
    },
    created() {
      const user = this.$store.state.user
      console.log("user")
      console.log(user)
      if (user && typeof user === 'object') {
        const { id, username, school, college, sex, introduction, avatar } = user
        this.id = id
        this.avatar = avatar
        this.username = username
        this.school = school
        this.college = college
        this.sex = sex || this.sex
        // this.hobbies = hobbies || this.hobbies
        this.introduction = introduction
      }


    },
    methods: {
      updateProfile(e) {
        console.log(e)

        update(this.$store.state.user.id, this.school, this.college, this.sex, this.introduction).then(res => {
          console.log(res)
          //this.$message.show('修改成功')
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.$store.dispatch('updateUser', {
            name: this.username,
            school: this.school,
            college: this.college,
            sex: this.sex,
            introduction: this.introduction
          })

        }).catch(err => {
          this.$message.error('修改失败');
        })


      },

      // handleClose(tag) {
      //   this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      //   this.count--;
      // },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      // handleInputConfirm() {
      //   console.log(this.count)
      //   if (this.count < 8) {
      //     let inputValue = this.inputValue;
      //     if (inputValue) {
      //       this.dynamicTags.push(inputValue);
      //       this.count++;
      //     }
      //     this.inputVisible = false;
      //     this.inputValue = '';
      //   } else {
      //     this.showMsg("最多只能添加8个兴趣标签", type = 'wraning')
      //   }
      // },

      showMsg(msg, type = 'success') {
        this.msg = msg
        this.msgType = type
        this.msgShow = false

        this.$nextTick(() => {
          this.msgShow = true
        })
      }
    }
  }
</script>

<style scoped>
  .flex {
    margin-bottom: 20px;
  }

  .avatar-box {
    margin-left: 20px;
    margin-right: 20px;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .username {
    height: 80px;
    line-height: 80px;

  }

  .update-avatar {
    margin-left: 30px;
    margin-right: 20px;
  }

  span {
    font-size: 14px;
    color: #999;
  }

  .border {
    height: 10px;
    border-bottom: 1px solid #ccc;
    width: 80%;
  }

  .btn-primary {
    color: #fff;
    background-color: #6ca6cd;
    border-color: #6ca6cd;
  }

  /* .el-tag+.el-tag {
    margin-right: 10px;
  } */

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 10px;
  }

  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
    margin-top: 10px;
  }

  .el-tag {
    margin-top: 10px;
    margin-right: 10px;
  }
</style>