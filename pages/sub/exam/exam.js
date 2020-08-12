var App = getApp()
var appConfig = require('../../../utils/app/config.js')

Page({
  data:{
    navH: 0,
    name: '---',
    id: '---',
    res: '',
    switch: true,
  },
  navBack: function () {
    //回退
    wx.navigateBack()
  },
  onReady: function (){
    var that = this
    var name = App.globalData.name
    var college = wx.getStorageSync('college')
    var account = wx.getStorageSync('stuid')
    var token = App.globalData.token
    this.setData({
      name: name,
      id: account,
      navH: App.globalData.navH,
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
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 2000,
      })
      wx.request({
        url: appConfig.jwAPI + college + '/exam?token=' + token,
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        success: function (res){
          console.log(res)
          var result = []
          var results = res.data.data
          for (var i = 0; i < results.length; i++) {
            if (results[i].XN == '2018-2019学年' && results[i].XQM == '第二学期') {
              result.push(results[i])
            }
          }
          that.setData({
            res: results,
            result: result,
            results: results
          })
          wx.setStorage({
            key: 'examinfo',
            data: results,
          })
          that.toShow()
        }
      })
    }
  },
  switch_on: function () {
    var that = this
    this.setData({
      switch: false,
      res: that.data.result,
    })
  },
  switch_off: function () {
    var that = this
    this.setData({
      switch: true,
      res: that.data.results,
    })
  },
  toShow: function () {
    var that = this
    var name = App.globalData.name
    var account = wx.getStorageSync('stuid')
    wx.showToast({
      title: '获取成功',
      icon: 'success',
      duration: 500,
    })
    this.setData({
      name: name,
      id: account,
      res: that.data.results,
    })
  },
  onShow: function (){ 
    var that = this
    var name = App.globalData.name
    var account = wx.getStorageSync('stuid')
    var results = wx.getStorageSync('examinfo')
    this.setData({
      name: name,
      id: account,
      res: results,
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button' || res.from === 'menu') {
      console.log(res.target)
    }
    return {
      title: '你知道考试安排了么，这都有哦',
      path: '/pages/sub/exam/exam'
    }
  }
})