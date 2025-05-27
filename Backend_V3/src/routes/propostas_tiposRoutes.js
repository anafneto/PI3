const express = require('express');
const router = express.Router();
const propostasTiposController = require('../controllers/propostas_tiposController');

router.get('/', propostasTiposController.propostas_tipos_list);
router.get('/:id', propostasTiposController.propostas_tipos_detail);
router.post('/create', propostasTiposController.propostas_tipos_create);
router.put('/update/:id', propostasTiposController.propostas_tipos_update);
router.delete('/delete/:id', propostasTiposController.propostas_tipos_delete);

module.exports = router;
