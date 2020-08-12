var App = getApp()
var util = require('../../../utils/util.js')
var appConfig = require('../../../utils/app/config.js')

Page({
  data: {
    navH: 0,
    college: '',
    order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    week: '',
    info: '',
    todaydate: '',
    schedule: [],
    wkIndex: 0,
    wkpick: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周'],
    wkvalue: ['2019-08-26', '2019-09-02', '2019-09-09', '2019-09-16', '2019-09-23', '2019-09-30', '2019-10-07', '2019-10-14', '2019-10-21', '2019-10-28', '2019-11-04', '2019-11-11', '2019-11-18', '2019-11-25', '2019-12-02', '2019-12-09', '2019-12-16', '2019-12-23'],
    display: true,
    choose: false,
  },
  click: function(e) {
    var that = this
    var info = e.currentTarget.dataset
    console.log(info)
    that.setData({
      display: false,
      info: e.currentTarget.dataset
    })
  },
  hideview: function() {
    var that = this
    that.setData({
      display: true
    })
  },
  wkPicker: function (e) {
    var that = this
    that.setData({
      choose: true,
      wkIndex: e.detail.value,
      choosedate: this.data.wkvalue[e.detail.value]
    })
    that.onReady()
  },
  datechange: function (e) {
    var that = this
    that.setData({
      choose: true,
      choosedate: e.detail.value
    })
    that.onReady()
  },

  onReady: function() {
    var that = this
    var college = wx.getStorageSync('college')
    var account = wx.getStorageSync('frdacc')
    var week = util.formatWeek(new Date())
    var dtnum = util.formatJustdate(new Date())
    that.setData({
      college: college,
      todaydate: week.week,
      navH: App.globalData.navH,
    })
    if (this.data.choose == true) {
      var date = that.data.choosedate
    } else {
      if (college == 'imnu') {
        if (dtnum < 826) {
          var date = '2019-08-26'
          this.setData({
            wkIndex: 0
          })
        } else if (dtnum > 825 && dtnum < 902) {
          var date = '2019-08-26'
          this.setData({
            wkIndex: 1
          })
        } else if (dtnum > 901 && dtnum < 909) {
          var date = '2019-09-02'
          this.setData({
            wkIndex: 2
          })
        } else if (dtnum > 908 && dtnum < 916) {
          var date = '2019-09-09'
          this.setData({
            wkIndex: 3
          })
        } else if (dtnum > 915 && dtnum < 923) {
          var date = '2019-09-16'
          this.setData({
            wkIndex: 4
          })
        } else if (dtnum > 922 && dtnum < 930) {
          var date = '2019-09-23'
          this.setData({
            wkIndex: 5
          })
        } else if (dtnum > 929 && dtnum < 1007) {
          var date = '2019-09-30'
          this.setData({
            wkIndex: 6
          })
        } else if (dtnum > 1006 && dtnum < 1014) {
          var date = '2019-10-07'
          this.setData({
            wkIndex: 7
          })
        } else if (dtnum > 1013 && dtnum < 1021) {
          var date = '2019-10-14'
          this.setData({
            wkIndex: 8
          })
        } else if (dtnum > 1020 && dtnum < 1028) {
          var date = '2019-10-21'
          this.setData({
            wkIndex: 9
          })
        } else if (dtnum > 1027 && dtnum < 1104) {
          var date = '2019-10-28'
          this.setData({
            wkIndex: 10
          })
        } else if (dtnum > 1103 && dtnum < 1011) {
          var date = '2019-11-04'
          this.setData({
            wkIndex: 11
          })
        } else if (dtnum > 1110 && dtnum < 1118) {
          var date = '2019-11-11'
          this.setData({
            wkIndex: 12
          })
        } else if (dtnum > 1117 && dtnum < 1125) {
          var date = '2019-11-18'
          this.setData({
            wkIndex: 13
          })
        } else if (dtnum > 1124 && dtnum < 1202) {
          var date = '2019-11-25'
          this.setData({
            wkIndex: 14
          })
        } else if (dtnum > 1201 && dtnum < 1209) {
          var date = '2019-12-02'
          this.setData({
            wkIndex: 15
          })
        } else if (dtnum > 1208 && dtnum < 1216) {
          var date = '2019-12-09'
          this.setData({
            wkIndex: 16
          })
        } else if (dtnum > 1215 && dtnum < 1223) {
          var date = '2019-12-16'
          this.setData({
            wkIndex: 17
          })
        } else {
          var date = '2019-12-23'
          this.setData({
            wkIndex: 18
          })
        }
      } else {
        var date = util.formatToday(new Date())
      }
    }

    if(college == 'imnu'){
      if (account == '') {
        wx.redirectTo({
          url: '../../sub/frdlogin/frdlogin',
        })
      } else {
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 500,
        })
        wx.request({
          url: appConfig.authAPI + college,
          method: 'POST',
          data: {
            'id': account
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            var token = res.data.result[0].token
            wx.request({
              url: appConfig.jwAPI + college + '/schedule',
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
                console.log(res.data.kb)
                wx.showToast({
                  title: '获取成功',
                  inon: 'success',
                  duration: 500,
                })
                var address = []
                var jxl = ""
                for (var x = 0; x < res.data.kb.length; x++) {
                  if (res.data.kb[x].skdddm.slice(0, 3) == '101') {
                    address.push({
                      jxl: "田家炳教学楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '102') {
                    address.push({
                      jxl: "文史楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '103') {
                    address.push({
                      jxl: "物理楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '104') {
                    address.push({
                      jxl: "化学楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '105') {
                    address.push({
                      jxl: "生物楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '106') {
                    address.push({
                      jxl: "信息技术楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '107') {
                    address.push({
                      jxl: "计算机楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '108') {
                    address.push({
                      jxl: "逸夫艺术楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '109') {
                    address.push({
                      jxl: "音乐北二楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '110') {
                    address.push({
                      jxl: "华远2#楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '111') {
                    address.push({
                      jxl: "东小二楼南"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '112') {
                    address.push({
                      jxl: "东小二楼北"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '113') {
                    address.push({
                      jxl: "西小二楼南"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '114') {
                    address.push({
                      jxl: "西小二楼北"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '115') {
                    address.push({
                      jxl: "社会学院楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '116') {
                    address.push({
                      jxl: "国际交流学院楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '117') {
                    address.push({
                      jxl: "博物馆"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '118') {
                    address.push({
                      jxl: "体育馆(赛罕)"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '119') {
                    address.push({
                      jxl: "球类馆"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '120') {
                    address.push({
                      jxl: "体操馆"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '121') {
                    address.push({
                      jxl: "操场(赛罕)"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '122') {
                    address.push({
                      jxl: "地理园"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '129') {
                    address.push({
                      jxl: "图书馆(赛罕)"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '134') {
                    address.push({
                      jxl: "国际交流中心"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '140') {
                    address.push({
                      jxl: "室外篮球场"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '141') {
                    address.push({
                      jxl: "体育馆地下乒乓球室"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '142') {
                    address.push({
                      jxl: "东操场"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '143') {
                    address.push({
                      jxl: "室外排球场"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '223') {
                    address.push({
                      jxl: "行知楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '224') {
                    address.push({
                      jxl: "雕塑楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '225') {
                    address.push({
                      jxl: "体育馆(盛乐)"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '226') {
                    address.push({
                      jxl: "操场(盛乐)"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '227') {
                    address.push({
                      jxl: "生态园"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '228' || res.data.kb[x].skdddm.slice(0, 2) == '28') {
                    address.push({
                      jxl: "科技楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '230') {
                    address.push({
                      jxl: "图书馆(盛乐)"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '231') {
                    address.push({
                      jxl: "基础教育北楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '232') {
                    address.push({
                      jxl: "基础教育南楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '233') {
                    address.push({
                      jxl: "学院楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '235') {
                    address.push({
                      jxl: "美术楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '236') {
                    address.push({
                      jxl: "民族艺术教学楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '237') {
                    address.push({
                      jxl: "网络技术教学楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '238') {
                    address.push({
                      jxl: "餐饮大楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '239') {
                    address.push({
                      jxl: "盛乐武学馆"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '240') {
                    address.push({
                      jxl: "图书馆射箭场"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '241') {
                    address.push({
                      jxl: "理工楼"
                    })
                  } else {
                    address.push("")
                  }
                }
                var schedule = []
                for (var x = 0; x < res.data.kb.length; x++) {
                  schedule.push([res.data.kb[x], address[x]])
                }
                console.log(schedule)
                that.setData({
                  schedule: schedule
                })
              }
            })
          }
        })
      }
    } else if(college == 'imufe'){
      if (account == '') {
        wx.redirectTo({
          url: '../../sub/frdlogin/frdlogin',
        })
      } else {
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 500,
        })
        wx.request({
          url: appConfig.authAPI + college,
          method: 'POST',
          data: {
            'id': account
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            var token = res.data.result[0].token
            wx.request({
              url: appConfig.jwAPI + college + '/schedule?date=' + date + '&&token=' + token,
              method: 'GET',
              header: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                console.log(res.data.kb)
                wx.showToast({
                  title: '获取成功',
                  inon: 'success',
                  duration: 500,
                })
                var address = []
                var jxl = ""
                for (var x = 0; x < res.data.kb.length; x++) {
                  if (res.data.kb[x].skdddm.slice(0, 1) == '新') {
                    address.push({
                      jxl: "教学楼" + res.data.kb[x].skdddm.slice(1, 5)
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 2) == '学院' && res.data.kb[x].skdddm.slice(2, 3) != '楼') {
                    address.push({
                      jxl: "学院楼" + res.data.kb[x].skdddm.slice(2, 6)
                    })
                  } else {
                    address.push({
                      jxl: res.data.kb[x].skdddm
                    })
                  }
                }
                var schedule = []
                for (var x = 0; x < res.data.kb.length; x++) {
                  schedule.push([res.data.kb[x], address[x]])
                }
                console.log(schedule)
                that.setData({
                  schedule: schedule
                })
              }
            })
          }
        })
      }
    } else if(college == 'imau'){
      if (account == '') {
        wx.redirectTo({
          url: '../../sub/frdlogin/frdlogin',
        })
      } else {
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 500,
        })
        wx.request({
          url: appConfig.authAPI + college,
          method: 'POST',
          data: {
            'id': account
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            var token = res.data.result[0].token
            wx.request({
              url: appConfig.jwAPI + college + '/schedule?date=' + date + '&&token=' + token,
              method: 'GET',
              header: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                console.log(res.data.kb)
                wx.showToast({
                  title: '获取成功',
                  inon: 'success',
                  duration: 500,
                })
                var address = []
                var jxl = ""
                for (var x = 0; x < res.data.kb.length; x++) {
                  address.push({ jxl: res.data.kb[x].skdddm })
                }
                var schedule = []
                for (var x = 0; x < res.data.kb.length; x++) {
                  schedule.push([res.data.kb[x], address[x]])
                }
                console.log(schedule)
                that.setData({
                  schedule: schedule
                })
              }
            })
          }
        })
      }
    }
  },
  unlink: function() {
    wx.showModal({
      title: '提示',
      content: '是否解绑Ta的课表',
      showCancel: true,
      cancelText: '取消',
      confirmText: '解绑',
      success: function(res) {
        if (res.confirm) {
          wx.removeStorageSync('frdacc')
          wx.redirectTo({
            url: 'schedule',
          })
        }
      }
    })
  }
})