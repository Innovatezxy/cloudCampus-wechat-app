var app = getApp()
var util = require('../../../utils/util.js');
var appConfig = require('../../../utils/app/config.js')

Page({
  data: {
    navH: 0,
    table_title: '点击查看乘车时间表',
    slzjbc: '',
    slxybc: '',
    sllength: '',
    slresult: '',
    shzjbc: '',
    shxybc: '',
    shlength: '',
    shresult: '',
    authorize: false,
    table_status: false,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
  },
  // 乘车时间表
  timetable: function() {
    if (this.data.table_status == true) {
      this.setData({
        table_status: false,
        table_title: '点击查看乘车时间表'
      })
    } else {
      this.setData({
        table_status: true,
        table_title: '点击隐藏乘车时间表'
      })
    }
  },
  // 发表内容输入
  contentInput: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  // Swiper组件滑动判断
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    that.onShow()
  },
  // 顶部选项判断
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // 授权检测
  post: function() {
    var that = this
    // 检测微信授权登录
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              console.log(res)
              that.setData({
                authorize: false,
                name: res.userInfo.nickName
              })
            }
          })
        }
      }
    })
    setTimeout(() => {
      console.log('auth')
      if (this.data.name == undefined) {
        this.setData({
          authorize: true
        })
      }
    }, 800)
  },
  // 获取微信昵称
  bindGetUserInfo: function(e) {
    var that = this
    that.setData({
      authorize: false,
      name: e.detail.userInfo.nickName
    })
    that.onShow()
  },
  // 取消授权
  cancel: function() {
    this.setData({
      authorize: false
    })
  },
  // 发送文字
  confirm: function() {
    var that = this
    var date = util.formatToday(new Date())
    var time = util.formatNowtime(new Date())
    var name = that.data.name
    var content = this.data.content
    var current = this.data.currentTab
    console.log(content)

    setTimeout(() => {
      if (name == undefined) {
        wx.showModal({
          title: '提示',
          content: '请返回重新授权，微信昵称将作为发送内容昵称显示',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              that.onShow()
            }
          }
        })
      }
    },800)
    if (content == undefined || content == '') {
      wx.showModal({
        title: '提示',
        content: '请输入内容',
        showCancel: false,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '发送后不可撤回，是否发送',
        showCancel: true,
        cancelText: '取消',
        cancelColor: "#000",
        confirmText: '确定',
        confirmColor: "#14c410",
        success: function(res) {
          if (res.confirm) {
            if (current == 0) {
              wx.request({
                url: appConfig.baseAPI + '/imnucarp?code=sl' + '&&date=' + date + '&&time=' + time + '&&name=' + name + '&&content=' + content + '&&img=f',
                method: 'GET',
                header: {
                  'Content-Type': 'application/json'
                },
                success: function(res) {
                  console.log(res)
                  that.setData({
                    display: true
                  })
                  wx.showToast({
                    title: '发送成功',
                    icon: 'success',
                    duration: 1000,
                  })
                  that.onShow()
                },
              })
            } else if (current == 1) {
              wx.request({
                url: appConfig.baseAPI + '/imnucarp?code=sh' + '&&date=' + date + '&&time=' + time + '&&name=' + name + '&&content=' + content + '&&img=f',
                method: 'GET',
                header: {
                  'Content-Type': 'application/json'
                },
                success: function(res) {
                  console.log(res)
                  that.setData({
                    display: true
                  })
                  wx.showToast({
                    title: '发表成功',
                    icon: 'success',
                    duration: 1000,
                  })
                  that.onShow()
                },
              })
            }
          }
        },
      })
    }
  },
  // 发送图片
  upload_img: function() {
    var that = this
    var date = util.formatToday(new Date())
    var time = util.formatNowtime(new Date())
    var name = that.data.name
    var current = this.data.currentTab
    var timestamps = Math.round(new Date().getTime() / 1000).toString();

    if (name == undefined) {
      wx.showModal({
        title: '提示',
        content: '请返回重新授权，微信昵称将作为发送内容昵称显示',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            that.onShow()
          }
        }
      })
    } else {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          wx.showLoading({
            title: '上传中',
          })
          wx.uploadFile({
            url: appConfig.baseAPI + '/carimgupload?time=' + timestamps,
            filePath: res.tempFilePaths[0],
            name: 'car_img',
            header: {
              "Content-Type": "multipart/form-data"
            },
            success(res) {
              console.log(res)
              if (res.statusCode == 200) {
                wx.hideLoading()
                var content = res.data
                if (current == 0) {
                  wx.request({
                    url: appConfig.baseAPI + '/imnucarp?code=sl' + '&&date=' + date + '&&time=' + time + '&&name=' + name + '&&content=' + content + '&&img=t',
                    method: 'GET',
                    header: {
                      'Content-Type': 'application/json'
                    },
                    success: function (res) {
                      console.log(res)
                      that.setData({
                        display: true
                      })
                      wx.showToast({
                        title: '发送成功',
                        icon: 'success',
                        duration: 1000,
                      })
                      that.onShow()
                    },
                  })
                } else if (current == 1) {
                  wx.request({
                    url: appConfig.baseAPI + '/imnucarp?code=sh' + '&&date=' + date + '&&time=' + time + '&&name=' + name + '&&content=' + content + '&&img=t',
                    method: 'GET',
                    header: {
                      'Content-Type': 'application/json'
                    },
                    success: function (res) {
                      console.log(res)
                      that.setData({
                        display: true
                      })
                      wx.showToast({
                        title: '发表成功',
                        icon: 'success',
                        duration: 1000,
                      })
                      that.onShow()
                    },
                  })
                }
              } else {
                wx.showModal({
                  title: '提示',
                  content: '上传失败，请检查网络',
                  showCancel: false,
                })
              }
            }
          })
        }
      })
    }
  },
  // 预览图片
  preview: function(e) {
    var imglist = []
    imglist.push(e.target.dataset.url)
    wx.previewImage({
      urls: imglist
    })
  },
  onShow: function() {
    var that = this;
    var justtime = util.formatJusttime(new Date())
    var today = util.formatToday(new Date())
    console.log(this.data.currentTab)
    that.setData({
      navH: app.globalData.navH,
      today: today
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    })
    // 检测微信授权登录
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.setData({
                name: res.userInfo.nickName
              })
            }
          })
        }
      }
    })
    // 开往赛罕时间判断
    if (justtime >= 50000 && justtime < 73000) {
      that.setData({
        slzjbc: '07:30',
        slxybc: '10:30',
      })
    } else if (justtime >= 73000 && justtime < 103000) {
      that.setData({
        slzjbc: '10:30',
        slxybc: '12:30',
      })
    } else if (justtime >= 103000 && justtime < 123000) {
      that.setData({
        slzjbc: '12:30',
        slxybc: '13:50',
      })
    } else if (justtime >= 123000 && justtime < 135000) {
      that.setData({
        slzjbc: '13:50',
        slxybc: '16:10',
      })
    } else if (justtime >= 135000 && justtime < 161000) {
      that.setData({
        slzjbc: '16:10',
        slxybc: '16:50',
      })
    } else if (justtime >= 161000 && justtime < 165000) {
      that.setData({
        slzjbc: '16:50',
        slxybc: '17:40',
      })
    } else if (justtime >= 165000 && justtime < 174000) {
      that.setData({
        slzjbc: '17:40',
        slxybc: '18:10',
      })
    } else if (justtime >= 174000 && justtime < 181000) {
      that.setData({
        slzjbc: '18:10',
        slxybc: '无',
      })
    } else {
      that.setData({
        slzjbc: '无',
        slxybc: '无',
      })
    }
    // 开往盛乐时间判断
    if (justtime >= 50000 && justtime < 65000) {
      that.setData({
        shzjbc: '06:50',
        shxybc: '08:00',
      })
    } else if (justtime >= 65000 && justtime < 80000) {
      that.setData({
        shzjbc: '08:00',
        shxybc: '08:50',
      })
    } else if (justtime >= 80000 && justtime < 85000) {
      that.setData({
        shzjbc: '08:50',
        shxybc: '11:40',
      })
    } else if (justtime >= 85000 && justtime < 114000) {
      that.setData({
        shzjbc: '11:40',
        shxybc: '12:40',
      })
    } else if (justtime >= 114000 && justtime < 124000) {
      that.setData({
        shzjbc: '12:40',
        shxybc: '14:40',
      })
    } else if (justtime >= 124000 && justtime < 144000) {
      that.setData({
        shzjbc: '14:40',
        shxybc: '16:40',
      })
    } else if (justtime >= 144000 && justtime < 164000) {
      that.setData({
        shzjbc: '16:40',
        shxybc: '19:00',
      })
    } else if (justtime >= 164000 && justtime < 190000) {
      that.setData({
        shzjbc: '19:00',
        shxybc: '无',
      })
    } else {
      that.setData({
        shzjbc: '无',
        shxybc: '无',
      })
    }
    // 获取当前动态信息
    wx.request({
      url: appConfig.baseAPI + '/imnucarv?code=sl&&date=' + today,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          slresult: res.data.result,
          sllength: res.data.result.length
        })
        wx.showToast({
          title: '获取成功',
          icon: 'success',
          duration: 1000,
        })
      },
    })
    wx.request({
      url: appConfig.baseAPI + '/imnucarv?code=sh&&date=' + today,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          shresult: res.data.result,
          shlength: res.data.result.length
        })
        wx.showToast({
          title: '获取成功',
          icon: 'success',
          duration: 1000,
        })
      }
    })
  },
  // 分享
  onShareAppMessage: function(res) {
    if (res.confirm === 'menu') {
      console.log(res.target)
    }
    return {
      title: '校车实时查询，来一份么',
      path: '/pages/sub/car/passenger'
    }
  }
})