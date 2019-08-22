// pages/login/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'https://2.honggps.com'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit: function (e) {
    console.log(e)
    // setTimeout(function () {
    //   wx.navigateBack({
    //     delta: 1
    //   })

    // }, 1500)
    let that = this
    let name = e.detail.value.name
    let password = e.detail.value.password
    console.log(name, password)
    let data = {
      userName: name,
      password: password
    }
    wx.request({
      url: that.data.url + `/signIn`,
      method: "POST",
      data: data,
      success: function (res) {
        // that.closeBanner()
        console.log(res.data.retobj)
        wx.setStorage({
          key: 'token',
          data: res.data.retobj.token,
        })
        wx.setStorage({
          key: 'userInfo',
          data: res.data.retobj,
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })

        }, 1500)
      },
      fail:function(er){
        console.log(er)
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