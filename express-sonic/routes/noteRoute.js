const express = require('express');
const router = express.Router();
const controller = require('../controller/noteController');

router.get('/', controller.getAllNotes);

router.get('/note', controller.getNoteById);

router.post('/', controller.createNote);

router.put('/', controller.updateNote);
router.put('/score', controller.updateNoteScore);

router.delete('/', controller.deleteNote);

module.exports = router;