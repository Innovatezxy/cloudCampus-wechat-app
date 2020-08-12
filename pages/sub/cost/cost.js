var app = getApp();
var util = require('../../../utils/util.js');
var appConfig = require('../../../utils/app/config.js')

Page({
  data: {
    pageName: String,
    navH: 0,
    college: '',
    display: true,
    info: '',
    time: [],
    infodate: '',
    today: '',
    fontSize: 12, // 字体大小, 24rpx=12px
    count: 10, // 展示的消费次数
    width: '', // 画布宽
    height: 300, // 画布高, wxss给定canvas高300px
    dict: [], // 所有消费数据
    points: [], // 点的集合（包括点的横坐标x、纵坐标y、当前点的详情detail）
    costArr: [], // 消费金额集合
    balanceArr: [], // 余额金额集合
    lineLeft: 0, // 详情垂直线的初始左边距
    gridMarginLeft: 35, // 表格左边距
    gridMarginTop: 20, // 表格上边距
    balance: '--.-', // 当前余额（余额卡片上的展示数据）
    switchBtn: true, // true:消费 or false:充值
    options: {},
    currentIndex: 0 // 当前点的索引，切换视图的时候保持当前详情
  },
  navBack: function() {
    //回退
    wx.navigateBack()
  },
  onLoad: function() {
    this.setData({
      navH: app.globalData.navH,
    })
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
    })
    var _this = this;
    var college = wx.getStorageSync('college')
    var account = wx.getStorageSync('stuid')
    var today = util.formatToday(new Date())
    _this.setData({
      today: today
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
      wx.getSystemInfo({
        success: function(res) {
          // 获取窗口宽, 计算画布宽
          _this.setData({
            'width': res.windowWidth
          });
        }
      });
      _this.sendRequest();
    }
  },
  sendRequest: function() {
    var _this = this;
    var college = wx.getStorageSync('college')
    var account = wx.getStorageSync('stuid')
    var token = app.globalData.token
    _this.setData({
      college: college,
      balance: getApp().globalData.balance
    })
    if (college == 'imnu') {
      wx.request({
        url: appConfig.jwAPI + 'imnu/cost?token=' + token,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log(res)
          wx.showToast({
            title: '获取成功',
            inon: 'success',
            duration: 500,
          })
          var result = res.data.tongji
          if (result) {
            yktRender(result);
          }

          function yktRender(result) {
            var data = result.slice(0, _this.data.count).reverse();
            /*
             * 获取最近消费数据绘制折线图
             **/
            var dict = data;
            var len = dict.length,
              xArr = [], // x轴坐标
              yArr = [], // 余额点在画布中的纵坐标
              balanceArr = [], // 消费金额集合
              costArr = [], // 充值金额集合
              canvasWidth = _this.data.width,
              spaceX = (canvasWidth - 2 * _this.data.gridMarginLeft) / (_this.data.count - 0.5), // 表示横坐标的间隔距离
              canvasHeight = _this.data.height,
              gridMarginTop = _this.data.gridMarginTop, // 折线图上距离
              gridMarginLeft = _this.data.gridMarginLeft, // 折线图左距离
              gridNum = 6, //横线行数
              fontSize = _this.data.fontSize; //字号

            // 横坐标&消费&充值
            for (var i = 0; i < len; i++) {
              xArr.push(i * spaceX);
              balanceArr.push(parseFloat(dict[i].CCOST));
              if (dict[i].transaction == '消费') {
                dict[i].cost = -Math.abs(dict[i].CZCOST);
              }
              costArr.push(parseFloat(dict[i].CZCOST));
            }
            _this.setData({
              dict: data,
              lineLeft: _this.data.width - _this.data.gridMarginLeft - 1,
              switchArr: balanceArr, // 将纵坐标的值初始化为余额集合
              costArr: costArr, // 消费集合，切换折线的时候用
              balanceArr: balanceArr
            });

            //canvas 创建上下文
            var context = wx.createCanvasContext('firstCanvas');
            // 配置
            var options = {
              canvasWidth: canvasWidth, // 矩形宽度
              canvasHeight: canvasHeight, // 矩形高度
              gridMarginTop: gridMarginTop, // 折线图上距离
              gridMarginLeft: gridMarginLeft, // 折线图左距离 
              xArr: xArr, // 横坐标
              gridNum: gridNum, // 横网格线数量
              context: context, // canvas上下文
              len: len, // 数据数组长度
              spaceX: spaceX,
              fontSize: fontSize
            };
            _this.setData({
              options: options
            });

            /*
             * 绘制横轴&纵轴&网格线
             */
            _this.drawLineXY(_this.data.options, _this.data.switchArr);

            /*
             * 描点连线
             */
            _this.drawPointLine(_this.data.options, _this.data.switchArr);

            context.draw();
            _this.setData({
              canvas_remind: ''
            });
          }
        }
      })
    } else if (college == 'imufe') {
      wx.request({
        url: appConfig.jwAPI + 'imufe/cost?token=' + token,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log(res)
          wx.showToast({
            title: '获取成功',
            inon: 'success',
            duration: 500,
          })
          var result = res.data.tongji
          if (result) {
            yktRender(result);
          }

          function yktRender(result) {
            var data = result.slice(0, _this.data.count).reverse();
            /*
             * 获取最近消费数据绘制折线图
             **/
            var dict = data;
            var len = dict.length,
              xArr = [], // x轴坐标
              yArr = [], // 余额点在画布中的纵坐标
              balanceArr = [], // 消费金额集合
              costArr = [], // 充值金额集合
              canvasWidth = _this.data.width,
              spaceX = (canvasWidth - 2 * _this.data.gridMarginLeft) / (_this.data.count - 0.5), // 表示横坐标的间隔距离
              canvasHeight = _this.data.height,
              gridMarginTop = _this.data.gridMarginTop, // 折线图上距离
              gridMarginLeft = _this.data.gridMarginLeft, // 折线图左距离
              gridNum = 6, //横线行数
              fontSize = _this.data.fontSize; //字号

            // 横坐标&消费&充值
            for (var i = 0; i < len; i++) {
              xArr.push(i * spaceX);
              balanceArr.push(parseFloat(dict[i].CCOST));
              if (dict[i].transaction == '消费') {
                dict[i].cost = -Math.abs(dict[i].CZCOST);
              }
              costArr.push(parseFloat(dict[i].CZCOST));
            }
            _this.setData({
              dict: data,
              lineLeft: _this.data.width - _this.data.gridMarginLeft - 1,
              switchArr: balanceArr, // 将纵坐标的值初始化为余额集合
              costArr: costArr, // 消费集合，切换折线的时候用
              balanceArr: balanceArr
            });

            //canvas 创建上下文
            var context = wx.createCanvasContext('firstCanvas');
            // 配置
            var options = {
              canvasWidth: canvasWidth, // 矩形宽度
              canvasHeight: canvasHeight, // 矩形高度
              gridMarginTop: gridMarginTop, // 折线图上距离
              gridMarginLeft: gridMarginLeft, // 折线图左距离 
              xArr: xArr, // 横坐标
              gridNum: gridNum, // 横网格线数量
              context: context, // canvas上下文
              len: len, // 数据数组长度
              spaceX: spaceX,
              fontSize: fontSize
            };
            _this.setData({
              options: options
            });

            /*
             * 绘制横轴&纵轴&网格线
             */
            _this.drawLineXY(_this.data.options, _this.data.switchArr);

            /*
             * 描点连线
             */
            _this.drawPointLine(_this.data.options, _this.data.switchArr);

            context.draw();
            _this.setData({
              canvas_remind: ''
            });
          }
        }
      })
    } else if (college == 'imau') {
      wx.request({
        url: appConfig.jwAPI + 'imau/cost?token=' + token,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log(res)
          wx.showToast({
            title: '获取成功',
            inon: 'success',
            duration: 500,
          })
          var result = res.data.tongji
          if (result) {
            yktRender(result);
          }

          function yktRender(result) {
            var data = result.slice(0, _this.data.count).reverse();
            /*
             * 获取最近消费数据绘制折线图
             **/
            var dict = data;
            var len = dict.length,
              xArr = [], // x轴坐标
              yArr = [], // 余额点在画布中的纵坐标
              balanceArr = [], // 消费金额集合
              costArr = [], // 充值金额集合
              canvasWidth = _this.data.width,
              spaceX = (canvasWidth - 2 * _this.data.gridMarginLeft) / (_this.data.count - 0.5), // 表示横坐标的间隔距离
              canvasHeight = _this.data.height,
              gridMarginTop = _this.data.gridMarginTop, // 折线图上距离
              gridMarginLeft = _this.data.gridMarginLeft, // 折线图左距离
              gridNum = 6, //横线行数
              fontSize = _this.data.fontSize; //字号

            // 横坐标&消费&充值
            for (var i = 0; i < len; i++) {
              xArr.push(i * spaceX);
              balanceArr.push(parseFloat(dict[i].CCOST));
              if (dict[i].transaction == '消费') {
                dict[i].cost = -Math.abs(dict[i].CZCOST);
              }
              costArr.push(parseFloat(dict[i].CZCOST));
            }
            _this.setData({
              dict: data,
              lineLeft: _this.data.width - _this.data.gridMarginLeft - 1,
              switchArr: balanceArr, // 将纵坐标的值初始化为余额集合
              costArr: costArr, // 消费集合，切换折线的时候用
              balanceArr: balanceArr
            });

            //canvas 创建上下文
            var context = wx.createCanvasContext('firstCanvas');
            // 配置
            var options = {
              canvasWidth: canvasWidth, // 矩形宽度
              canvasHeight: canvasHeight, // 矩形高度
              gridMarginTop: gridMarginTop, // 折线图上距离
              gridMarginLeft: gridMarginLeft, // 折线图左距离 
              xArr: xArr, // 横坐标
              gridNum: gridNum, // 横网格线数量
              context: context, // canvas上下文
              len: len, // 数据数组长度
              spaceX: spaceX,
              fontSize: fontSize
            };
            _this.setData({
              options: options
            });

            /*
             * 绘制横轴&纵轴&网格线
             */
            _this.drawLineXY(_this.data.options, _this.data.switchArr);

            /*
             * 描点连线
             */
            _this.drawPointLine(_this.data.options, _this.data.switchArr);

            context.draw();
            _this.setData({
              canvas_remind: ''
            });
          }
        }
      })
    }
  },

  // 绘制横轴&纵轴&网格线
  drawLineXY: function(options, switchArr) {
    var context = options.context,
      gridMarginLeft = options.gridMarginLeft,
      gridMarginTop = options.gridMarginTop,
      canvasHeight = options.canvasHeight,
      canvasWidth = options.canvasWidth,
      xArr = options.xArr,
      tmp_yArr = switchArr,
      gridNum = options.gridNum,
      fontSize = options.fontSize;

    /*
     * 余额纵坐标&横网格线
     * gridNum: 横网格线条数
     * spaceY: 横网格间距
     * spaceYe: 纵轴余额的金额间隔
     * tmp_minY: 余额的最小值
     * tmp_maxY: 余额的最大值
     */
    var tmp_minY = Math.min.apply(Math, tmp_yArr.map(function(e) {
        return Math.abs(e);
      })),
      tmp_maxY = Math.max.apply(Math, tmp_yArr.map(function(e) {
        return Math.abs(e);
      })),
      spaceYe = tmp_maxY / gridNum,
      gridHeight = canvasHeight - 2 * gridMarginTop,
      spaceY = gridHeight / gridNum;

    // 绘制竖网格
    context.setLineWidth(1);
    context.setLineCap("round");
    context.setStrokeStyle("#dddddd");
    for (var i = 0; i < xArr.length; i++) {
      context.beginPath();
      context.moveTo(xArr[i] + gridMarginLeft, canvasHeight - gridMarginTop);
      context.lineTo(xArr[i] + gridMarginLeft, gridMarginTop);
      context.stroke();
      context.closePath();
    }
    context.setStrokeStyle("#dddddd");
    context.setFillStyle("#36ab60");

    // 绘制横网格&纵轴金额  
    for (var i = 0; i <= gridNum; i++) {
      var numY = 0,
        diff = 0;
      // 纵轴金额
      if (i === 0) {
        numY = 0;
      } else {
        numY = (spaceYe * i).toFixed(0);
      }
      context.beginPath();
      context.moveTo(xArr[0] + gridMarginLeft, gridMarginTop + spaceY * i);
      context.lineTo(xArr[xArr.length - 1] + gridMarginLeft, gridMarginTop + spaceY * i);
      context.stroke();
      context.closePath();

      context.beginPath();
      context.setFontSize(fontSize);
      var left = 25;
      if (numY < 10) {
        left = 15;
      } else if (numY < 100) {
        left = 20;
      } else if (numY < 1000) {
        left = 25;
      }
      context.fillText(numY, gridMarginLeft - left, canvasHeight - gridMarginTop - spaceY * i + 3);
      context.closePath();
    }

    /*
     * 绘制横轴和纵轴
     */
    context.setLineWidth(2);
    context.setStrokeStyle("#36ab60");
    context.beginPath();
    context.moveTo(xArr[0] + gridMarginLeft, canvasHeight - gridMarginTop);
    context.lineTo(canvasWidth - gridMarginLeft / 2, canvasHeight - gridMarginTop);
    context.moveTo(xArr[0] + gridMarginLeft, canvasHeight - gridMarginTop);
    context.lineTo(xArr[0] + gridMarginLeft, 0);
    context.stroke();
    context.closePath();

  },

  // 描点&连线
  drawPointLine: function(options, switchArr) {
    var _this = this;
    var context = options.context,
      yArr = [],
      gridMarginLeft = options.gridMarginLeft,
      gridMarginTop = options.gridMarginTop,
      canvasHeight = options.canvasHeight,
      canvasWidth = options.canvasWidth,
      xArr = options.xArr,
      gridNum = options.gridNum,
      tmp_yArr = switchArr,
      len = options.len,
      spaceX = options.spaceX,
      pointArr = [];

    /* 
     * 点集的纵坐标
     * 根据网格间距/余额间距的比例算出点的对应纵坐标
     * spaceY: 横网格间距
     * spaceYe: 纵轴金额间隔
     * tmp_minY: 金额的最小值
     * tmp_maxY: 金额的最大值
     * yArr: 点在画布中的纵坐标
     */

    var tmp_minY = Math.min.apply(Math, tmp_yArr.map(function(e) {
        return Math.abs(e);
      })),
      tmp_maxY = Math.max.apply(Math, tmp_yArr.map(function(e) {
        return Math.abs(e);
      })),
      spaceYe = tmp_maxY / gridNum,
      gridHeight = canvasHeight - 2 * gridMarginTop,
      spaceY = gridHeight / gridNum,
      switchBtn = Math.min.apply(Math, tmp_yArr) >= 0;

    for (var i = 0; i < len; i++) {
      yArr.push(gridHeight - (tmp_maxY - Math.abs(tmp_yArr[i])) * spaceY / spaceYe);
    }

    /* 
     * 描点连线
     */
    for (var i = 0; i < len; i++) {
      var x = xArr[i] + gridMarginLeft, // 横坐标
        y = canvasHeight - gridMarginTop - yArr[i]; // 纵坐标         

      // 将点在画布中的坐标&消费详情存入数组
      pointArr.push({
        x: x,
        y: y,
        detail: this.data.dict[i]
      });
    }

    context.setStrokeStyle("#36ab60");
    context.setFillStyle("#f11919");
    // 描点连线
    for (var i = 0, pLen = pointArr.length; i < pLen; i++) {

      if (pointArr[i + 1]) {
        if ((switchBtn && tmp_yArr[i + 1] > tmp_yArr[i]) || (!switchBtn && (tmp_yArr[i] > 0 || tmp_yArr[i + 1] > 0))) {
          context.setGlobalAlpha(0.66);
        }
        context.beginPath();
        context.moveTo(pointArr[i].x, pointArr[i].y);
        context.lineTo(pointArr[i + 1].x, pointArr[i + 1].y);
        context.stroke();
        context.beginPath();
      }

      context.setGlobalAlpha(1);
      context.beginPath();
      context.arc(pointArr[i].x, pointArr[i].y, 2, 0, 2 * Math.PI); // 画点              
      context.fill();
      context.fillText((!switchBtn && tmp_yArr[i] > 0 ? '+' : '') + tmp_yArr[i], pointArr[i].x + 3, pointArr[i].y - 3); // 点的含义，画字
      context.closePath();

      pointArr[i].detail.balance = parseFloat(pointArr[i].detail.balance);
    }

    _this.setData({
      points: pointArr
    });
  },

  // 触摸详情
  canvasTap: function(e) {
    var _this = this;
    var that = this;
    // 手指在画布中的坐标        
    var tapX = e.detail.x,
      tapY = e.detail.y,
      points = _this.data.points,
      pointsLen = points.length,
      diffX = 0,
      iwidth = (_this.data.width - 2 * _this.data.gridMarginLeft) / (_this.data.count - 0.5);

    var i = Math.round((tapX - _this.data.gridMarginLeft) / iwidth);

    var college = wx.getStorageSync('college')
    var account = wx.getStorageSync('stuid')
    var token = app.globalData.token
    that.setData({
      college: college
    })
    wx.request({
      url: appConfig.jwAPI + college + '/cost?token=' + token,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        var num = res.data.tongji.length
        var date = res.data.tongji[num - 1 - i].CDATE
        that.setData({
          display: false,
        })
        wx.request({
          url: appConfig.jwAPI + college + '/costinfo?date=' + date + '&&token=' + token,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            console.log(res.data)
            wx.showToast({
              title: '获取成功',
              inon: 'success',
              duration: 500,
            })
            that.setData({
              info: res.data.mingxi,
              infodate: res.data.mingxi[0].CDATE.slice(0, 4) + '-' + res.data.mingxi[0].CDATE.slice(4, 6) + '-' + res.data.mingxi[0].CDATE.slice(6, 8)
            })
            if (res.data.mingxi.length == 1) {
              that.setData({
                time: [{
                  date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
                }, ]
              })
            } else if (res.data.mingxi.length == 2) {
              that.setData({
                time: [{
                    date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
                  },
                ]
              })
            } else if (res.data.mingxi.length == 3) {
              that.setData({
                time: [{
                    date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
                  },
                ]
              })
            } else if (res.data.mingxi.length == 4) {
              that.setData({
                time: [{
                    date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
                  },
                ]
              })
            } else if (res.data.mingxi.length == 5) {
              that.setData({
                time: [{
                    date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
                  },
                ]
              })
            } else if (res.data.mingxi.length == 6) {
              that.setData({
                time: [{
                    date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[5].CTIME.slice(0, 2) + ':' + res.data.mingxi[5].CTIME.slice(2, 4) + ':' + res.data.mingxi[5].CTIME.slice(4, 6)
                  },
                ]
              })
            } else if (res.data.mingxi.length == 7) {
              that.setData({
                time: [{
                    date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[5].CTIME.slice(0, 2) + ':' + res.data.mingxi[5].CTIME.slice(2, 4) + ':' + res.data.mingxi[5].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[6].CTIME.slice(0, 2) + ':' + res.data.mingxi[6].CTIME.slice(2, 4) + ':' + res.data.mingxi[6].CTIME.slice(4, 6)
                  },
                ]
              })
            } else if (res.data.mingxi.length == 8) {
              that.setData({
                time: [{
                    date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[5].CTIME.slice(0, 2) + ':' + res.data.mingxi[5].CTIME.slice(2, 4) + ':' + res.data.mingxi[5].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[6].CTIME.slice(0, 2) + ':' + res.data.mingxi[6].CTIME.slice(2, 4) + ':' + res.data.mingxi[6].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[7].CTIME.slice(0, 2) + ':' + res.data.mingxi[7].CTIME.slice(2, 4) + ':' + res.data.mingxi[7].CTIME.slice(4, 6)
                  },
                ]
              })
            } else if (res.data.mingxi.length == 9) {
              that.setData({
                time: [{
                    date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[5].CTIME.slice(0, 2) + ':' + res.data.mingxi[5].CTIME.slice(2, 4) + ':' + res.data.mingxi[5].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[6].CTIME.slice(0, 2) + ':' + res.data.mingxi[6].CTIME.slice(2, 4) + ':' + res.data.mingxi[6].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[7].CTIME.slice(0, 2) + ':' + res.data.mingxi[7].CTIME.slice(2, 4) + ':' + res.data.mingxi[7].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[8].CTIME.slice(0, 2) + ':' + res.data.mingxi[8].CTIME.slice(2, 4) + ':' + res.data.mingxi[8].CTIME.slice(4, 6)
                  },
                ]
              })
            } else if (res.data.mingxi.length == 10) {
              that.setData({
                time: [{
                    date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[5].CTIME.slice(0, 2) + ':' + res.data.mingxi[5].CTIME.slice(2, 4) + ':' + res.data.mingxi[5].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[6].CTIME.slice(0, 2) + ':' + res.data.mingxi[6].CTIME.slice(2, 4) + ':' + res.data.mingxi[6].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[7].CTIME.slice(0, 2) + ':' + res.data.mingxi[7].CTIME.slice(2, 4) + ':' + res.data.mingxi[7].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[8].CTIME.slice(0, 2) + ':' + res.data.mingxi[8].CTIME.slice(2, 4) + ':' + res.data.mingxi[8].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[9].CTIME.slice(0, 2) + ':' + res.data.mingxi[9].CTIME.slice(2, 4) + ':' + res.data.mingxi[9].CTIME.slice(4, 6)
                  },
                ]
              })
            } else if (res.data.mingxi.length == 11) {
              that.setData({
                time: [{
                    date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[5].CTIME.slice(0, 2) + ':' + res.data.mingxi[5].CTIME.slice(2, 4) + ':' + res.data.mingxi[5].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[6].CTIME.slice(0, 2) + ':' + res.data.mingxi[6].CTIME.slice(2, 4) + ':' + res.data.mingxi[6].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[7].CTIME.slice(0, 2) + ':' + res.data.mingxi[7].CTIME.slice(2, 4) + ':' + res.data.mingxi[7].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[8].CTIME.slice(0, 2) + ':' + res.data.mingxi[8].CTIME.slice(2, 4) + ':' + res.data.mingxi[8].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[9].CTIME.slice(0, 2) + ':' + res.data.mingxi[9].CTIME.slice(2, 4) + ':' + res.data.mingxi[9].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[10].CTIME.slice(0, 2) + ':' + res.data.mingxi[10].CTIME.slice(2, 4) + ':' + res.data.mingxi[10].CTIME.slice(4, 6)
                  },
                ]
              })
            } else if (res.data.mingxi.length == 12) {
              that.setData({
                time: [{
                    date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[5].CTIME.slice(0, 2) + ':' + res.data.mingxi[5].CTIME.slice(2, 4) + ':' + res.data.mingxi[5].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[6].CTIME.slice(0, 2) + ':' + res.data.mingxi[6].CTIME.slice(2, 4) + ':' + res.data.mingxi[6].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[7].CTIME.slice(0, 2) + ':' + res.data.mingxi[7].CTIME.slice(2, 4) + ':' + res.data.mingxi[7].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[8].CTIME.slice(0, 2) + ':' + res.data.mingxi[8].CTIME.slice(2, 4) + ':' + res.data.mingxi[8].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[9].CTIME.slice(0, 2) + ':' + res.data.mingxi[9].CTIME.slice(2, 4) + ':' + res.data.mingxi[9].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[10].CTIME.slice(0, 2) + ':' + res.data.mingxi[10].CTIME.slice(2, 4) + ':' + res.data.mingxi[10].CTIME.slice(4, 6)
                  },
                  {
                    date: res.data.mingxi[11].CTIME.slice(0, 2) + ':' + res.data.mingxi[11].CTIME.slice(2, 4) + ':' + res.data.mingxi[11].CTIME.slice(4, 6)
                  },
                ]
              })
            }
          }
        })
      }
    })

    _this.setData({
      lineLeft: _this.data.gridMarginLeft + iwidth * i - 1, // 详情竖线的left
      currentIndex: i // 当前点的索引，即显示当前详情
    });
  },

  // 切换视图
  switchBtn: function(e) {
    var id = e.target.id;
    if (!id || (id == 'balance' && this.data.switchBtn) || (id == 'cost' && !this.data.switchBtn)) {
      return false;
    }
    var context = this.data.options.context;
    this.drawLineXY(this.data.options, this.data[id + 'Arr']);
    this.drawPointLine(this.data.options, this.data[id + 'Arr']);

    context.draw();
    this.setData({
      switchBtn: !this.data.switchBtn
    });
  },

  datechange: function(e) {
    var that = this
    var choosedate = e.detail.value.slice(0, 4) + e.detail.value.slice(5, 7) + e.detail.value.slice(8, 10)

    var college = wx.getStorageSync('college')
    var account = wx.getStorageSync('stuid')
    var token = app.globalData.token
    this.setData({
      college: college,
      display: false
    })
    wx.request({
      url: appConfig.jwAPI + college + '/costinfo?date=' + choosedate + '&&token=' + token,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        wx.showToast({
          title: '获取成功',
          inon: 'success',
          duration: 500,
        })
        that.setData({
          info: res.data.mingxi
        })
        if (res.data.mingxi.length != 0) {
          that.setData({
            infodate: res.data.mingxi[0].CDATE.slice(0, 4) + '-' + res.data.mingxi[0].CDATE.slice(4, 6) + '-' + res.data.mingxi[0].CDATE.slice(6, 8)
          })
        }
        if (res.data.mingxi.length == 1) {
          that.setData({
            time: [{
              date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
            }, ]
          })
        } else if (res.data.mingxi.length == 2) {
          that.setData({
            time: [{
                date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
              },
            ]
          })
        } else if (res.data.mingxi.length == 3) {
          that.setData({
            time: [{
                date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
              },
            ]
          })
        } else if (res.data.mingxi.length == 4) {
          that.setData({
            time: [{
                date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
              },
            ]
          })
        } else if (res.data.mingxi.length == 5) {
          that.setData({
            time: [{
                date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
              },
            ]
          })
        } else if (res.data.mingxi.length == 6) {
          that.setData({
            time: [{
                date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[5].CTIME.slice(0, 2) + ':' + res.data.mingxi[5].CTIME.slice(2, 4) + ':' + res.data.mingxi[5].CTIME.slice(4, 6)
              },
            ]
          })
        } else if (res.data.mingxi.length == 7) {
          that.setData({
            time: [{
                date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[5].CTIME.slice(0, 2) + ':' + res.data.mingxi[5].CTIME.slice(2, 4) + ':' + res.data.mingxi[5].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[6].CTIME.slice(0, 2) + ':' + res.data.mingxi[6].CTIME.slice(2, 4) + ':' + res.data.mingxi[6].CTIME.slice(4, 6)
              },
            ]
          })
        } else if (res.data.mingxi.length == 8) {
          that.setData({
            time: [{
                date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[5].CTIME.slice(0, 2) + ':' + res.data.mingxi[5].CTIME.slice(2, 4) + ':' + res.data.mingxi[5].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[6].CTIME.slice(0, 2) + ':' + res.data.mingxi[6].CTIME.slice(2, 4) + ':' + res.data.mingxi[6].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[7].CTIME.slice(0, 2) + ':' + res.data.mingxi[7].CTIME.slice(2, 4) + ':' + res.data.mingxi[7].CTIME.slice(4, 6)
              },
            ]
          })
        } else if (res.data.mingxi.length == 9) {
          that.setData({
            time: [{
                date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[5].CTIME.slice(0, 2) + ':' + res.data.mingxi[5].CTIME.slice(2, 4) + ':' + res.data.mingxi[5].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[6].CTIME.slice(0, 2) + ':' + res.data.mingxi[6].CTIME.slice(2, 4) + ':' + res.data.mingxi[6].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[7].CTIME.slice(0, 2) + ':' + res.data.mingxi[7].CTIME.slice(2, 4) + ':' + res.data.mingxi[7].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[8].CTIME.slice(0, 2) + ':' + res.data.mingxi[8].CTIME.slice(2, 4) + ':' + res.data.mingxi[8].CTIME.slice(4, 6)
              },
            ]
          })
        } else if (res.data.mingxi.length == 10) {
          that.setData({
            time: [{
                date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[5].CTIME.slice(0, 2) + ':' + res.data.mingxi[5].CTIME.slice(2, 4) + ':' + res.data.mingxi[5].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[6].CTIME.slice(0, 2) + ':' + res.data.mingxi[6].CTIME.slice(2, 4) + ':' + res.data.mingxi[6].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[7].CTIME.slice(0, 2) + ':' + res.data.mingxi[7].CTIME.slice(2, 4) + ':' + res.data.mingxi[7].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[8].CTIME.slice(0, 2) + ':' + res.data.mingxi[8].CTIME.slice(2, 4) + ':' + res.data.mingxi[8].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[9].CTIME.slice(0, 2) + ':' + res.data.mingxi[9].CTIME.slice(2, 4) + ':' + res.data.mingxi[9].CTIME.slice(4, 6)
              },
            ]
          })
        } else if (res.data.mingxi.length == 11) {
          that.setData({
            time: [{
                date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[5].CTIME.slice(0, 2) + ':' + res.data.mingxi[5].CTIME.slice(2, 4) + ':' + res.data.mingxi[5].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[6].CTIME.slice(0, 2) + ':' + res.data.mingxi[6].CTIME.slice(2, 4) + ':' + res.data.mingxi[6].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[7].CTIME.slice(0, 2) + ':' + res.data.mingxi[7].CTIME.slice(2, 4) + ':' + res.data.mingxi[7].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[8].CTIME.slice(0, 2) + ':' + res.data.mingxi[8].CTIME.slice(2, 4) + ':' + res.data.mingxi[8].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[9].CTIME.slice(0, 2) + ':' + res.data.mingxi[9].CTIME.slice(2, 4) + ':' + res.data.mingxi[9].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[10].CTIME.slice(0, 2) + ':' + res.data.mingxi[10].CTIME.slice(2, 4) + ':' + res.data.mingxi[10].CTIME.slice(4, 6)
              },
            ]
          })
        } else if (res.data.mingxi.length == 12) {
          that.setData({
            time: [{
                date: res.data.mingxi[0].CTIME.slice(0, 2) + ':' + res.data.mingxi[0].CTIME.slice(2, 4) + ':' + res.data.mingxi[0].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[1].CTIME.slice(0, 2) + ':' + res.data.mingxi[1].CTIME.slice(2, 4) + ':' + res.data.mingxi[1].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[2].CTIME.slice(0, 2) + ':' + res.data.mingxi[2].CTIME.slice(2, 4) + ':' + res.data.mingxi[2].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[3].CTIME.slice(0, 2) + ':' + res.data.mingxi[3].CTIME.slice(2, 4) + ':' + res.data.mingxi[3].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[4].CTIME.slice(0, 2) + ':' + res.data.mingxi[4].CTIME.slice(2, 4) + ':' + res.data.mingxi[4].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[5].CTIME.slice(0, 2) + ':' + res.data.mingxi[5].CTIME.slice(2, 4) + ':' + res.data.mingxi[5].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[6].CTIME.slice(0, 2) + ':' + res.data.mingxi[6].CTIME.slice(2, 4) + ':' + res.data.mingxi[6].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[7].CTIME.slice(0, 2) + ':' + res.data.mingxi[7].CTIME.slice(2, 4) + ':' + res.data.mingxi[7].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[8].CTIME.slice(0, 2) + ':' + res.data.mingxi[8].CTIME.slice(2, 4) + ':' + res.data.mingxi[8].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[9].CTIME.slice(0, 2) + ':' + res.data.mingxi[9].CTIME.slice(2, 4) + ':' + res.data.mingxi[9].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[10].CTIME.slice(0, 2) + ':' + res.data.mingxi[10].CTIME.slice(2, 4) + ':' + res.data.mingxi[10].CTIME.slice(4, 6)
              },
              {
                date: res.data.mingxi[11].CTIME.slice(0, 2) + ':' + res.data.mingxi[11].CTIME.slice(2, 4) + ':' + res.data.mingxi[11].CTIME.slice(4, 6)
              },
            ]
          })
        }
      }
    })
  },
  onShareAppMessage: function(res) {
    if (res.confirm === 'menu') {
      console.log(res.target)
    }
    return {
      title: '这是我的一卡通消费，你的呢',
      path: '/pages/sub/cost/cost'
    }
  }
})