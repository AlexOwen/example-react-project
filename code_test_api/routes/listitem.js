// This module contains routes related to the items in the drop down

/**
 * Create the routes for the drop down list items.
 *
 * @param {object} server - The express server instance
 *
 */
function createRoutes(server) {

    /**
     * GET list items from config
     */

    server.get('/listitem', (_, res) => {
        const listItems = getListItems();
        res.send(listItems);
    });
}

/**
 * Returns the list of items to be sent to the client.
 *
 * @return {object} An array of list items
 *
 */
function getListItems() {
    return [
        'Lots',
        'Loads',
        'More than a reasonable amount'
    ];
}

module.exports = {
    init: function(server) {
        createRoutes(server);
    },
    getListItems
};