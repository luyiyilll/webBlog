<template>
  <div class="col-md-9 left-col pull-right">
    <div class="panel article-body article-index">
      <div class="panel-body">
        <h1 class="all-articles">
          专栏文章
          <router-link v-if="getInfo.id===user.id" to="/articles/create" class="btn btn-primary pull-right">
            <i class="fa fa-paint-brush"></i>
            创作文章
          </router-link>
        </h1>
        <ul class="list-group">
          <li v-for="article in articleList" class="list-group-item">
            <img v-if="getInfo" :src="getInfo.avatar" class="avatar avatar-small">
            <router-link :to="`/${getInfo.name}/articles/${article.id}/content`" class="title">
              {{ article.title }}{{getInfo.name}}
            </router-link>
            <span class="meta pull-right">
              <span class="timeago">{{ article.post_date}}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入 mapState 辅助函数
  import { userArticle } from 'network/article'
  import { userInfo } from 'network/user'

  export default {
    name: 'List',
    data() {
      return {
        articleList: '',
        user_id: '',
        info: ''
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
      this.getData()
    },
    methods: {
      getData() {
        userInfo(this.$route.params.user).then(res => {
          this.info = {
            id: res.data[0],
            name: res.data[1],
            avatar: res.data[2]
          }


          userArticle(this.$route.params.user).then(res => {
            this.articleList = res.data
            this.aNum = this.articleList.length
            this.user_id = this.articleList[0].user_id

          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
      }
    },
  }
</script>

<style scoped>

</style>