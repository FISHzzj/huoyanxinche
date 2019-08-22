// pages/xd/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staticUrl: '../../static/img/',
    list: [{
      title: "征信申请",
      icon: '../../static/img/zxsq.png',
      url: "../xdpage/zxsq/index"
    }, {
      title: "客户列表",
      icon: '../../static/img/zlzb.png',
      url: "../xdpage/khlb/index"
    }, {
      title: "待办任务",
      url: '../xdpage/dbrw/index',
      icon: '../../static/img/dbrw.png'
    }, {
      title: "已办任务",
      icon: '../../static/img/ybrw.png',
      url: "../xdpage/ybrw/index"
    }, {
      title: "面签记录",
      icon: '../../static/img/ywsp.png',
      url: '../xdpage/mqjl/index'
    }, {
      title: "GPS管理",
      icon: '../../static/img/fksq.png',
      url: '../xdpage/gpsgl/index'
    }, {
      title: "车辆管理",
      icon: '../../static/img/dksq.png',
      url: '../xdpage/clgl/index'
    }, {
      title: "二手车评估",
      icon: '../../static/img/escpg.png',
      url: "../xdpage/escpg/index"
    }, {
      title: "身份证",
      icon: '../../static/img/sfz.png',
      url: "../xdpage/sfzsb/index"
    }, {
      title: "逾期客户",
      url: '../xdpage/yqkh/index',
      icon: '../../static/img/cjcx.png'
    }, {
      title: "电话催收",
      url: '../xdpage/dhcs/index',
      icon: '../../static/img/cjcx.png'
    }, {
      title: "贷后收车",
      url: '../xdpage/dhsc/index',
      icon: '../../static/img/cjcx.png'
    }, {
      title: "代偿管理",
      icon: '../../static/img/cjcx.png',
      url: '../xdpage/dcgl/index'
    }, {
      title: "结清抵押",
      url: '../xdpage/jzdy/index',
      icon: '../../static/img/cjcx.png'
    }, ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})