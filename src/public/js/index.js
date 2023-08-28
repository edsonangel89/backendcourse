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
    //let socket = io()
    
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const code = document.getElementById('code').value
    const price = document.getElementById('price').value
    const stock = document.getElementById('stock').value
    const category = document.getElementById('category').value
    const thumbnail = document.getElementById('thumbnail').value

    const obj = new Product(title,description,code,price,stock,category,thumbnail)

    console.log(obj)
    
    socket.emit('product', obj)
    
}


let socket = io()

socket.on('products', (msg) => {
    console.log(msg)
    const div = document.getElementById('div')
    const newText = document.createTextNode("New text node")
    div.appendChild(newText)
})







