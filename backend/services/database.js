const {pool} = require("../config/database");
const db = require('../config/database').pool

async function initialize() {
}

async function close() {
    db.end()
}


async function simpleExecute(statement, blinds = [], opts = {}) {
    return new Promise(async (resolve, reject) => {
            try {
                const [results, fields] = await db.execute(statement, blinds, function (err, results, fields) {
                        if (err) {
                            throw (err)
                        }
                    }
                )
                resolve([results, fields])
            } catch (err) {
                reject(err)

            }

        }
    );
}
async function simpleExecuteWithDate(statement, blinds = [], opts = {}) {
    return new Promise(async (resolve, reject) => {
            try {
                db.execute("SET time_zone = '+06:00'")
                const [results, fields] = await db.execute(statement, blinds, function (err, results, fields) {
                        if (err) {
                            throw (err)
                        }


                    }
                )
                resolve([results, fields])
            } catch (err) {
                reject(err)

            }

        }
    );
}


module.exports.initialize = initialize;
module.exports.close = close;
module.exports.simpleExecute = simpleExecute;
module.exports.simpleExecuteWithDate = simpleExecuteWithDate

