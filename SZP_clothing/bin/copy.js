const fs = require('fs-extra'),
    	path = require('path');

const output = 'adminDist'
let root = path.join(__dirname, '..'),
	  target = path.join(root, output)

fs.copy(root + '/image', target + '/image', function(err) {

});
fs.copy(root + '/fonts', target + '/fonts', function(err) {

});
