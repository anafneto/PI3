const express = require('express');
const router = express.Router();
const competenciasController = require('../controllers/competenciasController');


router.get('/', competenciasController.competencias_list);
router.get('/:id', competenciasController.competencias_detail);
router.post('/create', competenciasController.competencias_create);
router.put('/update/:id', competenciasController.competencias_update);
router.delete('/delete/:id', competenciasController.competencias_delete);


module.exports = router;
