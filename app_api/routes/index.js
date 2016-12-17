var express = require('express');
var router = express.Router();

var ctrlMekanlar = require('../controllers/mekanlar');
var ctrlYorumlar = require('../controllers/yorumlar');

router.get('/mekanlar', ctrlMekanlar.mekanlariListele);
router.post('/mekanlar', ctrlMekanlar.mekanEkle);
router.get('/mekanlar/:mekanid', ctrlMekanlar.mekanGetir);
// router.put('/mekanlar/:mekanid', ctrlMekanlar.mekanGuncelle);
router.delete('/mekanlar/:mekanid', ctrlMekanlar.mekanSil);

// router.post('/mekanlar/:mekanid/yorumlar', ctrlYorumlar.yorumEkle);
// router.get('/mekanlar/:mekanid/yorumlar/:yorumid', ctrlYorumlar.yorumGetir);
// router.put('/mekanlar/:mekanid/yorumlar/:yorumid', ctrlYorumlar.yorumGuncelle);
// router.delete('/mekanlar/:mekanid/yorumlar/:yorumid', ctrlYorumlar.yorumSil);

module.exports = router;
