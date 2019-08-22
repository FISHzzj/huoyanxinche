let app = getApp();
Page({
  data: {
    staticUrl: app.staticUrl,
    // 为空时默认隐藏所有项目
    accordionActive: "grace-accordion-1"
  },
  onLoad: function (options) {
  },
  changeAccordion: function (e) {
    var accordionIndex = e.currentTarget.id;
    if (this.data.accordionActive == accordionIndex) { accordionIndex = ''; }
    this.setData({ accordionActive: accordionIndex })
  }
})