// pages/edit/ybrw/jbxx.js
var host = 'https://2.honggps.com'
//基本信息
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.rowData)
    let nowrow =JSON.parse(options.rowData)
    this.getClienInfo(nowrow)
  },
  getClienInfo:function(obj){
    let userinfo =wx.getStorageSync('userInfo')
    let token=userinfo.token
    let data={
      id:obj.id
    }
    wx.request({
      url: host+'/getClienInfo',
      data: { data: data, token },
      method:'post',
      success:function(res){
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