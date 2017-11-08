const crypto = require('crypto');
const ArcHash = require('../index');

describe('ArcHash string tests',()=>{
    it('Should return a md5 hash of a string',()=>{
        const exampleString = 'Hello World';

        const hmac = crypto.createHmac('md5', '');
        hmac.update(exampleString);

        expect(ArcHash.md5(exampleString)).toEqual(hmac.digest('hex'));
    });

    it('Should return a sha256 hash of a string',()=>{
        const exampleString = 'Hello World';

        const hmac = crypto.createHmac('sha256', '');
        hmac.update(exampleString);

        expect(ArcHash.sha256(exampleString)).toEqual(hmac.digest('hex'));
    });
});