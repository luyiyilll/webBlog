<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
      <div class="panel-body">
        <h4><b>修改头像</b></h4>
        <hr>
        <div data-validator-form>
          <div class="form-group">
            <label>头像预览：</label>
            <div>
              <img :src="avatar" class="avatar-preview-img">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-8">
              <label>地址链接：</label>
              <input v-model.trim.lazy="avatar" v-validator.required="{ title: '头像地址' }" type="text"
                class="form-control avatar-input">
            </div>
            <div class="clearfix"></div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary" @click="updateAvatar">上传头像</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { updateAvatar } from 'network/user.js'
  export default {
    name: 'EditAvatar',
    data() {
      return {
        avatar: '', // 头像地址
        id: ''
      }
    },
    created() {
      const user = this.$store.state.user

      if (user && typeof user === 'object') {
        this.avatar = user.avatar
        this.id = user.id
      }
    },
    methods: {
      updateAvatar() {
        const avatar = this.avatar

        if (avatar) {
          let img = new Image()

          img.onload = () => {
            updateAvatar(avatar, this.id).then(res => {
              console.log(res.data)
              this.$store.dispatch('updateUser', { avatar });
              this.$message({
                message: '修改成功',
                type: 'success'
              });

            }).catch(err => {
              this.$message.error('修改失败');
            })


          }

          img.onerror = () => {
            this.$message.error('上传失败');
          }

          img.src = avatar
        }
      }
    }
  }
</script>

<style scoped>
  .avatar-preview-img {
    min-width: 200px;
    min-height: 200px;
    max-width: 50%;
  }

  .btn-primary {
    color: #fff;
    background-color: #6ca6cd;
    border-color: #6ca6cd;
  }
</style>