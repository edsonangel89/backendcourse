import supertest from 'supertest'
import { expect } from 'chai'

const request = supertest('http://localhost:8080')

describe('',function() {
    before(() => {
        console.log('Test de carritos')
    })
    it('Metodo GET en /api/carts/{Identificador del carrito}', async () => {
        const pid = '653ff65ed6164c28a6ffcc17'
        const { statusCode, ok, _body} = await request.get('/api/carts/'+ pid)
        expect(statusCode).to.equal(200)
        expect(_body).to.be.a('object')
        expect(_body.docs).to.be.a('array')
    }) 
    it('Metodo POST en /api/carts/{cart id}/product/{product id}', async () => {
        const cid = '653ff65ed6164c28a6ffcc17'
        const pid = '64fc9445ffe84f6b56cf34f3'
        const response = await request
            .post('/api/carts/' + cid + '/product/' + pid)
            .send({quantity: 100})
        expect(response.status).to.be.equal(302)
    })
    it('Metodo DELETE en /api/carts/{cart id}/product/{product id}', async () => {
        const cid = '653ff65ed6164c28a6ffcc17'
        const pid = '64fc9445ffe84f6b56cf34f3'
        const response = await request
            .delete('/api/carts/' + cid + '/product/' + pid)
        expect(response.status).to.be.equal(200)
    }) 
})