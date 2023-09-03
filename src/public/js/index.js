const socket = io()
const title = document.getElementById('title')
const description = document.getElementById('description')
const code = document.getElementById('code')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const thumbnail = document.getElementById('thumbnail')
const form = document.getElementById('data')
const table = document.getElementById('table')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const newProduct = new Product(title.value,description.value,code.value,price.value,stock.value,category.value,thumbnail.value)
    if (newProduct) {
        socket.emit('update', newProduct)
        title.value = ''
        description.value = ''
        code.value = ''
        price.value = ''
        stock.value = ''
        category.value = ''
        thumbnail.value = ''
    }
})

socket.on('update',(msg) => {
    if (msg.id != undefined) {
        const newRow = document.createElement('tr')
        newRow.setAttribute('id',msg.id)
        const id = document.createElement('td')
        id.innerHTML = msg.id
        newRow.appendChild(id)
        const title = document.createElement('td')
        title.innerHTML = msg.title
        newRow.appendChild(title)
        const description = document.createElement('td')
        description.innerHTML = msg.description
        newRow.appendChild(description)
        const code = document.createElement('td')
        code.innerHTML = msg.code
        newRow.appendChild(code)
        const price = document.createElement('td')
        price.innerHTML = msg.price
        newRow.appendChild(price)
        const status = document.createElement('td')
        status.innerHTML = msg.status
        newRow.appendChild(status)
        const stock = document.createElement('td')
        stock.innerHTML = msg.stock
        newRow.appendChild(stock)
        const category = document.createElement('td')
        category.innerHTML = msg.category
        newRow.appendChild(category)
        const thumbnail = document.createElement('td')
        thumbnail.innerHTML = msg.thumbnail
        newRow.appendChild(thumbnail)
        table.appendChild(newRow)
    }
})

socket.on('delete',(msg) => {
    const pid = parseInt(msg)
    const delElement = document.getElementById(pid)
    table.removeChild(delElement)
})

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

function deleteProduct() {
    let socket = io()
    const pid = document.getElementById('pid')
    socket.emit('deleteProduct',pid.value)
    pid.value = ""
}












