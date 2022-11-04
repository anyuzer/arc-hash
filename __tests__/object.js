import crypto from 'crypto';
import ArcHash from "../index.js";

describe('ArcHash string tests',()=>{
    it('Should return a consistent md5 hash of an object based on the contents of the object',()=>{
        const exampleObject = {
            'A': 'Is a String',
            'B': 5
        };
        const exampleObject2 = {
            'B': 5,
            'A': 'Is a String'
        };

        const md5 = crypto.createHash('md5').update('AIs a StringB5').digest('hex');

        expect(ArcHash.md5(exampleObject)).toEqual(md5);
        expect(ArcHash.md5(exampleObject2)).toEqual(md5);
    });

    it('Should return a consistent md5 hash of an object based on the contents of the object',()=>{
        const exampleObject = {
            'A': 'Is a String',
            'B': 5
        };
        const exampleObject2 = {
            'B': 5,
            'A': 'Is a String'
        };

        const sha256 = crypto.createHash('sha256').update('AIs a StringB5').digest('hex');

        expect(ArcHash.sha256(exampleObject)).toEqual(sha256);
        expect(ArcHash.sha256(exampleObject2)).toEqual(sha256);
    });


    it('Should accept a complex object and reduce it to a consistent hash based on state',()=>{
        const exampleObject = {
            'B': 5,
            'D': {
                'Zebra': 'Camel',
                'Antelope': [0,2,
                    {
                        'Deep':'Mind'
                    },
                    ['omega','alpha']
                ]
            },
            'A': 'Is a String',
        };

        //Changed a single case
        const changedObject = {
            'B': 5,
            'D': {
                'zebra': 'Camel',
                'Antelope': [0,2,
                    {
                        'Deep':'Mind'
                    },
                    ['omega','alpha']
                ]
            },
            'A': 'Is a String',
        };


        expect(ArcHash.sha256(exampleObject)).toEqual('b56306658fa4c164b3b501843fdfe4fb78a9c55336000e94b766c09c4122cecb');
        expect(ArcHash.sha256(changedObject)).not.toEqual('b56306658fa4c164b3b501843fdfe4fb78a9c55336000e94b766c09c4122cecb');

        expect(ArcHash.md5(exampleObject)).toEqual('9ef2b1c302591c7429688ceb865ca0b9');
        expect(ArcHash.md5(changedObject)).not.toEqual('9ef2b1c302591c7429688ceb865ca0b9');
    });

});