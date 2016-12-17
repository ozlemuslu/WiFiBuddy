var express = require('express');
var router = express.Router();

var ctrlMekanlar = require('../controllers/mekanlar');
var ctrlDigerleri = require('../controllers/digerleri');

// Mekanlara ait sayfalar
router.get('/', ctrlMekanlar.anaSayfa);
router.get('/mekan', ctrlMekanlar.mekanBilgisi);
router.get('/mekan/yorum/yeni', ctrlMekanlar.yorumEkle);

//Diğer sayfalar
router.get('/hakkinda', ctrlDigerleri.hakkinda);
module.exports = router;
