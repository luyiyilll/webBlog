<template>
  <div class=" panel panel-default list-panel search-results">
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
  import { getTypeArticle, typeArticlesInfo } from 'network/article'
  export default {
    name: 'type',
    data() {
      return {
        type: '', // 关键字
        articles: [],
      }
    },
    computed: {
    },

    created() {
      this.getKeyword(this.$route.params.type)
    },
    watch: {
      '$route'(to, from) { // 监听路由是否变化
        console.log(to)
        console.log(from)
        if (to.params.type !== from.params.type) {
          this.getKeyword(to.params.type) // 重新加载数据
        }
      }
    },

    methods: {
      // 使用关键字 keyword 获取搜索结果
      getKeyword(type) {

        switch (type) {
          case 'all':
            this.getAllArticle(type);
            break;
          case 'life':
            this.type = '程序人生'
            this.getAllArticle(type);
            break;
          case 'server':
            this.type = '服务器端'
            this.getAllArticle(type);
            break;
          case 'front':
            this.type = 'HTML/CSS'
            this.getAllArticle(type);
            break;
        }
      },
      getAllArticle(type) {
        typeArticlesInfo(type).then(res => {
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
        })


      },
    }
  }
</script>

<style scoped>
  .blog-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

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

  .tag {
    padding: 3px 6px;
  }

  ul {
    display: flex;
    justify-self: start;
    flex-wrap: wrap;
    padding-inline-start: 0px;
  }

  ul>li {
    font-size: 12px;
    height: 25px;
    list-style: none;
    display: flex;
    border-radius: 3px;
    margin: 5px 5px;
  }

  .blog-container .panel {
    margin-bottom: 25px;
  }

  /* .highlight {
    font-size: 20px;
    font-weight: bold;
  }

  .title {
    margin-top: 20px;
    text-align: center;
  }

  .justify-center {
    justify-content: center;
  }

  .result {
    margin-right: 10px;
    margin-top: 10px;
    width: 350px;
    height: 180px;
    border-bottom: 1px solid rgb(240, 240, 240);
    border-right: 1px solid rgb(240, 240, 240);
    border-top: 1px solid rgb(240, 240, 240);
  }

  .avatar {
    margin-top: 20px;
  }

  .result:nth-of-type(n+1) {
    border-left: 10px solid rgba(108, 166, 205, .3);
    padding-left: 10px;
  }

  .result:nth-of-type(n+1):hover {
    border-left: 10px solid rgba(108, 166, 205, .8);
  }

  .result:nth-of-type(2n+2) {
    border-left: 10px solid rgba(255, 177, 9, .3);
    padding-left: 10px;
  }

  .result:nth-of-type(2n+2):hover {
    border-left: 10px solid rgba(255, 177, 9, .8);
  }


  .result:nth-of-type(3n+3) {
    border-left: 10px solid rgba(247, 106, 23, .3);
    padding-left: 10px;
  }

  .result:nth-of-type(3n+3):hover {
    border-left: 10px solid rgba(247, 106, 23, .8);
    padding-left: 10px;
  }

  .result:nth-of-type(5n+5) {
    border-left: 10px solid rgba(136, 108, 228, .3);
    padding-left: 10px;
  }

  .result:nth-of-type(5n+5):hover {
    border-left: 10px solid rgba(136, 108, 228, .8);
    padding-left: 10px;
  }

  .result:nth-of-type(7n+7) {
    border-left: 10px solid rgba(22, 198, 12, .3);
    padding-left: 10px;
  }

  .result:nth-of-type(7n+7):hover {
    border-left: 10px solid rgba(22, 198, 12, .8);
    padding-left: 10px;
  }




  .result a:hover,
  .result a:focus {
    color: #d6514d;
    transition: color .15s ease;
  }

  .panel-body {
    display: flex;
    flex-wrap: wrap;
  }

  .panel-title .btn {
    margin-left: 5px;
  }

  .bottom {
    text-align: center;
    flex: 1;
  }

  .info {
    text-align: center;
    width: 150px;
  }

  .el-button {
    color: #fff;
    background: rgb(108, 166, 205);
  }

  .el-button.is-plain:focus,
  .el-button.is-plain:hover {
    color: #fff;
    border-color: rgb(108, 166, 205, .5);
    background: rgb(108, 166, 205, .5);
  }

  .post-date {
    font-size: 10px;
    color: #999;
  }

  .search-results a {
    color: #fff;
  }

  .result a[data-v-6c40b0e5]:hover,
  .result a[data-v-6c40b0e5]:focus {
    color: #fff;
    text-decoration: none;
  }

  .t {
    color: #000;
  }

  .desc {
    word-wrap: break-word;
  } */
</style>