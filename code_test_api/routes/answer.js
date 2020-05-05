// This module contains routes related to the answers users give

const listItems = require('./listitem.js');
const MongoClient = require('mongodb').MongoClient;

/**
 * Create the routes for the user's answers.
 *
 * @param {object} server - The express server instance
 *
 */
function createRoutes(server) {

    /**
     * POST a user's answer to the database
     */

    server.post('/answer', async (req, res) => {
        if (typeof req.body === 'object') {
            if (await postAnswer(req.body)) {
                res.sendStatus(200);
            } else {
                res.sendStatus(422);
            }
        } else {
            res.sendStatus(400);
        }
    });


    /**
     * GET users' answers from the database
     * */

    server.get('/answer', async (req, res) => {
        const answers = await getAllAnswers();
        res.send(answers);
    });


    /**
     * GET delete answers easily (should be a DELETE, but GET is easier to call, obviously not for production)
     * */

    server.get('/delete_answers', async (req, res) => {
        await deleteAllAnswers();
        res.sendStatus(200);
    });
}

/**
 * Saves the user's answer to the database.
 *
 * @param {object} data - An object containing the user's form data
 * @return {boolean} Success variable
 *
 * @example
 *
 *     postAnswer({
 *         email: 'test@email.com',
 *         listOption: 'Lots',
 *         comment: 'A comment.'
 *     })
 */
async function postAnswer(data) {
    if (validateAnswer(data)) {

        let client;
        try {
            client = await MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true });
        } catch (err) {
            console.error('Failed to connect to mongodb instance');
            return false;
        }

        let db;
        if (client) {
            try {
                db = await client.db('code_test_alex_owen');
            } catch (err) {
                console.error('Failed to connect to database');
                return false;
            }
        }

        let collection;
        if (db) {
            try {
                collection = await db.collection('answers');
            } catch (err) {
                try {
                    collection = await db.createCollection('answers');
                } catch (e) {
                    console.error('Failed to get or create collection');
                    return false;
                }
            }
        }

        if (collection) {
            try {
                await collection.insertOne({
                    email: data.email,
                    listOption: data.listOption,
                    comment: data.comment
                });
            } catch (err) {
                console.error('Failed to save item to database');
                return false;
            }
        }

        return true;
    } else {
        return false;
    }
}

/**
 * Consolidated validation of the object sent by the user.
 *
 * @param {object} data - An object containing the user's form data
 * @return {boolean} Success variable
 *
 */
function validateAnswer(data) {
    return typeof data === 'object'
        && validateEmail(data.email)
        && validateListOption(data.listOption)
        && validateComment(data.comment);
}

/**
 * Validates the user's email against the HTML5 validation regex (to match the front end).
 *
 * @param {string} email - the user's email
 * @return {boolean} Success variable
 *
 */
function validateEmail(email) {
    // HTML5 email validation regex from: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Validation
    return typeof email === 'string' 
        && email.length > 0 
        && /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
}

/**
 * Validates the user's chosen list option against the valid list options.
 *
 * @param {string} listOption - the user's chosen list option
 * @return {boolean} Success variable
 *
 */
function validateListOption(listOption) {
    return typeof listOption === 'string' 
        && listItems.getListItems().includes(listOption);
}

/**
 * Validates the user's comment.
 *
 * @param {string} comment - the user's comment
 * @return {boolean} Success variable
 *
 */
function validateComment(comment) {
    return typeof comment === 'string';
}

/**
 * Retrieves all submitted answers from the database.
 *
 * @return {object} An array of results, or empty if an error occurred or none found
 *
 */
async function getAllAnswers() {
    
    let client;
    try {
        client = await MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true });
    } catch (err) {
        console.error('Failed to connect to mongodb instance');
        return [];
    }

    let db;
    if (client) {
        try {
            db = await client.db('code_test_alex_owen');
        } catch (err) {
            console.error('Failed to connect to database');
            return [];
        }
    }

    let collection;
    if (db) {
        try {
            collection = await db.collection('answers');
        } catch (err) {
            try {
                collection = await db.createCollection('answers');
            } catch (e) {
                console.error('Failed to get or create collection');
                return [];
            }
        }
    }

    let items = [];
    if (collection) {
        try {
            const cursor = await collection.find();
            items = await cursor.toArray();
        } catch (err) {
            console.error('Failed to retrieve items');
            return [];
        }
    }
    
    client.close();

    return items;
}

/**
 * A helper function for development that deletes all entries from the database. NOT FOR PRODUCTION.
 *
 * @return {boolean} Success variable
 *
 */
async function deleteAllAnswers() {
    let client;
    try {
        client = await MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true });
    } catch (err) {
        console.error('Failed to connect to mongodb instance');
        return false;
    }

    let db;
    if (client) {
        try {
            db = await client.db('code_test_alex_owen');
        } catch (err) {
            console.error('Failed to connect to database');
            return false;
        }
    }

    let collection;
    if (db) {
        try {
            collection = await db.collection('answers');
        } catch (err) {
            try {
                collection = await db.createCollection('answers');
            } catch (e) {
                console.error('Failed to get or create collection');
                return false;
            }
        }
    }

    let items = [];
    if (collection) {
        try {
            const cursor = await db.dropCollection('answers');
        } catch (err) {
            console.error('Failed to drop collection');
            return false;
        }
    }

    return true;
}

module.exports = {
    init: function(server) {
        createRoutes(server);
    },
    postAnswer,
    getAllAnswers
};