var App = getApp()
var appConfig = require('../../../utils/app/config.js')

Page({
  data:{
    navH: 0,
    pingpu: [
      { name: "平铺", skin: appConfig.skinAPI + "/pingpu_1.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/pingpu_1.jpg');background-size:cover"},
      { name: "平铺", skin: appConfig.skinAPI + "/pingpu_2.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/pingpu_2.jpg');background-size:cover"},
      { name: "平铺", skin: appConfig.skinAPI + "/pingpu_3.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/pingpu_3.jpg');background-size:cover" },
      { name: "平铺", skin: appConfig.skinAPI + "/pingpu_4.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/pingpu_4.jpg');background-size:cover" },
      { name: "平铺", skin: appConfig.skinAPI + "/pingpu_5.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/pingpu_5.jpg');background-size:cover" },
      { name: "平铺", skin: appConfig.skinAPI + "/pingpu_6.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/pingpu_6.jpg');background-size:cover" },
      { name: "平铺", skin: appConfig.skinAPI + "/pingpu_7.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/pingpu_7.jpg');background-size:cover" },
      { name: "平铺", skin: appConfig.skinAPI + "/pingpu_8.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/pingpu_8.jpg');background-size:cover" },
    ],
    xingkong: [
      { name: "星空", skin: appConfig.skinAPI + "/xingkong_1.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/xingkong_1.jpg');background-size:cover" },
      { name: "星空", skin: appConfig.skinAPI + "/xingkong_2.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/xingkong_2.jpg');background-size:cover" },
      { name: "星空", skin: appConfig.skinAPI + "/xingkong_3.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/xingkong_3.jpg');background-size:cover" },
      { name: "星空", skin: appConfig.skinAPI + "/xingkong_4.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/xingkong_4.jpg');background-size:cover" },
    ],
    sea: [
      { name: "海洋", skin: appConfig.skinAPI + "/fengjing_1.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_1.jpg');background-size:cover" },
      { name: "海洋", skin: appConfig.skinAPI + "/fengjing_2.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_2.jpg');background-size:cover" },
      { name: "海洋", skin: appConfig.skinAPI + "/fengjing_3.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_3.jpg');background-size:cover" },
      { name: "海洋", skin: appConfig.skinAPI + "/fengjing_4.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_4.jpg');background-size:cover" },
      { name: "海洋", skin: appConfig.skinAPI + "/fengjing_5.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_5.jpg');background-size:cover" },
      { name: "海洋", skin: appConfig.skinAPI + "/fengjing_6.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_6.jpg');background-size:cover" },
    ],
    sky: [
      { name: "天空", skin: appConfig.skinAPI + "/fengjing_7.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_7.jpg');background-size:cover" },
      { name: "天空", skin: appConfig.skinAPI + "/fengjing_8.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_8.jpg');background-size:cover" },
      { name: "天空", skin: appConfig.skinAPI + "/fengjing_9.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_9.jpg');background-size:cover" },
      { name: "天空", skin: appConfig.skinAPI + "/fengjing_10.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_10.jpg');background-size:cover" },
    ],
    jianzhu: [
      { name: "建筑", skin: appConfig.skinAPI + "/fengjing_11.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_11.jpg');background-size:cover" },
      { name: "建筑", skin: appConfig.skinAPI + "/fengjing_12.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_12.jpg');background-size:cover" },
      { name: "建筑", skin: appConfig.skinAPI + "/fengjing_13.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_13.jpg');background-size:cover" },
      { name: "建筑", skin: appConfig.skinAPI + "/fengjing_14.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_14.jpg');background-size:cover" },
      { name: "建筑", skin: appConfig.skinAPI + "/fengjing_15.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_15.jpg');background-size:cover" },
      { name: "建筑", skin: appConfig.skinAPI + "/fengjing_16.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_16.jpg');background-size:cover" },
      { name: "建筑", skin: appConfig.skinAPI + "/fengjing_17.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_17.jpg');background-size:cover" },
      { name: "建筑", skin: appConfig.skinAPI + "/fengjing_18.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/fengjing_18.jpg');background-size:cover" },
    ],
    dongman: [
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_1.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_1.jpg');background-size:cover"},
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_2.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_2.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_3.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_3.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_4.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_4.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_5.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_5.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_6.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_6.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_7.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_7.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_8.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_8.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_9.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_9.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_10.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_10.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_11.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_11.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_12.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_12.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_13.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_13.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_14.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_14.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_15.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_15.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_16.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_16.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_17.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_17.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_18.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_18.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_19.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_19.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_20.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_20.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_21.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_21.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_22.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_22.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_23.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_23.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_24.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_24.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_25.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_25.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_26.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_26.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_27.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_27.jpg');background-size:cover" },
      { name: "动漫", skin: appConfig.skinAPI + "/dongman_28.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/dongman_28.jpg');background-size:cover" },
    ],
    mingxing: [
      { name: "杨洋", skin: appConfig.skinAPI + "/mingxing_1.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_1.jpg');background-size:cover" },
      { name: "杨超越", skin: appConfig.skinAPI + "/mingxing_2.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_2.jpg');background-size:cover" },
      { name: "马天宇", skin: appConfig.skinAPI + "/mingxing_37.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_37.jpg');background-size:cover" },
      { name: "吴亦凡", skin: appConfig.skinAPI + "/mingxing_3.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_3.jpg');background-size:cover" },
      { name: "王源", skin: appConfig.skinAPI + "/mingxing_4.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_4.jpg');background-size:cover" },
      { name: "鹿晗", skin: appConfig.skinAPI + "/mingxing_5.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_5.jpg');background-size:cover" },
      { name: "吴磊", skin: appConfig.skinAPI + "/mingxing_6.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_6.jpg');background-size:cover" },
      { name: "张铭恩", skin: appConfig.skinAPI + "/mingxing_7.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_7.jpg');background-size:cover" },
      { name: "张艺兴", skin: appConfig.skinAPI + "/mingxing_8.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_8.jpg');background-size:cover" },
      { name: "易烊千玺", skin: appConfig.skinAPI + "/mingxing_9.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_9.jpg');background-size:cover" },
      { name: "刘昊然", skin: appConfig.skinAPI + "/mingxing_10.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_10.jpg');background-size:cover" },
      { name: "陈伟霆", skin: appConfig.skinAPI + "/mingxing_11.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_11.jpg');background-size:cover" },
      { name: "雷佳音", skin: appConfig.skinAPI + "/mingxing_12.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_12.jpg');background-size:cover" },
      { name: "黄子韬", skin: appConfig.skinAPI + "/mingxing_13.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_13.jpg');background-size:cover" },
      { name: "胡一天", skin: appConfig.skinAPI + "/mingxing_14.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_14.jpg');background-size:cover" },
      { name: "欧豪", skin: appConfig.skinAPI + "/mingxing_15.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_15.jpg');background-size:cover" },
      { name: "薛之谦", skin: appConfig.skinAPI + "/mingxing_16.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_16.jpg');background-size:cover" },
      { name: "彭于晏", skin: appConfig.skinAPI + "/mingxing_17.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_17.jpg');background-size:cover" },
      { name: "李易峰", skin: appConfig.skinAPI + "/mingxing_18.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_18.jpg');background-size:cover" },
      { name: "胡歌", skin: appConfig.skinAPI + "/mingxing_19.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_19.jpg');background-size:cover" },
      { name: "周杰伦", skin: appConfig.skinAPI + "/mingxing_20.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_20.jpg');background-size:cover" },
      { name: "张杰", skin: appConfig.skinAPI + "/mingxing_21.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_21.jpg');background-size:cover" },
      { name: "王凯", skin: appConfig.skinAPI + "/mingxing_22.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_22.jpg');background-size:cover" },
      { name: "朱亚文", skin: appConfig.skinAPI + "/mingxing_23.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_23.jpg');background-size:cover" },
      { name: "陈奕迅", skin: appConfig.skinAPI + "/mingxing_24.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_24.jpg');background-size:cover" },
      { name: "张一山", skin: appConfig.skinAPI + "/mingxing_25.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_25.jpg');background-size:cover" },
      { name: "关晓彤", skin: appConfig.skinAPI + "/mingxing_26.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_26.jpg');background-size:cover" },
      { name: "迪丽热巴", skin: appConfig.skinAPI + "/mingxing_27.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_27.jpg');background-size:cover" },
      { name: "Angelababy", skin: appConfig.skinAPI + "/mingxing_28.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_28.jpg');background-size:cover" },
      { name: "杨幂", skin: appConfig.skinAPI + "/mingxing_29.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_29.jpg');background-size:cover" },
      { name: "杨紫", skin: appConfig.skinAPI + "/mingxing_30.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_30.jpg');background-size:cover" },
      { name: "周冬雨", skin: appConfig.skinAPI + "/mingxing_31.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_31.jpg');background-size:cover" },
      { name: "宋茜", skin: appConfig.skinAPI + "/mingxing_32.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_32.jpg');background-size:cover" },
      { name: "江疏影", skin: appConfig.skinAPI + "/mingxing_33.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_33.jpg');background-size:cover" },
      { name: "刘亦菲", skin: appConfig.skinAPI + "/mingxing_34.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_34.jpg');background-size:cover" },
      { name: "于文文", skin: appConfig.skinAPI + "/mingxing_35.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_35.jpg');background-size:cover" },
      { name: "唐嫣", skin: appConfig.skinAPI + "/mingxing_36.jpg", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/mingxing_36.jpg');background-size:cover" },
    ],
    tougao: [
      { name: "作者:XXX", skin: "background-image:url(appConfig.skinAPI + '/exampleskin.jpg');background-size:cover", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/exampleskin.jpg');background-size:cover" },
      { name: "作者:XXX", skin: "background-image:url(appConfig.skinAPI + '/exampleskin.jpg');background-size:cover", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/exampleskin.jpg');background-size:cover" },
      { name: "作者:XXX", skin: "background-image:url(appConfig.skinAPI + '/exampleskin.jpg');background-size:cover", skintmp: "background-image:url(appConfig.skinAPI + '/skintmp/exampleskin.jpg');background-size:cover" },
    ],
  },
  skinset: function (e) {
    wx.setStorage({
      key: 'skins',
      data: e.currentTarget.dataset.skin,
    })
    wx.showToast({
      title: '设置成功',
      icon: 'success',
    })
    wx.reLaunch({
      url: "../../home/home",
    })
  },
  default: function () {
    wx.request({
      url: appConfig.skinAPI + '/skinview',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        wx.setStorage({
          key: 'skins',
          data: res.data.result[0].url,
        })
        wx.showToast({
          title: '设置成功',
          icon: 'success',
        })
        wx.reLaunch({
          url: "../../home/home",
        })
      }
    })
  },
  custom: function (){
    wx.navigateTo({
      url: '../cropper/areacut',
    })
  },
  onLoad: function () {
    this.setData({
      navH: App.globalData.navH,
    })
  }
})