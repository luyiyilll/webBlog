<template>
  <div class="col-md-3 side-bar">
    <div class="panel panel-default corner-radius sidebar-resources">
      <div class="panel-heading text-center">
        <h3 class="panel-title">{{user.username}}</h3>
      </div>
      <div class="panel-body">
        <div>
          <!-- <a :href="currentSlide.link" target="_blank">
            <img :alt="currentSlide.title" :title="currentSlide.title" :src="currentSlide.img">
          </a> -->

          <div class="flex">
            <div  class="head"  style="margin-left: 40px;">
                <el-avatar  v-if="auth"  shape="square" :size="100" :src="user.avatar"></el-avatar>
				<el-avatar  v-if="!auth"  shape="square" :size="100" :src="circleUrl"></el-avatar>
            </div>
          </div>

          <div class="intro-text">
            <div v-if="auth" class="intro-title text-center"></div>

          </div>
		  <div class="box-block" v-if="auth">
			 <!-- <button class="btn btn-primary" @click="wr" style="margin-bottom: 10px;">随笔撰写</button> -->
			<el-tooltip class="item" effect="light" content="圈子" placement="top">
			  <el-button @click="allr" icon="el-icon-news" style="margin-left: 5px;margin-bottom: 10px;"></el-button>
			 </el-tooltip>
			 <el-tooltip class="item" effect="light" content="我的随笔" placement="top">
			  <el-button @click="myr(user.id)" icon="el-icon-notebook-1" style="margin-left: 5px;margin-bottom: 10px;"></el-button>
		      </el-tooltip>
			  <el-button @click="drawer = true" type="primary" icon="el-icon-edit" style="margin-left: 5px;">撰写随笔</el-button>
		  </div>


        </div>
      </div>

    </div>
	<div>
	<el-calendar  
	:range="['2020-06-08', '2020-06-28']"
	v-model="myTime"
	@change="getMyDateTime()"
	value-format="yyyy-MM-ddHH:mm:ss">
	</el-calendar>
	  <el-drawer
	    :visible.sync="drawer"
	    :direction="direction">
	    <div style="margin-left: 10px;">
	    <h5 class="intro-text">撰写随笔</h5>
	     <textarea  v-model="content" style="width: 95%;height: 200px;" ref="content" id="editor" placeholder="写下灵感..."></textarea>
	     <div class="form-group reply-post-submit">
	       <button id="edit-btn" :disabled="!auth" @click="addMyRecord(user.id,content)" class="btn btn-primary">
	         发表
	       </button>
	     </div>
	     </div>
	  </el-drawer>
	</div>
    <!-- 活跃用户 -->
<!--    <div class="panel panel-default corner-radius panel-active-users">
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
    </div> -->



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
  import { addRecord } from 'network/record'
  import { topThree, getActiveUser } from 'network/user'
  export default {

    name: 'RecSidebar',
    data() {
      return {
        // 实战课程
        slides: [],
        activeUsers: [],
		circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        // hotArticles: [] // 最热文章
		value: new Date(),
        drawer: false,
        direction: 'rtl',
		content:'',
		myTime:''
      }
    },
    computed: {
      auth() {
        return this.$store.state.auth
      },
      user() {
        return this.$store.state.user
      }
    },
    created() {
      this.getTopThree();
      this.getActiveUsers();

    },
    methods: {
		wr(){
			this.$parent.write();
		},
		allr(){
			this.$parent.getMyRecordsByTime();
		},
		myr(uId){
			this.$parent.getMyRecordsByuId(uId);
			
		},
		getMyDateTime() {
		    console.log(this.myTime);//结果为一个数组，如：2018-12-02T03:24:02.000Z，想要我们需要的时间格式，要进行Date的操作
		},
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
        })
      },
	  addMyRecord(userId,content) {
		  console.log(userId+" "+content)
		  addRecord(userId,content).then(res => {
            this.$message({
              message: '发表成功',
              type: 'success'
            });
            this.$parent.getMyRecordsByTime();
          }).catch(err => {
            this.$message.error('发表失败');
          })
		  this.content = ""
	  },
	  
      navTo(name) {
        this.$router.push({ name: 'Column', params: { user: name } });
      }
	      
    }
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