var util = require('/utils/util.js');
var appConfig = require('/utils/app/config.js')

App({
  data:{
    data: {},
    result: {}
  },
  onLaunch: function () {
    wx.getSystemInfo({
      success: res => {
        //导航栏高度
        this.globalData.navH = res.statusBarHeight;
      }, fail(err) {
        console.log(err);
      }
    })

    var that = this
    var location = wx.getStorageSync('location')
    var college = wx.getStorageSync('college')
    var account = wx.getStorageSync('stuid')
    var today = util.formatToday(new Date())
    var time = util.formatNowtime(new Date())
    var dtnum = util.formatJustdate(new Date())

    if (college == ''){
      wx.redirectTo({
        url: '/pages/sub/location/location',
      })
    }
    if (account == '') {
      wx.navigateTo({
        url: '/pages/sub/login/login',
      })
    } else {
      // 身份Cookie获取
      wx.request({
        url: appConfig.authAPI + college,
        method: 'POST',
        data: {
          'id': account
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data)
          that.globalData.token = res.data.result[0].token
          var token = res.data.result[0].token
          // 学生基本信息获取
          wx.request({
            url: appConfig.jwAPI + college + '/info?token=' + token,
            method: 'GET',
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log(res)

              if (college == 'imnu' || college == 'imau') {
                wx.setStorageSync('stuname', res.data.xueji.XM)
                that.globalData.name = res.data.xueji.XM
                that.globalData.number = res.data.xueji.XH
                that.globalData.class = res.data.xueji.YXMC
                that.globalData.pro = res.data.xueji.ZYMC
                that.globalData.subclass = res.data.xueji.BJMC
                that.globalData.birthdate = res.data.xueji.SFZH
              }
              if (college == 'imufe') {
                wx.setStorageSync('stuname', res.data.userName)
                that.globalData.name = res.data.userName
                that.globalData.number = res.data.userId
                that.globalData.class = res.data.unitName
              }
              if(college == 'imnu' || college == 'imau'){
                if (res.data.xueji.SFZH.slice(10, 14) == dtnum) {
                  wx.reLaunch({
                    url: '/pages/home/home',
                  })
                }
              }
              if(college == 'imufe'){
                if (res.data.idcode.slice(10, 14) == dtnum) {
                  wx.reLaunch({
                    url: '/pages/home/home',
                  })
                }
              }
            }
          })
        }
      })
    }
  },
  globalData: {
    navH: 0,
    token: '',
    check_token: '',
    check_name: '',
    frd_xh: '',
    frd_name: '',
    xh: '',
    name: '',
    sex: '',
    birth: '',
    birthdate: '',
    number: '',
    class: '',
    subclass: '',
    pro: '',
    mobile: '',
    balance: '',
  }
})