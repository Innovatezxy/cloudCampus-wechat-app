var App = getApp();
var appConfig = require('../../../utils/app/config.js')

Page({
  data: {
    navH: 0,
    college: '',
    result: '',
    results: '',
    data: '',
    display: true,
    switchBtn: true,
    self: true,
  },
  switchBtn: function (e) {
    var that = this
    var id = e.target.id;
    if (id == 'this' && this.data.switchBtn == false){
      this.setData({
        self: true
      })
      that.onShow()
    }
    if (id == 'all' && this.data.switchBtn == true){
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 500,
      })
      var that = this
      this.setData({
        self: false,
      })
      that.onShow()
      wx.showToast({
        title: '获取成功',
        inon: 'success',
        duration: 500,
      })
    }
    this.setData({
      switchBtn: !this.data.switchBtn
    });
  },
  click: function (e) {
    var data = e.currentTarget.dataset
    console.log(data)
    this.setData({
      data: e.currentTarget.dataset,
      display: false
    })
  },
  hideview: function () {
    this.setData({
      display: true
    })
  },
  gpa: function () {
    wx.navigateTo({
      url: '../gpa/gpa',
    })
  },
  refresh: function (){
    var that = this
    this.setData({
      self: true,
      switchBtn: true,
    })
    that.onShow()
  },
  onReady: function (){
    var that = this
    var college = wx.getStorageSync('college')
    var account = wx.getStorageSync('stuid')
    var token = App.globalData.token
    this.setData({
      self: true,
      college: college
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
        url: appConfig.jwAPI + college + '/score?token=' + token,
        method: 'GET',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          wx.showToast({
            title: '获取成功',
            inon: 'success',
            duration: 500,
          })
          that.setData({
            result: res.data[0],
            results: res.data
          })
          wx.setStorage({
            key: 'selfscore',
            data: res.data[0],
          })
          wx.setStorage({
            key: 'allscore',
            data: res.data,
          })
          console.log(res.data)
        }
      })
      that.onShow()
    }
  },
  onShow: function () {
    var selfscore = wx.getStorageSync('selfscore')
    var allscore = wx.getStorageSync('allscore')
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500,
    })
    this.setData({
      navH: App.globalData.navH,
      result: selfscore,
      results: allscore
    })
  },
})