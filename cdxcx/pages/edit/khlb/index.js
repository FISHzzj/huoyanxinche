// pages/edit/khlb/index.js
let app = getApp()
var that
const { formatTime } = require('../../../utils/util.js')
//上传图片
const picUp = `https://2.honggps.com/picUp`;
//上传视频
const videoUp = `https://2.honggps.com/videoUp`;
//host
const host = 'https://2.honggps.com';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page:'10',
    rows:'1',
    pagesource:'',
    staticUrl: app.staticUrl,
    host:'http://2.honggps.com',
    getClientList:'/getClientList',
    accordionActive: "" ,
    genderIndex: 1,
    mortgageBank: ['中国银行','工商银行', '建设银行'],
    dateValue: "请选择",
    
    applicant: {}, //申请人情况详情
    applicantSpouse: '', //申请人配偶情况详情
    coSolvency: {}, //共同偿责人情况详情
    coSolvencySpouse: {}, //共同偿责人配偶情况详情
    periodization: {}, //申请分期情况详情
    mortgagor: {}, //抵押人情况详情
    workUnitNature1: '', workUnitNature2: '', workUnitNature3: '', workUnitNature4: '',
    workUnitNature5: '', workUnitNature6: '', workUnitNature0: '',
    otherIncome1:'',
    otherIncome2:'',
    incomeMaterials1: '',
    incomeMaterials2: '',
    incomeMaterials3: '',
    incomeMaterials4: '',
    incomeMaterials5: '',
    incomeMaterials6: '',
    incomeMaterials7: '',
    incomeMaterials0: '',
    girl:true,
    girl2: true,
    spousesex:'',
    cospousesex:'',
    // c0
    cosex: '',
    comarriage: '',
    coapplicantRelation: '',
    cowagesIncome: '',
    comanageIncome: '',
    cootherIncome: '',
    cowun0:'',
    cowun1:'',
    cowun2: '',
    cowun3: '',
    cowun4: '',
    cowun5: '',
    cowun6: '',
    fqyt1:'',
    fqyt2: '',
    fqyt3: '',
    fqyt4: '',
    hn0:'',
    hn1: '',
    hn2: '',
    apsex:'',
    applicantid:''
  },
  
  ltstr:function(obj){
    let str =''
    for(let i=0;i<obj.length;i++){
      str = str + ',' + obj[i]
    }
    return str.substring(1,str.length)
  },
  //抵押人情况（抵押人非申请人本人时填写）
  formSubmit6: function (e) {
    let that = this
    let userinfo = wx.getStorageSync("userInfo")
    let token = userinfo.token
    let obj = e.detail.value
    console.log(e.detail.value)
    let thid = that.data.pagesource.mortgagerid
    wx.request({
      url: app.globalData.host + '/updateBusinessApplicationInfo',
      method: 'post',
      data: { mortgager: obj, mortgagerid: thid, token },
      success: function (res) {
        console.log(res)
      }
    })
  },
  //申请分期情况
  formSubmit5: function (e) {
    let that = this
    let userinfo = wx.getStorageSync("userInfo")
    let token = userinfo.token
    let obj = e.detail.value
    console.log(e.detail.value)
    let thid = that.data.pagesource.applyinstallmentid
    wx.request({
      url: app.globalData.host + '/updateBusinessApplicationInfo',
      method: 'post',
      data: { applyinstallment: obj, applyinstallmentid: thid, token },
      success: function (res) {
        console.log(res)
      }
    })
  },
  //共同偿债人配偶情况
  formSubmit4: function (e) {
    let that = this
    let userinfo = wx.getStorageSync("userInfo")
    let token = userinfo.token
    let obj = e.detail.value
    console.log(e.detail.value)
    let thid = that.data.pagesource.applicantspouseid
    wx.request({
      url: app.globalData.host + '/updateBusinessApplicationInfo',
      method: 'post',
      data: { copayerspouse: obj, copayerspouseid: thid, token },
      success: function (res) {
        console.log(res)
      }
    })
  },
  //共同偿债人情况
  formSubmit3: function (e) {
    let that = this
    let userinfo = wx.getStorageSync("userInfo")
    let token = userinfo.token
    let obj = e.detail.value
    console.log(e.detail.value)
    let thid = that.data.pagesource.copayerid
    wx.request({
      url: app.globalData.host + '/updateBusinessApplicationInfo',
      method: 'post',
      data: { copayer: obj, copayerid: thid, token },
      success: function (res) {
        console.log(res)
      }
    })
  },
  //申请人配偶
  formSubmit2:function(e){
    let that = this
    let userinfo = wx.getStorageSync("userInfo")
    let token = userinfo.token
    let obj = e.detail.value
    console.log(e.detail.value)
    let thid = that.data.pagesource.applicantspouseid
    wx.request({
      url: app.globalData.host + '/updateBusinessApplicationInfo',
      method: 'post',
      data: { applicantspouse: obj, applicantspouseid: thid, token },
      success: function (res) {
        console.log(res)
      }
    })
  },
  /*提交*/
  //申请人
  formSubmit:function(e){
    let that = this
    let userinfo = wx.getStorageSync("userInfo")
    let token = userinfo.token
    let obj =e.detail.value
    obj.wagesIncome = obj.wagesIncome == '' ? 0 : obj.wagesIncome
    obj.manageIncome = obj.manageIncome == '' ? 0 : obj.manageIncome
    obj.otherIncome = obj.otherIncome == '' ? 0 : obj.otherIncome
    obj.housingNature = that.ltstr(obj.housingNature)
    obj.incomeMaterials = that.ltstr(obj.incomeMaterials)
    obj.sex = that.ltstr(obj.sex)
    obj.workUnitNature = that.ltstr(obj.workUnitNature)
    let thid = that.data.pagesource.applicantId
    console.log({ applicant:obj,applicantid:thid,token})
    
    wx.request({
      url: app.globalData.host +'/updateBusinessApplicationInfo',
      method:'post',
      data: {data:{applicant: obj, applicantid: thid},token},
      success:function(res){
          console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getClientList:function(){
    let that = this
    let userinfo = wx.getStorageSync("userInfo")
    let token = userinfo.token
    let data = {
      clientname:'',
      status: '',
      groupid: userinfo.groupid,
      page: this.page,
      rows: this.rows
    }
    wx.request({
      url: app.globalData.host+that.data.getClientList,
      method: 'post',
      data: { data: data, token},
      success:function(res){
        console.log(res)
      }
    })
  },
  //获取单列
  onLoad: function(e){
    let data = JSON.parse(e.rowData)
    console.log(data)
    this.setData({
      pagesource: data
    })
    that =this
    this.getApplicantDetails(data)
    this.getCopayerDetails(data)
    this.getApplyInstallmentDetails(data)
    this.getMortgagerDetails(data)
  },
  
  bindPickerChange:function(e){
    console.log(e);
    this.setData({ genderIndex: e.detail.value });
  },
  changeAccordion:function(e){
    var accordionIndex = e.currentTarget.id;
    if (this.data.accordionActive == accordionIndex) { accordionIndex = ''; }
    this.setData({ accordionActive: accordionIndex })
  },
  //查询申请人情况详情
  getApplicantDetails: function (rowData){
    let userinfo =wx.getStorageSync('userInfo')
    let token =userinfo.token
    
    let data = {
      applicantid: rowData.applicantId
    }
    console.log(data)
    wx.request({
      url: app.globalData.host + '/getApplicantDetails',
      method:"post",
      data:{
        data:data,token
      },
      success:function(res){
        console.log(res.data.retobj)
        let arrm = res.data.retobj.incomeMaterials.split(',')
        console.log(arrm)
        that.setData({
          applicant: res.data.retobj,
          workUnitNature1 : res.data.retobj.workUnitNature==1?true:false,
          workUnitNature2:res.data.retobj.workUnitNature == 2 ? true : false,
          workUnitNature3: res.data.retobj.workUnitNature == 3 ? true : false,
          workUnitNature4: res.data.retobj.workUnitNature == 4 ? true : false,
          workUnitNature5: res.data.retobj.workUnitNature == 5 ? true : false,
          workUnitNature6: res.data.retobj.workUnitNature == 6 ? true : false,
          workUnitNature0: res.data.retobj.workUnitNature == 0 ? true : false,
          otherIncome1: res.data.retobj.otherIncome == 4 ? true : false,
          otherIncome2: res.data.retobj.otherIncome == 5 ? true : false,
          incomeMaterials1: arrm.indexOf("1")==0? true : false,
          incomeMaterials2: arrm.indexOf("2")>0? true : false,
          incomeMaterials3: arrm.indexOf("3")>0? true : false,
          incomeMaterials4: arrm.indexOf("4")>0? true : false,
          incomeMaterials5: arrm.indexOf("5")>0? true : false,
          incomeMaterials6: arrm.indexOf("6")>0? true : false,
          incomeMaterials7: arrm.indexOf("7")>0? true : false,
          incomeMaterials0: arrm.indexOf("0")>0? true : false,
          hn0: res.data.retobj.housingNature==0?true:false,
          hn1: res.data.retobj.housingNature == 1 ? true : false,
          hn2: res.data.retobj.housingNature == 2 ? true : false,
          apsex1:res.data.retobj.sex==0?true:false,
          apsex1: res.data.retobj.sex == 1 ? true : false,
        })
        //判断申请人是否有配偶
        if (res.data.retobj.marriage === 1) {
          that.getApplicantSpouseDetails(rowData)
        }
        
      }
    })

  },
  //查询申请人配偶情况详情
  getApplicantSpouseDetails: function (obj){
    let userinfo = wx.getStorageSync('userInfo')
    let token = userinfo.token
    this.setData({
      girl2:true
    })
    let data = {
      applicantspouseid: obj.applicantSpouseId
    }
    console.log(obj)
    wx.request({
      data: {
        data: data, token
      }, method: 'post',
      url: app.globalData.host + '/getApplicantSpouseDetails',
      
      success:function(res){
        console.log(res.data.retobj)
        that.setData({
          applicantSpouse : res.data.retobj,
          spousesex: res.data.retobj.sex==0?true:false
        })
        
      }
    })
  },
  //查询共同偿债人情况详情
  getCopayerDetails:function(rowData){
    let data = {
      copayerid: rowData.copayerId
    }
    let userinfo = wx.getStorageSync('userInfo')
    let token = userinfo.token
    wx.request({
      url: app.globalData.host + '/getCopayerDetails',
      data:{data:data,token},
      method:'post',
      success:function(res){
        console.log(res.data.retobj)
        let arrm = (null==res.data.retobj.incomeMaterials)?[]:res.data.retobj.incomeMaterials.split(',')
        
        that.setData({
          coSolvency:res.data.retobj,
          cosex: res.data.retobj.sex==0?true:false,
          comarriage: res.data.retobj.marriage==1?true:false,
          coapplicantRelation: res.data.retobj.applicantRelation=0?true:false,
          cowagesIncome: null == res.data.retobj.wagesIncome?false:true,
          comanageIncome: null == res.data.retobj.manageIncome?false:true,
          cootherIncome: null == res.data.retobj.otherIncome?false:true,
          cowun0: res.data.retobj.workUnitNature==0? true : false,
          cowun1: res.data.retobj.workUnitNature == 1 ? true : false,
          cowun2: res.data.retobj.workUnitNature == 2 ? true : false,
          cowun3: res.data.retobj.workUnitNature == 3? true : false,
          cowun4: res.data.retobj.workUnitNature == 4? true : false,
          cowun5: res.data.retobj.workUnitNature ==5? true : false,
          cowun6: res.data.retobj.workUnitNature == 6? true : false,
          coincom0: arrm.indexOf("0") == 0 ? true : false,
          coincom1: arrm.indexOf("1") > 0 ? true : false,
          coincom2: arrm.indexOf("2") > 0 ? true : false,
          coincom3: arrm.indexOf("3") > 0 ? true : false,
          coincom4: arrm.indexOf("4") > 0 ? true : false,
          coincom5: arrm.indexOf("5") > 0 ? true : false,
          coincom6: arrm.indexOf("6") > 0 ? true : false,
        })
        that.getCopayerSpouseDetails(rowData)
      }
    })
  },
  //查询申请人配偶情况详情
  getCopayerSpouseDetails:function(rowData){
    let data = {
      copayerspouseid: rowData.copayerSpouseId
    }
    let userinfo = wx.getStorageSync('userInfo')
    let token = userinfo.token
    wx.request({
      data: {
        data: data, token
      }, 
      method: 'post',
      url: app.globalData.host + '/getCopayerSpouseDetails',
      success: function (res) {
        // console.log(res.data.retobj)
        that.setData({
          coSolvencySpouse:res.data.retobj,
          cospousesex: res.data.retobj.sex == 0 ? true : false,
          
        })
      }
    })
  },
  //查询申请分期情况详情
  getApplyInstallmentDetails:function(rowData){
    let data = {
      applyinstallmentid: rowData.applyInstallmentId
    }
    
    let userinfo = wx.getStorageSync('userInfo')
    let token = userinfo.token
    wx.request({
      data: {
        data: data, token
      }, 
      method: 'post',
      url: app.globalData.host + '/getApplyInstallmentDetails',
      success: function (res) {
        console.log(res.data.retobj.guarantyCate)
        console.log(res.data.retobj.guarantyStyle)
        that.setData({
          periodization: res.data.retobj,
          fqyt1: res.data.retobj.InstallmentUSES == 1 ? true : false,
          fqyt2: res.data.retobj.selfCarName == '新车' ? true : false,
          fqyt3: res.data.retobj.selfCarName == '新车' ? true : false,
          fqyt4: res.data.retobj.InstallmentUSES == 0 ? true : false,
          pegst1: res.data.retobj.guarantyStyle == 1 ? true : false,
          pegst2: res.data.retobj.guarantyStyle == 2 ? true : false,
          pegst3: res.data.retobj.guarantyStyle == 0 ? true : false,
          pegC1: res.data.retobj.guarantyStyle == 1 ? true : false,
          pegC2: res.data.retobj.guarantyCate == 2 ? true : false,
          pegC3: res.data.retobj.guarantyCate == 3 ? true : false,
          pegC4: res.data.retobj.guarantyCate == 4 ? true : false,
          pegC5: res.data.retobj.guarantyCate == 5 ? true : false,
          gtee1: res.data.retobj.guarantee ==1 ? true : false,
          gtee2: res.data.retobj.guarantee == 2 ? true : false,
          gtee3: res.data.retobj.guarantee == 3 ? true : false,
          gsc1: res.data.retobj.guaranteeServiceCate == 1 ? true : false,
          gsc2: res.data.retobj.guaranteeServiceCate == 2 ? true : false,
          gsc3: res.data.retobj.guaranteeServiceCate == 3 ? true : false,
          gsc0: res.data.retobj.guaranteeServiceCate == 0 ? true : false,
          scs1:res.data.retobj.scopeService == 1?true:false,
          scs2: res.data.retobj.scopeService == 2 ? true : false,
          scs3: res.data.retobj.scopeService == 3 ? true : false,
        })
        console.log(res.retobj)
      }
    })
  },
  //查询抵押人情况详情
  getMortgagerDetails:function(rowData){
    let data = {
      mortgagerid: rowData.mortgagerId
    }
    let userinfo = wx.getStorageSync('userInfo')
    let token = userinfo.token
    wx.request({ 
      data: {
        data: data, token
      },
      method: 'post',
      url: app.globalData.host + '/getMortgagerDetails',
      success: function (res) {
        console.log(res)
        that.setData({
          mortgagor: res.data.retobj,
          moppt1: res.data.retobj.property == 1 ? true : false,
          moppt2: res.data.retobj.property == 0 ? true : false,
          mosex1: res.data.retobj.sex==0?true:false,
          mosex2: res.data.retobj.sex == 1 ? true : false,
          apr1:res.data.retobj.applicantRelation == 1 ? true : false,
          apr0:res.data.retobj.applicantRelation == 0 ? true : false,
          momg1: res.data.retobj.marriage==1?true:false,
          momg0: res.data.retobj.marriage==0? true : false,
          mcrn1: res.data.retobj.mortgagerCompanyRelation == 1 ? true : false,
          mcrn2: res.data.retobj.mortgagerCompanyRelation == 2 ? true : false,
          mcrn3: res.data.retobj.mortgagerCompanyRelation == 3 ? true : false,
          mcrn4: res.data.retobj.mortgagerCompanyRelation == 4 ? true : false,
          mcrn5: res.data.retobj.mortgagerCompanyRelation == 5 ? true : false,
        })
      }
    })
  },
  //编辑提交
  updateBusinessApplicationInfo:function(){

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