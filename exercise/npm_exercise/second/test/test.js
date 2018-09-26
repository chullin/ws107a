const assert = require('assert');
const chunk = require('../lib/chunk')

describe('lodash.chunk',function(){
    it("_.chunk() equalTo Hello", function () {
        assert.deepStrictEqual(lodash.chunk(), 'Hello')
    })
})