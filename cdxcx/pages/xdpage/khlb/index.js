var _self;
var tableScrollTimer = null;
var host = 'https://2.honggps.com'
var api = '/getClientList'
var nowList = []
Page({
  data: {
    menu1Show: false,
    menu1Top: 30,
    leftTitle: '',
    rightData: [],
    scLeft: 0,
    nowRow: [],
    tabelWidth: '1000rpx',
    clientName: '',
    tableheight:'190rpx',
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
    this.getClientList()
  },
  onReachBottom: function () {
    console.log('la')
    this.getClientList()
  },
  getClientList:function(){
    let that =this
    let uesrinfo =wx.getStorageSync('userInfo')
    let token = uesrinfo.token
    let groupid = uesrinfo.groupid
    
    let data={
      clientname: '',
      status: '',
      groupid: groupid,
      page: this.data.page,
      rows: this.data.rows
    }
    console.log(data)
    wx.request({
      url: host+'/getClientList',
      method: 'post',
      data: {data:data,token},
      success:function(res){
        console.log(res)
        nowList = nowList.concat(res.data.retobj)
        
        that.setData({
          rightData: nowList,
          page: that.data.page+1
        })
        setTimeout(function () { wx.stopPullDownRefresh();}
          ,500)
       
      },
      fail:function(res){
        console.log(res)
      }
    })
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
  tap1: function () {
    this.hideMenu();
    var map2json = JSON.stringify(this.data.nowRow);
    wx.navigateTo({
      url: '../../edit/khlb/index?rowData=' + map2json,
    })
  },
  tap2: function () {
    let that = this
    let url = 'https://2.honggps.com/removeCredit'
    
    let data = {
      usedcarid: _self.data.nowRow.id,
    }
    let token = wx.getStorageSync('token')
    console.log(data)
    wx.request({
      url: url,
      method: 'post',
      data: { data: data, token },
      success: function (res) {
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
    console.log('tap3')
    this.hideMenu();
    wx.navigateTo({
      url: '../../add/khlb/index',
    })
  },
  tap4: function () {
    let url = 'http://2.honggps.com/creditaudit'
    let data = {
      usedcarid: _self.data.nowRow.id,
      auditStatus: 1,
    }
    let token = wx.getStorageSync('token')
    wx.request({
      url: url,
      data: { data: data, token },
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
  tap5: function () {
    let url = 'http://2.honggps.com/creditaudit'

    let data = {
      usedcarid: _self.data.nowRow.id,
      auditStatus: 2,
    }
    let token = wx.getStorageSync('token')
    wx.request({
      url: url,
      data: { data: data, token },
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
  tap7:function(){
    //查询图片资料信息
    
      // let data = {
      //   imageinformationId: imagesId
      // }
      // this.listLoading = true
      // NProgress.start()
      // getImageinformationDetails({ data }).then(res => {
      //   NProgress.done()

      //   if (res.errcode === 0) {
      //     this.listLoading = false
      //     this.imageList = res.retobj
      //   } else {
      //     this.$message({
      //       message: res.errmsg,
      //       type: 'error'
      //     })
      //   }
      // })
    
    this.hideMenu();
    wx.navigateTo({
      url: '../zlzb/index',
    })
  },
  onPullDownRefresh: function () {
    setTimeout(function () { wx.stopPullDownRefresh(); }
      , 500)
  },
 
  
  tabelScroll: function (e) {
    var scLeft = e.detail.scrollLeft;
    if (tableScrollTimer != null) { clearTimeout(tableScrollTimer); }
    tableScrollTimer = setTimeout(function () {
      _self.setData({ scLeft: scLeft });
    }, 1);
  },
  getUsedCarList: function () {
    let userinfo = wx.getStorageSync("userInfo")
    console.log(userinfo)
    console.log(userinfo.token)

    let that = this
    let url = host + api
    let token = userinfo.token
    let data = {
      clientname: that.data.name,
      status: that.data.auditStatus,
      groupid: userinfo.groupid,
      page: that.data.page,
      rows: that.data.rows
    }
    // let data ={
    //   clientname: "",
    //   groupid: 1,
    //   page: 1,
    //   rows: 10,
    //   status: ""
    // }
    console.log(data)
    wx.request({
      url: url,
      method: "POST",
      data: { data: data, token },
      success: function (res) {
        console.log(res)
        that.setData({
          page: that.data.page++,
          rows: 10,
          rightData: res.data.retobj
        })
      }
    })
  },
})