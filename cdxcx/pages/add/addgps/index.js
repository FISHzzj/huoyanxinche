var _self=''
const { formatTime} =require('../../../utils/util.js')
//上传图片
const picUp = `https://2.honggps.com/picUp`;
//上传视频
const videoUp = `https://2.honggps.com/videoUp`;
//host
const host = 'https://2.honggps.com';
Page({
  data: {
    genderIndex: 0,
    gender: ['男', '女'],
    dateValue: "请选择",
    city: '请选择',
    idCard1: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    idCard2: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    videosrc:'',
    consturl:'https://2.honggps.com',
    carVideo:'',
    //填写内容
    isNewRecord: true,
    clientName: '',
    certificateNumber: '',
    vin: '',
    auditStatus: '',
    InstallImage:"https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png",
    certificateNumber:"",
    clientName:"",
    createtime:"",
    createuser:"",
    id:'',
    imei:"",
    installationVideo:"",
    isSignal:0,
    istrue:false
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
            if (v == 'InstallImage') {
              that.setData({
                InstallImage: host + m.retobj
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
  chooseVideo: function () {
    this.upvideo()
  },
  selectImg1: function () {
    this.upimage('InstallImage')
  },
  bindPickerChange: function (e) {
    console.log(e);
    this.setData({ genderIndex: e.detail.value });
  },
 
  bindDateChange:function(e){
    this.setData({ dateValue: e.detail.value });
  },
  cityChange: function (e) {
    this.setData({ city: e.detail.value });
  },
  onLoad: function (e) {
    let userinfo =wx.getStorageSync('userInfo')
    _self = this
   
    // let j2m=JSON.parse(e.rowData)
    // console.log(j2m.InstallImage)
    // if(j2m.isSignal==1){
    //   this.setData({
    //     istrue:true
    //   })
    // }
    // _self.setData({
    //   InstallImage: j2m.InstallImage,
    //   certificateNumber: j2m.certificateNumber,
    //   clientName: j2m.clientName,
    //   createtime: j2m.createtime,
    //   createuser: j2m.createuser,
    //   id: j2m.id,
    //   imei: j2m.imei,
    //   installationVideo: j2m.installationVideo,
    //   isSignal: j2m.isSignal
    // })
  },
  formSubmit: function (e) {
    let userinfo =wx.getStorageSync('userInfo')
    let carurl = _self.data.consturl +'/saveGPS'
    console.log(e.detail.value);
    let hev=e.detail.value
    let token = wx.getStorageSync('token')
    let list={
      InstallImage: _self.data.InstallImage,
      certificateNumber: hev.certificateNumber,
      clientName: hev.clientName,
      createtime: formatTime(new Date()),
      createuser: userinfo.username,
      imei: hev.imei,
      installationVideo: _self.data.carVideo,
      isNewRecord: true,
      isSignal: hev.isSignal
    }
   
    console.log(list)
    wx.request({
      url: carurl,
      data: {
        data: list, token
      },
      method:"POST",
      success:function(res){
        console.log(res)
        wx.showToast({
          title: res.data.errmsg,
          icon: "none"
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
      },1500)
      }
    })
  }
})