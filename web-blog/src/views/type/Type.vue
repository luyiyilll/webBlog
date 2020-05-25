<template>
  <div class="panel panel-default list-panel search-results">
    <div class="panel-body">
      <div v-for="result in results" class="result">
        <div class="flex">
          <div class="bottom">
            <div class="title">
              <router-link :to="`/${result.username}/articles/${result.id}/content`">
                <p class="t" v-html="result.title"></p>
              </router-link>
              <span class="post-date">post on</span>
              <span class="post-date">
                {{ result.post_date }}
              </span>
            </div>
            <div class="desc" v-html="result.content"></div>
            <div>
              <el-button round size="medium" icon="el-icon-search" plain>
                <router-link :to="`/${result.username}/articles/${result.id}/content`">查看更多</router-link>
              </el-button>
            </div>
          </div>

        </div>

        <!-- <hr> -->
      </div>
      <div v-if="!results" class="empty-block">
        没有任何数据~~
      </div>
    </div>
  </div>
</template>

<script>
  import { getTypeArticle } from 'network/article'
  export default {
    name: 'Search',
    data() {
      return {
        type: '', // 关键字
        result: ''

      }
    },
    computed: {
      results() {
        return this.result;
      }
    },
    beforeRouteEnter(to, from, next) {
      console.log(to)
      next(vm => {
        vm.getKeyword(to.params.type)
      })
    },
    // 当前路由改变，该组件被复用时，获取搜索结果
    beforeRouteUpdate(to, from, next) {
      this.getKeyword(to.params.type)
      next()
    },

    methods: {
      // 使用关键字 keyword 获取搜索结果
      getKeyword(type) {

        switch (type) {
          case 'life':
            this.type = '程序人生'
            getTypeArticle(this.type).then(res => {
              this.getData(res.data);
            }).catch(err => {
              console.log(err)
            })
            break;
          case 'server':
            this.type = '服务器端'
            getTypeArticle(this.type).then(res => {
              this.getData(res.data);

            }).catch(err => {
              console.log(err)
            })
            break;
          case 'front':
            this.type = 'HTML/CSS'
            getTypeArticle(this.type).then(res => {
              this.getData(res.data);
            }).catch(err => {
              console.log(err)
            })
            break;

        }
      },
      getData(data) {
        let articles = []
        data.forEach((item, index, array) => {
          let time = new Date(item[3])
          let m = time.getMonth() + 1
          let d = time.getDate()
          let y = time.getFullYear()
          let c = y + "-" + m + "-" + d;
          let cont = ""
          if (item[2].length > 20) {
            cont = item[2].slice(0, 20) + "......"
          } else {
            cont = item[2]
          }
          let article = {
            id: item[0],
            title: item[1],
            content: cont,
            post_date: c,
            avatar: item[4],
            username: item[5],
            type: item[6]
          }
          articles.push(article)
        })
        this.result = articles
        console.log(this.result);
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
  }
</style>