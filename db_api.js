const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

const query = (command, method = 'all') => {
    return new Promise((resolve, reject) => {
        db[method](command, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

const getAllEntries = async () => {
    const existingPosts = await query('SELECT * FROM entries')
    return existingPosts
}

const getCountOfEntries = async () => {
    const value = await query('SELECT count(id) as count FROM entries')
    return value[0].count
}

const getSelectEntry = async (id = 1) => {
    const entry = await query(`SELECT * FROM entries WHERE id = ${id}`)
    return entry[0]
}

const getRandomEntry = async () => {
    const count = await getCountOfEntries()
    const value = Math.floor(Math.random() * count + 1)
    return await getSelectEntry(value)
}

module.exports = {
    getAllEntries,
    getSelectEntry,
    getRandomEntry,
}
