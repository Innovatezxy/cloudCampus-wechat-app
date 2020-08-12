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
    load: '',
    schedule: [],
    wkIndex: 0,
    orderIndex: 0,
    weekIndex: 0,
    schoolIndex: 0,
    wkpick: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周'],
    wkvalue: ['2019-08-26', '2019-09-02', '2019-09-09', '2019-09-16', '2019-09-23', '2019-09-30', '2019-10-07', '2019-10-14', '2019-10-21', '2019-10-28', '2019-11-04', '2019-11-11', '2019-11-18', '2019-11-25', '2019-12-02', '2019-12-09', '2019-12-16', '2019-12-23'],
    orderpick: ['节次(必选)', '1,2节', '3,4节', '5,6节', '7,8节', '9,10节', '9,10,11节', '1,2,3,4节', '5,6,7,8节', '1,2,3,4,5,6,7,8节'],
    ordervalue: [undefined, '1,2', '3,4', '5,6', '7,8', '9,10', '9,10,11', '1,2,3,4', '5,6,7,8', '1,2,3,4,5,6,7,8'],
    weekpick: ['星期(必选)', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    weekvalue: [undefined, '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    schoolpick: ['校区(必选)', '赛罕校区', '盛乐校区'],
    schoolvalue: [undefined, '赛罕校区', '盛乐校区'],
    color: [{
        name: "马尔斯绿",
        bg: "background:#048280",
        color: "color:#048280"
      },
      {
        name: "热情红",
        bg: "background:#e93a53",
        color: "color:#e93a53"
      },
      {
        name: "可爱粉",
        bg: "background:#eaa3a9",
        color: "color:#eaa3a9"
      },
      {
        name: "活力绿",
        bg: "background:#2ec28c",
        color: "color:#2ec28c"
      },
      {
        name: "格调蓝",
        bg: "background:#3fbfee",
        color: "color:#3fbfee"
      },
      {
        name: "澎湃橙",
        bg: "background:#f99217",
        color: "color:#f99217"
      },
      {
        name: "豪放青",
        bg: "background:#00d7c5",
        color: "color:#00d7c5"
      },
      {
        name: "土豪金",
        bg: "background:#beab76",
        color: "color:#beab76"
      },
      {
        name: "迷彩绿",
        bg: "background:#92c112",
        color: "color:#92c112"
      },
      {
        name: "自然紫",
        bg: "background:#e105f5",
        color: "color:#e105f5"
      },
      {
        name: "简约绿",
        bg: "background:#7ce39f",
        color: "color:#7ce39f"
      },
      {
        name: "简约紫",
        bg: "background:#c38e9e",
        color: "color:#c38e9e"
      },
      {
        name: "渐变Ⅰ",
        bg: "background:linear-gradient(to bottom, #11998e, #38ef7d);",
        color: "color:#c38e9e"
      },
      {
        name: "渐变Ⅱ",
        bg: "background:linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4);",
        color: "color:#c38e9e"
      },
      {
        name: "渐变Ⅲ",
        bg: "background:linear-gradient(to bottom, #654ea3, #eaafc8);",
        color: "color:#c38e9e"
      },
      {
        name: "渐变Ⅳ",
        bg: "background:linear-gradient(to bottom, #cc95c0, #dbd4b4, #7aa1d2);",
        color: "color:#c38e9e"
      },
      {
        name: "渐变Ⅴ",
        bg: "background:linear-gradient(to top, #bc4e9c, #f80759);",
        color: "color:#c38e9e"
      },
      {
        name: "渐变Ⅵ",
        bg: "background:linear-gradient(to bottom, #74ebd5, #acb6e5);",
        color: "color:#c38e9e"
      },
      {
        name: "渐变Ⅶ",
        bg: "background:linear-gradient(to bottom, #649173, #dbd5a4);",
        color: "color:#c38e9e"
      },
      {
        name: "渐变Ⅷ",
        bg: "background:linear-gradient(to top, #12c2e9, #c471ed, #f64f59);",
        color: "color:#c38e9e"
      },
    ],
    bg: '',
    bt_color: '',
    delclass: [],
    display: true,
    adddisplay: true,
    deldisplay: true,
    colordisplay: true,
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
  addhideview: function() {
    var that = this
    that.setData({
      adddisplay: true
    })
  },
  wkPicker: function(e) {
    var that = this
    that.setData({
      choose: true,
      wkIndex: e.detail.value,
      choosedate: this.data.wkvalue[e.detail.value]
    })
    that.onShow()
  },
  datechange: function(e) {
    var that = this
    that.setData({
      choose: true,
      choosedate: e.detail.value
    })
    that.onShow()
  },
  schcolor: function() {
    this.setData({
      colordisplay: false
    })
  },
  colorcancel: function() {
    this.setData({
      colordisplay: true
    })
  },
  skinset: function(e) {
    var that = this
    wx.setStorage({
      key: 'sch_bg',
      data: e.currentTarget.dataset.bg,
    })
    wx.setStorage({
      key: 'sch_color',
      data: e.currentTarget.dataset.color,
    })
    this.setData({
      colordisplay: true
    })
    wx.showToast({
      title: '设置成功',
      icon: 'success',
    })
    that.onShow()
  },
  onShow: function() {
    var that = this
    var college = wx.getStorageSync('college')
    var account = wx.getStorageSync('stuid')
    var token = App.globalData.token
    var week = util.formatWeek(new Date())
    var dtnum = util.formatJustdate(new Date())
    var add_1 = wx.getStorageSync('add_1')
    var add_2 = wx.getStorageSync('add_2')
    var add_3 = wx.getStorageSync('add_3')
    var add_4 = wx.getStorageSync('add_4')
    var add_5 = wx.getStorageSync('add_5')
    var bg = wx.getStorageSync('sch_bg')
    var bt_color = wx.getStorageSync('sch_color')
    that.setData({
      college: college,
      todaydate: week.week,
      navH: App.globalData.navH,
    })
    if (bg || bt_color) {
      this.setData({
        bg: bg,
        bt_color: bt_color,
      })
    } else {
      this.setData({
        bg: 'background: linear-gradient(to bottom, #654ea3, #eaafc8);',
        bt_color: 'linear-gradient(to bottom, #654ea3, #eaafc8);'
      })
    }
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

    if (account == '') {
      wx.showModal({
        title: '提示',
        content: '未绑定无法使用此功能',
        showCancel: true,
        cancelText: '取消',
        cancelColor: "#14c410",
        confirmText: '绑定',
        confirmColor: "#e02020",
        success: function(res) {
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
      if (college == 'imnu') {
        wx.showLoading({
          title: '加载中',
        })
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
          success: function(res) {
            wx.hideLoading()
            console.log(res.data.kb)
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
            schedule.push(add_1)
            schedule.push(add_2)
            schedule.push(add_3)
            schedule.push(add_4)
            schedule.push(add_5)
            console.log(schedule)
            that.setData({
              load: res.data.kb.length,
              schedule: schedule
            })
          }
        })
      } else if (college == 'imufe') {
        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: appConfig.jwAPI + college + '/schedule?date=' + date + '&&token=' + token,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            wx.hideLoading()
            console.log(res.data.kb)
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
            schedule.push(add_1)
            schedule.push(add_2)
            schedule.push(add_3)
            schedule.push(add_4)
            schedule.push(add_5)
            console.log(schedule)
            that.setData({
              load: res.data.kb.length,
              schedule: schedule
            })
          }
        })
      } else if (college == 'imau') {
        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: appConfig.jwAPI + college + '/schedule?date=' + date + '&&token=' + token,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            wx.hideLoading()
            console.log(res.data.kb)
            var address = []
            var jxl = ""
            for (var x = 0; x < res.data.kb.length; x++) {
              address.push({
                jxl: res.data.kb[x].skdddm
              })
            }
            var schedule = []
            for (var x = 0; x < res.data.kb.length; x++) {
              schedule.push([res.data.kb[x], address[x]])
            }
            schedule.push(add_1)
            schedule.push(add_2)
            schedule.push(add_3)
            schedule.push(add_4)
            schedule.push(add_5)
            console.log(schedule)
            that.setData({
              load: res.data.kb.length,
              schedule: schedule
            })
          }
        })
      }
    }
  },
  onShareAppMessage: function(res) {
    if (res.confirm === 'menu') {
      console.log(res.target)
    }
    return {
      title: '超级棒的课表，你Get了么',
      path: '/pages/sub/schedule/schedule'
    }
  },
  classInput: function(e) {
    this.setData({
      class: e.detail.value
    })
  },
  roomInput: function(e) {
    this.setData({
      room: e.detail.value
    })
  },
  orderPicker: function(e) {
    this.setData({
      orderIndex: e.detail.value,
      order: this.data.ordervalue[e.detail.value]
    })
  },
  weekPicker: function(e) {
    this.setData({
      weekIndex: e.detail.value,
      weekpicker: this.data.weekvalue[e.detail.value]
    })
  },
  schoolPicker: function(e) {
    this.setData({
      schoolIndex: e.detail.value,
      school: this.data.schoolvalue[e.detail.value]
    })
  },
  teacherInput: function(e) {
    this.setData({
      teacher: e.detail.value
    })
  },
  noteInput: function(e) {
    this.setData({
      note: e.detail.value
    })
  },
  addclass: function() {
    var add_5 = wx.getStorageSync('add_5')
    if (add_5 != '') {
      this.setData({
        adddisplay: true
      })
      wx.showModal({
        title: '提示',
        content: '已达到最大添加数目，请删除无用课程',
        showCancel: false,
        complete: function(res) {
          wx.redirectTo({
            url: 'schedule',
          })
        }
      })
    } else {
      this.setData({
        adddisplay: false,
      })
    }
  },
  delclass: function() {
    var that = this
    var delclass = []
    var add_1 = wx.getStorageSync('add_1')
    var add_2 = wx.getStorageSync('add_2')
    var add_3 = wx.getStorageSync('add_3')
    var add_4 = wx.getStorageSync('add_4')
    var add_5 = wx.getStorageSync('add_5')
    delclass.push(add_1)
    delclass.push(add_2)
    delclass.push(add_3)
    delclass.push(add_4)
    delclass.push(add_5)
    console.log(delclass)
    that.setData({
      deldisplay: false,
      delclass: delclass,
    })
  },
  delete: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var del = that.data.delclass
    del.splice(index, 1)
    wx.removeStorageSync('add_' + (index + 1))
    that.setData({
      deldisplay: true
    })
    that.onShow()
  },
  delcancel: function() {
    var that = this
    that.setData({
      deldisplay: true
    })
  },
  addcancel: function() {
    var that = this
    that.setData({
      adddisplay: true
    })
  },
  addconfirm: function() {
    var that = this
    var college = wx.getStorageSync('college')
    var add_1 = wx.getStorageSync('add_1')
    var add_2 = wx.getStorageSync('add_2')
    var add_3 = wx.getStorageSync('add_3')
    var add_4 = wx.getStorageSync('add_4')
    var add_5 = wx.getStorageSync('add_5')
    if (college == 'imnu') {
      if (add_1 == '') {
        var add_a = []
        if (this.data.class == undefined || this.data.room == undefined || this.data.order == undefined || this.data.weekpick == undefined || this.data.school == undefined) {
          wx.showModal({
            title: '提示',
            content: '请将必填内容填写完整',
            showCancel: false,
            confirmText: '确认',
          })
        } else {
          var add = {
            kcm: this.data.class,
            skddmc: this.data.room,
            djj_xh: this.data.order,
            xqj: this.data.weekpicker,
            xqmc: this.data.school,
            jsxm: this.data.teacher,
            beizhu: this.data.note
          }
          console.log(add)
          add_a.push(add)
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 1000,
          })
          that.setData({
            adddisplay: true
          })
          wx.setStorage({
            key: 'add_1',
            data: add_a,
          })
          that.onShow()
        }
      } else {
        if (add_1 != '' && add_2 == '') {
          var add_b = []
          if (this.data.class == undefined || this.data.room == undefined || this.data.order == undefined || this.data.weekpick == undefined || this.data.school == undefined) {
            wx.showModal({
              title: '提示',
              content: '请将必填内容填写完整',
              showCancel: false,
              confirmText: '确认',
            })
          } else {
            var add = {
              kcm: this.data.class,
              skddmc: this.data.room,
              djj_xh: this.data.order,
              xqj: this.data.weekpicker,
              xqmc: this.data.school,
              jsxm: this.data.teacher,
              beizhu: this.data.note
            }
            console.log(add)
            add_b.push(add)
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000,
            })
            that.setData({
              adddisplay: true
            })
            wx.setStorage({
              key: 'add_2',
              data: add_b,
            })
            that.onShow()
          }
        } else if (add_2 != '' && add_3 == '') {
          var add_c = []
          if (this.data.class == undefined || this.data.room == undefined || this.data.order == undefined || this.data.weekpick == undefined || this.data.school == undefined) {
            wx.showModal({
              title: '提示',
              content: '请将必填内容填写完整',
              showCancel: false,
              confirmText: '确认',
            })
          } else {
            var add = {
              kcm: this.data.class,
              skddmc: this.data.room,
              djj_xh: this.data.order,
              xqj: this.data.weekpicker,
              xqmc: this.data.school,
              jsxm: this.data.teacher,
              beizhu: this.data.note
            }
            console.log(add)
            add_c.push(add)
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000,
            })
            that.setData({
              adddisplay: true
            })
            wx.setStorage({
              key: 'add_3',
              data: add_c,
            })
            that.onShow()
          }
        } else if (add_3 != '' && add_4 == '') {
          var add_d = []
          if (this.data.class == undefined || this.data.room == undefined || this.data.order == undefined || this.data.weekpick == undefined || this.data.school == undefined) {
            wx.showModal({
              title: '提示',
              content: '请将必填内容填写完整',
              showCancel: false,
              confirmText: '确认',
            })
          } else {
            var add = {
              kcm: this.data.class,
              skddmc: this.data.room,
              djj_xh: this.data.order,
              xqj: this.data.weekpicker,
              xqmc: this.data.school,
              jsxm: this.data.teacher,
              beizhu: this.data.note
            }
            console.log(add)
            add_d.push(add)
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000,
            })
            that.setData({
              adddisplay: true
            })
            wx.setStorage({
              key: 'add_4',
              data: add_d,
            })
            that.onShow()
          }
        } else if (add_4 != '' && add_5 == '') {
          var add_e = []
          if (this.data.class == undefined || this.data.room == undefined || this.data.order == undefined || this.data.weekpick == undefined || this.data.school == undefined) {
            wx.showModal({
              title: '提示',
              content: '请将必填内容填写完整',
              showCancel: false,
              confirmText: '确认',
            })
          } else {
            var add = {
              kcm: this.data.class,
              skddmc: this.data.room,
              djj_xh: this.data.order,
              xqj: this.data.weekpicker,
              xqmc: this.data.school,
              jsxm: this.data.teacher,
              beizhu: this.data.note
            }
            console.log(add)
            add_e.push(add)
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000,
            })
            that.setData({
              adddisplay: true
            })
            wx.setStorage({
              key: 'add_5',
              data: add_e,
            })
            that.onShow()
          }
        }
      }
    } else if (college == 'imufe' || college == 'imau') {
      if (add_1 == '') {
        var add_a = []
        if (this.data.class == undefined || this.data.room == undefined || this.data.order == undefined || this.data.weekpick == undefined) {
          wx.showModal({
            title: '提示',
            content: '请将必填内容填写完整',
            showCancel: false,
            confirmText: '确认',
          })
        } else {
          var add = {
            kcm: this.data.class,
            djj_xh: this.data.order,
            xqj: this.data.weekpicker,
            jsxm: this.data.teacher,
            beizhu: this.data.note
          }
          var address = {
            jxl: this.data.room,
          }
          console.log(add)
          add_a.push(add, address)
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 1000,
          })
          that.setData({
            adddisplay: true
          })
          wx.setStorage({
            key: 'add_1',
            data: add_a,
          })
          that.onShow()
        }
      } else {
        if (add_1 != '' && add_2 == '') {
          var add_b = []
          if (this.data.class == undefined || this.data.room == undefined || this.data.order == undefined || this.data.weekpick == undefined) {
            wx.showModal({
              title: '提示',
              content: '请将必填内容填写完整',
              showCancel: false,
              confirmText: '确认',
            })
          } else {
            var add = {
              kcm: this.data.class,
              djj_xh: this.data.order,
              xqj: this.data.weekpicker,
              jsxm: this.data.teacher,
              beizhu: this.data.note
            }
            var address = {
              jxl: this.data.room,
            }
            console.log(add)
            add_b.push(add, address)
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000,
            })
            that.setData({
              adddisplay: true
            })
            wx.setStorage({
              key: 'add_2',
              data: add_b,
            })
            that.onShow()
          }
        } else if (add_2 != '' && add_3 == '') {
          var add_c = []
          if (this.data.class == undefined || this.data.room == undefined || this.data.order == undefined || this.data.weekpick == undefined) {
            wx.showModal({
              title: '提示',
              content: '请将必填内容填写完整',
              showCancel: false,
              confirmText: '确认',
            })
          } else {
            var add = {
              kcm: this.data.class,
              djj_xh: this.data.order,
              xqj: this.data.weekpicker,
              jsxm: this.data.teacher,
              beizhu: this.data.note
            }
            var address = {
              jxl: this.data.room,
            }
            console.log(add)
            add_c.push(add, address)
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000,
            })
            that.setData({
              adddisplay: true
            })
            wx.setStorage({
              key: 'add_3',
              data: add_c,
            })
            that.onShow()
          }
        } else if (add_3 != '' && add_4 == '') {
          var add_d = []
          if (this.data.class == undefined || this.data.room == undefined || this.data.order == undefined || this.data.weekpick == undefined) {
            wx.showModal({
              title: '提示',
              content: '请将必填内容填写完整',
              showCancel: false,
              confirmText: '确认',
            })
          } else {
            var add = {
              kcm: this.data.class,
              djj_xh: this.data.order,
              xqj: this.data.weekpicker,
              jsxm: this.data.teacher,
              beizhu: this.data.note
            }
            var address = {
              jxl: this.data.room,
            }
            console.log(add)
            add_d.push(add, address)
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000,
            })
            that.setData({
              adddisplay: true
            })
            wx.setStorage({
              key: 'add_4',
              data: add_d,
            })
            that.onShow()
          }
        } else if (add_4 != '' && add_5 == '') {
          var add_e = []
          if (this.data.class == undefined || this.data.room == undefined || this.data.order == undefined || this.data.weekpick == undefined) {
            wx.showModal({
              title: '提示',
              content: '请将必填内容填写完整',
              showCancel: false,
              confirmText: '确认',
            })
          } else {
            var add = {
              kcm: this.data.class,
              djj_xh: this.data.order,
              xqj: this.data.weekpicker,
              jsxm: this.data.teacher,
              beizhu: this.data.note
            }
            var address = {
              jxl: this.data.room,
            }
            console.log(add)
            add_e.push(add, address)
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000,
            })
            that.setData({
              adddisplay: true
            })
            wx.setStorage({
              key: 'add_5',
              data: add_e,
            })
            that.onShow()
          }
        }
      }
    }
  },
  friendsch: function() {
    var frdacc = wx.getStorageSync('frdacc')
    if (frdacc == '') {
      wx.showModal({
        title: '朋友/情侣课表',
        content: '为了你关心的那个ta，我们推出一键查看朋友课表的黑科技,点击绑定(仅需要知道ta的学号就可以哦)',
        showCancel: true,
        cancelText: '取消',
        confirmText: '前往绑定',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/frdlogin',
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../schedule/frdsch',
      })
    }
  }
})