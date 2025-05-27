const express = require('express');
const router = express.Router();
const utilizadoresController = require('../controllers/utilizadoresController');

router.get('/', utilizadoresController.utilizadores_list);
router.get('/:id', utilizadoresController.utilizadores_detail);
router.post('/create', utilizadoresController.utilizadores_create);
router.put('/update/:id', utilizadoresController.utilizadores_update);
router.delete('/delete/:id', utilizadoresController.utilizadores_delete);

module.exports = router;
