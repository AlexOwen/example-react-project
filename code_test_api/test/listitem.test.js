var expect = require('chai').expect;
const resetCache = require('resnap')();

const listItem = require('../routes/listitem.js');

describe('listitem', function() {

    beforeEach(resetCache);

    describe('GET list items from config', function() {
        
        it('should return a list', function() {
            expect(listItem.getListItems()).to.eql([
                'Lots',
                'Loads',
                'More than a reasonable amount'
            ]);;
        });

    });
});