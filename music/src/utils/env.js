const curENV = 'dev'
// const curENV = '$ENV$'

const devENV = {
  apiMall: 'http://medlinkfamily.cn/sysex/index.php?',
  // apiMall: 'http://10.0.0.93:8089',
  // apiMall: 'https://wx2.liking.com',
  env: 'dev'
}

const prodENV = {
  apiMall: 'http://medlinkfamily.cn/sysex/index.php?',
  // apiMall: 'http://localhost:8080',
  // apiMall: 'https://10.0.0.93:444',
  env: 'prod'
}

module.exports = {
  curENV: curENV,
  devENV: devENV,
  prodENV: prodENV
}
