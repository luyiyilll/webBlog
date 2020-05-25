<template>
  <div class="col-md-3 side-bar">
    <div class="panel panel-default corner-radius sidebar-resources">
      <div class="panel-heading text-center">
        <h3 class="panel-title">推荐博主</h3>
      </div>
      <div class="panel-body">
        <Slider :slides="slides" v-slot="{ currentSlide }">
          <!-- <a :href="currentSlide.link" target="_blank">
            <img :alt="currentSlide.title" :title="currentSlide.title" :src="currentSlide.img">
          </a> -->

          <div class="flex slide-top">
            <div class="head" @click="navTo(currentSlide.name)">
              <img :src="currentSlide.avatar" alt="头像" class="avatar">
            </div>

            <div class="slide-text">
              <p>全网第<span>{{currentSlide.id}}</span>位用户</p>
              <p>用户名：{{currentSlide.name}}</p>
            </div>
          </div>

          <div class="slide-bottom intro-text">
            <div class="intro-title">个人简介</div>
            {{currentSlide.introduce}}
          </div>


        </Slider>
      </div>
    </div>
    <!-- 活跃用户 -->
    <div class="panel panel-default corner-radius panel-active-users">
      <div class="panel-heading text-center">
        <h3 class="panel-title">活跃用户</h3>
      </div>
      <div class="panel-body">
        <div class="users-label">
          <router-link v-for="(user, index) in activeUsers" :to="`/${user.name}`" :key="index" class="users-label-item">
            <img :src="user.avatar" class="avatar-small inline-block">
            {{ user.name }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- 七天内最热 -->
    <!-- <div class="panel panel-default corner-radius panel-hot-topics">
      <div class="panel-heading text-center">
        <h3 class="panel-title">七天内最热</h3>
      </div>
      <div class="panel-body">
        <ul class="list">
          <li v-for="(article, index) in hotArticles">
            <router-link :to="`/articles/${article.articleId}/content`">
              <span v-if="index === 0">🏆</span>
              <span v-else>{{ index + 1 }}.</span>
              {{ article.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div> -->

  </div>
</template>

<script>
  import { topThree, getActiveUser } from 'network/user'
  export default {

    name: 'Sidebar',
    data() {
      return {
        // 实战课程
        slides: [],
        activeUsers: [],
        // hotArticles: [] // 最热文章
      }
    },
    created() {
      this.getTopThree();
      this.getActiveUsers()
    },
    methods: {
      getTopThree() {
        topThree().then(res => {
          let list = []
          res.data.forEach((item, index, array) => {
            let data = {
              id: item[0],
              name: item[1],
              avatar: item[2],
              introduce: item[3]
            }
            list.push(data);
          })
          this.slides = list;
        }).catch(err => {
          console.log(err)
        })
      },
      getActiveUsers() {
        let list = []
        getActiveUser().then(res => {

          res.data.forEach((item, index, array) => {
            let data = {
              id: item[0][0],
              name: item[0][1],
              avatar: item[0][2]
            }
            list.push(data)
          })

          this.activeUsers = list
        }).catch(err => {
          console.log(err)
        })
      },
      navTo(name) {
        this.$router.push({ name: 'Column', params: { user: name } });
      }
    },
  }
</script>

<style scoped>
  .carousel-inner img {
    display: block;
    margin: auto;
    line-height: 1;
    width: 70%;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px #ccc;
    -moz-box-shadow: 0 0 10px #ccc;
    -webkit-box-shadow: 0 0 10px #ccc;
  }

  .slide-top {
    /*background: #000;*/
  }

  .slide-bottom {
    border: 1px solid rgb(240, 240, 240);
    text-align: center;
    padding: 20px 0;
    font-size: 15px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }

  .head {
    width: 140px;
  }

  .head:hover {
    cursor: pointer;
  }

  .intro-text {
    color: #999;
  }



  h5 {
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(240, 240, 240);
  }

  .flex {
    padding: 20px 5px;
    justify-content: center;
    flex-wrap: wrap;
  }


  .slide-text {
    padding-top: 25px;
    padding-bottom: 10px;
  }

  p {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 14px;
    font-weight: bold;
    height: 20px;
    line-height: 20px;
  }

  span {
    font-size: 20px;
  }

  .intro-title {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 10px;

  }

  .users-label-item {
    border: 2px solid rgb(240, 240, 240);
  }

  .users-label-item:hover {
    background-color: rgba(108, 166, 205, .3);
    color: #fff;
    border: 2px solid rgba(108, 166, 205, .1);
    transition: 0.3s ease-in-out;
  }
</style>