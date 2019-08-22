var _self;
var tableScrollTimer = null;

Page({
  data: {
    menu1Show: false,
    menu1Top: 30,
    leftTitle: '',
    rightData: [],
    scLeft: 0,
    nowRow:[],
    tabelWidth: '800rpx',
    clientName: '',
    certificateNumber: '',
    vin: '',
    page: 1,
    plateNumbers:'',
    rows: 10
  },
  onLoad: function () {
    _self = this;
    this.getCarList()
  },
  showMenu1: function (e) {

    console.log(e.currentTarget.dataset.row)
    this.setData({
      nowRow:e.currentTarget.dataset.row
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
  tap1: function () {
    this.hideMenu();
    var map2json = JSON.stringify(this.data.nowRow);
    wx.navigateTo({
      url: '../edit/editcar/index?rowData=' + map2json,
    })
  },
  tap2: function () {
    let that =this
    let url ='https://2.honggps.com/removeUsedCar'
    let data={
      usedcarid: _self.data.nowRow.id,
    }
    let token =  wx.getStorageSync('token')
    console.log(data)
    wx.request({
      url: url,
      method:'post',
      data: { data: data, token},
      success:function(res){
        wx.showToast({
          title: res.data.errmsg,
          icon: "none"
        });
        setTimeout(function () {
         that.onLoad()
        }, 1500)
      }
    })
    this.hideMenu();
  },
  tap3: function () {
    this.hideMenu();
    wx.navigateTo({
      url: '../add/addcar/index',
    })
  },
  tap4: function () {
    let url ='http://2.honggps.com/UsedCarAudit'
    let data = {
      usedcarid: _self.data.nowRow.id,
      auditStatus: 1,
    }
    let token = wx.getStorageSync('token')
    wx.request({
      url: url,
      data:{data:data,token},
      method:"post",
      success:function(res){
        wx.showToast({
          title: res.data.errmsg,
          icon: "none"
        });
      }
    })
    this.hideMenu();
  },
  tap5: function () {
    let url = 'http://2.honggps.com/UsedCarAudit'
   
    let data = {
      usedcarid: _self.data.nowRow.id,
      auditStatus: 2,
    }
    let token= wx.getStorageSync('token')
    wx.request({
      url: url,
      data: { data: data, token},
      method: "post",
      success: function (res) {
        wx.showToast({
          title: res.data.errmsg,
          icon: "none"
        });
      }
    })
    this.hideMenu();
  },
  tap6: function () {
    wx.showToast({
      title: "查询页面",
      icon: "none"
    });
    this.hideMenu();
    wx.navigateTo({
      url: '../search/escSearch/index',
    })
  },
  onPullDownRefresh: function (){
    wx.showNavigationBarLoading()
    console.log('xiala')
    wx.stopPullDownRefresh()
  },
  onReachBottom:function(){
    wx.showNavigationBarLoading()
    console.log('shangla')
    
  },
  tabelScroll: function (e) {
    var scLeft = e.detail.scrollLeft;
    if (tableScrollTimer != null) { clearTimeout(tableScrollTimer); }
    tableScrollTimer = setTimeout(function () {
      _self.setData({ scLeft: scLeft });
    },1);
  },
  getCarList: function () {
    let that = this
    let url = 'https://2.honggps.com/getCarList'
    let userinfo = wx.getStorageSync("userInfo")
    let token = userinfo.token
    let data = {
      page: this.data.page,
      rows: this.data.rows,
      clientName: this.data.clientName,
      plateNumbers: this.data.plateNumbers
    }
    wx.request({
      url: url,
      method: "POST",
      data: { data: data, token},
      success: function (res){
        console.log(res)
        that.setData({
          rightData:res.data.retobj
        })
      }
    })
  },
})