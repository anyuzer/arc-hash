const crypto = require('crypto');
const is = require('arc-is');

class ArcHash {
    static md5(_unknown) {
        switch(is(_unknown)){
            case 'object': return ArcHash.object(_unknown, 'md5');
            case 'array': return ArcHash.array(_unknown, 'md5');
            default:
                const hmac = crypto.createHash('md5');
                hmac.update(_unknown);
                return hmac.digest('hex');
        }
    }

    static sha256(_unknown) {
        switch(is(_unknown)){
            case 'object': return ArcHash.object(_unknown, 'sha256');
            case 'array': return ArcHash.array(_unknown, 'sha256');
            default:
                const hmac = crypto.createHash('sha256');
                hmac.update(_unknown);
                return hmac.digest('hex');
        }
    }

    static object(_object, _algorithm){
        const joinedStr = Object.keys(_object).sort().reduce((_join, _key) => {
            switch (is(_object[_key])) {
                case 'object': return _join + _key + ArcHash.object(_object[_key], _algorithm);
                case 'array': return _join + _key + ArcHash.array(_object[_key], _algorithm);
                default: return _join + _key + String(_object[_key]);
            }
        }, '');
        return (_algorithm === 'sha256' ? ArcHash.sha256(joinedStr) : ArcHash.md5(joinedStr));
    }

    static array(_array, _algorithm) {
        const joinedStr = _array.reduce((_join, _val) => {
            switch (is(_val)) {
                case 'object': return _join + ArcHash.object(_val, _algorithm);
                case 'array': return _join + ArcHash.array(_val, _algorithm);
                default: return _join + String(_val);
            }
        }, '');
        return (_algorithm === 'sha256' ? ArcHash.sha256(joinedStr) : ArcHash.md5(joinedStr));
    }
}

module.exports = ArcHash;