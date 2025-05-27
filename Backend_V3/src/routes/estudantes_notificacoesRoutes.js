const express = require('express');
const router = express.Router();
const estudantesNotificacoesController = require('../controllers/estudantes_notificacoesController');

router.get('/', estudantesNotificacoesController.estudantes_notificacoes_list);
router.get('/:id', estudantesNotificacoesController.estudantes_notificacoes_detail);
router.post('/create', estudantesNotificacoesController.estudantes_notificacoes_create);
router.put('/update/:id', estudantesNotificacoesController.estudantes_notificacoes_update);
router.delete('/delete/:id', estudantesNotificacoesController.estudantes_notificacoes_delete);

module.exports = router;
