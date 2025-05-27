const express = require('express');
const router = express.Router();
const departamentosController = require('../controllers/departamentosController');


router.get('/', departamentosController.departamentos_list);
router.get('/:id', departamentosController.departamentos_detail);
router.post('/create', departamentosController.departamentos_create);
router.put('/update/:id', departamentosController.departamentos_update);
router.delete('/delete/:id', departamentosController.departamentos_delete);



module.exports = router;
