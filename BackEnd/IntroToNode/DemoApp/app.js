var cat = require('cat-me');
var knock = require('knock-knock-jokes');
var faker = require('faker');

// console.log(cat());
// console.log(knock());
for(var i=0; i<10; i++){
	let product = {
		name: faker.commerce.productName(),
		price: faker.commerce.price()
	}
	
	console.log(product.name + " - $" + product.price);
}