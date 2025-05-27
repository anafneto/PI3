const express = require('express');
const router = express.Router();
const noticiasController = require('../controllers/noticiasController');

router.get('/', noticiasController.noticias_list);
router.get('/:id', noticiasController.noticias_detail);
router.post('/create', noticiasController.noticias_create);
router.put('/update/:id', noticiasController.noticias_update);
router.delete('/delete/:id', noticiasController.noticias_delete);

module.exports = router;
