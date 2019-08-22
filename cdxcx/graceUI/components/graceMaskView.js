// graceUI/components/graceMaskView.js
Component({
  properties: {
    show : {
      type : Boolean,
      value : false
    },
    bgcolor : {
      type : String,
      value : "#FFFFFF"
    },
    width : {
      type : String,
      value : "80%"
    }
  },
  methods: {
    close : function(){
      this.triggerEvent('close');
    }
  }
})
