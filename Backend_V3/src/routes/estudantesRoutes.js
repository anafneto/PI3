const express = require('express');
const router = express.Router();
const estudantesController = require('../controllers/estudantesController');

router.get('/', estudantesController.estudantes_list);
router.get('/:id', estudantesController.estudantes_detail);
router.post('/create', estudantesController.estudantes_create);
router.put('/update/:id', estudantesController.estudantes_update);
router.delete('/delete/:id', estudantesController.estudantes_delete);

module.exports = router;
