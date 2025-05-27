const express = require('express');
const router = express.Router();
const empresasController = require('../controllers/empresasController');


router.get('/', empresasController.empresas_list);
router.get('/:id', empresasController.empresas_detail); 
router.post('/create', empresasController.empresas_create);
router.put('/update/:id', empresasController.empresas_update);
router.delete('/delete/:id', empresasController.empresas_delete);




module.exports = router;
