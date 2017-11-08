const crypto = require('crypto');
const ArcHash = require('../index');

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

        const md5 = crypto.createHmac('md5', '').update('AIs a StringB5').digest('hex');

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

        const sha256 = crypto.createHmac('sha256', '').update('AIs a StringB5').digest('hex');

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


        expect(ArcHash.sha256(exampleObject)).toEqual('113687bfaf6931fbcb94b78d823f45ed11d16c757c0726d0e844adbd018979da');
        expect(ArcHash.sha256(changedObject)).not.toEqual('113687bfaf6931fbcb94b78d823f45ed11d16c757c0726d0e844adbd018979da');

        expect(ArcHash.md5(exampleObject)).toEqual('7d388f6ec86c79805a534c910471c7c7');
        expect(ArcHash.md5(changedObject)).not.toEqual('7d388f6ec86c79805a534c910471c7c7');

    });

});