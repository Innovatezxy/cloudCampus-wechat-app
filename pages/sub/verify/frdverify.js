var app = getApp()
Page({
  data: {
    navH: 0,
    name: ''
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  logintouser: function (e) {
    var rightname = getApp().globalData.frd_name
    var account = getApp().globalData.frd_xh
    if (this.data.name == rightname) {
      wx.setStorage({
        key: 'frdacc',
        data: account,
      })
      wx.showToast({
        title: '验证成功',
        icon: 'success',
        duration: 500,
      })
      wx.redirectTo({
        url: '../schedule/frdsch',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '验证失败',
        showCancel: false,
        confirmText: '确定',
      })
    }
  },
  onLoad: function (){
    this.setData({
      navH: app.globalData.navH,
    })
  }
})