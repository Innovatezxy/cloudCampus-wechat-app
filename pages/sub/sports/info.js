var App = getApp()
var appConfig = require('../../../utils/app/config.js')

Page({
  data: {
    navH: 0,
    result: '',
  },
  onLoad: function (options){
    var that = this
    var account = wx.getStorageSync('stuid')
    var college = wx.getStorageSync('college')
    var token = App.globalData.token
    this.setData({
      navH: App.globalData.navH,
      college: college
    })
    if (account == '') {
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 1500,
      })
      wx.request({
        url: appConfig.jwAPI + college + '/spself',
        method: 'POST',
        data: {
          'id': account,
          'date': options.date,
          'token': token
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res)
          that.setData({
            result: res.data
          })
          wx.setStorage({
            key: 'sportsself',
            data: res.data,
          })
          that.toShow()
        }
      })
    }
  },
  onShow: function (){
    var self = wx.getStorageSync('sportsself')
    this.setData({
      result: self
    })
  },
  toShow: function () {
    var that = this 
    wx.showToast({
      title: '获取成功',
      icon: 'success',
      duration: 500,
    })
    this.setData({
      result: that.data.result
    })
  }
})