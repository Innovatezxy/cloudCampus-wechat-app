var App = getApp();
var util = require('../../../utils/util.js');
var appConfig = require('../../../utils/app/config.js')

Page({
  data:{
    navH: 0,
    data: '',
    display: true,
    results: '',
    code: 'imnu',
    search: false,
    page: 0,
    length: 0,
    codeIndex: 0,
    codepick: ['内蒙古师范大学','内蒙古财经大学','内蒙古农业大学','内蒙古工业大学'],
    codevalue: ['imnu','imufe','imau','imut'],
  },
  search_input: function (e){
    this.setData({
      keyword: e.detail.value
    })
  },
  search: function (){
    var that = this
    this.setData({
      page: 0,
      search: true,
    })
    that.onLoad()
  },
  info: function (e) {
    var data = e.currentTarget.dataset
    this.setData({
      display: false,
      data: e.currentTarget.dataset,
    })
  },
  hideview: function () {
    this.setData({
      display: true
    })
  },
  codePicker: function (e) {
    var that = this
    this.setData({
      page: 0,
      search: false,
      codeIndex: e.detail.value,
      code: this.data.codevalue[e.detail.value]
    })
    that.onLoad()
  },
  onLoad: function (){
    var that = this
    var code = this.data.code
    var page = this.data.page
    if(this.data.search == false){
      this.setData({
        navH: App.globalData.navH,
        keyword: util.formatToday(new Date())
      })
    } else {
      this.setData({
        keyword: this.data.keyword,
      })
    }
    if (this.data.keyword){
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: appConfig.baseAPI + '/searchstuinfo?code=' + code + '&&keyword=' + this.data.keyword + '&&page=' + page,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          wx.hideLoading()
          if (res.data.success == 'Error') {
            wx.showModal({
              title: '提示',
              content: '未找到结果',
              showCancel: false,
            })
          } else {
            that.setData({
              results: res.data.result,
              length: res.data.result.length,
            })
          }
        }
      })
    } else {
      console.log('Blank')
    }
  },
  lastpage: function(){
    var that = this
    var code = this.data.code
    var page = this.data.page

    if (page < 500){
      wx.showModal({
        title: '提示',
        content: '没有更多了',
        showCancel: false,
      })
    } else {
      this.setData({
        page: page - 500
      })
      that.onLoad()
    }
  },
  nextpage: function(){
    var that = this
    var code = this.data.code
    var page = this.data.page
    var current = this.data.length

    if (current < 500) {
      wx.showModal({
        title: '提示',
        content: '没有更多了',
        showCancel: false,
      })
    } else {
      this.setData({
        page: page + 500
      })
      that.onLoad()
    }
  },
})