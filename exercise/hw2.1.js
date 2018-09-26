const _ = require('lodash');

var c = _.chunk(['a', 'b', 'c', 'd'], 2);
console.log('c=',c);

/*
C:\Users\user\Desktop\ws107a\exercise>node hw2.1.js
c= [ [ 'a', 'b' ], [ 'c', 'd' ] ]
*/