module.exports = {
  development: {
    THESERVER: '',
    SZP_HOST: 'http://10.2.231.84:8088/api/',
  },
  dev: {
    THESERVER: '',
    SZP_HOST: 'http://10.2.231.84:8088/api/',
  },
  test: {
    THESERVER: '',
    SZP_HOST: 'http://10.2.231.84:8088/api/',
  },
  production: {
    THESERVER: '',
    SZP_HOST: 'http://10.2.231.84:8088/api/',
  }
}[process.env.NODE_ENV]
