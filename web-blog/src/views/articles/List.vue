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
        <!-- <ul class="list-group">
          <li v-for="article in articleList" class="list-group-item">
            <img v-if="getInfo" :src="getInfo.avatar" class="avatar avatar-small">
            <router-link :to="`/${getInfo.name}/articles/${article.id}/content`" class="title">
              {{ article.title }}{{getInfo.name}}
            </router-link>
            <span class="meta pull-right">
              <span class="timeago">{{ article.post_date}}</span>
            </span>
          </li>
        </ul> -->

        <div class="demo-them light">
          <timeline timeline-theme="lightblue">
            <timeline-item :bg-color="article.bg_color" :icon-size="article.icon_size"
              v-for="(article,index) in articleList">
              <div class="flex">
                <div class="title">
                  {{article.title}}
                </div>
                <div class="time">{{article.post_time}}</div>
              </div>
              <div class="content">
                {{article.content}}
              </div>

            </timeline-item>
            <!-- <timeline-item bg-color="#e6b6b0" :hollow="true">My first 100 stars on Github 🎉</timeline-item>
            <timeline-item bg-color="#b0e6d1">keep going</timeline-item>
            <timeline-title bg-color="#f2d7e1">2017</timeline-title>
            <timeline-item bg-color="#b0e6d1" icon-size="small">icon small size</timeline-item>
            <timeline-item bg-color="#b0e6d1" icon-size="medium">icon medium size</timeline-item>
            <timeline-item bg-color="#b0e6d1" icon-size="large">icon large size</timeline-item>
            <timeline-item>
              <img src="../../assets//logo.png" class="icon-heart" slot="others">
              <p>I wrote <a href="https://github.com/luyilin/Aoba">Aoba</a></p>
              <p class="append">A tool to create a lovely resume just with a config file.</p>
            </timeline-item>
            <timeline-item line-color="#a6ade4">
              <p>And <a href="https://github.com/luyilin/Maltose">Maltose</a></p>
              <p class="append">A cute emoticon and emoji keyboard which can generate random emoticon or emoji and no
                xss.</p>
            </timeline-item> -->
          </timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入 mapState 辅助函数
  import { userArticle } from 'network/article'
  import { userInfo } from 'network/user'
  import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

  export default {
    name: 'List',
    data() {
      return {
        articleList: '',
        user_id: '',
        info: '',

      }
    },
    components: {
      Timeline,
      TimelineItem,
      TimelineTitle
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
            let allArticle = []
            console.log(res.data)
            res.data.forEach((item, index) => {
              let content = ""
              if (item.content.length > 100) {
                content = item.content.slice(0, 100) + "......";
              } else {
                content = item.content;
              }

              let data = {
                title: item.title,
                bg_color: (index % 2) == 1 ? "rgb(108,166,205)" : "#f2d7e1",
                icon_size: (index % 2) == 1 ? "large" : "small",
                content: content,
                post_time: item.post_date
              }
              allArticle.push(data)
            })
            this.articleList = allArticle


            console.log(this.articleList)
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
  /* .timeline {
    border-bottom: 1px dotted var(--timelineTheme);

  } */

  .timeline-item:last-child {
    border-bottom: 1px dotted var(--timelineTheme);
  }

  .flex {
    justify-content: space-between;
  }

  .content {
    border-radius: 10rpx;
    padding: 20px;
    margin-top: 20px;
    background: rgba(240, 240, 240, .5);
  }

  .title {
    font-weight: bold;
  }

  .time {
    font-size: 12px;
    color: rgba(180, 180, 180, .9);
  }
</style>