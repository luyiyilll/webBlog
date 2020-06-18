<template>
  <div class="blog-container">
    <div class="blog-pages col-md-10 col-sm-10 col-xs-12">
      <div class="panel panel-default corner-radius">
        <div class="panel-body text-center topic-author-box blog-info">
          <ul>
            <li v-for="(item,index) in type" class="tag" :class="currentIndex==index?`active-${index}`:`type-${index}`"
              @click="changeArticle(item.title,index)">
              <router-link :to="`/articles/${item.alias}`">{{item.title}}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <type-list></type-list>
    </div>
  </div>
</template>

<script>
  import TypeList from '@/views/type/Type'
  import { allArticles, userAndArticle, getAllType } from 'network/article'
  import { userInfoById, userInfo, getRecentVisit } from 'network/user'
  import Vue from 'vue'
  export default {
    name: 'TypeArticle',
    data() {
      return {
        type: [],
        index: 0,
        currentIndex: 0
      }
    },
    components: {
      TypeList
    },
    created() {
      this.getData()
    },

    methods: {
      getData() {
        getAllType().then(res => {
          this.type = res.data
          let list = [{
            title: '全部文章',
            style: 'border:1px solid rgb(247,186,42);color: rgb(247,186,42)',
            alias: 'all'
          }]
          res.data.forEach((item, index) => {
            let alias = ''
            let style = 'type0'
            if (item == '程序人生') {
              alias = 'life'
              style = 'type1'

            } else if (item == '服务器端') {
              alias = 'server'
              style = 'type2'

            } else if (item == 'HTML/CSS') {
              alias = 'front'
              style = 'type3'

            }
            let data = {
              title: item,
              style: style,
              alias: alias

            }
            list.push(data)
          })
          this.type = list

        }).catch(err => {
          console.log(err)
        })
      },

      changeArticle(type, index) {
        this.currentIndex = index
      }
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

  .type-0 {
    border: 1px solid rgb(247, 186, 42);
    color: rgb(247, 186, 42)
  }

  .active-0 {
    background: rgb(247, 186, 42);
    color: #fff
  }

  .type-1 {
    border: 1px solid rgb(103, 194, 58);
    color: rgb(103, 194, 58)
  }

  .active-1 {
    background: rgb(103, 194, 58);
    color: #fff
  }

  .type-2 {
    border: 1px solid rgb(245, 108, 108);
    color: rgb(245, 108, 108)
  }

  .active-2 {
    background: rgb(245, 108, 108);
    color: #fff
  }

  .type-3 {
    border: 1px solid rgb(230, 162, 60);
    color: rgb(230, 162, 60)
  }

  .active-3 {
    background: rgb(230, 162, 60);
    color: #fff
  }
</style>