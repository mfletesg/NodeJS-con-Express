const faker = require('faker');
const boom = require('@hapi/boom')


class ProductService {

	constructor(){
		this.products = []
		this.generate()
	}

	generate(){
		const products = [];
	  // const { size } = req.query;
	  const limit = 100;
	  for (let index = 0; index < limit; index++) {
	    this.products.push({
	    	id: faker.datatype.uuid(),
	      name: faker.commerce.productName(),
	      price: parseInt(faker.commerce.price(), 10),
	      image: faker.image.imageUrl(),
	      isBlock : faker.datatype.boolean(),
	    });
	  }
	}

	async create(data){
		const newProduct = {
			id: faker.datatype.uuid(),
			...data
		}
		this.products.push(newProduct)
		return newProduct
	}

	find(resolve, reject){
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(this.products)
			}, 5000)
		})
		// return this.products
	}

	async findOne(id){
		// const name = this.getTotal()
		const product =  this.products.find(item => item.id === id)
		if (!product) {
			throw boom.notFound('product not found')
		}
		if (product.isBlock) {
			throw boom.notFound('product not found')
		}
		return product;
	}

	async update(id, changes){
		const index = this.products.findIndex(item => item.id === id)
		if (index === -1) {
			// throw new Error('product not found')
			throw boom.notFound('product not found')
		}

		const product = this.products[index]
		this.products[index] = {
			...product,
			...changes
		}
		
		return this.products[index]
	}

	async delete(id){
		const index = this.products.findIndex(item => item.id === id)
		if (index === -1) {
			// throw new Error('product not found')
			throw boom.notFound('product not found')
		}
		this.products.splice(index, 1)
		return {id}
	}
}

module.exports = ProductService