const Database = require("better-sqlite3");
const path = require('path');

// 数据库文件路径
const dbPath = path.resolve(__dirname, '../database.sqlite');

// 创建数据库连接
let db;
try {
    db = new Database(dbPath);
    console.log('Connected to SQLite database.');
} catch (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
}

// 初始化表
const initTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            tags TEXT,
            score TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;
    try {
        db.exec(sql);
        console.log('note table ready.');
    } catch (err) {
        console.error('Error creating table:', err.message);
    }
};

// 立即初始化表
initTable();

class DBHelper {
    // 执行查询（返回多条记录）
    static all(sql, params = []) {
        try {
            const stmt = db.prepare(sql);
            return stmt.all(...params);
        } catch (err) {
            console.error('Query error:', err.message);
            return [];
        }
    }

    // 执行查询（返回单条记录）
    static get(sql, params = []) {
        try {
            const stmt = db.prepare(sql);
            return stmt.get(...params);
        } catch (err) {
            console.error('Query error:', err.message);
            return null;
        }
    }

    // 执行写入操作（INSERT, UPDATE, DELETE）
    static run(sql, params = []) {
        try {
            const stmt = db.prepare(sql);
            const result = stmt.run(...params);
            return {
                changes: result.changes,
                lastInsertRowid: result.lastInsertRowid
            };
        } catch (err) {
            console.error('Execute error:', err.message);
            throw err;
        }
    }

    // 开始事务
    static transaction(callback) {
        try {
            db.exec('BEGIN TRANSACTION');
            const result = callback();
            db.exec('COMMIT');
            return result;
        } catch (err) {
            db.exec('ROLLBACK');
            throw err;
        }
    }
}

module.exports = {
    db,
    DBHelper
};