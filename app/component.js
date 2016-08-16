module.exports = function() {

  // es6 babel-loader test
  let diff = (x, y) => x-y;

  console.log(diff(5,2)); // result: 3
  // code in /build/customName.js should be converted in normal (non-arrow) javascript function

  var element = document.createElement('div');

  element.innerHTML = 'Injected content';
  element.className = 'innerDiv';
  element.id = 'innerDiv';

  return element;
};

