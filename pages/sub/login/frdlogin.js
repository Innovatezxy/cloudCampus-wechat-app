var app = getApp()
var appConfig = require('../../../utils/app/config.js')

Page({
  data: {
    navH: 0,
    account: '',
  },
  accountInput: function (e) {
    this.setData({
      account: e.detail.value
    })
  },
  logintouser: function (e) {
    var account = this.data.account
    var college = wx.getStorageSync('college')
    if (this.data.account.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写完整',
        showCancel: false,
        confirmText: '确认',
      })
    } else {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 2000,
      })
      if (college == 'imnu') {
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
            var token = res.data.result[0].token
            app.globalData.frd_xh = account
            wx.request({
              url: appConfig.jwAPI + 'imnu/info?token=' + token,
              method: 'GET',
              header: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                console.log(res)
                if (res.statusCode == 200 && res.header['Content-Length'] != 31) {
                  app.globalData.frd_name = res.data.xueji.XM
                  wx.navigateTo({
                    url: '../verify/frdverify',
                  })
                } else if (res.statusCode == 200 && res.header['Content-Length'] < 100) {
                  wx.showModal({
                    title: '提示',
                    content: '萌新，系统暂时还没有你的数据哦，之后再来绑定吧(*≧▽≦)',
                    showCancel: false,
                    confirmText: '确认',
                    complete: function (res) {
                      wx.switchTab({
                        url: '../../home/home',
                      })
                    }
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
      } else if (college == 'imufe') {
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
            var token = res.data.result[0].token
            app.globalData.frd_xh = account
            wx.request({
              url: appConfig.jwAPI + 'imufe/info?token=' + token,
              method: 'GET',
              header: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                console.log(res)
                if (res.statusCode == 200) {
                  app.globalData.frd_name = res.data.userName
                  wx.navigateTo({
                    url: '../verify/frdverify',
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
      } else if (college == 'imau') {
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
            var token = res.data.result[0].token
            app.globalData.frd_xh = account
            wx.request({
              url: appConfig.jwAPI + 'imau/info?token=' + token,
              method: 'GET',
              header: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                console.log(res)
                if (res.statusCode == 200) {
                  app.globalData.frd_name = res.data.xueji.XM
                  wx.navigateTo({
                    url: '../verify/frdverify',
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
  toservices: function () {
    wx.showModal({
      title: '提示',
      content: '可以重新前往朋友课表-绑定',
      showCancel: false,
      complete: function (res) {
        wx.redirectTo({
          url: '../schedule/schedule',
        })
      }
    })
  },
  onReady: function () {
    var that = this
    this.setData({
      navH: app.globalData.navH,
    })
  },
})