<template>
  <div class="col-md-9 col-sm-12 col-xs-12 main-col pull-right panel panel-default list-panel search-results">
    <div class="panel-body">
      <div v-for="article in articles" class="result">
        <div class="title">
          <router-link :to="`/${article.username}/articles/${article.user_id}/content`">
            <p class="title-text" v-html="article.title"></p>
          </router-link>
          <span class="post-date">post on</span>
          <span class="post-date">
            {{ article.post_date }}
          </span>
        </div>
        <div class="desc" v-html="article.content.slice(0,100)"></div>
        <div class="flex">
          <router-link :to="`/${article.username}/articles/${article.user_id}/content`">
            <i :class="`fa fa-eye`" class="font-color-red"></i> <span
              class="font-color-red">{{article.click_num}}</span>
          </router-link>
          <router-link :to="`/${article.username}/articles/${article.user_id}/content`" class="margin-left">
            <i :class="`fa fa-commenting-o`" class="font-color"></i><span
              class="font-color-999">{{article.comment_num}}</span>
          </router-link>
          <div class="margin-left font-color"><i :class="`fa fa-heart-o`"></i><span
              class="font-color-999">{{article.likes_num}}</span></div>
        </div>


      </div>
      <div v-if="!articles" class="empty-block">
        没有任何数据~~
      </div>
    </div>
  </div>
</template>

<script>
  import { allArticles, userAndArticle } from 'network/article'
  import { userInfoById } from 'network/user'
  import Vue from 'vue'
  export default {
    name: 'TypeArticle',
    data() {
      return {
        articles: []

      }
    },
    computed: {

    },
    created() {
      this.getAllArticle()

    },
    // beforeRouteEnter(to, from, next) {
    //   console.log(to)
    //   next(vm => {
    //     vm.getKeyword(to.params.type)
    //   })
    // },
    // // 当前路由改变，该组件被复用时，获取搜索结果
    // beforeRouteUpdate(to, from, next) {
    //   this.getKeyword(to.params.type)
    //   next()
    // },

    methods: {
      getAllArticle() {
        userAndArticle().then(res => {
          let list = []
          res.data.forEach((item, index) => {
            let data = {
              aid: item[0].id,
              user_id: item[0].user_id,
              title: item[0].title,
              content: item[0].content,
              post_date: item[0].post_date,
              atype: item[0].atype,
              username: item[1][1],
              avatar: item[1][2],
              click_num: item[2][0],
              comment_num: item[2][1],
              likes_num: item[2][2]
            }
            list.push(data)
          })
          this.articles = list
          console.log(this.articles)
        })



        // allArticles().then(res => {
        //   let that = this
        //   this.articles = res.data
        //   this.articles.forEach(function (item, index, array) {
        //     userInfoById(item.user_id).then(res => {
        //       let data = {
        //         id: res.data[0],
        //         name: res.data[1],
        //         avatar: res.data[2]
        //       }

        //       Vue.set(item, 'userid', data.id);
        //       Vue.set(item, 'username', data.name);
        //       Vue.set(item, 'avatar', data.avatar);
        //     }).catch(err => {
        //       console.log(err)
        //     })
        //   })
        //   console.log(that.articles)
        // })
      }


    }
  }
</script>

<style scoped>
  .highlight {
    font-size: 20px;
    font-weight: bold;
  }

  .title {
    margin-top: 20px;
  }

  .title-text {
    color: #000;
    font-weight: bold;
  }

  .result {
    border-bottom: 1px solid rgb(240, 240, 240);
    padding-bottom: 20px;
  }

  .justify-center {
    justify-content: center;
  }


  .avatar {
    margin-top: 20px;
  }

  .post-date {
    font-size: 10px;
    color: #999;
  }

  .search-results a {
    color: #fff;
  }


  .desc {
    word-wrap: break-word;
  }

  .font-color-red {
    color: rgb(245, 108, 108);
  }

  .font-color-999 {
    color: #999;
  }

  .font-color {
    color: #999;
  }

  .font-color:hover {
    color: #000;
    cursor: pointer;
  }

  i {
    margin-right: 3px;
  }

  .margin-left {
    color: #999;
    margin-left: 10px;
  }

  /* .margin-left:hover {
    color: #000;
  } */
</style>