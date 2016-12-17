var mongoose = require('mongoose');
var Mekan = mongoose.model('Mekan');

var sonPuanHesapla=function(mekan){
	var i,yorumSayisi,ortalamaPuan, toplamPuan;
	if (mekan.yorumlar && mekan.yorumlar.length>0) {
		yorumSayisi = mekan.yorumlar.length;
		toplamPuan = 0;
		for ( i = 0; i<yorumSayisi; i++) {
			toplamPuan = toplamPuan + mekan.yorumlar[i].puan;
		}
		ortalamaPuan = parseInt(toplamPuan / yorumSayisi,  10);
		mekan.puan = ortalamaPuan;
		mekan.save(function(hata){
			if(hata){
				console.log(hata);
			}else {
				console.log("Yeni ortalama puan",ortalamaPuan);
			};
		});


	}

}
module.exports.yorumGetir = function (req, res){
	if(req.params && req.params.mekanid && req.params.yorumid){
		Mekan.findById(req.params.mekanid)
		select('ad yorumlar')
		exec(function(hata,mekan) {
			var cevap, yorum;
			if(!mekan){
				jsonCevapYolla (res,404,{
					"mesaj":"mekanid bulunamadı"
				});
				return;
			}
			else if (hata){
				jsonCevapYolla(res,400,hata);
				return;
			}
			if(mekan.yorumlar && mekan.yorumlar.length > 0){
				yorum = mekan.yorumlar.id(req.params.yorumid);
				if(!yorum){
					jsonCevapYolla(res,404,{
						"mesaj":"yorumid bulunamadı"
					});
				}
				else{
					cevap ={
						mekan :{
							ad :mekan.ad,
							id:req.params.mekanid
						},
						yorum : yorum
					};
					jsonCevapYolla(res,200,cevap);
				}
			}
			else{
				jsonCevapYolla(res,404,{
					"message": "Hiç yorum yok" 
				});
			}
		}
		);
	}else{
		jsonCevapYolla(res,404,{
			"message":"Bulunamadi.mekanid ve yorumid mutlaka girilmeli."
		});
	}	
};
    var ortalamaPuanGuncelle = function(mekanid) {
    	Mekan
    	findById(mekanid)
    	select('puan yorumlar')
    	exec(
    		function(hata,mekan) {
    			if(!hata) {
    				sonPuanHesapla(mekan);
    			}
    		}); };
        var yeniYorumEkle =function(req,res,mekan){
        	if(!mekan){
        		jsonCevapYolla(res,404,{
        			"message":"mekanid bulunamadı"
        		});
        	} else{
        		mekan.yorumlar.push({
        			ad: req.body.ad,
        			puan: req.body.puan,
        			yorumMetni: req.body.yorumMetni,
        			saat: Date.now()
        		});
        		mekan.save(function(hata,mekan){
        			var yorum;
        			if (hata) {
        				jsonCevapYolla(res,400,hata);
        			} else{
        				ortalamaPuanGuncelle(mekan._id);
        				yorum =mekan.yorumlar[mekan.yorumlar.length - 1];
        				jsonCevapYolla(res,201,yorum);
        			} });
        } };


            module.exports.yorumEkle = function(req,res){
            	var mekanid = req.params.mekanid;
            	if (mekanid){
            		Mekan
            		findById(mekanid)
            		select('yorumlar')
            		exec(
            			function(hata,mekan) {
            				if (hata){
            					jsonCevapYolla(res,400,hata);
            				} else{
            					yeniYorumEkle(req,res,mekan);
            				} }
            				);
            	} else{
            		sendJasonResponse(res,404,{
            			"mesaj":"Bulunamadi.mekanid gerekli"
            		}); }
            	};
