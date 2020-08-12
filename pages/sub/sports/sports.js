const App = getApp()
var appConfig = require('../../../utils/app/config.js')

Page({
  data: { 
    navH: 0,
    college: '',
    result: '',
    pkresult_self: '',
    pkresult_other: '',
    bmi: '--.--',
    datepick: '',
    dateIndex: 0,
    view: true,
    pkdisplay: true,
  },
  navBack: function () {
    //回退
    wx.navigateBack()
  },
  hidepk: function (){
    this.setData({
      pkdisplay: true,
    })
  },
  details: function (){
    var that = this
    var date = that.data.datepick[this.data.dateIndex]
    wx.navigateTo({
      url: './info?date=' + date,
    })
  },
  view: function (){
    if(this.data.view == true){
      this.setData({
        view: false,
      })
    } else {
      this.setData({
        view: true,
      })
    }
  },
  pk: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var date = that.data.datepick[this.data.dateIndex]
    var account = wx.getStorageSync('stuid')
    var college = wx.getStorageSync('college')
    var token = App.globalData.token
    console.log(index)
    this.setData({
      pkdisplay: false,
      pkresult_other: this.data.result.qiansanming[index]
    })
    wx.request({
      url: appConfig.jwAPI + college + '/spself',
      method: 'POST',
      data: {
        'id': account,
        'date': date,
        'token': token
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          pkresult_self: res.data
        })
      }
    })
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  accountInput: function (e) {
    this.setData({
      pkaccount: e.detail.value
    })
  },
  pkconfirm: function (e){
    var that = this
    var name = this.data.name
    var account = wx.getStorageSync('stuid')
    var college = wx.getStorageSync('college')
    var token = App.globalData.token
    var pkaccount = this.data.pkaccount
    var date = that.data.datepick[this.data.dateIndex]
    if (name && pkaccount){
      wx.request({
        url: appConfig.authAPI + college,
        method: 'POST',
        data: {
          'id': pkaccount
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000,
          })
          var pktoken = res.data.result[0].token
          wx.request({
            url: appConfig.jwAPI + college + '/spself',
            method: 'POST',
            data: {
              'id': pkaccount,
              'date': date,
              'token': pktoken
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res)
              if(res.data == null){
                wx.showModal({
                  title: '提示',
                  content: '暂无匹配数据',
                  showCancel: false,
                  confirmText: '确定',
                })
              } else {
                if (res.data['姓名'] == name && res.data['学号'] == pkaccount) {
                  that.setData({
                    pkresult_other: res.data
                  })
                  wx.showToast({
                    title: '加载中',
                    icon: 'loading',
                    duration: 10000,
                  })
                  wx.request({
                    url: appConfig.jwAPI + college + '/spself',
                    method: 'POST',
                    data: {
                      'id': account,
                      'date': date,
                      'token': token
                    },
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      console.log(res)
                      wx.showToast({
                        title: '获取成功',
                        icon: 'success',
                        duration: 500,
                      })
                      that.setData({
                        pkdisplay: false,
                        pkresult_self: res.data
                      })
                    }
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '验证失败',
                    showCancel: false,
                    confirmText: '确认',
                  })
                }
              }
            }
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整',
        showCancel: false,
        confirmText: '确认',
      })
    }
  },
  datePicker: function(e) {
    var that = this
    var account = wx.getStorageSync('stuid')
    var college = wx.getStorageSync('college')
    var token = App.globalData.token
    this.setData({
      dateIndex: e.detail.value,
    })
    var date = this.data.datepick[e.detail.value]
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000,
    })
    wx.request({
      url: appConfig.jwAPI + college + '/spinfo?date=' + date + '&&token=' + token,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '获取成功',
          icon: 'success',
          duration: 500,
        })
        var height_m = (res.data.shenggao / 100).toFixed(3)
        var weight = res.data.tizhong
        var bmi = (weight / Math.pow(height_m, 2)).toFixed(2)
        console.log(bmi)
        that.setData({
          result: res.data,
          bmi: bmi,
        })
      }
    })
  },
  onReady: function () {
    var that = this
    var account = wx.getStorageSync('stuid')
    var college = wx.getStorageSync('college')
    var token = App.globalData.token
    this.setData({
      navH: App.globalData.navH,
    })
    if (account == '') {
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
              url: '../login/login',
            })
          } else {
            wx.switchTab({
              url: '/pages/home/home',
            })
          }
        },
      })
    } else {
      wx.request({
        url: appConfig.jwAPI + college + '/spdate?token=' + token,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          if (res.data.length > 0) {
            if(college == 'imnu'){
              var date = (res.data).reverse()
            }
            if (college == 'imau') {
              var date = res.data
            }
            that.setData({
              datepick: date
            })
            wx.setStorage({
              key: 'sportsdate',
              data: date,
            })
            wx.showToast({
              title: '加载中',
              icon: 'loading',
              duration: 10000,
            })
            if(college == 'imnu'){
              wx.request({
                url: appConfig.jwAPI + college + '/spinfo?date=' + date[1] + '&&token=' + token,
                method: 'GET',
                header: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  console.log(res)
                  var height_m = (res.data.shenggao / 100).toFixed(3)
                  var weight = res.data.tizhong
                  var bmi = (weight / Math.pow(height_m, 2)).toFixed(2)
                  console.log(bmi)
                  that.setData({
                    result: res.data,
                    bmi: bmi,
                  })
                  wx.setStorage({
                    key: 'sportsinfo',
                    data: res.data,
                  })
                  wx.setStorage({
                    key: 'bmi',
                    data: bmi,
                  })
                  that.toShow()
                }
              })
            } else {
              wx.request({
                url: appConfig.jwAPI + college + '/spinfo?date=' + date[0] + '&&token=' + token,
                method: 'GET',
                header: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  console.log(res)
                  var height_m = (res.data.shenggao / 100).toFixed(3)
                  var weight = res.data.tizhong
                  var bmi = (weight / Math.pow(height_m, 2)).toFixed(2)
                  console.log(bmi)
                  that.setData({
                    result: res.data,
                    bmi: bmi,
                  })
                  wx.setStorage({
                    key: 'sportsinfo',
                    data: res.data,
                  })
                  wx.setStorage({
                    key: 'bmi',
                    data: bmi,
                  })
                  that.toShow()
                }
              })
            }
          }
        }
      })
    }
  },
  toShow: function () {
    var that = this
    wx.showToast({
      title: '获取成功',
      icon: 'success',
      duration: 500,
    })
    this.setData({
      result: that.data.result,
      bmi: that.data.bmi,
      datepick: that.data.datepick,
    })
  },
  onShow: function (){
    var that = this
    var college = wx.getStorageSync('college')
    var date = wx.getStorageSync('sportsdate')
    var info = wx.getStorageSync('sportsinfo')
    var bmi = wx.getStorageSync('bmi')
    this.setData({
      college: college,
      result: info,
      bmi: bmi,
      datepick: date,
    })
    if(college == 'imnu'){
      this.setData({
        dateIndex: 1
      })
    } else {
      dateIndex: 0
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button' || res.from === 'menu') {
      console.log(res.target)
    }
    return {
      title: '我的体测信息在这↓↓↓，你的呢',
      path: '/pages/sub/sports/sports'
    }
  }
})