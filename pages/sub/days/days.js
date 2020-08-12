var App = getApp();
var util = require('../../../utils/util.js');
Page({
  data:{
    navH: 0,
    birth: '未设置',
    list: '',
    type: '',
    name: '',
    homestatus: '',
    date: '未选择',
    datetype: '日期',
    homeset: false,
    addview: false,
    mgrview: false,
    typeIndex: 0,
    typepick: ['未选择', '倒数日', '纪念日'],
    typevalue: [undefined, 'reduct', 'addup'],
  },
  birthPicker: function (e){
    var that = this
    this.setData({
      birth: e.detail.value
    })
    wx.setStorage({
      key: 'birth',
      data: e.detail.value,
    })
    that.onShow()
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  typePicker: function (e) {
    this.setData({
      typeIndex: e.detail.value,
      type: this.data.typevalue[e.detail.value],
    })
    if (this.data.typevalue[e.detail.value] == 'reduct'){
      this.setData({
        datetype: '结束日期',
      })
    }
    if (this.data.typevalue[e.detail.value] == 'addup') {
      this.setData({
        datetype: '开始日期',
      })
    }
  },
  datePicker: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  homesetChange: function (e) {
    this.setData({
      homeset: e.detail.value
    })
  },
  add: function (){
    this.setData({
      addview: true
    })
  },
  mgrdays: function (e) {
    var getlist = wx.getStorageSync('days')
    var index = e.currentTarget.dataset.index
    if (getlist[index].home == false) {
      this.setData({
        homestatus: '添加首页显示'
      })
    } else {
      this.setData({
        homestatus: '取消首页显示'
      })
    }
    this.setData({
      index: index,
      mgrview: true,
    })
  },
  homeset: function () {
    var that = this
    var getlist = wx.getStorageSync('days')
    if (getlist) {
      var list = getlist
      if(list[this.data.index].home == false) {
        list[this.data.index].home = true
        wx.setStorageSync('days', list)
        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 1000,
        })
        that.onShow()
      } else {
        list[this.data.index].home = false
        wx.setStorage({
          key: 'days',
          data: list,
        })
        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 1000,
        })
        that.onShow()
      }
      this.setData({
        mgrview: false
      })
    }
  },
  deletedays: function (){
    var that = this
    var index = this.data.index
    var getlist = wx.getStorageSync('days')
    if(getlist){
      var list = getlist
      wx.showModal({
        title: '提示',
        content: '是否删除',
        showCancel: true,
        cancelText: '取消',
        cancelColor: "#14c410",
        confirmText: '确定',
        confirmColor: "#e02020",
        success: function (res) {
          if (res.confirm) {
            list.splice(index, 1)
            wx.setStorageSync('days', list)
            that.onShow()
          }
        },
      })
      this.setData({
        mgrview: false
      })
    }
  },
  confirm: function (){
    var that = this
    if(this.data.typeIndex == 0 || this.data.date == '未选择' || this.data.name.length == 0){
      wx.showModal({
        title: '提示',
        content: '请填写完整',
        showCancel: false,
        confirmColor: '#000',
        confirmText: '确定'
      })
    } else {
      var getlist = wx.getStorageSync('days')
      if(getlist){
        var list = getlist
        var add = {
          type: this.data.type,
          name: this.data.name,
          date: this.data.date,
          home: this.data.homeset,
        }
        console.log(add)
        list.push(add)
        wx.setStorageSync('days', list)
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1000,
        })
        this.setData({
          addview: false
        })
        that.onShow()
      } else {
        var list = []
        var add = {
          type: this.data.type,
          name: this.data.name,
          date: this.data.date,
          home: this.data.homeset,
        }
        list.push(add)
        wx.setStorageSync('days', list)
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1000,
        })
        this.setData({
          addview: false
        })
        that.onShow()
      }
    }
  },
  cancel: function (){
    this.setData({
      addview: false,
      mgrview: false
    })
  },
  onShow: function (){
    var list = []
    var today = util.formatToday(new Date())
    var birthday = wx.getStorageSync('birth')
    var getlist = wx.getStorageSync('days')
    console.log(getlist)
    this.setData({
      navH: App.globalData.navH,
    })
    if(birthday){
      var start_date = new Date(birthday.replace(/-/g, "/"));
      var end_date = new Date(today.replace(/-/g, "/"));
      var days = end_date.getTime() - start_date.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24));
      this.setData({
        birth: day
      })
    } else {
      this.setData({
        birth: '设置出生日期'
      })
    }
    if(getlist){
      for(var i=0;i<getlist.length;i++){
        var type = getlist[i].type
        var name = getlist[i].name
        var date = getlist[i].date
        if(type == 'reduct'){
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
      this.setData({
        list: list
      })
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      console.log(res.target)
    }
    return {
      title: '超级好用的倒数日，你Get了么',
      path: '/pages/sub/schoolcalendar/schoolcalendar'
    }
  }
})