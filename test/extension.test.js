/* global suite, test */

//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// const vscode = require('vscode');
const myExtension = require('../extension');

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {

  // Defines a Mocha unit test
  test("Should get correct source path", function () {
    assert.equal(myExtension.getSourcePath('/path/a.component.ts'), '/path/a.component');
    assert.equal(myExtension.getSourcePath('/path/a.component.spec.ts'), '/path/a.component');
    assert.equal(myExtension.getSourcePath('/path/a.component.sass'), '/path/a.component');
    assert.equal(myExtension.getSourcePath('/path/a.component.html'), '/path/a.component');

    assert.equal(myExtension.getSourcePath('/path/a.service.ts'), '/path/a.service');
    assert.equal(myExtension.getSourcePath('/path/a.service.spec.ts'), '/path/a.service');

    assert.equal(myExtension.getSourcePath('/path/a.pipe.ts'), '/path/a.pipe');
    assert.equal(myExtension.getSourcePath('/path/a.pipe.spec.ts'), '/path/a.pipe');

    assert.equal(myExtension.getSourcePath('/path/a.directive.ts'), '/path/a.directive');
    assert.equal(myExtension.getSourcePath('/path/a.directive.spec.ts'), '/path/a.directive');
  });
});