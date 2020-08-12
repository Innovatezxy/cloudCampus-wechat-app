var App = getApp()
Page({
  data: {
    navH: 0,
    help: false,
    money: false,
    about: false,
    user_agreement: false,
    privacy: false,
    topone: false,
    bodyone: false,
    bodytwo: false,
    bodythree: false,
    bodyfour: false,
    bodyfive: false,
    bodysix: false,
    bodyseven: false,
    bodyeight: false,
    bodynine: false,
    car: false,
  },
  gzh_1: function () {
    wx.setClipboardData({
      data: 'WulinToya光影',
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000,
        })
      }
    })
  },
  gzh_2: function () {
    wx.setClipboardData({
      data: '内师大盛乐之声',
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000,
        })
      }
    })
  },
  gzh_3: function () {
    wx.setClipboardData({
      data: '军迷社社团',
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000,
        })
      }
    })
  },
  url_1: function () {
    wx.setClipboardData({
      data: 'https://mp.weixin.qq.com/s/X9QdtUbX1W2emyE93tSPuw',
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000,
        })
      }
    })
  },
  url_2: function () {
    wx.setClipboardData({
      data: 'https://mp.weixin.qq.com/s/Ns0xlzHF8_-YDcWk7391YA',
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000,
        })
      }
    })
  },
  appid: function () {
    wx.setClipboardData({
      data: 'wx2bd97997e95bc55e',
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000,
        })
      }
    })
  },
  board: function () {
    wx.setClipboardData({
      data: 'innovatezxy@163.com',
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000,
        })
      }
    })
  },
  onLoad: function(options) {
    var that = this
    this.setData({
      navH: App.globalData.navH,
    })
    if (options.help == 'true'){
      that.setData({
        help: true,
      })
    }
    if (options.money == 'true') {
      that.setData({
        money: true,
      })
    }
    if (options.about == 'true') {
      that.setData({
        about: true,
      })
    }
    if (options.user_agreement == 'true') {
      that.setData({
        user_agreement: true,
      })
    }
    if (options.privacy == 'true') {
      that.setData({
        privacy: true,
      })
    }
    if (options.topone == 'true') {
      that.setData({
        topone: true,
      })
    }
    if (options.bodyone == 'true') {
      that.setData({
        bodyone: true,
      })
    }
    if (options.bodytwo == 'true') {
      that.setData({
        bodytwo: true,
      })
    }
    if (options.bodythree == 'true') {
      that.setData({
        bodythree: true,
      })
    }
    if (options.bodyfour == 'true') {
      that.setData({
        bodyfour: true,
      })
    }
    if (options.bodyfive == 'true') {
      that.setData({
        bodyfive: true,
      })
    }
    if (options.bodysix == 'true') {
      that.setData({
        bodysix: true,
      })
    }
    if (options.bodyseven == 'true') {
      that.setData({
        bodyseven: true,
      })
    }
    if (options.bodyeight == 'true') {
      that.setData({
        bodyeight: true,
      })
    }
    if (options.bodynine == 'true') {
      that.setData({
        bodynine: true,
      })
    }
    if (options.car == 'true') {
      wx.redirectTo({
        url: '../car/passenger',
      })
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
  }
})