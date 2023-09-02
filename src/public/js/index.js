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












