var App = getApp()
Page({
  data: {
    navH: 0,
    college: '',
  },
  onReady: function (){
    var that = this
    var college = wx.getStorageSync('college')
    that.setData({
      college: college,
      navH: App.globalData.navH,
    })
    if (college == '') {
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
              url: '../location/location',
            })
          } else {
            wx.switchTab({
              url: '/pages/home/home',
            })
          }
        },
      })
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button' || res.from === 'menu') {
    }
    return {
      title: '送你一份校历~',
      path: '/pages/sub/schoolcalendar/schoolcalendar'
    }
  }
})