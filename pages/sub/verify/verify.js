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
    var rightname = app.globalData.check_name
    var account = app.globalData.xh
    if(this.data.name == rightname){
      app.globalData.token = app.globalData.check_token
      app.globalData.name = app.globalData.check_name
      wx.setStorageSync('stuid', account)
      wx.showToast({
        title: '验证成功',
        icon: 'success',
        duration: 500,
      })
      wx.reLaunch({
        url: '../../home/home',
      })
    }else{
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