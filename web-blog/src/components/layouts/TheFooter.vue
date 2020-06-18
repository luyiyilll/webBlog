<template>
  <footer class="footer">
    <div class="container flex justify-center">
      <div class="row footer-top">
        <p class="padding-top-xsm">{{ description }}</p>
        <div class="text-md">
          <a v-for="item in contacts" v-title="item.title" :href="item.link" :style="contactStyle" target="_blank">
            <i :class="`fa fa-${item.icon}`"></i>
          </a>
        </div>
        <br>
        <span v-html="designer"></span>
      </div>
    </div>
  </footer>
</template>

<script>
  import title from '@/directives/title'
  export default {
    name: 'TheFooter',
    directives: {
      title
    },
    data() {
      return {
        description: 'Zero Blog 是基于Vue.js+SpringBoot搭建的博客网站',
        contacts: [
          {
            icon: 'envelope',
            title: '反馈问题',
            link: 'mailto:1224847912@qq.com'
          },
          {
            icon: 'weibo',
            title: '关注微博',
            link: 'https://weibo.com/u/3243345820?nick=%E5%8D%A2%E6%BC%AALuYi&is_all=1'
          },
          {
            icon: 'weixin',
            title: '加我微信',
            link: ''
          }
        ],
        contactStyle: {
          paddingRight: '8px'
        },
        designer: `
        <span style="font-size:0.9em">Designed by
          <span style="color: #e27575;font-size: 14px;">❤</span>
          <a href="https://github.com/luyiyilll"target="_blank"style="color:inherit">Sarah Lu</a>
        </span>
      `,
      }
    }
  }
</script>

<style scoped>
  a:hover,
  a:focus {
    color: #e27575;
    transition: color .15s;
  }

  .footer {
    position: relative;
  }
</style>