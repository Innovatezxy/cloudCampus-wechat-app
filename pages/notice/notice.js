var App = getApp()
var appConfig = require('../../utils/app/config.js')

Page({
  data: {
    top: [
      {url: '../sub/article/article?topone=true',src: appConfig.baseAPI + '/homebg_1.jpg'},
      { url: '../sub/article/article?help=true',src: appConfig.baseAPI + '/homebg_2.jpg'},
      { url: '../sub/article/article?bodynine=true', src: appConfig.baseAPI + '/imaginecup/imagine_top.jpg' },
    ],
    noticead: true,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500
  },
  top :function (e) {
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url,
    })
  },
  onLoad: function () {
    var that = this
    var noticead = wx.getStorageSync('noticead')
    that.setData({
      noticead: noticead,
      navH: App.globalData.navH,
    })
  }
})