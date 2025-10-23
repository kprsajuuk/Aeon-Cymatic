const noteModel = require('../models/noteModel');

const noteController = {
    getAllNotes: async (req, res) => {
        try {
            const notes = await noteModel.getAllNotes();
            res.json({success: true, data: notes});
        } catch (error) {
            res.status(500).json({ success: false, message: error.message});
        }
    },

    getNoteById: async (req, res) => {
        try {
            const note = await noteModel.getNoteById(req.query.id);
            if (note) {
                res.json({ success: true, data: note});
            } else {
                res.status(404).json({ success: false, message: '用户不存在'});
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    createNote: async (req, res) => {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ success: false, message: '名称为必填项'});
            }
            const newNote = await noteModel.createNote(req.body);
            res.status(201).json({ success: true, message: '创建成功', data: newNote });
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed')) {
                res.status(400).json({ success: false, message: '名称已存在' });
            } else {
                res.status(500).json({ success: false, message: error.message });
            }
        }
    },

    updateNote: async (req, res) => {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ success: false, message: 'id为必填项'});
            }
            const note = await noteModel.updateNote(req.body);
            res.status(201).json({ success: true, message: '更新成功', data: note });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    updateNoteScore: async (req, res) => {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ success: false, message: 'id为必填项'});
            }
            const note = await noteModel.updateNoteScore(req.body);
            res.status(201).json({ success: true, message: '更新成功', data: note });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    deleteNote: async (req, res) => {
        try {
            const result = await noteModel.deleteNote(req.query.id);
            if (result.changes > 0) {
                res.json({ success: true, message: '用户删除成功'});
            } else {
                res.status(404).json({ success: false, message: '用户不存在' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = noteController;