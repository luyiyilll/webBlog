<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" @click="toggleNav">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/" class="navbar-brand flex">
          <img src="~assets/logo.png" :alt="logo.title">
          <span class="title">Zero Blog</span>
        </router-link>

      </div>

      <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', { in: showCollapsedNav }]">
        <ul class="nav navbar-nav" v-if="is_admin===0">
          <li :class="{ active: activeNavIndex === 0 }" @click="changeNavIndex(0)">
            首页
          </li>
          <li :class="{ active: activeNavIndex === 1 }" @click="changeNavIndex(1)">
            程序人生
          </li>
          <li :class="{ active: activeNavIndex === 2 }" @click="changeNavIndex(2)">
            服务器端
          </li>
          <li :class="{ active: activeNavIndex === 3 }" @click="changeNavIndex(3)">
            HTML/CSS
          </li>
        </ul>
        <ul class="nav navbar-nav" v-else>

          <li :class="{ active: activeNavIndex === 4 }" @click="changeNavIndex(4)">
            用户管理
          </li>
          <li :class="{ active: activeNavIndex === 5 }" @click="changeNavIndex(5)">
            评论管
          </li>
          <li :class="{ active: activeNavIndex === 6 }" @click="changeNavIndex(6)">
            文章管理
          </li>
        </ul>

        <!-- 入口组件 -->
        <div class="navbar-right">
          <SearchInput />
          <TheEntry />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import TheEntry from '@/components/common/TheEntry'
  import SearchInput from '@/components/layouts/SearchInput'
  export default {
    name: 'TheHeader',
    components: {
      TheEntry,
      SearchInput
    },
    data() {
      return {
        logo: {
          src: '~assets/logo.png',
          title: 'Learnku Vue.js',

        },
        is_admin: 0,

        //navList: ['社区', '头条', '问答', '教程'],
        activeNavIndex: 0,
        showCollapsedNav: false
      }
    },
    computed: {
      getIndex() {
        return this.activeNavIndex;
      }
    },
    created() {

    },
    beforeCreate() {

    },
    methods: {
      changeNavIndex(index) {
        this.activeNavIndex = index
        switch (index) {
          case 0:
            this.$router.push('/');
            break;
          case 1:
            this.$router.push({ name: 'Type', params: { type: 'life' } })
            break;
          case 2:
            this.$router.push({ name: 'Type', params: { type: 'server' } })
            break;
          case 3:
            this.$router.push({ name: 'Type', params: { type: 'front' } })
            break;
          case 4:
            this.$router.push({ name: 'Type', params: { type: 'front' } })
            break;
          case 5:
            this.$router.push({ name: 'Type', params: { type: 'front' } })
            break;
          case 6:
            this.$router.push({ name: 'Type', params: { type: 'front' } })
            break;
        }
      },
      toggleNav() {
        this.showCollapsedNav = !this.showCollapsedNav
      }
    },

  }
</script>

<style scoped>
  .title {
    color: #000;
    margin-left: 10px;
  }

  .navbar-default .navbar-nav>.active>a {
    transition: ease-in 0.1s;
    border-bottom: 2px solid rgb(108, 166, 205);
    background: rgb(255, 255, 255);
  }

  ul li {
    width: 80px;
    height: 50px;
    line-height: 50px;
    padding: 0px;
    text-align: center;
  }

  li:hover {
    background: #000;
    background: rgba(240, 240, 240, .5);
    transition: ease-in 0.2s;
    cursor: pointer;
  }

  li.active {
    border-bottom: 2px solid rgb(108, 166, 205);
    background: rgba(240, 240, 240, .5);
  }
</style>