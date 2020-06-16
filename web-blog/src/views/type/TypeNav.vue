<template>
  <div class="blog-container">
    <div class="blog-pages">
      <div class="col-md-3 col-sm-12 col-xs-12 main-col pull-left">
        <div class="panel panel-default corner-radius">
          <div class="panel-body text-center topic-author-box blog-info">
            <router-link :to="`/articles/type`">
              <ul>
                <li v-for="(item,index) in type" class="tag" :style="item.style">
                  {{item.title}}
                </li>
              </ul>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <router-view />
  </div>

  </div>
</template>

<script>

  import { getAllType } from 'network/article'
  import { userInfo, getRecentVisit } from 'network/user'
  export default {
    name: 'TypeNav',
    data() {
      return {
        type: [],
        index: 0
      }
    },
    computed: {

    },
    watch: {
      // '$route'(to, from) { // 监听路由是否变化
      //   if (to.params.user !== from.params.user) {
      //     this.getData() // 重新加载数据
      //   }
      // }
    },
    created() {
      this.getData()

    },
    methods: {
      getData() {
        getAllType().then(res => {
          this.type = res.data
          let list = []
          res.data.forEach((item, index) => {
            let style = ''
            if (index % 5 == 1) {
              style = 'border:1px solid rgb(103,194,58);color: rgb(103,194,58)'

            } else if (index % 5 == 2) {
              style = 'border:1px solid rgb(245,108,108);color:rgb(245,108,108)'

            } else if (index % 5 == 3) {
              style = 'border:1px solid rgb(230,162,60);color:rgb(230,162,60)'

            } else if (index % 5 == 4) {
              style = 'border:1px solid rgb(144,147,153);color:rgb(144,147,153)'

            } else {
              style = 'border:1px solid rgb(108,166,205);color:rgb(108,166,205)'

            }
            let data = {
              title: item,
              style: style,
            }
            list.push(data)
          })
          this.type = list

        }).catch(err => {
          console.log(err)
        })
      }
    },
  }
</script>

<style scoped>
  .blog-container {
    margin-top: 20px;
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
</style>