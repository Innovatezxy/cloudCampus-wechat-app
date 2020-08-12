var App = getApp()
Page({
  data: {
    vavH: 0,
  },
  onLoad: function (){
    this.setData({
      navH: App.globalData.navH,
    })
  }
})