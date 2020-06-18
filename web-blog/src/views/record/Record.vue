<template>
  <div>
    <div class="col-md-9 topics-index main-col">
      <div>
        <div class="infinite-list-wrapper" style="overflow:auto">
          <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
            <div v-for="record,index in records" v-if="index<=limitCount" class="result">
              <el-card class="box-card" style="width: 100%;" shadow="hover">

                <div slot="header" class="clearfix">
                  <div class="inline-block">
                    <el-avatar :size="50" :src="record.avatar"></el-avatar>
                  </div>
                  <div class="inline-block">
                    <div class="text-muted" style="padding-left: 12px;font-size: 22px;">{{record.uname}}</div>
                    <div style="padding-left: 12px; margin-top: 5px; font-size: 12px;">{{record.crtime}}</div>
                  </div>
                  <el-dropdown style="float: right; padding: 3px 0">
                    <i class="el-icon-more-outline"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <div><i class="el-icon-share"></i>分享</div>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="auth&user.username==record.uname">
                        <div @click="deleteMyRecord(record.rid)"><i class="el-icon-delete"></i>删除</div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div class="text item" style="font-size: 18px;">
                  {{record.content}}
                </div>

                <el-collapse v-if="auth&user.username==record.uname" v-model="activeNames" @change="handleChange">
                  <el-collapse-item title="编辑">

                    <div id="edit-box" class="reply-box form box-block">
                      <textarea v-model="content" style="width: 100%;" v-if="auth" ref="content" id="editor"
                        placeholder="在此修改随笔..."></textarea>
                    </div>
                    <div class="form-group reply-post-submit">
                      <button id="edit-btn" :disabled="!auth" @click="commitedEdit(record.rid)" class="btn btn-primary">
                        保存编辑
                      </button>
                    </div>

                  </el-collapse-item>
                </el-collapse>

              </el-card>
              <br>
            </div>
          </div>
          <br>

        </div>
      </div>
      <div v-if="loading" class="text-center ">加载中...</div>
      <div v-if="noMore" class="text-center ">没有更多了</div>
    </div>
    <!-- 侧栏 -->
    <RecordSideBar />
  </div>
</template>

<script>
  import { getRecordList, getRecordsByTime, getRecordsByuId, updateRecord, deleteRecord } from 'network/record'
  import RecordSideBar from '@/components/layouts/RecordSideBar'
  import { topThree, getActiveUser } from 'network/user'
  import QrcodeVue from 'qrcode.vue'
  export default {
    name: 'record',
    data() {
      return {
        records: [],
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        sizeList: ["large", "medium", "small"],
        activeNames: [],
        slides: [],
        activeUsers: [],
        content: "",
        statueCode: 1,
        curruId: "",
        dialogVisible: false,
        loading: false,
        limitCount: 3
      }
    },
    components: {
      RecordSideBar
    },
    computed: {
      results() {
        return this.result;
      },
      auth() {
        return this.$store.state.auth
      },
      user() {
        return this.$store.state.user
      },
      noMore() {
        return this.limitCount >= this.records.length
      },
      disabled() {
        return this.loading || this.noMore
      }
    },
    created() {
      this.getMyRecordsByTime();
      this.getTopThree();
      this.getActiveUsers();
    },
    methods: {
      load() {
        this.loading = true
        setTimeout(() => {
          this.limitCount += 2
          this.loading = false
        }, 1500)
      },
      write() {

      },
      //提交修改
      commitedEdit(recordId) {
        let recordContent = this.content
        console.log(recordId + " " + recordContent)
        updateRecord(recordId, recordContent).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.records = [];
          if (this.statueCode == 1) {
            this.getMyRecordsByTime();
          } else {
            this.getMyRecordsByuId(this.curruId);
          }
        }).catch(err => {
          this.$message.error('修改失败');
        })
        this.content = ""
        document.querySelector('#edit-btn').focus()
      },

      getMyRecordsByTime() {
        getRecordsByTime().then(res => {
          this.getData(res.data);
        }).catch(err => {
          console.log(err)
        })
        this.records = [];
      },
      getMyRecordsByuId(uId) {
        this.curruId = uId;
        this.statueCode = 2;
        getRecordsByuId(uId).then(res => {
          this.records = [];
          this.getData(res.data);

        }).catch(err => {
          console.log(err)
        })
      },

      getData(data) {

        data.forEach((item, index, array) => {
          let time = new Date(item[2])
          let m = time.getMonth() + 1
          let d = time.getDate()
          let y = time.getFullYear()
          let hour = time.getHours()
          let min = this.p(time.getMinutes())
          let currtime = new Date()
          console.log(currtime.getDate())
          let timestr
          if (currtime.getFullYear() == y && currtime.getMonth() + 1 == m && currtime.getDate() == d) {
            timestr = hour + ":" + min
          } else if (currtime.getFullYear() == y && currtime.getMonth() + 1 == m && currtime.getDate() - 1 == d) {
            timestr = "昨天 " + hour + ":" + min
          } else if (currtime.getFullYear() == y) {
            timestr = m + "-" + d + " " + hour + ":" + min
          } else {
            timestr = y + "-" + m + "-" + d + " " + hour + ":" + min
          }



          let record = {
            rid: item[5],
            id: item[0],
            content: item[1],
            uname: item[3],
            avatar: item[4],
            crtime: timestr
          }
          //console.log(typeof(user.name))
          this.records.push(record)
        })

      },
      deleteMyRecord(recordId) {
        console.log(recordId)
        this.$swal({
          text: '你确定要删除此内容吗?',
          confirmButtonText: '删除'
        }).then((res) => {
          if (res.value) {
            deleteRecord(recordId).then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              //this.$router.push({ path: 'record' })
            }).catch(err => {
              this.$message.error('删除失败');
            })
          }
        })
      },
      p(s) {
        //时间补0
        return s < 10 ? '0' + s : s;
      },
      handleChange(val) {
        console.log(val);
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
      navTo(name) {
        this.$router.push({ name: 'Column', params: { user: name } });
      }

    }

  }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>