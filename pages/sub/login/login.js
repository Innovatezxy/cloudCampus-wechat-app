var app = getApp()
var util = require('../../../utils/util.js');
var appConfig = require('../../../utils/app/config.js')

Page({
  data: {
    navH: 0,
    account: '',
    passwd: '',
    verify: '',
    url: '',
    status: '登录',
    btn_color: 'light',
    hide: true,
  },
  accountInput: function(e) {
    if (e.detail.value.length == 0 || this.data.passwd.length == 0) {
      this.setData({
        btn_color: 'light',
      })
    } else {
      this.setData({
        btn_color: 'deep',
      })
    }
    this.setData({
      account: e.detail.value
    })
  },
  passwordInput: function(e) {
    if (this.data.account.length== 0 || e.detail.value.length == 0){
      this.setData({
        btn_color: 'light',
      })
    } else {
      this.setData({
        btn_color: 'deep',
      })
    }
    this.setData({
      passwd: e.detail.value
    })
  },
  verifyInput: function(e) {
    this.setData({
      verify: e.detail.value
    })
  },
  logintouser: function(e) {
    var that = this
    var account = this.data.account
    var college = wx.getStorageSync('college')

    if(college == 'imnu') {
      if (this.data.account.length == 0 || this.data.passwd.length == 0) {
        
      } else if (this.data.passwd.length < 6){
        wx.showModal({
          title: '提示',
          content: '学号或密码错误',
          showCancel: false,
          confirmText: '确认',
        })
      } else {
        wx.request({
          url: appConfig.authAPI + college,
          method: 'POST',
          data: {
            'id': this.data.account
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data.result[0].token)
            app.globalData.xh = account
            app.globalData.check_token = res.data.result[0].token
            wx.request({
              url: appConfig.jwAPI + 'imnu/info?token=' + res.data.result[0].token,
              method: 'GET',
              header: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                console.log(res)
                if (res.statusCode == 200) {
                  app.globalData.check_name = res.data.xueji.XM
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 1000,
                  })
                  wx.navigateTo({
                    url: '../verify/verify',
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '帐户异常',
                    showCancel: false,
                    confirmText: '确认',
                  })
                }
              }
            })
          }
        })
      }
    }
    if (college == 'imufe') {
      if (this.data.account.length == 0 || this.data.passwd.length < 6) {
        wx.showModal({
          title: '提示',
          content: '学号或密码错误',
          showCancel: false,
          confirmText: '确认',
        })
      } else {
        wx.request({
          url: appConfig.authAPI + college,
          method: 'POST',
          data: {
            'id': this.data.account
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data.result[0].token)
            app.globalData.xh = account
            app.globalData.check_token = res.data.result[0].token
            wx.request({
              url: appConfig.jwAPI + 'imufe/info?token=' + res.data.result[0].token,
              method: 'GET',
              header: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                console.log(res)
                if (res.statusCode == 200) {
                  app.globalData.check_name = res.data.userName
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 1000,
                  })
                  wx.navigateTo({
                    url: '../verify/verify',
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '帐户异常',
                    showCancel: false,
                    confirmText: '确认',
                  })
                }
              }
            })
          }
        })
      }
    }
    if (college == 'imau') {
      if (this.data.account.length == 0 || this.data.passwd.length < 6) {
        wx.showModal({
          title: '提示',
          content: '学号或密码错误',
          showCancel: false,
          confirmText: '确认',
        })
      } else {
        wx.request({
          url: appConfig.authAPI + college,
          method: 'POST',
          data: {
            'id': this.data.account
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data.result[0].token)
            app.globalData.xh = account
            app.globalData.check_token = res.data.result[0].token
            wx.request({
              url: appConfig.jwAPI + 'imau/info?token=' + res.data.result[0].token,
              method: 'GET',
              header: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                console.log(res)
                if (res.statusCode == 200) {
                  app.globalData.check_name = res.data.xueji.XM
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 1000,
                  })
                  wx.navigateTo({
                    url: '../verify/verify',
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '帐户异常',
                    showCancel: false,
                    confirmText: '确认',
                  })
                }
              }
            })
          }
        })
      }
    }
  },
  toservices: function() {
    wx.showModal({
      title: '提示',
      content: '可以前往\n更多-账号绑定',
      showCancel: false,
      complete: function(res) {
        wx.switchTab({
          url: '../../home/home',
        })
      }
    })
  },
  help: function () {
    wx.showModal({
      title: '提示',
      content: '1.学号密码均为教务系统存在的信息\n2.密码默认为身份证后六位或后七位中前六位，若已更改即为已更改密码',
      showCancel: false,
    })
  },
  onReady: function() {
    var that = this
    var college = wx.getStorageSync('college')
    var account = wx.getStorageSync('stuid')
    var oldacc = wx.getStorageSync('account')
    this.setData({
      navH: app.globalData.navH,
    })
    if (oldacc != '' && account == '') {
      wx.showModal({
        title: '提示',
        content: '为保障您的数据隐私安全，我们基于HTTPS安全协议及数据加密传输MD5算法校验对平台全新升级，请重新登录',
        showCancel: false,
        confirmText: '确认',
      })
    }
    if (college == ''){
      wx.redirectTo({
        url: '../location/location',
      })
    }
    else {
      that.setData({
        status: '登录'
      })
    }
  },
})