class Product {
    
    constructor(title,description,code,price,stock,category,thumbnail) {
        
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.stock = stock
        this.category = category
        this.thumbnail = []

    }  

}

function formData() {
    let socket = io()
    
    let title = document.getElementById('title')
    let description = document.getElementById('description')
    let code = document.getElementById('code')
    let price = document.getElementById('price')
    let stock = document.getElementById('stock')
    let category = document.getElementById('category')
    let thumbnail = document.getElementById('thumbnail')

    const obj = new Product(title.value,description.value,code.value,price.value,stock.value,category.value,thumbnail.value)
    
    socket.emit('newProduct', obj)

    title.value = ""
    description.value = ""
    code.value = ""
    price.value = ""
    stock.value = ""
    category.value = ""
    thumbnail.value = ""
    
}

function deleteProduct() {
    let socket = io()

    const pid = document.getElementById('pid')

    socket.emit('deleteProduct',pid.value)

    pid.value = ""

}

let socket = io()

socket.on('products',async (prods) => {

    const table = document.getElementById('table')
    const elements = table.getElementsByTagName('tr')
    const currElms = elements.length
    //console.log(elements.length)

    /*elements.forEach(element => {
        table.removeChild('tr')
    })*/

    if (elements.length == 1) {

    prods.forEach(element => {
        //console.log(element)
        let {id,title,description,code,price,status,stock,category,thumbnail} = element

        const newRow = document.createElement('tr')
        table.appendChild(newRow)
        for (const prop in element) {
            const col = document.createElement('td')
            newRow.appendChild(col)
            col.innerHTML = element[prop]
            //console.log(element[prop])
        }

        })
    } else {
        const div = document.getElementById('data')
        document.getElementById('table').removeChild('div')
        console.log(elements)
       /* elements.forEach(element => {
            table.removeChild('tr')
        })*/

    }
        const finElms = elements.length
        console.log(elements.length)

    /*
    let {id,title,description,code,price,status,stock,category,thumbnail} = msg

    const table = document.getElementById('table')
    const newRow = document.createElement('tr')
    table.appendChild(newRow)
    const props = Object.getOwnPropertyNames(msg)
    console.log(props)
    for (const prop in msg) {
        const col = document.createElement('td')
        newRow.appendChild(col)
        col.innerHTML = msg[prop]
        console.log(msg[prop])
    }*/

    /*const fCol = document.createElement('td')
    const sCol = document.createElement('td')
    const tCol = document.createElement('td')
    const foCol = document.createElement('td')
    const fiCol = document.createElement('td')
    const siCol = document.createElement('td')
    const seCol = document.createElement('td')
    const eCol = document.createElement('td')
    const nCol = document.createElement('td')

    fCol.innerHTML = id
    sCol.innerHTML = title
    tCol.innerHTML = description
    foCol.innerHTML = code
    fiCol.innerHTML = price
    siCol.innerHTML = status
    seCol.innerHTML = stock
    eCol.innerHTML = category
    nCol.innerHTML = thumbnail

    newRow.appendChild(fCol)
    newRow.appendChild(sCol)
    newRow.appendChild(tCol)
    newRow.appendChild(foCol)
    newRow.appendChild(fiCol)
    newRow.appendChild(siCol)
    newRow.appendChild(seCol)
    newRow.appendChild(eCol)
    newRow.appendChild(nCol)*/

    })

socket.on('get', async (msg) => {

    console.log(msg)
    const table = document.getElementById('tableHome')
    
    await msg.forEach(element => {
        const row = document.createElement('tr')
        table.appendChild(row)
        console.log(Object.getOwnPropertyNames(element))
        console.log(Object.getOwnPropertyDescriptors(element))
       /*element[Symbol.iterator] = () => {
            const col = document.createElement('td')
            col.innerHTML = x
            row.appendChild(col)
        }*/

        
    }
            )
    })

    /*for (let x of msg) {
        const row = document.createElement('tr')
        table.appendChild(row)
        x.forEach(function obj(value,index) {
            const col = document.createElement('td')
            col.innerHTML = value
            row.appendChild(col)
        })
    }*/



    
    //msg.forEach((value,index,array) => {})








