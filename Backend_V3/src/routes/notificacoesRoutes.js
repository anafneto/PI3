const express = require('express');
const router = express.Router();
const notificacoesController = require('../controllers/notificacoesController');

router.get('/', notificacoesController.notificacoes_list);
router.get('/:id', notificacoesController.notificacoes_detail);
router.post('/create', notificacoesController.notificacoes_create);
router.put('/update/:id', notificacoesController.notificacoes_update);
router.delete('/delete/:id', notificacoesController.notificacoes_delete);

module.exports = router;
