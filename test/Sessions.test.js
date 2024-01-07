import supertest from "supertest"
import { expect } from "chai"

const request = supertest('http://localhost:8080/')

describe('', function() {
    before(() => {
        console.log('Prueba de sesiones')
    })
    it('Inicia sesion al usuario ingresando email y contrasena', async () => {
        const user = {
            email: 'admin@admin.com',
            password: 'adminSecret'
        }
        const response = await request
            .post('api/sessions/login')
            .send(user)
            .expect('set-cookie','jwtCookie')
        //expect(response.headers)
        //console.log(response.body)
        //console.log(response.status)
        //console.log(response.headers)
        //done()
    })
    it('Resgistra al usuario ingresando sus datos', async () => {
        const newUser = {
            fname: 'First name',
            lname: 'Last name',
            age: 50,
            email: 'test@tes.com',
            password: '1234'
        }
        const response = await request
            .post('api/sessions/sign')
            .send(newUser)

        //console.log(response.body)
        console.log(response.status)
        //console.log(response.header)
    })
    it('Finaliza sesion del usuario actual', async () => {
        const response = await request.get('api/sessions/logout')
        //console.log(response.body)
        console.log(response.status)
        //console.log(response.header)
    })
})