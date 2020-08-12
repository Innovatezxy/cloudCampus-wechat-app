var App = getApp()
var appConfig = require('../../../utils/app/config.js')

Page({
  data: {
    navH: 0,
    college: '',
    bxxf: '',
    gpa: '',
    bxresult: '',
    fbxresult: '',
    display: true,
    helpdisplay: true,
  },
  add: function() {
    this.setData({
      display: false,
    })
  },
  delete: function() {
    this.setData({
      display: false,
    })
  },
  hideview: function() {
    this.setData({
      display: true,
    })
  },
  helpview: function() {
    this.setData({
      helpdisplay: false,
    })
  },
  helphide: function() {
    this.setData({
      helpdisplay: true,
    })
  },
  mgrclass: function(e) {
    var that = this
    var college = wx.getStorageSync('college')
    var data = e.currentTarget.dataset
    var index = e.currentTarget.dataset.index
    console.log(data)
    this.setData({
      college: college,
      data: data,
      bxxf: data.xf,
      index: index
    })
    if (college == 'imnu') {
      if (data.cj < 60) {
        this.setData({
          zsxf: 0
        })
      } else if (data.cj >= 60 && data.cj < 65) {
        this.setData({
          zsxf: 1
        })
      } else if (data.cj >= 65 && data.cj < 70) {
        this.setData({
          zsxf: 1.5
        })
      } else if (data.cj >= 70 && data.cj < 75) {
        this.setData({
          zsxf: 2
        })
      } else if (data.cj >= 75 && data.cj < 80) {
        this.setData({
          zsxf: 2.5
        })
      } else if (data.cj >= 80 && data.cj < 85) {
        this.setData({
          zsxf: 3
        })
      } else if (data.cj >= 85 && data.cj < 90) {
        this.setData({
          zsxf: 3.5
        })
      } else if (data.cj >= 90 && data.cj < 95) {
        this.setData({
          zsxf: 4
        })
      } else {
        this.setData({
          zsxf: 4.5
        })
      }
    } else if (college == 'imufe') {
      if (data.cj < 60) {
        this.setData({
          zsxf: 0
        })
      } else if (data.cj >= 60 && data.cj < 63.9) {
        this.setData({
          zsxf: 1
        })
      } else if (data.cj >= 64 && data.cj < 65.9) {
        this.setData({
          zsxf: 1.5
        })
      } else if (data.cj >= 66 && data.cj < 67.9) {
        this.setData({
          zsxf: 1.7
        })
      } else if (data.cj >= 68 && data.cj < 71.9) {
        this.setData({
          zsxf: 2
        })
      } else if (data.cj >= 72 && data.cj < 74.9) {
        this.setData({
          zsxf: 2.3
        })
      } else if (data.cj >= 75 && data.cj < 77.9) {
        this.setData({
          zsxf: 2.7
        })
      } else if (data.cj >= 78 && data.cj < 81.9) {
        this.setData({
          zsxf: 3
        })
      } else if (data.cj >= 82 && data.cj < 84.9) {
        this.setData({
          zsxf: 3.3
        })
      } else if (data.cj >= 85 && data.cj < 89.9) {
        this.setData({
          zsxf: 3.7
        })
      } else {
        this.setData({
          zsxf: 4
        })
      }
    } else if (college == 'imau') {
      if (data.cj < 60) {
        this.setData({
          zsxf: 0
        })
      } else if (data.cj >= 60 && data.cj < 100) {
        var zsxf = (parseInt(data.cj - 60) / 10) + 1.0
        this.setData({
          zsxf: zsxf
        })
      } else {
        this.setData({
          zsxf: 5
        })
      }
    }
    that.onShow();
  },

  onLoad: function () {
    var that = this
    var college = wx.getStorageSync('college')
    var account = wx.getStorageSync('stuid')
    var token = App.globalData.token
    this.setData({
      college: college,
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
        url: appConfig.jwAPI + college + '/score?token=' + token,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          wx.showToast({
            title: '获取成功',
            inon: 'success',
            duration: 500,
          })
          if (res.data.length == 0) {
            wx.showModal({
              title: '提示',
              content: '你还没有进行过考试呦',
              showCancel: false,
              confirmText: '确认',
              complete: function (res) {
                wx.switchTab({
                  url: '../../home/home',
                })
              }
            })
          } else {
            that.setData({
              result: res.data
            })
            console.log(that.data.result)
            wx.setStorage({
              key: 'allscore',
              data: res.data,
            })
            that.onReady()
          }
        }
      })
    }
  },

  onReady: function (){
    var that = this
    var college = wx.getStorageSync('college')
    var score = wx.getStorageSync('allscore')
    var num = []
    var kcxf = []
    var zsxf = []
    var xf = num.concat([kcxf], [zsxf])
    var bxresult = []
    var fbxresult = []
    that.setData({
      result: score
    })

    if (college == 'imnu') {
      // 内师大绩点计算
      for (var x = 0; x < that.data.result.length; x++) {
        for (var y = 0; y < that.data.result[x].CJ.length; y++) {
          if (that.data.result[x].CJ[y].XKLX == '必修' && that.data.result[x].CJ[y].CJ >= 60) {
            bxresult.push(that.data.result[x].CJ[y])
          }
          if (that.data.result[x].CJ[y].XKLX != '必修' && that.data.result[x].CJ[y].CJ >= 60) {
            fbxresult.push(that.data.result[x].CJ[y])
          }
        }
      }
      console.log(bxresult)
      console.log(fbxresult)
      that.setData({
        bxresult: bxresult,
        fbxresult: fbxresult
      })

      for (var i = 0; i < that.data.result.length; i++) {
        for (var j = 0; j < that.data.result[i].CJ.length; j++) {
          if (that.data.result[i].CJ[j].XKLX == '必修') {
            if (that.data.result[i].CJ[j].CJ < 60) {
              kcxf.push(0)
            } else {
              kcxf.push(that.data.result[i].CJ[j].XF)
            }

            if (that.data.result[i].CJ[j].CJ < 60) {
              zsxf.push(0)
            } else if (that.data.result[i].CJ[j].CJ >= 60 && that.data.result[i].CJ[j].CJ < 65) {
              zsxf.push(1)
            } else if (that.data.result[i].CJ[j].CJ >= 65 && that.data.result[i].CJ[j].CJ < 70) {
              zsxf.push(1.5)
            } else if (that.data.result[i].CJ[j].CJ >= 70 && that.data.result[i].CJ[j].CJ < 75) {
              zsxf.push(2)
            } else if (that.data.result[i].CJ[j].CJ >= 75 && that.data.result[i].CJ[j].CJ < 80) {
              zsxf.push(2.5)
            } else if (that.data.result[i].CJ[j].CJ >= 80 && that.data.result[i].CJ[j].CJ < 85) {
              zsxf.push(3)
            } else if (that.data.result[i].CJ[j].CJ >= 85 && that.data.result[i].CJ[j].CJ < 90) {
              zsxf.push(3.5)
            } else if (that.data.result[i].CJ[j].CJ >= 90 && that.data.result[i].CJ[j].CJ < 95) {
              zsxf.push(4)
            } else {
              zsxf.push(4.5)
            }
          }
        }
      }
      wx.setStorage({
        key: 'xf',
        data: xf,
      })
      wx.setStorage({
        key: 'bxresult',
        data: bxresult,
      })
      wx.setStorage({
        key: 'fbxresult',
        data: fbxresult,
      })
      var xfsum = 0;
      for (var a in xf[0]) {
        xfsum += parseFloat(xf[0][a])
      }
      console.log(xfsum)
      that.setData({
        bxxf: xfsum
      })
      var jdsum = 0;
      for (var b = 0; b < xf[0].length; b++) {
        jdsum += parseFloat(xf[0][b]) * parseFloat(xf[1][b])
      }

      var jd = 0;
      jd = (jdsum / xfsum).toFixed(3);
      console.log(jd)
      that.setData({
        gpa: jd
      })
    } else if (college == 'imufe') {
      // 内财大绩点计算
      for (var x = 0; x < that.data.result.length; x++) {
        for (var y = 0; y < that.data.result[x].CJ.length; y++) {
          if (that.data.result[x].CJ[y].CJ >= 60) {
            bxresult.push(that.data.result[x].CJ[y]),
              fbxresult.push(that.data.result[x].CJ[y])
          }
        }
      }
      console.log(bxresult)
      that.setData({
        bxresult: bxresult,
        fbxresult: fbxresult
      })

      for (var i = 0; i < that.data.result.length; i++) {
        for (var j = 0; j < that.data.result[i].CJ.length; j++) {
          if (that.data.result[i].CJ[j].CJ < 60) {
            kcxf.push(0)
          } else {
            kcxf.push(that.data.result[i].CJ[j].XF)
          }

          if (that.data.result[i].CJ[j].CJ < 60) {
            zsxf.push(0)
          } else if (that.data.result[i].CJ[j].CJ >= 60 && that.data.result[i].CJ[j].CJ < 63.9) {
            zsxf.push(1)
          } else if (that.data.result[i].CJ[j].CJ >= 64 && that.data.result[i].CJ[j].CJ < 65.9) {
            zsxf.push(1.5)
          } else if (that.data.result[i].CJ[j].CJ >= 66 && that.data.result[i].CJ[j].CJ < 67.9) {
            zsxf.push(1.7)
          } else if (that.data.result[i].CJ[j].CJ >= 68 && that.data.result[i].CJ[j].CJ < 71.9) {
            zsxf.push(2)
          } else if (that.data.result[i].CJ[j].CJ >= 72 && that.data.result[i].CJ[j].CJ < 74.9) {
            zsxf.push(2.3)
          } else if (that.data.result[i].CJ[j].CJ >= 75 && that.data.result[i].CJ[j].CJ < 77.9) {
            zsxf.push(2.7)
          } else if (that.data.result[i].CJ[j].CJ >= 78 && that.data.result[i].CJ[j].CJ < 81.9) {
            zsxf.push(3)
          } else if (that.data.result[i].CJ[j].CJ >= 82 && that.data.result[i].CJ[j].CJ < 84.9) {
            zsxf.push(3.3)
          } else if (that.data.result[i].CJ[j].CJ >= 85 && that.data.result[i].CJ[j].CJ < 89.9) {
            zsxf.push(3.7)
          } else {
            zsxf.push(4)
          }
        }
      }
      wx.setStorage({
        key: 'xf',
        data: xf,
      })
      wx.setStorage({
        key: 'bxresult',
        data: bxresult,
      })
      wx.setStorage({
        key: 'fbxresult',
        data: fbxresult,
      })
      var xfsum = 0;
      for (var a in xf[0]) {
        xfsum += parseFloat(xf[0][a])
      }
      console.log(xfsum)
      that.setData({
        bxxf: xfsum
      })
      var jdsum = 0;
      for (var b = 0; b < xf[0].length; b++) {
        jdsum += parseFloat(xf[0][b]) * parseFloat(xf[1][b])
      }

      var jd = 0;
      jd = (jdsum / xfsum).toFixed(3);
      console.log(jd)
      that.setData({
        gpa: jd
      })
    } else if (college == 'imau') {
      // 内农大绩点计算
      for (var x = 0; x < that.data.result.length; x++) {
        for (var y = 0; y < that.data.result[x].CJ.length; y++) {
          if (that.data.result[x].CJ[y].CJ >= 60) {
            bxresult.push(that.data.result[x].CJ[y]),
              fbxresult.push(that.data.result[x].CJ[y])
          }
        }
      }
      console.log(bxresult)
      that.setData({
        bxresult: bxresult,
        fbxresult: fbxresult
      })

      for (var i = 0; i < that.data.result.length; i++) {
        for (var j = 0; j < that.data.result[i].CJ.length; j++) {
          if (that.data.result[i].CJ[j].CJ < 60) {
            kcxf.push(0)
          } else if (that.data.result[i].CJ[j].CJ >= 60) {
            kcxf.push(that.data.result[i].CJ[j].XF)
          }

          if (that.data.result[i].CJ[j].CJ < 60) {
            zsxf.push(0)
          } else if (that.data.result[i].CJ[j].CJ >= 60 && that.data.result[i].CJ[j].CJ < 100) {
            var add = (parseInt(that.data.result[i].CJ[j].CJ - 60) / 10) + 1.0
            zsxf.push(add)
          } else {
            zsxf.push(5)
          }
        }
      }
      wx.setStorage({
        key: 'xf',
        data: xf,
      })
      wx.setStorage({
        key: 'bxresult',
        data: bxresult,
      })
      wx.setStorage({
        key: 'fbxresult',
        data: fbxresult,
      })
      var xfsum = 0;
      for (var a in xf[0]) {
        xfsum += parseFloat(xf[0][a])
      }
      console.log(xfsum)
      that.setData({
        bxxf: xfsum
      })
      var jdsum = 0;
      for (var b = 0; b < xf[0].length; b++) {
        jdsum += parseFloat(xf[0][b]) * parseFloat(xf[1][b])
      }

      var jd = 0;
      jd = (jdsum / xfsum).toFixed(3);
      console.log(jd)
      that.setData({
        gpa: jd
      })
    }
  },

  onShow: function() {
    var that = this
    var college = wx.getStorageSync('college')
    var xf = wx.getStorageSync('xf')
    var bxresult = wx.getStorageSync('bxresult')
    var fbxresult = wx.getStorageSync('fbxresult')
    this.setData({
      college: college
    })
    if (college == 'imnu') {
      xf[0].push(this.data.bxxf)
      xf[1].push(this.data.zsxf)
      bxresult.push(this.data.data)
      fbxresult.splice(this.data.index, 1)
    } else if (college == 'imufe' || college == 'imau') {
      xf[0].splice(this.data.index, 1)
      xf[1].splice(this.data.index, 1)
      bxresult.splice(this.data.index, 1)
      fbxresult.splice(this.data.index, 1)
    }

    wx.setStorageSync('xf', xf)
    wx.setStorageSync('bxresult', bxresult)
    wx.setStorageSync('fbxresult', fbxresult)
    that.setData({
      bxresult: bxresult,
      fbxresult: fbxresult
    })
    var xfsum = 0;
    for (var a in xf[0]) {
      xfsum += parseFloat(xf[0][a])
    }
    console.log(xfsum)
    that.setData({
      bxxf: xfsum
    })
    var jdsum = 0;
    for (var b = 0; b < xf[0].length; b++) {
      jdsum += parseFloat(xf[0][b]) * parseFloat(xf[1][b])
    }

    var jd = 0;
    jd = (jdsum / xfsum).toFixed(3);
    console.log(jd)
    that.setData({
      gpa: jd
    })
  },
  onShareAppMessage: function(res) {
    if (res.from === 'button' || res.from === 'menu') {
      console.log(res.target)
    }
    return {
      title: '我的绩点是↓↓↓，你的呢',
      path: '/pages/sub/gpa/gpa'
    }
  }
})