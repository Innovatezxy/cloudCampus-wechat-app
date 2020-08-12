var app = getApp()
Page({
  data: {
    navH: 0,
    admin: '',
    adminpwd: '',
  },
  accountInput: function(e) {
    this.setData({
      admin: e.detail.value
    })
  },
  passwordInput: function(e) {
    this.setData({
      adminpwd: e.detail.value
    })
  },
  logintouser: function() {
    if (this.data.admin.length == 0 || this.data.adminpwd.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写完整',
        showCancel: false,
        confirmText: '确认',
      })
    } else {
      // 登陆成功设定
    }
  },
  onLoad: function(options) {
    var that = this
    var admin = wx.getStorageSync('admin')
    var shortcutpwd = wx.getStorageSync('shortcutpwd')
    var databasepwd = wx.getStorageSync('databasepwd')
    this.setData({
      navH: app.globalData.navH,
    })
  },
})