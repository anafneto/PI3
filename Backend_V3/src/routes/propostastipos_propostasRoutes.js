const express = require('express');
const router = express.Router();
const propostatiposPropostasController = require('../controllers/propostastipos_propostasController');

router.get('/', propostatiposPropostasController.propostastipos_propostas_list);
router.get('/:id', propostatiposPropostasController.propostastipos_propostas_detail);
router.post('/create', propostatiposPropostasController.propostastipos_propostas_create);
router.put('/update/:id', propostatiposPropostasController.propostastipos_propostas_update);
router.delete('/delete/:id', propostatiposPropostasController.propostastipos_propostas_delete);

module.exports = router;
