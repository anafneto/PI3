const express = require('express');
const router = express.Router();
const propostasCompetenciasController = require('../controllers/propostas_competenciasController');

router.get('/', propostasCompetenciasController.propostas_competencias_list);
router.get('/:id', propostasCompetenciasController.propostas_competencias_detail);
router.post('/create', propostasCompetenciasController.propostas_competencias_create);
router.put('/update/:id', propostasCompetenciasController.propostas_competencias_update);
router.delete('/delete/:id', propostasCompetenciasController.propostas_competencias_delete);

module.exports = router;
