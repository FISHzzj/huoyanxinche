var _self;
var tableScrollTimer = null;
var nowList=[]
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
    rows: 10,
    show: false,
    tableData: [{
      id: '001',
      signType: '面签',
      signTime: '2018-11-29 16:53:43',
      salesman: '小李',
      signPlace: '工商银行人民路支行',
      signCount: '10',
      firstSignTime: '2018-11-29 16:54:36',
      bankSignPerson: '小青'
    }],
  },
  onLoad: function () {
    _self = this;
    this.getVisainterview()
  },
  showBanner: function () {
    this.setData({ show: true });
  },
  closeBanner: function () {
    this.setData({ show: false });
  },
  ck:function(){
    console.log('查看')
    this.setData({ show: true });
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
      url: '../edit/editesc/index?rowData=' + map2json,
    })
  },
  tap2: function () {
    // let that =this
    // let url ='https://2.honggps.com/removeUsedCar'
    
    // let data={
    //   usedcarid: _self.data.nowRow.id,
    // }
    // let token =  wx.getStorageSync('token')
    // console.log(data)
    // wx.request({
    //   url: url,
    //   method:'post',
    //   data: { data: data, token},
    //   success:function(res){
    //     wx.showToast({
    //       title: res.data.errmsg,
    //       icon: "none"
    //     });
    //     setTimeout(function () {
    //      that.onLoad()
    //     }, 1500)
    //   }
    // })
    // this.hideMenu();
    //面签
    wx.navigateTo({
      url: '../websocket/index',
    })
  },
  tap3: function () {
    
    this.hideMenu();
    wx.navigateTo({
      url: '../add/addesc/index',
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
  
  tabelScroll: function (e) {
    var scLeft = e.detail.scrollLeft;
    if (tableScrollTimer != null) { clearTimeout(tableScrollTimer); }
    tableScrollTimer = setTimeout(function () {
      _self.setData({ scLeft: scLeft });
    },1);
  },
  onReachBottom: function () {
    console.log('la')
    this.getVisainterview()
  },
  getVisainterview: function () {
    let that = this
    let url = 'https://2.honggps.com/getVisainterview'
    let userinfo = wx.getStorageSync("userInfo")
    let token=userinfo.token
    let data = {
      // examineType：审核类型（面签结果 0未审核 1通过 2不通过） 必须
      examineType:0,
      clientName:'',
      IDNumber:'',
      page:1,
      row:10
			// 	clientName：客户姓名 不必须、
      // IDNumber：身份证 不必须
			// 	page：页码 必须
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
          rightData: nowList,
          page: that.data.page + 1
        })
        setTimeout(function () { wx.stopPullDownRefresh(); }, 500)
      }
    })
  },
})