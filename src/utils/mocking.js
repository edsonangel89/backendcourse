import { faker } from "@faker-js/faker"

export const generateUsers = (req, res) => {

    const matProducts = []
    for (let i = 0; i < 100; i++) {
        const product = {
            _id: faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.string.uuid(),
            price: faker.commerce.price(),
            status: true,
            stock: faker.number.int({max: 1000}),
            category: faker.commerce.department(),
            thumbnail: []
        }   
        matProducts.push(product)
    }   
    console.log(matProducts)
    return res.status(200).send(matProducts)
}