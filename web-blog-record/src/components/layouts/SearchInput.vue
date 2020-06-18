<template>
  <div class="navbar-form navbar-left hidden-sm">
    <div class="form-group">
      <input v-model.trim="value" type="text" class="form-control search-input mac-style" placeholder="搜索"
        @keyup.enter="search">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchInput',
    data() {
      return {
        value: '' // 搜索值
      }
    },
    methods: {
      search() {
        const value = this.value

        if (value !== '') {
          this.$router.push({ name: 'Search', query: { key: value } })
        }
      }
    }
  }
</script>

<style scoped>
  .search-input {
    background-image: url(https://cdn.learnku.com/assets/images/icon-search.png)
  }

  .form-control {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgb(240, 240, 240);
  }

  .form-control:focus {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(108, 166, 205, 0.6);
  }

  .topnav .navbar-form .form-control {
    height: 35px;
    margin-top: 2px;
  }
</style>