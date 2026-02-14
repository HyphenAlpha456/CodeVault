const express = require('express');
const router = express.Router();

const pasteController = require('../controllers/pasteController');

/**
 * @route   
 * @desc    
 * @access  
 */
router.post('/share', pasteController.createPaste);

/**
 * @route   
 * @desc    
 * @access  
 */
router.get('/:id', pasteController.getPaste);

module.exports = router;