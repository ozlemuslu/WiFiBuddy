var mongoose = require('mongoose');
var Mekan = mongoose.model('Mekan');

var jsonCevapYolla = function(res, status, content) {
	res.status(status);
	res.json(content);
};

var cevrimler = (function() {
	
	var dunyaYariCap = 6371;
	var radyan2Kilometre = function(radyan) {
		return parseFloat(radyan * dunyaYariCap);
	};
	var kilometre2Radyan = function(mesafe) {
		return parseFloat(mesafe / dunyaYariCap);
	};
	return{
		radyan2Kilometre : radyan2Kilometre,
		kilometre2Radyan : kilometre2Radyan
	};

})();

module.exports.mekanSil = function(req, res) {
	var mekanid = req.params.mekanid;
	if (mekanid) {
		Mekan
		.findByIdAndRemove(mekanid)
		.exec(
			function(hata, mekan) {
			if (hata) {
				jsonCevapYolla(res, 404, hata);
				return; }
				jsonCevapYolla(res,204, null);
            }
            );
	} else {
	    jsonCevapYolla(res,404, {
	    	"mesaj": "mekanid bulunamadı"
	  }); }
	};    			

module.exports.mekanEkle = function(req, res) {
	Mekan.create({
		ad: req.body.ad,
		adres: req.body.adres,
		imkanlar: req.body.imkanlar.split(","),
		mesafe: [parseFloat(req.body.enlem), parseFloat(req.body.boylam)],
		saatler: [
			{
				gunler: req.body.gunler1,
				acilis: req.body.acilis1,
				kapanis: req.body.kapanis1,
				kapali: req.body.kapali1,
			},
			{
				gunler: req.body.gunler2,
				acilis: req.body.acilis2,
				kapanis: req.body.kapanis2,
				kapali: req.body.kapali2,
			}
		]
	}, function(hata, mekan) {
		if(hata){
			jsonCevapYolla(res, 400, hata);
		}
		else{
			jsonCevapYolla(res, 201, mekan);
		}
	});
};

module.exports.mekanlariListele = function(req, res) {

	var boylam = parseFloat(req.query.boylam);
	var enlem = parseFloat(req.query.enlem);

	var nokta = {
		type : "Point",
		coordinates : [enlem, boylam]
	};

	var geoOptions = {
		spherical : true, 
		maxDistance : cevrimler.radyan2Kilometre(20),
		num: 10
	};

	if (!enlem  || !boylam) {
		jsonCevapYolla(res, 404, {"mesaj": "enlem ve boylam zorunlu parametreler"});
		return;
	}

	Mekan.geoNear(nokta, geoOptions, function(hata, sonuclar, stats) {
		var mekanlar = [];
		if (hata) {
			jsonCevapYolla(res, 404, hata);
		}   else{
			sonuclar.forEach(function(doc) {
				mekanlar.push({
					mesafe: cevrimler.kilometre2Radyan(doc.dis),
					ad: doc.obj.ad,
					adres : doc.obj.adres,
					puan : doc.obj.puan,
					imkanlar : doc.obj.imkanlar,
					_id : doc.obj._id
				});
			});

			jsonCevapYolla(res, 200, mekanlar);
		}
	});		

};

module.exports.mekanGetir = function(req, res) {
	if (req.params && req.params.mekanid) {
		Mekan.findById(req.params.mekanId)
			.select('ad yorumlar')
			.exec(function(hata, mekan) {
					var cevap, yorum;
					if (!mekan) {
						jsonCevapYolla(res, 400, {'mesaj': 'mekan id bulunamadı'});
						return;
					}
					else if (hata) {
						jsonCevapYolla(res, 200, mekan);
						return;
					}

					if (mekan.yorumlar && mekan.yorumlar.length > 0) {
						yorum = mekan.yorumlar.id(req.params.yorumid);

						if (!yorum) {
							jsonCevapYolla(res, 400, {'mesaj': 'yorumid bulunamadı'});
							return;
						}
						else{
							cevap = {
								mekan : {
									ad : mekan.ad,
									id : req.params.mekanid
								},
								yorum : yorum
							};
							jsonCevapYolla(res, 200, cevap);
						}
					}
					else{
						jsonCevapYolla(res, 404, "hiç yorum yok");
					}
			});
	}
	else{
		jsonCevapYolla(res, 404, {'mesaj': 'istekte mekanid yok'});
	}
};