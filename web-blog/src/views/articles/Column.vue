<template>
  <div class="blog-container">
    <div class="blog-pages">
      <!-- 用于渲染『文章列表』和『文章内容』 -->
      <div class="col-md-3 col-sm-12 col-xs-12 main-col pull-left">
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
        <div class="blog-pages-bottom panel panel-default corner-radius">
          <div class="visit-user">
            <div>最近访客</div>
            <div>访问量：{{users.length}}</div>
          </div>
          <div class="visit-user-content">
            <div v-for="(item,index) in users" class="visit-user-content-item">
              <div class="visit-user-avatar-outer">
                <div class="visit-user-avatar-box">
                  <img :src="item.avatar" alt="暂无头像" width="40px" height="40px" class="visit-user-avatar">
                </div>
              </div>
              <div class="visit-text">{{item.name}}</div>
              <!-- <div class="visit-text" v-if="item.introduce">[{{item.introduce}}]</div> -->
            </div>
          </div>
        </div>
      </div>

      <router-view />
    </div>

  </div>
</template>

<script>

  import { userArticle } from 'network/article'
  import { userInfo, getRecentVisit } from 'network/user'
  export default {
    name: 'Column',
    data() {
      return {
        articleList: '',
        aNum: '',
        info: '',
        users: []
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

          getRecentVisit(this.info.id).then(res => {
            console.log(res.data)
            let list = []

            res.data.forEach((item, index) => {
              console.log(item[3])
              let intro = ""
              if (item[3] && item[3].length > 5) {
                intro = item[3].slice(0, 5) + "..."
              } else {
                intro = item[3]
              }
              let data = {
                id: item[0],
                name: item[1],
                avatar: item[2],
                introduce: intro
              }
              list.push(data)
            })
            this.users = list
          }).catch(err => {

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

  .blog-pages-bottom {
    margin-top: 20px;

  }

  .visit-user {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(240, 240, 240);
    padding: 15px 20px;
  }

  .visit-user-content {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-bottom: 20px;
  }

  .visit-user-content-item {
    width: 65px;
    height: 80px;
  }

  .visit-user-content-item :hover {
    color: #666;
    cursor: pointer;
  }

  .visit-text {
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #999;
  }

  .visit-user-avatar-outer {
    display: flex;
    justify-content: center;
  }

  .visit-user-avatar-box {
    width: 48px;
    padding: 3px;
    border: 1px solid rgba(200, 200, 200, 5);
    border-radius: 50%;
  }

  .visit-user-avatar {
    margin: 0 auto;
    border-radius: 50%;
  }
</style>