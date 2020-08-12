var App = getApp()
Page({
  data: {
    navH: 0,
    tomorrow: true,
    topad: true,
    noticead: true,
  },
  tomorrowChange: function(e) {
    wx.setStorage({
      key: 'tomorrowview',
      data: e.detail.value,
    })
  },
  topadChange: function(e) {
    wx.setStorage({
      key: 'topad',
      data: e.detail.value,
    })
  },
  noticeadChange: function(e) {
    wx.setStorage({
      key: 'noticead',
      data: e.detail.value,
    })
  },
  save: function() {
    wx.reLaunch({
      url: '../../home/home',
    })
  },
  onLoad: function() {
    var that = this
    var tomorrow = wx.getStorageSync('tomorrowview')
    var topad = wx.getStorageSync('topad')
    var noticead = wx.getStorageSync('noticead')
    that.setData({
      tomorrow: tomorrow,
      topad: topad,
      noticead: noticead,
      navH: App.globalData.navH,
    })
  }
})