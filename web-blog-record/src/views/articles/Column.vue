<template>
  <div class="blog-container">
    <div class="blog-pages">
      <!-- 用于渲染『文章列表』和『文章内容』 -->
      <div class="col-md-3 main-col pull-left">
        <div class="panel panel-default corner-radius">
          <div class="panel-body text-center topic-author-box blog-info">
            <div class="image blog-cover">
              <router-link :to="`/${getInfo.name}`">
                <img :src="getInfo.avatar" class="avatar-112 avatar img-thumbnail">
              </router-link>
            </div>
            <div class="blog-name">
              <h4>
                <router-link :to="`/${getInfo.name}`">{{ getInfo.name }} 的专栏</router-link>
              </h4>
            </div>
            <hr>
            <router-link :to="`/${getInfo.name}`">
              <li class="list-group-item"><i class="text-md fa fa-list-ul"></i> 专栏文章（{{ articleNum }}）</li>
            </router-link>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>

  import { userArticle } from 'network/article'
  import { userInfo } from 'network/user'
  export default {
    name: 'Column',
    data() {
      return {
        articleList: '',
        aNum: '',
        info: ''
      }
    },
    computed: {
      articleNum() {
        return this.aNum
      },
      getInfo() {
        return this.info
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

          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {

        })
      }
    },
  }
</script>

<style scoped>
  .blog-container {
    margin-top: 20px;
  }
</style>