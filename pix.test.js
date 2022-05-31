const test = require('node:test');
const assert = require('node:assert').strict;
const Pix = require('./Pix');

test('synchronous passing test', (t) => {
    const pix = new Pix("123e4567-e12b-12d1-a456-426655440000","Teste", "Fulano de Tal", "BRASILIA", "123", 5);
    const value = pix.getPayload();
    const testCode = "00020126670014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400000205Teste52040000530398654045.005802BR5913Fulano de Tal6008BRASILIA6207050312363040E95"
    assert.equal(value, testCode);
  });
  
