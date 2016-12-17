
module.exports.anaSayfa = function(req, res){
  res.render('mekanlar-liste', { title: 'WiFiBuddy-Bedava İnternet',
  	pageHeader:{
  		baslik:'WiFiBuddy',
  		aciklama:'Yakınınızda WiFi Hizmeti sunan mekanları bulun!'
  	},

  	mekanlar:[
  	{
      ad: 'Starbucks',
      adres: 'Centrum Garden',
      puan: 3,
      imkanlar: ['Dünya Kahveleri', 'Yiyecek', 'Hızlı Wifi Bağlantısı'],
      mesafe: '100m'
    },

    
    {
      ad: 'Alaçatı Muhallebicisi',
      adres: 'Centrum Garden',
      puan: 4,
      imkanlar: ['Sıcak,Soğuk İçecekler', 'Yemek', 'Ücretsiz WiFi'],
      mesafe: '150m'
    },
    {
      ad: 'David People',
      adres: 'İstasyon Caddesi',
      puan: 2,
      imkanlar: ['Sıcak,Soğuk İçecekler', 'Dünya Mutfakları', 'Ücretsiz WiFi'],
      mesafe: '900m'
    }
    ]
  });
};

module.exports.mekanBilgisi = function(req, res){
  res.render('mekan-detay', 
  { 
    title: 'Mekan Bilgisi',
    sayfaBaslik: {
      title: 'Starbucks'
    },
    yanMetin: {
      icerik: 'Starbucks WiFi Buddy\'de yer alıyor. Ücretsiz WiFi imkanı sunuyor. Kablosuz İnternet Şifresi:12345678',
    },
    mekanBilgisi: {
      ad: 'Starbucks',
      adres: 'Centrum Garden',
      puan: 3,
      imkanlar: ['Dünya Kahveleri', 'Yiyecek', 'Hızlı Wifi Bağlantısı'],
      koordinatlar: {
        enlem: 37.781885,
        boylam: 30.566034
      },
      saatler: [{
        gunler: 'Pazartesi - Cuma',
        acilis: '7:00',
        kapanis: '23:00',
        kapali: false
      }, {
        gunler: 'Cumartesi',
        acilis: '8:00',
        kapanis: '17:00',
        kapali: false
      }, {
        gunler: 'Pazar',
        kapali: true
      }],
      yorumlar: [{
        ad: 'Asım Sinan Yüksel',
        puan: 3,
        saat: '26 Ekim 2016',
        yorumMetni: 'Moşa içmeden duramıyorum'
      }]
    }
  });
};

module.exports.yorumEkle = function(req, res){
  res.render('yorum-ekle', { title: 'Yorum Ekle',
  sayfaBaslik:'Yorum Ekle' 

});
};

