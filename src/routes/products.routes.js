import {Router} from 'express'

const prodsR = Router()

prodsR.get('/', async (req, res) => {

    const lim = req.query.limit

    if (lim) {
        res.status(200).send(await manager.getProducts(lim))
    } else {
        res.status(200).send(await manager.getProducts())
    }

})

prodsR.get('/:pid', async (req, res) => {

    const productId = Number(req.params.pid)
    
    res.status(200).send(await manager.getProductById(productId))
})

prodsR.post('/', async (req, res) => {

})

prodsR.put('/:pid', async (req, res) => {

})

prodsR.delete('/:pid', async (req, res) => {

})

export default prodsR