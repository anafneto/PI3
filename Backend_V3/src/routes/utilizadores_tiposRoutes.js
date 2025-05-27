const express = require('express');
const router = express.Router();
const utilizadoresTiposController = require('../controllers/utilizadores_tiposController');

router.get('/', utilizadoresTiposController.utilizadores_tipos_list);
router.get('/:id', utilizadoresTiposController.utilizadores_tipos_detail);
router.post('/create', utilizadoresTiposController.utilizadores_tipos_create);
router.put('/update/:id', utilizadoresTiposController.utilizadores_tipos_update);
router.delete('/delete/:id', utilizadoresTiposController.utilizadores_tipos_delete);

module.exports = router;
