module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },
  publicPath: "/",
  lintOnSave: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://123.56.121.160:8085',   //代理接口
        changeOrigin: true,
      }
    }
  }


  // devServer: {
  //   proxy: 'http://123.56.121.160:8085/'
  // }

}