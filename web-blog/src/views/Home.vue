<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg" />


    <!-- 帖子列表 -->
    <div class="col-md-9 topics-index main-col">
      <div class="panel panel-default">
        <div class="panel-heading">
          <ul class="list-inline topic-filter">
            <li><a href="/topics?filter=default" :class="show==1?'active':''">活跃</a></li>
            <!-- <li><a href="/topics?filter=excellent" @click="changeNav(1)" :class="active==1?'active':''">精华</a></li> -->
            <li><a href="/topics?filter=vote" :class="show==2?'active':''">投票</a></li>
            <li><a href="/topics?filter=recent" :class="show==3?'active':''">最近</a></li>
            <li><a href="/topics?filter=noreply" :class="show==4?'active':''">零回复</a></li>
          </ul>
          <div class="clearfix"></div>
        </div>

        <div class="panel-body remove-padding-horizontal">
          <ul class="list-group row topic-list">
            <li v-for="article in allInfo" :key="article.aid" class="list-group-item">
              <router-link :to="`/articles/${article.aid}/content`" tag="div"
                class="reply_count_area hidden-xs pull-right">
                <div class="count_set">
                  <!-- <span class="count_of_votes" title="投票数">{{ article.likeUsers ? article.likeUsers.length : 0 }}</span>
                  <span class="count_seperator">/</span>
                  <span class="count_of_replies" title="回复数">{{ article.comments ? article.comments.length : 0 }}</span>
                  <span class="count_seperator">|</span> -->
                  <abbr class="timeago">{{ article.post_date}}</abbr>
                </div>
              </router-link>

              <router-link :to="`/${article.name}`" tag="div" class="avatar pull-left">
                <img :src="article.avatar" class="media-object img-thumbnail avatar avatar-middle">
              </router-link>
              <div @click="onC(article.aid,article.name)" tag="div" class="infos">

                <div class="media-heading">
                  {{ article.title }}
                </div>

              </div>

            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- 侧栏 -->
    <TheSidebar />
  </div>
</template>

<script>
  import { allArticles, allArticlesInfo, sortList } from 'network/article'
  import { userInfoById } from 'network/user'
  import TheSidebar from '@/components/layouts/TheSidebar'
  import Vue from 'vue'
  export default {
    name: 'Home',
    data() {
      return {
        msg: '', // 消息
        msgType: '', // 消息类型
        msgShow: false, // 是否显示消息，默认不显示

        articleList: '',
        allInfo: '',
        active: 1,
        show: 0

      }
    },
    components: {
      TheSidebar
    },
    computed: {
      auth() {
        return this.$store.state.auth
      }
    },
    created() {
      console.log("home")
      console.log(this.$store.state.user)
      this.getAllArticles()
      this.getSortList(this.$route.query)
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.commit('UPDATE_NAV', 0)

      })
    },
    methods: {
      getSortList(query) {
        let that = this
        let allInfo = [];
        if (query.filter == "default" || JSON.stringify(query) == "{}") {
          that.show = 1

          sortList(0).then(res => {
            this.articleList = res.data;
            this.articleList.forEach(function (item, index, array) {
              let data = {
                aid: item[0].id,
                userid: item[0].user_id,
                title: item[0].title,
                content: item[0].content,
                post_date: item[0].post_date,
                name: item[1][1],
                avatar: item[1][2]
              }
              let aItem = data;
              allInfo.push(aItem);
              // Vue.set(item, 'userid', data.id);
              // Vue.set(item, 'username', data.name);
              // Vue.set(item, 'avatar', data.avatar);
            })
            that.allInfo = allInfo
          }).catch(err => {
            console.log(err)
          })
        } else if (query.filter == "vote") {
          that.show = 2
          sortList(1).then(res => {
            this.articleList = res.data;
            this.articleList.forEach(function (item, index, array) {
              let data = {
                aid: item[0].id,
                userid: item[0].user_id,
                title: item[0].title,
                content: item[0].content,
                post_date: item[0].post_date,
                name: item[1][1],
                avatar: item[1][2]
              }
              let aItem = data;
              allInfo.push(aItem);
              // Vue.set(item, 'userid', data.id);
              // Vue.set(item, 'username', data.name);
              // Vue.set(item, 'avatar', data.avatar);
            })
            that.allInfo = allInfo
          }).catch(err => {
            console.log(err)
          })
        } else if (query.filter == "recent") {
          that.show = 3
          sortList(2).then(res => {
            this.articleList = res.data;
            this.articleList.forEach(function (item, index, array) {
              let data = {
                aid: item[0].id,
                userid: item[0].user_id,
                title: item[0].title,
                content: item[0].content,
                post_date: item[0].post_date,
                name: item[1][1],
                avatar: item[1][2]
              }
              let aItem = data;
              allInfo.push(aItem);
              // Vue.set(item, 'userid', data.id);
              // Vue.set(item, 'username', data.name);
              // Vue.set(item, 'avatar', data.avatar);
            })
            that.allInfo = allInfo

          }).catch(err => {
            console.log(err)
          })
        } else if (query.filter == "noreply") {

          that.show = 4
          sortList(3).then(res => {
            this.articleList = res.data;
            this.articleList.forEach(function (item, index, array) {
              let data = {
                aid: item[0].id,
                userid: item[0].user_id,
                title: item[0].title,
                content: item[0].content,
                post_date: item[0].post_date,
                name: item[1][1],
                avatar: item[1][2]
              }
              let aItem = data;
              allInfo.push(aItem);
              // Vue.set(item, 'userid', data.id);
              // Vue.set(item, 'username', data.name);
              // Vue.set(item, 'avatar', data.avatar);
            })
            that.allInfo = allInfo
          }).catch(err => {
            console.log(err)
          })
        }

      },
      onC(id, uername) {
        console.log(id)
        this.$router.push({ name: "Content", params: { user: uername, articleId: id } })
      },
      showMsg(msg, type = 'success') {
        this.msg = msg
        this.msgType = type
        this.msgShow = true
      },
      getAllArticles() {

        // allArticlesInfo().then(res => {
        //   console.log(res.data)
        // }).catch(err => { })
        allArticles().then(res => {
          let that = this
          this.articleList = res.data
          this.articleList.forEach(function (item, index, array) {
            userInfoById(item.user_id).then(res => {
              let data = {
                id: res.data[0],
                name: res.data[1],
                avatar: res.data[2]
              }

              Vue.set(item, 'userid', data.id);
              Vue.set(item, 'username', data.name);
              Vue.set(item, 'avatar', data.avatar);
              //let data = { name: 'luyiyi', avatar: '123' }
              //that.articleList[index].user = that.data
              //console.log(that.articleList[index].user)
            }).catch(err => {
              console.log(err)
            })
          })
          // console.log(that.articleList)
        }).catch(err => {
          console.log(err)
        })
      }

    },
    watch: {
      auth(value) {
        if (!value) {
          this.showMsg('操作成功')
        }
      }
    },
  }
</script>

<style scoped>
  .avatar {
    cursor: pointer;
  }
</style>