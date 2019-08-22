var _self;
Page({
  data: {
    idCard1: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    idCard2: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png'
  },
  onLoad: function () {
    _self = this;
  },
  selectImg1: function () {
    wx.chooseImage({
      count: 1,
      success: function (res) {
        _self.setData({ idCard1: res.tempFilePaths[0] });
      }
    })
  },
  selectImg2: function () {
    wx.chooseImage({
      count: 1,
      success: function (res) {
        _self.setData({ idCard2: res.tempFilePaths[0] });
      }
    })
  },
  previewImg1: function () {
    wx.previewImage({
      urls: [_self.data.idCard1]
    });
  },
  previewImg2: function () {
    wx.previewImage({
      urls: [_self.data.idCard2]
    });
  },
  uploadCards: function () {
    if (this.data.idCard1 == 'https://staticimgs.oss-cn-beijing.aliyuncs.com/idcard1.png' || this.data.idCard2 == 'https://staticimgs.oss-cn-beijing.aliyuncs.com/idcard2.png') {
      wx.showToast({ title: "请选择身份证照片", icon: "none" });
      return;
    }
    // 因底层限制一次上传一个
    wx.showLoading({ title: "上传中" });
    // 上传正面
    var uploadTask1 = wx.uploadFile({
      url: 'https://unidemo.dcloud.net.cn/upload',
      filePath: _self.data.idCard1,
      fileType: 'image',
      name: 'data',
      success: function (uploadFileRes) {
        // 上传成功后返回服务器端保存的路径
        console.log(uploadFileRes.data);
        // 上传背面
        var uploadTask2 = wx.uploadFile({
          url: 'https://unidemo.dcloud.net.cn/upload',
          filePath: _self.data.idCard2,
          fileType: 'image',
          name: 'data',
          success: function (uploadFileRes) {
            // 上传成功后返回服务器端保存的路径
            console.log(uploadFileRes.data);
            // 至此2张照片上传完毕
            wx.hideLoading();
          }
        });
      }
    });
  }
})