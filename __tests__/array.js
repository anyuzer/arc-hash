const crypto = require('crypto');
const ArcHash = require('../index');

describe('ArcHash string tests',()=>{
    it('Should return a consistent md5 hash of an array based on the contents of the array',()=>{
        const exampleArray1 = ['Hello', 'World'];
        const exampleArray2 = ['World', 'Hello'];

        const md5a = crypto.createHash('md5').update('HelloWorld').digest('hex');
        const md5b = crypto.createHash('md5').update('WorldHello').digest('hex');

        expect(ArcHash.md5(exampleArray1)).toEqual(md5a);
        expect(ArcHash.md5(exampleArray2)).toEqual(md5b);
    });

    it('Should return a consistent sha256 hash of an array based on the contents of the array',()=>{
        const exampleArray1 = ['Hello', 'World'];
        const exampleArray2 = ['World', 'Hello'];

        const sha256a = crypto.createHash('sha256').update('HelloWorld').digest('hex');
        const sha256b = crypto.createHash('sha256').update('WorldHello').digest('hex');

        expect(ArcHash.sha256(exampleArray1)).toEqual(sha256a);
        expect(ArcHash.sha256(exampleArray2)).toEqual(sha256b);
    });
});