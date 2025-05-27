const express = require('express');
const router = express.Router();
const propostasController = require('../controllers/propostasController');

router.get('/', propostasController.propostas_list);
router.get('/:id', propostasController.propostas_detail);
router.post('/create', propostasController.propostas_create);
router.put('/update/:id', propostasController.propostas_update);
router.delete('/delete/:id', propostasController.propostas_delete);

module.exports = router;