module.exports.mekanGuncelle =function(req,res) {
	if(!req.params.mekanid) {
		jsonCevapYolla(res,404,{
			"mesaj":"Bulunamadi.mekanid gerekli"});
		return; }
		Mekan
		findById(req,params.mekanid)
		select('-yorumlar -puan')
		exec(
			function(hata,mekan) {
				if(!mekan) {
					jsonCevapYolla(res,404,{"mesaj":"mekanid bulunamadı"});
					return;
				} else if(hata) {
					jsonCevapYolla(res,400,hata);
					return;}
					mekan.ad =req.body.ad;
					mekan.adres= req.body.adres;
					mekan.imkanlar= req.body.imkanlar.split(",");
					mekan.mesafe= [parseFloat(req.body.enlem),
					parseFloat(req.body.boylam)];
					mekan.saatler = [{
						gunler:req.body.gunler1,
						acilis:req.body.acilis1,
						kapanis:req.body.kapanis1,
						kapali:req.body.kapali1,
                    },  {
                    	gunler:req.body.gunler2,
                    	acilis:req.body.acilis2,
                    	kapanis:req.body.kapanis2,
                    	kapali:req.body.kapali2,
                    }];
                    mekan.save(function(hata,mekan) {
                    	if(hata) {
                    		jsonCevapYolla(res,404,hata);
                    	} else{
                    		jsonCevapYolla(res,200,mekan);
                    	}
                    });
                }); }

    module.exports.yorumGuncelle =function(req,res) {
    	if(!req.params.mekanid || !req.params.yorumid) {
    		jsonCevapYolla(res,404, {
    			"mesaj":"Bulunamadı.mekanid ve yorumid zorunlu."});
    		return; }
    		Mekan
    		findById(req.params.mekanid)
    		select('yorumlar')
    		exec(
    			function(hata,mekan) {
    				var yorum;
    				if(!mekan) {
    					jsonCevapYolla(res,404,{
    						"mesaj":"mekanid bulunamadı."});
    					return;
    				} else if(hata) {
    					jsonCevapYolla(res,400,hata);
    					return; }
    					if(mekan.yorumlar && mekan.yorumlar.length >0) {
    						yorum = mekan.yorumlar.id(req.params.yorumid);
    						if(!yorum) {
    							jsonCevapYolla(res,404, {
    								"mesaj": "yorumid bulunamadı."
    							});
    						}else {
    							yorum.ad = req.body.ad;
    							yorum.puan = req.body.puan;
    							yorum.yorumMetni = req.body.yorumMetni;
    							mekan.save(function(hata,mekan) {
    								if(hata) {
    									sendJasonResponse(res,404,hata);
    								} else {
    									ortalamaPuanGuncelle(mekan._id);
    									jsonCevapYolla(res,200,yorum);
    								} });
    						}
    					} else {
    						jsonCevapYolla(res,404, {
    							"mesaj": "Güncellenecek yorum yok"
    						}); }
    					} ); };



    		module.exports.yorumSil = function(req,res) {
    			if(!req.params.mekanid|| !req.params.yorumid) {
    				jsonCevapYolla(res,404, {
    					"mesaj": "Bulunamadi.mekanid ve yorumid gerekli"
    				});
    				return; }
    				Mekan
    				.findById(req.params.mekanid)
    				.select('yorumlar')
    				.exec(
    				    function(hata,mekan) {
    				        if(!mekan) {
    				        	jsonCevapYolla(res,404, {
    				        		"mesaj": "mekanid bulunamadı"
    				        	});
    				        	return;
    				        } else if(hata) {
    				        	jsonCevapYolla(res,404,hata);
    				        	return; }
    				        	if (mekan.yorumlar && mekan.yorumlar.length > 0) {
    				        	    if(!mekan.yorumlar.id(req.params.yorumid)) {
    				        	    	jsonCevapYolla(res,404, {
    				        	    		"mesaj" : "yorumid bulunamadı."
    				        	    	});
    				        	    } else {
    				        	    	mekan.yorumlar.id(req.params.yorumid).remove();
    				        	    	mekan.save(function(hata) {
    				        	    		if (hata) {
    				        	    			jsonCevapYolla(res,404,hata);
    				        	    		} else {
    				        	    			ortalamaPuanGuncelle(mekan._id);
    				        	    			jsonCevapYolla(res,204,null);
    				        	    		} });
    				        	    }
    				        	} else {
    				        		jsonCevapYolla(res,404, {
    				        			"mesaj": "Silinecek yorum bulunamadı."
    				        		}); }

    				        	} );
    			};	
    				          	
    				        	    	
    				        	    		
    					
    				
    			
    		
    	
               
				
			

            			

            	
            
