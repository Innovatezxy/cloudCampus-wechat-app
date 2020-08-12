var app = getApp()
var util = require('../../utils/util.js');
var appConfig = require('../../utils/app/config.js')

Page({
  data: {
    navH: 0,
    showtips_box: false,
    account: '',
    college: '',
    location: '',
    name: '',
    signature: '',
    signaturetext: '',
    userInfo: '',
    balance: '--.--',
    internet: '--.--',
    book: '--.--',
    dayslist: '',
    todaysch: '',
    tomorrowsch: '',
    progress: '0.00%',
    week: '',
    afterweek: '',
    skin: '',
    defaultskin: '',
    sch_unread: 0,
    sh_unread: 0,
    sl_unread: 0,
    vip: true,
    svip: true,
    todaynone: false,
    tomorrownone: false,
    signatureview: false,
    todayview: '',
    tomorrowview: '',
    poster_1: '',
    poster_2: '',
  },
  onLoad: function() {
    // 判断更新
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function(res) {
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function() {
      console.log("更新错误")
    })
    this.setData({
      navH: app.globalData.navH,
    })
  },
  onReady: function() {
    wx.stopPullDownRefresh()
    //添加到我的小程序
    this.setData({
      showtips_box: true
    });
    // 显示关闭时间
    setTimeout(() => {
      this.setData({
        showtips_box: false
      })
    }, 4000);

    // 初始化获取缓存信息
    var that = this
    var location = wx.getStorageSync('location')
    var college = wx.getStorageSync('college')
    var account = wx.getStorageSync('stuid')
    var token = app.globalData.token
    if (location == '') {
      this.setData({
        location: '点击选择学校',
      })
    } else {
      this.setData({
        location: location
      })
    }
    this.setData({
      account: account
    })

    // 初始化获取皮肤，广告，学期进度缓存并判断情况
    // 生日皮肤，在生日当天推送皮肤
    var birth = getApp().globalData.birthdate
    var birthdt = birth.slice(10, 14)
    var dtnum = util.formatJustdate(new Date())
    var skin = wx.getStorageSync('skins')
    var topad = wx.getStorageSync('topad')

    if (birthdt == dtnum) {
      that.setData({
        skin: appConfig.skinAPI + '/default_Happy-Birthday.jpg'
      })
    } else {
      if (skin == '') {
        wx.request({
          url: appConfig.baseAPI + '/skinview',
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            console.log(res)
            for (var i = 0; i < res.data.result.length; i++) {
              if (res.data.result[i].status == 'true') {
                that.setData({
                  skin: res.data.result[i].url
                })
              }
            }
          }
        })
      } else {
        wx.request({
          url: appConfig.baseAPI + '/skinview',
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            console.log(res)
            that.setData({
              skin: skin
            })
            for (var i = 0; i < res.data.result.length; i++) {
              if (res.data.result[i].status == 'true' && res.data.result[i].judge == 'true') {
                that.setData({
                  skin: res.data.result[i].url
                })
              }
            }
          }
        })
      }
    }

    // 初始化获取滚动公告栏通知
    wx.request({
      url: appConfig.baseAPI + '/rollnotice',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          msgList: res.data.result
        })
      }
    })
    this.setData({
      topad: topad,
    })

    // 获取今，明日课程，日期时间等缓存并请求数据
    var today = util.formatToday(new Date())
    var tomorrow = util.formatTomorrow(new Date())
    var time = util.formatNowtime(new Date())
    var week = util.formatWeek(new Date())
    var afterweek = util.formatafterWeek(new Date())
    var add_1 = wx.getStorageSync('add_1')
    var add_2 = wx.getStorageSync('add_2')
    var add_3 = wx.getStorageSync('add_3')
    var add_4 = wx.getStorageSync('add_4')
    var add_5 = wx.getStorageSync('add_5')
    console.log(week, afterweek)
    console.log(today)


    that.setData({
      college: college,
      week: week.week,
      afterweek: afterweek.week,
    })

    if (account) {
      // 课程表获取
      var sch_unread = 0
      var tomorrowview = wx.getStorageSync('tomorrowview')

      if (token == '') {
        console.log("none")
        setTimeout(() => {
          that.onReady()
        }, 2500);
      }

      if (college == 'imnu') {
        // 内师大今日课程
        if (dtnum < 826) {
          var date = '2019-08-26'
        } else if (dtnum > 825 && dtnum < 902) {
          var date = '2019-08-26'
        } else if (dtnum > 901 && dtnum < 909) {
          var date = '2019-09-02'
        } else if (dtnum > 908 && dtnum < 916) {
          var date = '2019-09-09'
        } else if (dtnum > 915 && dtnum < 923) {
          var date = '2019-09-16'
        } else if (dtnum > 922 && dtnum < 930) {
          var date = '2019-09-23'
        } else if (dtnum > 929 && dtnum < 1007) {
          var date = '2019-09-30'
        } else if (dtnum > 1006 && dtnum < 1014) {
          var date = '2019-10-07'
        } else if (dtnum > 1013 && dtnum < 1021) {
          var date = '2019-10-14'
        } else if (dtnum > 1020 && dtnum < 1028) {
          var date = '2019-10-21'
        } else if (dtnum > 1027 && dtnum < 1104) {
          var date = '2019-10-28'
        } else if (dtnum > 1103 && dtnum < 1011) {
          var date = '2019-11-04'
        } else if (dtnum > 1110 && dtnum < 1118) {
          var date = '2019-11-11'
        } else if (dtnum > 1117 && dtnum < 1125) {
          var date = '2019-11-18'
        } else if (dtnum > 1124 && dtnum < 1202) {
          var date = '2019-11-25'
        } else if (dtnum > 1201 && dtnum < 1209) {
          var date = '2019-12-02'
        } else if (dtnum > 1208 && dtnum < 1216) {
          var date = '2019-12-09'
        } else if (dtnum > 1215 && dtnum < 1223) {
          var date = '2019-12-16'
        } else {
          var date = '2019-12-23'
        }

        wx.request({
          url: appConfig.jwAPI + 'imnu/schedule',
          method: 'POST',
          data: {
            'id': account,
            'date': today,
            'token': token
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            for (var i = 0; i < res.data.kb.length; i++) {
              if (res.data.kb[i].xqj == week.week) {
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
                      jxl: "民艺教学楼"
                    })
                  } else if (res.data.kb[x].skdddm.slice(0, 3) == '237') {
                    address.push({
                      jxl: "网院教学楼"
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
                var todaysch = []
                for (var x = 0; x < res.data.kb.length; x++) {
                  todaysch.push([res.data.kb[x], address[x]])
                }
                todaysch.push(add_1)
                todaysch.push(add_2)
                todaysch.push(add_3)
                todaysch.push(add_4)
                todaysch.push(add_5)
                console.log(todaysch)
                that.setData({
                  todaynone: true,
                  todaysch: todaysch,
                })
              }
              that.setData({
                sch_unread: i + 1,
              })
            }
          }
        })
        // 内师大明日课程
        if (tomorrowview == true) {
          that.setData({
            tomorrowview: true,
          })
          if (dtnum < 826) {
            var date = '2019-08-26'
          } else if (dtnum > 824 && dtnum < 901) {
            var date = '2019-08-26'
          } else if (dtnum > 831 && dtnum < 908) {
            var date = '2019-09-02'
          } else if (dtnum > 907 && dtnum < 915) {
            var date = '2019-09-09'
          } else if (dtnum > 914 && dtnum < 922) {
            var date = '2019-09-16'
          } else if (dtnum > 921 && dtnum < 929) {
            var date = '2019-09-23'
          } else if (dtnum > 928 && dtnum < 1006) {
            var date = '2019-09-30'
          } else if (dtnum > 1005 && dtnum < 1013) {
            var date = '2019-10-07'
          } else if (dtnum > 1012 && dtnum < 1020) {
            var date = '2019-10-14'
          } else if (dtnum > 1019 && dtnum < 1027) {
            var date = '2019-10-21'
          } else if (dtnum > 1026 && dtnum < 1103) {
            var date = '2019-10-28'
          } else if (dtnum > 1102 && dtnum < 1010) {
            var date = '2019-11-04'
          } else if (dtnum > 1109 && dtnum < 1117) {
            var date = '2019-11-11'
          } else if (dtnum > 1116 && dtnum < 1124) {
            var date = '2019-11-18'
          } else if (dtnum > 1123 && dtnum < 1201) {
            var date = '2019-11-25'
          } else if (dtnum > 1130 && dtnum < 1208) {
            var date = '2019-12-02'
          } else if (dtnum > 1207 && dtnum < 1215) {
            var date = '2019-12-09'
          } else if (dtnum > 1214 && dtnum < 1222) {
            var date = '2019-12-16'
          } else {
            var date = '2019-12-23'
          }
          wx.request({
            url: appConfig.jwAPI + 'imnu/schedule',
            method: 'POST',
            data: {
              'id': account,
              'date': tomorrow,
              'token': token
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              for (var i = 0; i < res.data.kb.length; i++) {
                if (res.data.kb[i].xqj == afterweek.week) {
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
                        jxl: "民艺教学楼"
                      })
                    } else if (res.data.kb[x].skdddm.slice(0, 3) == '237') {
                      address.push({
                        jxl: "网院教学楼"
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
                  var tomorrowsch = []
                  for (var x = 0; x < res.data.kb.length; x++) {
                    tomorrowsch.push([res.data.kb[x], address[x]])
                  }
                  tomorrowsch.push(add_1)
                  tomorrowsch.push(add_2)
                  tomorrowsch.push(add_3)
                  tomorrowsch.push(add_4)
                  tomorrowsch.push(add_5)
                  console.log(tomorrowsch)
                  that.setData({
                    tomorrownone: true,
                    tomorrowsch: tomorrowsch
                  })
                }
              }
            }
          })
        } else {
          that.setData({
            tomorrowview: false,
          })
        }
      }
      if (college == 'imufe') {
        // 内财大今日课程
        wx.request({
          url: appConfig.jwAPI + 'imufe/schedule?date=' + today + '&&token=' + token,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            for (var i = 0; i < res.data.kb.length; i++) {
              if (res.data.kb[i].rq == today) {
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
                var todaysch = []
                for (var x = 0; x < res.data.kb.length; x++) {
                  todaysch.push([res.data.kb[x], address[x]])
                }
                todaysch.push(add_1)
                todaysch.push(add_2)
                todaysch.push(add_3)
                todaysch.push(add_4)
                todaysch.push(add_5)
                console.log(todaysch)
                that.setData({
                  todaynone: true,
                  todaysch: todaysch
                })
              }
              that.setData({
                sch_unread: i + 1,
              })
            }
          }
        })
        // 内财大明日课程
        if (tomorrowview == true) {
          that.setData({
            tomorrowview: true,
          })
          wx.request({
            url: appConfig.jwAPI + 'imufe/schedule?date=' + tomorrow + '&&token=' + token,
            method: 'GET',
            header: {
              'Content-Type': 'application/json'
            },
            success: function(res) {
              for (var i = 0; i < res.data.kb.length; i++) {
                if (res.data.kb[i].rq == tomorrow) {
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
                  var tomorrowsch = []
                  for (var x = 0; x < res.data.kb.length; x++) {
                    tomorrowsch.push([res.data.kb[x], address[x]])
                  }
                  tomorrowsch.push(add_1)
                  tomorrowsch.push(add_2)
                  tomorrowsch.push(add_3)
                  tomorrowsch.push(add_4)
                  tomorrowsch.push(add_5)
                  console.log(tomorrowsch)
                  that.setData({
                    tomorrownone: true,
                    tomorrowsch: tomorrowsch
                  })
                }
              }
            }
          })
        } else {
          that.setData({
            tomorrowview: false,
          })
        }
      }
      if (college == 'imau') {
        // 内农大今日课程
        wx.request({
          url: appConfig.jwAPI + 'imau/schedule?date=' + today + '&&token=' + token,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            for (var i = 0; i < res.data.kb.length; i++) {
              if (res.data.kb[i].rq == today) {
                var address = []
                var jxl = ""
                for (var x = 0; x < res.data.kb.length; x++) {
                  address.push({
                    jxl: res.data.kb[x].skdddm
                  })
                }
                var todaysch = []
                for (var x = 0; x < res.data.kb.length; x++) {
                  todaysch.push([res.data.kb[x], address[x]])
                }
                todaysch.push(add_1)
                todaysch.push(add_2)
                todaysch.push(add_3)
                todaysch.push(add_4)
                todaysch.push(add_5)
                console.log(todaysch)
                that.setData({
                  todaynone: true,
                  todaysch: todaysch
                })
              }
              that.setData({
                sch_unread: i + 1,
              })
            }
          }
        })
        // 内农大明日课程
        if (tomorrowview == true) {
          that.setData({
            tomorrowview: true,
          })
          wx.request({
            url: appConfig.jwAPI + 'imau/schedule?date=' + tomorrow + '&&token=' + token,
            method: 'GET',
            header: {
              'Content-Type': 'application/json'
            },
            success: function(res) {
              for (var i = 0; i < res.data.kb.length; i++) {
                if (res.data.kb[i].rq == tomorrow) {
                  var address = []
                  var jxl = ""
                  for (var x = 0; x < res.data.kb.length; x++) {
                    address.push({
                      jxl: res.data.kb[x].skdddm
                    })
                  }
                  var tomorrowsch = []
                  for (var x = 0; x < res.data.kb.length; x++) {
                    tomorrowsch.push([res.data.kb[x], address[x]])
                  }
                  tomorrowsch.push(add_1)
                  tomorrowsch.push(add_2)
                  tomorrowsch.push(add_3)
                  tomorrowsch.push(add_4)
                  tomorrowsch.push(add_5)
                  console.log(tomorrowsch)
                  that.setData({
                    tomorrownone: true,
                    tomorrowsch: tomorrowsch
                  })
                }
              }
            }
          })
        } else {
          that.setData({
            tomorrowview: false,
          })
        }
      }

      // 校园卡信息获取
      if (college == 'imnu') {
        wx.request({
          url: appConfig.jwAPI + '' + college + '/balance',
          method: 'POST',
          data: {
            'id': account,
            'token': token,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            wx.hideNavigationBarLoading()
            console.log(res)
            if (res.statusCode == 200){
              that.setData({
                balance: res.data[0].CARDBAL
              })
              app.globalData.balance = res.data[0].CARDBAL
            } else {
              that.setData({
                balance: '--.--'
              })
              app.globalData.balance = '--.--'
            }
          }
        })
      } else {
        wx.request({
          url: appConfig.jwAPI + '' + college + '/cost?token=' + token,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            wx.hideNavigationBarLoading()
            var date = res.data.tongji[0].CDATE
            wx.request({
              url: appConfig.jwAPI + '' + college + '/costinfo?date=' + date + '&&token=' + token,
              method: 'GET',
              header: {
                'Content-Type': 'application/json'
              },
              success: function(res) {
                for (var i = 0; i < res.data.mingxi.length; i++) {
                  that.setData({
                    balance: res.data.mingxi[i].ACCOST
                  })
                  app.globalData.balance = res.data.mingxi[i].ACCOST
                }
              }
            })
          }
        })
      }

      // 图书信息获取
      wx.request({
        url: appConfig.jwAPI + '' + college + '/book?token=' + token,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          wx.hideNavigationBarLoading()
          console.log(res)
          if (res.statusCode == 200 && res.header['Content-Length'] == 31) {
            that.setData({
              book: '0'
            })
          }
          if (res.statusCode == 200 && res.header['Content-Length'] != 31) {
            that.setData({
              book: res.data.reader['已借册数']
            })
          }
        }
      })

      // 校园网流量获取
      if (college == 'imau') {
        wx.request({
          url: appConfig.jwAPI + 'imau/net?token=' + token,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            console.log(res)
            that.setData({
              internet: res.data[0].sum_bytes
            })
          }
        })
      }
    }
  },
  onShow: function() {
    var that = this
    // 设置姓名
    var account = wx.getStorageSync('stuid')
    var name = wx.getStorageSync('stuname')
    this.setData({
      name: name,
    })
    if (account == 20171103091) {
      this.setData({
        name: "猪猪的宝贝",
        svip: false
      })
    }
    // 获取个性签名数据
    var signature = wx.getStorageSync('signature')
    if (signature) {
      this.setData({
        signature: signature
      })
    } else {
      this.setData({
        signature: '个性签名：未设置'
      })
    }
    // 获取日程卡信息
    var list = []
    var today = util.formatToday(new Date())
    var time = util.formatNowtime(new Date())
    var college = wx.getStorageSync('college')
    var getlist = wx.getStorageSync('days')
    console.log(getlist)
    if (getlist) {
      for (var i = 0; i < getlist.length; i++) {
        var type = getlist[i].type
        var name = getlist[i].name
        var date = getlist[i].date
        var home = getlist[i].home
        if (home == true) {
          if (type == 'reduct') {
            var start_date = new Date(today.replace(/-/g, "/"));
            var end_date = new Date(date.replace(/-/g, "/"));
            var days = end_date.getTime() - start_date.getTime();
            var day = parseInt(days / (1000 * 60 * 60 * 24));
            var body = {
              type: type,
              name: name,
              days: day
            }
            list.push(body)
          }
          if (type == 'addup') {
            var start_date = new Date(date.replace(/-/g, "/"));
            var end_date = new Date(today.replace(/-/g, "/"));
            var days = end_date.getTime() - start_date.getTime();
            var day = parseInt(days / (1000 * 60 * 60 * 24));
            var body = {
              type: type,
              name: name,
              days: day
            }
            list.push(body)
          }
        }
      }
      this.setData({
        dayslist: list
      })
    }

    // 内师大学期进度
    if (college == 'imnu') {
      var end = '2020-01-05'
      var start_date = new Date(today.replace(/-/g, "/"));
      var end_date = new Date(end.replace(/-/g, "/"));
      var days = end_date.getTime() - start_date.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24));
      var progress = (((133 - day) / 133) * 100).toFixed(2)
      if (progress < 0) {
        this.setData({
          progress: '0.00'
        })
      } else {
        this.setData({
          progress: progress
        })
      }
    }
    // 内财大学期进度
    if (college == 'imufe') {
      var end = '2020-01-05'
      var start_date = new Date(today.replace(/-/g, "/"));
      var end_date = new Date(end.replace(/-/g, "/"));
      var days = end_date.getTime() - start_date.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24));
      var progress = (((133 - day) / 133) * 100).toFixed(2)
      if (progress < 0) {
        this.setData({
          progress: '0.00'
        })
      } else {
        this.setData({
          progress: progress
        })
      }
    }

    // 师大校车未读消息统计
    var sh = 0
    var sl = 0
    var car_unread = 0
    if (college == 'imnu') {
      wx.request({
        url: appConfig.baseAPI + '/imnucarv?code=sl&&date=' + today,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log(res.data)
          for (var i = 0; i < res.data.result.length; i++) {
            if (res.data.result[i].date == today) {
              sh++
            }
          }
          if (sh == 0) {
            that.setData({
              sh_unread: ''
            })
          } else {
            that.setData({
              sh_unread: sh
            })
          }
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
          for (var i = 0; i < res.data.result.length; i++) {
            if (res.data.result[i].date == today) {
              sl++
            }
          }
          if (sl == 0) {
            that.setData({
              sl_unread: ''
            })
          } else {
            that.setData({
              sl_unread: sl
            })
          }
        }
      })
    }
  },
  // 选择学校
  college: function() {
    wx.navigateTo({
      url: '../sub/location/location',
    })
  },
  // 广告错误
  aderror: function(res) {
    console.log(res)
  },
  // 皮夫卡设置
  skinset: function() {
    wx.navigateTo({
      url: '../sub/more/skin',
    })
  },
  // 取消右上角提示显示
  canceltips_box: function() {
    this.setData({
      showtips_box: false
    })
  },
  // 首页个性签名设置
  signatureset: function() {
    this.setData({
      signatureview: true
    })
  },
  signatureInput: function(e) {
    this.setData({
      signaturetext: e.detail.value
    })
  },
  signatureconfirm: function() {
    var that = this
    if (this.data.signaturetext.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入内容',
        showCancel: false,
        confirmText: '确定'
      })
    } else {
      wx.setStorage({
        key: 'signature',
        data: this.data.signaturetext,
      })
      this.setData({
        signatureview: false
      })
      wx.showToast({
        title: '设置成功',
        duration: 1000
      })
      that.onShow()
    }
  },
  // 取消首页个性签名显示
  signaturecancel: function(e) {
    this.setData({
      signatureview: false
    })
  },
  // CET提示
  cet: function () {
    wx.showToast({
      title: '点击允许将跳转到查询平台',
      icon: 'none',
      duration: 3500,
    })
    wx.navigateToMiniProgram({
      appId: 'wx2eec5fb00157a603',
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },
  // 校园二手提示
  secondhand: function() {
    wx.showToast({
      title: '快马加鞭开发中...',
      icon: 'none',
      duration: 2000,
    })
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    var that = this
    wx.showNavigationBarLoading()
    that.onReady()
  },
  // 首页分享
  onShareAppMessage: function(res) {
    if (res.from === 'menu') {
      console.log(res.target)
    }
    return {
      title: '高校人手一份的小程序，超好用，你Get了么(*≧▽≦)',
      path: '/pages/home/home'
    }
  },
})