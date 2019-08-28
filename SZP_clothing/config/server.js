module.exports = {
  host: '0.0.0.0', // 本地服务ip; // 'localhost'是不能用http://本机IP:端口访问
  port: 8085, // 端口
  // historyApiFallback: true, // 不跳转
  inline: true, // 实时刷新
  // open:true //是否自动打开网页
  historyApiFallback: {
    index: '/'
  },
  proxy: {
    '/api': {
      target: 'http://localhost:9090',      // 转发mock请求
      secure: false
    },
    '/css/*': {
      target: 'http://localhost:8081/js/',  // 转发dev环境css引用路径
      secure: false
    }
  }
}
