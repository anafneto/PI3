const express = require('express');
const router = express.Router();
const gestoresController = require('../controllers/gestoresController');

router.get('/', gestoresController.gestores_list);
router.get('/:id', gestoresController.gestores_detail);
router.post('/create', gestoresController.gestores_create);
router.put('/update/:id', gestoresController.gestores_update);
router.delete('/delete/:id', gestoresController.gestores_delete);

module.exports = router;
