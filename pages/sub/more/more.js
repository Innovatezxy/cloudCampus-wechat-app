var App = getApp()
Page({
  data: {
    navH: 0,
    status: '',
    name: '---',
    id: '***********',
  },
  clear: function () {
    wx.showModal({
      title: '提示',
      content: '清除缓存将清除本设备数据,并需要重新绑定',
      showCancel: true,
      cancelText: '取消',
      cancelColor: "#14c410",
      confirmText: '确定',
      confirmColor: "#e02020",
      success: function (res) {
        if (res.confirm) {
          wx.clearStorage()
        }
      },
    })
  },
  onShow: function (){
    var that = this
    var college = wx.getStorageSync('college')
    var account = wx.getStorageSync('stuid')
    if (account == '') {
      this.setData({
        status: '未绑定'
      })
    } else {
      this.setData({
        status: '已绑定'
      })
    }
    this.setData({
      navH: App.globalData.navH,
    })
    if (college == 'imnu' || college == 'imau') {
      that.setData({
        name: getApp().globalData.name,
        id: getApp().globalData.number,
      })
    } else if (college == 'imufe') {
      that.setData({
        name: getApp().globalData.name,
        id: getApp().globalData.number,
      })
    }
  }
})