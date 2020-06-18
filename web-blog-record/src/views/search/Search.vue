<template>
  <div class="panel panel-default list-panel search-results">
    <div class="panel-heading">
      <h3 class="panel-title">
        <i class="fa fa-search"></i>
        关于 “<span class="highlight">{{ keyword }}</span>” 的搜索结果, 共 {{ results.length }} 条
      </h3>
    </div>
    <div class="panel-body">
      <div v-for="result in results" class="result">
        <h2 class="title">
          <router-link :to="`/${result.username}/articles/${result.id}/content`">
            <span v-html="result.title"></span>
          </router-link>
          <small class="margin">by</small>
          <router-link :to="`/${result.username}`">
            <img :src="result.avatar" class="avatar avatar-small">
            <small class="margin-left">{{ result.username }}</small>
          </router-link>
        </h2>
        <div class="info">

          <span class="date">
            {{ result.post_date }} ⋅
            <i class="fa fa-thumbs-o-up"></i> {{ result.likes_num }} ⋅
            <i class="fa fa-comments-o"></i> {{ result.comment_num }}
          </span>
        </div>
        <div class="desc" v-html="result.content"></div>
        <hr>
      </div>
      <div v-if="!results.length" class="empty-block">
        没有任何数据~~
      </div>
    </div>
  </div>
</template>

<script>
  import { getSearch } from 'network/article'
  export default {
    name: 'Search',
    data() {
      return {
        keyword: '', // 关键字
        results: [] // 搜索结果
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        // 确认渲染该组件的对应路由时，获取搜索结果
        vm.getArticlesByKeyword(to.query.key)
      })
    },
    // 当前路由改变，该组件被复用时，获取搜索结果
    beforeRouteUpdate(to, from, next) {
      this.getArticlesByKeyword(to.query.key)
      next()
    },
    // 离开该组件的对应路由时，清空搜索值
    beforeRouteLeave(to, from, next) {
      // this.$store.commit('UPDATE_SEARCH_VALUE', '')
      next()
    },
    methods: {
      // 使用关键字 keyword 获取搜索结果
      getArticlesByKeyword(keyword) {
        if (keyword) {
          this.keyword = keyword
          getSearch(keyword).then(res => {
            let list = []
            console.log(res.data)
            res.data.forEach((item, index, array) => {
              let time = new Date(item[2])
              let m = time.getMonth() + 1
              let d = time.getDate()
              let y = time.getFullYear()
              let c = ""
              if (item[3].length > 100) {
                c = item[3].slice(0, 200) + "......"
              }
              console.log(c)
              let data = {
                id: item[0],
                title: item[1],
                post_date: y + "-" + m + "-" + d,
                content: c,
                avatar: item[4],
                username: item[5],
                comment_num: item[6],
                click_num: item[7]
              }
              console.log(data.content.length)
              list.push(data)
            })
            this.results = list

          }).catch(err => {
            console.log(err)
          })
          // 需要提交事件类型，以更新搜索框的值
          // this.$store.commit('UPDATE_SEARCH_VALUE', keyword)
          // this.results = this.$store.getters.getArticlesByKeyword(keyword)
        }
      }
    }
  }
</script>

<style scoped>
  .result a:hover,
  .result a:focus {
    color: #d6514d;
    transition: color .15s ease;
  }

  .panel-title .btn {
    margin-left: 5px;
  }

  .margin {
    margin-left: 10px;
    margin-right: 10px;
  }

  .margin-left {
    margin-left: 5px;
  }

  .avatar {
    border: 2px solid #999;
  }

  .search-results .avatar-small {
    width: 30px;
    height: 30px;
  }
</style>