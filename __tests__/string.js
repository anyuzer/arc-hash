import crypto from 'crypto';
import ArcHash from "../index.js";

describe('ArcHash string tests',()=>{
    it('Should return a md5 hash of a string',()=>{
        const exampleString = 'Hello World';

        const md5a = crypto.createHash('md5').update(exampleString).digest('hex');
        const md5b = crypto.createHmac('md5', 'secret').update(exampleString).digest('hex');

        expect(ArcHash.md5(exampleString)).toEqual(md5a);
        expect(ArcHash.md5(exampleString, 'secret')).toEqual(md5b);
        expect(md5a).not.toEqual(md5b);
    });

    it('Should return a sha256 hash of a string',()=>{
        const exampleString = 'Hello World';

        const sha256a = crypto.createHash('sha256').update(exampleString).digest('hex');
        const sha256b = crypto.createHmac('sha256', 'secret').update(exampleString).digest('hex');

        expect(ArcHash.sha256(exampleString)).toEqual(sha256a);
        expect(ArcHash.sha256(exampleString, 'secret')).toEqual(sha256b);
        expect(sha256a).not.toEqual(sha256b);
    });

});