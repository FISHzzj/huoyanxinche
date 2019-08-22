var _self = ''
const { formatTime } = require('../../../utils/util.js')
//上传图片
const picUp = `https://2.honggps.com/picUp`;
//上传视频
const videoUp = `https://2.honggps.com/videoUp`;
//host
const host = 'https://2.honggps.com';
Page({
  data: {
    genderIndex: 0,
    creditType: ['主贷人', '主贷人配偶','担保人','担保人配偶','反担保人','反担保人配偶'],
    dateValue: "请选择",
    city: '请选择',
    idCard1: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    idCard2: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    videosrc: '',
    consturl: 'https://2.honggps.com',
    //填写内容
    isNewRecord: true,
    clientName: '',
    certificateNumber: '',
    vin: '',
    auditStatus: 1,
    carOnePic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carTwoPic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carThreePic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carFourPic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carFivePic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carSixPic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carSevenPic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carEightPic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carNinePic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carTenPic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carElevenPic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carTwelvePic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carVideo: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    auditor: 'admin',
    usedcarid: 1,
    audittime: '',
    createtime: '',
    createuser: '',
    IDNumberIndate:''

  },
  
  upvideo: function () {
    var that = this
    wx.chooseVideo({
      success: function (res) {
        wx.uploadFile({
          url: videoUp,
          filePath: res.tempFilePath,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = m.retobj
            console.log(retj)
            that.setData({
              carVideo: host + retj,
            })
          }
        })

      }
    })
  },
  upimage: function (v) {
    let that = this
    wx.chooseImage({
      count: 12,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],

      success: function (res) {
        //将图片路径循环赋值给filePath参数
        var imgUrl = res.tempFilePaths[0];

        wx.uploadFile({
          //上传图片的网路请求地址
          url: picUp,
          //选择
          filePath: imgUrl,
          name: 'file',

          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            if (v == 'carOnePic') {
              that.setData({
                carOnePic: host + m.retobj
              })
            } else if (v == 'carTwoPic') {
              that.setData({
                carTwoPic: host + m.retobj
              })
            } else if (v == 'carThreePic') {
              that.setData({
                carThreePic: host + m.retobj
              })
            } else if (v == 'carFourPic') {
              that.setData({
                carFourPic: host + m.retobj
              })
            } else if (v == 'carFivePic') {
              that.setData({
                carFivePic: host + m.retobj
              })
            } else if (v == 'carSixPic') {
              that.setData({
                carSixPic: host + m.retobj
              })
            } else if (v == 'carSevenPic') {
              that.setData({
                carSevenPic: host + m.retobj
              })
            } else if (v == 'carEightPic') {
              that.setData({
                carEightPic: host + m.retobj
              })
            } else if (v == 'carNinePic') {
              that.setData({
                carNinePic: host + m.retobj
              })
            } else if (v == 'carTenPic') {
              that.setData({
                carTenPic: host + m.retobj
              })
            } else if (v == 'carElevenPic') {
              that.setData({
                carElevenPic: host + m.retobj
              })
            } else if (v == 'carTwelvePic') {
              that.setData({
                carTwelvePic: host + m.retobj
              })
            }
          },
          fail: function (res) {
            console.log("error");
          }
        });


      }
    })
  },
  selectImg1: function () {
    this.upimage('carOnePic')
  },
  selectImg2: function () {
    this.upimage('carTwoPic')
  },
  selectImg3: function () {
    this.upimage('carThreePic')
  },
  selectImg4: function () {

    this.upimage('carFourPic')
  }, selectImg5: function () {

    this.upimage('carFivePic')
  },
  selectImg6: function () {

    this.upimage('carSixPic')
  }, selectImg7: function () {

    this.upimage('carSevenPic')
  },
  selectImg8: function () {

    this.upimage('carEightPic')
  }, selectImg9: function () {

    this.upimage('carNinePic')
  },
  selectImg10: function () {

    this.upimage('carTenPic')
  }, selectImg11: function () {

    this.upimage('carElevenPic')
  },
  selectImg12: function () {

    this.upimage('carTwelvePic')
  },

  bindPickerChange: function (e) {
    console.log(e);
    this.setData({ genderIndex: e.detail.value });
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      IDNumberIndate: e.detail.value
    })
  },
  cityChange: function (e) {
    this.setData({ city: e.detail.value });
  },
  chooseVideo: function () {
    this.upvideo()
  },
  onLoad: function (e) {
    _self = this
  },
 
  formSubmit: function (e) {
    let that =this
    let carurl = _self.data.consturl + '/savecredit'
    let event =e.detail.value
    let userinfo =wx.getStorageSync('userInfo')
    let token = userinfo.token
    let groupid =userinfo.groupid
    console.log(userinfo)
    let list = {
      IDNumber: event.IDNumber,
      IDNumberAddress: event.IDNumberAddress,
      IDNumberIndate: event.IDNumberIndate,
      IdCardBack:  that.data.carTwoPic,
      IdCardFront: that.data.carOnePic,
      NetworkLetterAuthorization: that.data.carThreePic,
      authorization: that.data.carFourPic,
      authorizationLetter: that.data.carFvePic,
      businessArea: event.businessArea,
      clientName: event.clientName,
      createtime: formatTime(new Date()),
      createuser: userinfo.username,
      // creditType: event.creditType,
      
      isNewRecord: true,
      lendingBank: event.lendingBank,
      phone: event.phone,
      userId: userinfo.userid
    }
    wx.request({
      url: carurl,
      data: {
        data: list, token, groupid
      },
      header: {},
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
  }
})