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
        <ul class="nav navbar-nav">
          <li v-for="(item, index) in navList" :class="{ active: index === activeNavIndex }">
            <a href="#" @click="changeNavIndex(index)">{{ item }}</a>
          </li>
        </ul>

        <!-- 入口组件 -->
        <div class="navbar-right">
          <TheEntry />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import TheEntry from '@/components/common/TheEntry'
  export default {
    name: 'TheHeader',
    components: {
      TheEntry
    },
    data() {
      return {
        logo: {
          src: '~assets/logo.png',
          title: 'Learnku Vue.js'
        },
        navList: ['社区', '头条', '问答', '教程'],
        activeNavIndex: 0,
        showCollapsedNav: false
      }
    },
    beforeCreate() {

    },
    methods: {
      changeNavIndex(index) {
        this.activeNavIndex = index
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
</style>