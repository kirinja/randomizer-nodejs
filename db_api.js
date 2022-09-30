const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
const csv = require('csv')

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

const insert = async (rows) => {
    rows.forEach((entry) => {
        const data = entry.split(';')
        const title = data[0]
        const description = data[1]
        insertEntry(title, description)
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

/**
 *
 * @param {string[]} rows
 * @returns
 */
const recreateEntries = async (rows) => {
    await clearTable()
    insert(rows)
}

const insertEntry = async (title, description) => {
    await query(
        `INSERT INTO entries (title, description) VALUES ('${title}', '${description}')`
    )
}

const append = async (rows) => {
    await insert(rows)
}

const clearTable = async () => {
    await query('DELETE FROM entries')
    await query('DELETE FROM sqlite_sequence WHERE name = "entries"')
}

const exportTableToCSV = async () => {
    // TODO
    //  export current entries table to a string which we can use to create our CSV file
    const data = await query('SELECT * FROM entries')
    let csvData = 'Title;Description\n'
    data.forEach((entry) => {
        csvData = csvData.concat(`${entry.title};${entry.description}\n`)
    })
    return csvData
}

module.exports = {
    getAllEntries,
    getSelectEntry,
    getRandomEntry,
    recreateEntries,
    exportTableToCSV,
    clearTable,
    append,
}
