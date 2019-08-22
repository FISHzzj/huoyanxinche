// pages/edit/khlb/index.js
let app = getApp()
var that
var host= 'http://2.honggps.com'
const { formatTime}=require('../../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page:'10',
    rows:'1',
    pagesource:'',
    staticUrl: app.staticUrl,
    
    getClientList:'/getClientList',
    addClient:'/addClient'
    
  },
  formSubmit:function(e){
    let that=this
    console.log(e.detail.value)
    let tgt =e.detail.value
    let userinfo=wx.getStorageSync('userInfo')
    let token =userinfo.token
    //addClient
    let data={
      IDNumber: tgt.IDNumber,
      STATUS: tgt.STATUS,
      businessNumber: tgt.businessNumber,
      clientName: tgt.clientName,
      createtime: formatTime(new Date()),
      createuser: userinfo.username,
      userId: userinfo.userid,
      createuserId:'',
      groupId: userinfo.groupid
    }
    console.log(data)
    wx.request({
      url: host+that.data.addClient,
      data: {
        data: data, token
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.errmsg,
          icon: "none"
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })

        }, 1500)
      }
    })
  },
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