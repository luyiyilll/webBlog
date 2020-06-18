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
      </div>
      <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', { in: showCollapsedNav }]">
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/" active-class="active" exact>首页</router-link>
          </li>
          <li>
            <router-link :to="'/articles/'+'all'" active-class="active" exact>文章标签</router-link>
          </li>
        </ul>
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
          title: 'ZeroBlog',

        },
        showCollapsedNav: false
      }
    },
    methods: {
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
    width: 100px;
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

  .active {
    border-bottom: 2px solid rgb(108, 166, 205);
  }
</style>