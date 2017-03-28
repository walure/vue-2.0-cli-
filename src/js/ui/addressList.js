import jquery from '@/js/lib/jquery/1.11.2/jquery.min.js'
const MobileSelectArea=require('@/js/ui/mobile-select-area-master/mobile-select-area.js')
import '@/assets/css/mobile-select-area-master/mobile-select-area.css'
export default class addressList{

		constructor(txt,options){
			//this.tips=new tips(['服务器异常','请稍后再试'],{timeout:3000,isShow:false});
		}
		load (t,callback) {
			this.addressList(t,function(data){
				callback(MobileSelectArea.MobileSelectArea,data.provinceList)
			}.bind(this));
		}
		addressList(t,callback){
			t.$http.get("/defaultapi/dictionary/geography",
			  {
				params: {
				 drpOpenapiLoginId:t.$cookie.get('agtLoginId'),
				 distributorId:t.$route.query.id
				},
			  }).then(function(res){
				if(res.body.code=='failure'){
					
				}else{
					callback(res.body.data);
				}
			  },function(){
				'网络不给力，请稍后再试!'
			});
			

		}

}