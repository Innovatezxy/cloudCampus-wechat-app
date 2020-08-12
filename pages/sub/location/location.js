var App = getApp()
Page({
  data:{
    navH: 0,
    status: '',
    hohhot: [{ en: "imu", cn: "内蒙古大学" },{ en: "imnu", cn: "内蒙古师范大学" }, { en: "imufe", cn: "内蒙古财经大学" }, { en: "imau", cn: "内蒙古农业大学" }, { en: "imut", cn: "内蒙古工业大学" }],
    baotou: [{ en: "imust", cn: "内蒙古科技大学" }],
    tongliao: [{ en: "imun", cn: "内蒙古民族大学" }]
  },
  choose: function(e){
    var that = this
    var data = e.currentTarget.dataset
    var index = e.currentTarget.dataset.index
    console.log(data)
    that.setData({
      status: data.cn
    })
    if (data.en == 'imnu' || data.en == 'imufe' || data.en == 'imau'){
      wx.showModal({
        title: '提示',
        content: '你选择的是：' + data.cn,
        showCancel: true,
        confirmText: '确定',
        success: function (res) {
          if (res.confirm) {
            wx.setStorage({
              key: 'college',
              data: data.en,
            })
            wx.setStorage({
              key: 'location',
              data: data.cn,
            })
            wx.redirectTo({
              url: '../login/login',
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '别着急哦，程序猿正在全力研发中',
        showCancel: false,
        confirmText: '好的',
      })
    }
    
  },
  onLoad: function(){
    var that = this
    var status = wx.getStorageSync('location')
    that.setData({
      status: status,
      navH: App.globalData.navH,
    })
  }
})