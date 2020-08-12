var app = getApp()
var appConfig = require('../../../utils/app/config.js')

Page({
  data: {
    navH: 0,
    college: '',
    reader: '',
    bookinfo: '',
  },
  onReady: function (){
    var that = this
    var college = wx.getStorageSync('college')
    var account = wx.getStorageSync('stuid')
    var token = app.globalData.token
    this.setData({
      navH: app.globalData.navH,
    })
    if (account == '') {
      wx.showModal({
        title: '提示',
        content: '未绑定无法使用此功能',
        showCancel: true,
        cancelText: '取消',
        cancelColor: "#14c410",
        confirmText: '绑定',
        confirmColor: "#e02020",
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../login/login',
            })
          } else {
            wx.switchTab({
              url: '/pages/home/home',
            })
          }
        },
      })
    } else {
      wx.request({
        url: appConfig.jwAPI + college + '/book?token=' + token,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          wx.showToast({
            title: '获取成功',
            inon: 'success',
            duration: 500,
          })
          if (res.statusCode == 200 && res.header['Content-Length'] != 31) {
            var reader = {
              name: res.data.reader['读者姓名'],
              need: res.data.reader['已借册数'],
              money: res.data.reader['欠款金额'],
              all: res.data.reader['累借册数'],
              }
            that.setData({
              reader: reader
            })
            wx.setStorage({
              key: 'reader',
              data: reader,
            })
          } else {
            var name = getApp().globalData.name
            var reader = {
              name: name,
              need: 0,
              money: 0,
              all: 0,
            }
            that.setData({
              reader: reader
            })
            wx.setStorage({
              key: 'reader',
              data: reader,
            })
          }
        }
      })

      wx.request({
        url: appConfig.jwAPI + college + '/bookinfo?token=' + token,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          that.setData({
            bookinfo: res.data.jieyue
          })
          wx.setStorage({
            key: 'bookinfo',
            data: res.data.jieyue,
          })
        }
      })
      that.onShow()
    }
  },
  onShow: function() {
    var that = this
    var reader = wx.getStorageSync('reader')
    var bookinfo = wx.getStorageSync('bookinfo')
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500,
    })
    that.setData({
      reader: reader,
      bookinfo: bookinfo
    })
  },
  onShareAppMessage: function (res) {
    if(res.confirm === 'menu'){
      console.log(res.target)
    }
    return{
      title: '借的图书都在这里了，来一份么',
      path: '/pages/sub/book/book'
    }
  }
})