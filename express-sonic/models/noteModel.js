const { db, DBHelper } = require('../database/database');

// 获取所有Notebook
const getAllNotes = () => {
    const sql = 'SELECT id, name, tags, created_at FROM notes ORDER BY created_at DESC';
    return DBHelper.all(sql);
};

// 通过ID获取Notebook
const getNoteById = (id) => {
    const sql = 'SELECT * FROM notes WHERE id = ?';
    return DBHelper.get(sql, [id]);
};

// 创建新Notebook
const createNote = (data) => {
    const { name, tags } = data;
    const sql = `INSERT INTO notes (name, tags) VALUES (?, ?)`;
    const result = DBHelper.run(sql, [name, tags]);
    return result.lastInsertRowid;
};

// 更新Notebook 
const updateNote = (data) => {
    const { id, name, tags } = data;
    const sql = `UPDATE notes SET name = ?, tags = ? WHERE id = ?`;
    return DBHelper.run(sql, [name, tags, id]);
}

// 更新Notebook Score
const updateNoteScore = (data) => {
    const { id, score } = data;
    const sql = `UPDATE notes SET score = ? WHERE id = ?`;
    return DBHelper.run(sql, [score, id]);
}

// 删除Notebook
const deleteNote = (id) => {
    const sql = `DELETE FROM notes WHERE id = ?`;
    return DBHelper.run(sql, [id]);
};

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    updateNoteScore,
    deleteNote
};