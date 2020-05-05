var expect = require('chai').expect;
const resetCache = require('resnap')();

const answer = require('../routes/answer.js');
const listItems = require('../routes/listitem.js');

describe('answer', function() {

    beforeEach(resetCache);

    describe('POST a user\'s answer to the server', function() {
        
        it('should accept a valid request', async function() {
            const data = {
                email: 'test@email.com',
                listOption: listItems.getListItems()[0],
                comment: 'This is a comment.\nWith two lines.'
            };
            expect(await answer.postAnswer(data)).to.be.true;
        });
        
        it('should not accept an empty request', async function() {
            const data = undefined;
            expect(await answer.postAnswer(data)).to.be.false;
        });
        
        it('should not accept an invalid email address', async function() {
            const data = {
                email: 'test@',
                listOption: listItems.getListItems()[0],
                comment: 'This is a comment.\nWith two lines.'
            };
            expect(await answer.postAnswer(data)).to.be.false;
        });
        
        it('should not accept an email address with the wrong type', async function() {
            const data = {
                email: false,
                listOption: listItems.getListItems()[0],
                comment: 'This is a comment.\nWith two lines.'
            };
            expect(await answer.postAnswer(data)).to.be.false;
        });
        
        it('should not accept an undefined email address', async function() {
            const data = {
                email: undefined,
                listOption: listItems.getListItems()[0],
                comment: 'This is a comment.\nWith two lines.'
            };
            expect(await answer.postAnswer(data)).to.be.false;
        });
        
        it('should not accept an empty email address', async function() {
            const data = {
                email: '',
                listOption: listItems.getListItems()[0],
                comment: 'This is a comment.\nWith two lines.'
            };
            expect(await answer.postAnswer(data)).to.be.false;
        });
        
        it('should not accept an undefined list option', async function() {
            const data = {
                email: 'test@email.com',
                listOption: undefined,
                comment: 'This is a comment.\nWith two lines.'
            };
            expect(await answer.postAnswer(data)).to.be.false;
        });
        
        it('should not accept an empty list option', async function() {
            const data = {
                email: 'test@email.com',
                listOption: '',
                comment: 'This is a comment.\nWith two lines.'
            };
            expect(await answer.postAnswer(data)).to.be.false;
        });
        
        it('should not accept an invalid list option', async function() {
            const data = {
                email: 'test@email.com',
                listOption: 'Item X',
                comment: 'This is a comment.\nWith two lines.'
            };
            expect(await answer.postAnswer(data)).to.be.false;
        });
        
        it('should not accept a list option with the wrong type', async function() {
            const data = {
                email: 'test@email.com',
                listOption: true,
                comment: 'This is a comment.\nWith two lines.'
            };
            expect(await answer.postAnswer(data)).to.be.false;
        });
        
        it('should not accept an undefined comment', async function() {
            const data = {
                email: 'test@email.com',
                listOption: listItems.getListItems()[0],
                comment: undefined
            };
            expect(await answer.postAnswer(data)).to.be.false;
        });
        
        it('should accept an empty comment', async function() {
            const data = {
                email: 'test@email.com',
                listOption: listItems.getListItems()[0],
                comment: ''
            };
            expect(await answer.postAnswer(data)).to.be.true;
        });
        
        it('should not accept a comment with the wrong type', async function() {
            const data = {
                email: 'test@email.com',
                listOption: listItems.getListItems()[0],
                comment: 6
            };
            expect(await answer.postAnswer(data)).to.be.false;
        });

    });

    describe('GET users\' answers from the server', function() {

        it('should return an array', async function() {
            expect(Array.isArray(await answer.getAllAnswers())).to.be.true;
        });

    });
    
});