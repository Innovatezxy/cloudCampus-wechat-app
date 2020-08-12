const navH = getApp().globalData.navH
const WeCropper = require('./cropper.js')

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50 -navH

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      targetId: 'targetCropper',
      pixelRatio: device.pixelRatio,
      width,
      height,
      navH: navH,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: 0,
        y: (height - 280) / 2,
        width: device.windowWidth,
        height: device.windowWidth / 2
      },
    }
  },
  touchStart(e) {
    this.cropper.touchStart(e)
  },
  touchMove(e) {
    this.cropper.touchMove(e)
  },
  touchEnd(e) {
    this.cropper.touchEnd(e)
  },
  getCropperImage() {
    this.cropper.getCropperImage()
      .then((src) => {
        const fs = wx.getFileSystemManager()
        //   文件管理器的作用之一就是可以根据临时文件路径，通过saveFile把文件保存到本地缓存.
        fs.saveFile({
          tempFilePath: src, // 传入一个临时文件路径
          success(res) {
            // res.savedFilePath 为一个本地缓存文件路径  
            //小程序的本地文件路径标准： {{协议名}}://文件路径
            //协议名在 iOS/Android 客户端为 "wxfile"，在开发者工具上为 "http"
            //开发者无需关注这个差异，也不应在代码中去硬编码完整文件路径
            console.log(res.savedFilePath)
            wx.setStorage({
              key: 'skins',
              data: res.savedFilePath,
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
        
      })
      .catch(() => {
        console.log('获取图片地址失败，请稍后重试')
      })
  },
  uploadTap() {
    const self = this

    wx.getSavedFileList({
      success(res) {
        if (res.fileList.length > 0) {
          wx.removeSavedFile({
            filePath: res.fileList[0].filePath,
            complete(res) {
              console.log(res)
            }
          })
        }
      }
    })
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.cropper.pushOrign(src)
      }
    })
  },
  onLoad(option) {
    const { cropperOpt } = this.data

    this.setData({
      cropperOpt
    })

    this.cropper = new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 2000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })
  }
})