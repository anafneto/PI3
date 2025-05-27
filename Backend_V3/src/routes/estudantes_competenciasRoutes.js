const express = require('express');
const router = express.Router();
const estudantesCompetenciasController = require('../controllers/estudantes_competenciasController');

router.get('/', estudantesCompetenciasController.estudantes_competencias_list);
router.get('/:id', estudantesCompetenciasController.estudantes_competencias_detail);
router.post('/create', estudantesCompetenciasController.estudantes_competencias_create);
router.put('/update/:id', estudantesCompetenciasController.estudantes_competencias_update);
router.delete('/delete/:id', estudantesCompetenciasController.estudantes_competencias_delete);

module.exports = router;
