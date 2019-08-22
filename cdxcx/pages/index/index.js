// pages/index/index.js
let app = getApp();
var _self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperItems: [
      {
        "imgUrl": 'http://pic1.win4000.com/wallpaper/9/5450ae2fdef8a.jpg', "title": "标题信息",},
      {
        "imgUrl": 'http://pic1.win4000.com/wallpaper/9/5450ae2fdef8a.jpg', "title": "标题信息",
      },
      {
        "imgUrl": 'http://pic1.win4000.com/wallpaper/9/5450ae2fdef8a.jpg', "title": "标题信息",
      }
    ],
    audit:'',
    familyvisit:'',
    reported:'',
    theday:'',
    themouth:'',
    theweek:'',
    theyesterday:'',
    notice:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    _self = this;
    this.getIndexMessage()
    this.getNoticeList()
  },
  
  getIndexMessage:function(){
    let that = this
    let uesrinfo = wx.getStorageSync('userInfo')
    let token = uesrinfo.token
    let data={}
    wx.request({
      url: app.globalData.host + '/getIndexMessage',
      method: 'post',
      data: { data: data, token },
      success: function (res) {
        console.log(res.data.retobj)
        // that.setData({
        //   audit: res.data.retobj.audit,
        //   familyvisit: res.data.retobj.familyvisit,
        //   reported: res.data.retobj.reported,
        //   theday: res.data.retobj.theday,
        //   themouth: res.data.retobj.themouth,
        //   theweek: res.data.retobj.theweek,
        //   theyesterday: res.data.retobj.theyesterday
        // })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  getNoticeList:function(){
    let that = this
    let uesrinfo = wx.getStorageSync('userInfo')
    let token = uesrinfo.token
    let data = {}
    wx.request({
      url: app.globalData.host + '/getNoticeList',
      method: 'post',
      data: { data: data, token },
      success: function (res) {
        console.log(res.data.retobj)
        that.setData({
          notice: res.data.retobj
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})