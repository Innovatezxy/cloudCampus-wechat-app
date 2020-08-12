var app = getApp()
Page({
  data: {
    navH: 0,
    college: '',
    location: '',
    name: '',
    number: '',
    class: '',
    subclass: '',
    pro: '',
    status: '绑定',
  },
  tologin: function () {
    wx.redirectTo({
      url: '../login/login',
    })
  },
  onShow: function () { 
    var that= this
    var college = wx.getStorageSync('college')
    var location = wx.getStorageSync('location')
    var account = wx.getStorageSync('stuid')
    if (account == '') {
      this.setData({
        status: '绑定'
      })
    } else {
      this.setData({
        status: '重新绑定'
      })
    }
    that.setData({
      college: college,
      location: location,
      navH: app.globalData.navH,
    })
    if (college == 'imnu' || college == 'imau'){
      that.setData({
        name: getApp().globalData.name,
        number: getApp().globalData.number,
        class: getApp().globalData.class,
        subclass: getApp().globalData.subclass,
        pro: getApp().globalData.pro
      })
    } else if(college == 'imufe'){
      that.setData({
        name: getApp().globalData.name,
        number: getApp().globalData.number,
        class: getApp().globalData.class,
      })
    }
  },
})