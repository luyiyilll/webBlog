<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg" />
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        msg: '', // 消息
        msgType: '', // 消息类型
        msgShow: false // 是否显示消息，默认不显示
      }
    },
    computed: {
      auth() {
        return this.$store.state.auth
      }
    },
    beforeRouteEnter(to, from, next) {
      const fromName = from.name

      next(vm => {
        if (vm.$store.state.auth) {
          switch (fromName) {
            case 'Register':
              vm.showMsg('注册成功')
              break
            case 'Login':
              // 显示登录成功
              vm.showMsg('登录成功')
              break
          }
        } else if (logout) {
          vm.showMsg('操作成功')
        }
      })
    },
    methods: {
      showMsg(msg, type = 'success') {
        this.msg = msg
        this.msgType = type
        this.msgShow = true
      }
    },
    watch: {
      auth(value) {
        if (!value) {
          this.showMsg('操作成功')
        }
      }
    },
  }
</script>

<style scoped>

</style>