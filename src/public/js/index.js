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

    //console.log(obj)
    
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

socket.on('products', (msg) => {

    msg.forEach((value,index,array) => {

        const obj = value
        let {id,title,description,code,price,status,stock,category,thumbnail} = obj

        const table = document.getElementById('table')
        const newRow = document.createElement('tr')
        table.appendChild(newRow)

        const fCol = document.createElement('td')
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
        newRow.appendChild(nCol)

        //console.log(value)
    })

    

})

socket.on('get', (msg) => {
    console.log(msg)
})

socket.on('post', (msg) => {
    console.log(msg)
})







