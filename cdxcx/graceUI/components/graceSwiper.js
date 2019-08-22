// graceUI/components/graceSwiper.js
Component({
  properties: {
		swiperHeight:{
			type:Number,
			value:100
		},
		swiperId :{
			type : String,
			value: ""
		},
		items : {
			type : Object,
			value : []
		},
		indicatorDots:{
			type:Boolean,
			value:true
		},
		interval : {
			type:Number,
			value : 5000
		},
    swiperHeight : {
      type: Number,
      value: 100
    }
  },
  data: {
		runCount : 0
	}
});