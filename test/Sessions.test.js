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
        expect(response.status).to.be.equal(302)
        expect(response.headers['set-cookie'].length).to.be.equal(2)
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

        if (response.status != 302) {
            expect(response.status).to.be.equal(401)
            expect(response.text).to.be.equal('Unauthorized')
            console.log('El usuario ya se encuentra registrado')
        }
        else {
            expect(response.status).to.be.equal(302)
        }  
    })
    it('Finaliza sesion del usuario actual', async () => {
        const response = await request
            .get('api/sessions/github') 
        expect(response.status).to.be.equal(302)
    })
})