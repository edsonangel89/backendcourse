import supertest from 'supertest'
import { expect } from 'chai'

const request = supertest('http://localhost:8080')

describe('',function() {
    before(() => {
        console.log('Test de productos')
    })
    it('Metodo GET en /api/products', async () => {
        const { statusCode, ok, _body} = await request.get('/api/products')
        expect(statusCode).to.equal(200)
        expect(_body).to.be.a('object')
    })
    it('Metodo GET en /api/products/{Identificador del producto}', async () => {
        const pid = '64fc9445ffe84f6b56cf34f3'
        const { statusCode, ok, _body} = await request.get('/api/products/'+ pid)
        expect(statusCode).to.equal(200)
        expect(_body).to.be.a('object')
        expect(_body.docs).to.be.a('array')
    }) 
    it('Metodo POST en /api/products', async () => {
        const product = {
            title: 'title',
            description: 'description',
            code: 'code',
            price: 1,
            stock: 2,
            category: 'category',
        }
        const response = await request
            .post('/api/products/')
            .send(product)
        if (response.status != 201) {
            console.log('El producto ya existe en la base de datos')
            expect(response.status).to.be.equal(400)
        }
        else {
            expect(response.status).to.be.equal(201)
        }
    })  
})
