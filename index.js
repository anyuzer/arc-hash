import crypto from 'crypto';
import is from 'arc-is';

class ArcHash {
    static md5(_unknown, _secret= "") {
        switch(is(_unknown)){
            case 'object': return ArcHash.object(_unknown, 'md5', _secret);
            case 'array': return ArcHash.array(_unknown, 'md5', _secret);
            default:
                const hmac = _secret ? crypto.createHmac('md5', _secret) : crypto.createHash('md5');
                hmac.update(_unknown);
                return hmac.digest('hex');
        }
    }

    static sha256(_unknown, _secret = "") {
        switch(is(_unknown)){
            case 'object': return ArcHash.object(_unknown, 'sha256', _secret);
            case 'array': return ArcHash.array(_unknown, 'sha256', _secret);
            default:
                const hmac = _secret ? crypto.createHmac('sha256', _secret) : crypto.createHash('sha256');
                hmac.update(_unknown);
                return hmac.digest('hex');
        }
    }

    static object(_object, _algorithm, _secret= ""){
        const joinedStr = Object.keys(_object).sort().reduce((_join, _key) => {
            switch (is(_object[_key])) {
                case 'object': return _join + _key + ArcHash.object(_object[_key], _algorithm, _secret);
                case 'array': return _join + _key + ArcHash.array(_object[_key], _algorithm, _secret);
                default: return _join + _key + String(_object[_key]);
            }
        }, '');
        return (_algorithm === 'sha256' ? ArcHash.sha256(joinedStr, _secret) : ArcHash.md5(joinedStr, _secret));
    }

    static array(_array, _algorithm, _secret = "") {
        const joinedStr = _array.reduce((_join, _val) => {
            switch (is(_val)) {
                case 'object': return _join + ArcHash.object(_val, _algorithm, _secret);
                case 'array': return _join + ArcHash.array(_val, _algorithm, _secret);
                default: return _join + String(_val);
            }
        }, '');
        return (_algorithm === 'sha256' ? ArcHash.sha256(joinedStr, _secret) : ArcHash.md5(joinedStr, _secret));
    }
}

export default ArcHash;