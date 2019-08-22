var _self;
const app = getApp()
var tableScrollTimer = null;
var host = 'https://2.honggps.com'
var api = '/getTodoTasksList'
var nowList=[]
Page({
  data: {
    menu1Show: false,
    menu1Top: 30,
    leftTitle: '',
    rightData: [],
    scLeft: 0,
    nowRow: [],
    tabelWidth: '1200rpx',
    clientName: '',
    certificateNumber: '',
    vin: '',
    page: 1,
    rows: 10,
    groupid: '',
    IDNumber: '',
    name: '',
    auditStatus: ''
  },
  onLoad: function () {
    _self = this;
    this.getHasTasksList()
  },
  showMenu1: function (e) {

    console.log(e.currentTarget.dataset.row)
    this.setData({
      nowRow: e.currentTarget.dataset.row
    })
    if (this.data.menu1Show) {
      this.setData({ menu1Show: false });
      return;
    }
    // 动态调整菜单的 top 值
    // 原理 : 获取按钮的高度 = 菜单的 top 值
    let view = wx.createSelectorQuery().select("#demo-btn-1");
    view.fields({ size: true }, data => {
      _self.setData({ menu1Show: true, menu1Top: data.height });
    }).exec();
  },

 
  
  
  // 关闭菜单方法
  hideMenu: function () {
    this.setData({ menu1Show: false });
  },
  // 菜单点击函数
  //基本信息
  tap1: function () {
    this.hideMenu();
    var map2json = JSON.stringify(this.data.nowRow);
    wx.navigateTo({
      url: '../../edit/ybrw/jbxx?rowData=' + map2json,
    })
  },
  //影像信息
  tap2: function(){
    this.hideMenu();
    var map2json = JSON.stringify(this.data.nowRow);
    wx.navigateTo({
      url: '../../edit/ybrw/yxxx?rowData=' + map2json,
    })
  },
  //筛选信息
  tap3: function () {
    this.hideMenu();
    wx.navigateTo({
      url: '../../edit/ybrw/sxxx?rowData=' + map2json,
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    console.log('xiala')
    wx.stopPullDownRefresh()
  },
  
  tabelScroll: function (e) {
    var scLeft = e.detail.scrollLeft;
    if (tableScrollTimer != null) { clearTimeout(tableScrollTimer); }
    tableScrollTimer = setTimeout(function () {
      _self.setData({ scLeft: scLeft });
    }, 1);
  },
  onReachBottom: function () {
    console.log('la')
    this.getHasTasksList()
  },
  getHasTasksList: function () {
    let userinfo = wx.getStorageSync("userInfo")
    console.log(userinfo)
    console.log(userinfo.token)

    let that = this
    let url = host + '/getHasTasksList'
    let token = userinfo.token
    let data = {
      creditname: that.data.name,
      idcard: that.data.IDNumber,
      status: that.data.auditStatus,
      groupid: userinfo.groupid,
      page: that.data.page,
      rows: that.data.rows
    }
    console.log(data)
    wx.request({
      url: url,
      method: "POST",
      data: { data: data, token },
      success: function (res) {
        console.log(res)
        nowList = nowList.concat(res.data.retobj)
        that.setData({
          page: that.data.page + 1,
          rightData: nowList
        })
        setTimeout(function () { wx.stopPullDownRefresh(); },500)
      }
    })
  },
})