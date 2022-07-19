const express = require('express')
const router = express.Router();
const ListTDController = require('../controller/ListTDController');
const middleware = require('../controller/middleware');

router.get('/',middleware.verifyToken,ListTDController.getAllList);
router.post('/todo',middleware.verifyToken,ListTDController.createList);
router.delete('/:id',middleware.verifyToken,ListTDController.deleteList);
router.put('/:id',middleware.verifyToken,ListTDController.updateList);
module.exports = router;