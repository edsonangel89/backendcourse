const socketR = io()

const title = document.getElementById('title')
const description = document.getElementById('description')
const code = document.getElementById('code')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const thumbnail = document.getElementById('thumbnail')
const form = document.getElementById('data')
const table = document.getElementById('table')
const delForm = document.getElementById('delForm')
const pid = document.getElementById('pid')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const newProduct = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.value,
        thumbnail: thumbnail.value
    }
    if (newProduct) {
        socketR.emit('update', newProduct)
        title.value = ''
        description.value = ''
        code.value = ''
        price.value = ''
        stock.value = ''
        category.value = ''
        thumbnail.value = ''
    }
})

delForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const id = parseInt(pid.value)
    pid.value = ''
    socketR.emit('delete', id)
})

socketR.on('update', (currList) => {
    while (table.firstChild) {
        table.removeChild(table.firstChild)    
    }
    for (const prop in currList) {
        const row = document.createElement('tr')
        const col1 = document.createElement('td')
        col1.innerHTML = currList[prop].id
        row.appendChild(col1)
        const col2 = document.createElement('td')
        col2.innerHTML = currList[prop].title
        row.appendChild(col2)
        const col3 = document.createElement('td')
        col3.innerHTML = currList[prop].description
        row.appendChild(col3)
        const col4 = document.createElement('td')
        col4.innerHTML = currList[prop].code
        row.appendChild(col4)
        const col5 = document.createElement('td')
        col5.innerHTML = currList[prop].price
        row.appendChild(col5)
        const col6 = document.createElement('td')
        col6.innerHTML = currList[prop].status
        row.appendChild(col6)
        const col7 = document.createElement('td')
        col7.innerHTML = currList[prop].stock
        row.appendChild(col7)
        const col8 = document.createElement('td')
        col8.innerHTML = currList[prop].category
        row.appendChild(col8)
        const col9 = document.createElement('td')
        col9.innerHTML = currList[prop].thumbnail
        row.appendChild(col9)
        table.appendChild(row)
    }
})

socketR.on('delete', (currList) => {
    while (table.firstChild) {
        table.removeChild(table.firstChild)    
    }
    for (const prop in currList) {
        const row = document.createElement('tr')
        const col1 = document.createElement('td')
        col1.innerHTML = currList[prop].id
        row.appendChild(col1)
        const col2 = document.createElement('td')
        col2.innerHTML = currList[prop].title
        row.appendChild(col2)
        const col3 = document.createElement('td')
        col3.innerHTML = currList[prop].description
        row.appendChild(col3)
        const col4 = document.createElement('td')
        col4.innerHTML = currList[prop].code
        row.appendChild(col4)
        const col5 = document.createElement('td')
        col5.innerHTML = currList[prop].price
        row.appendChild(col5)
        const col6 = document.createElement('td')
        col6.innerHTML = currList[prop].status
        row.appendChild(col6)
        const col7 = document.createElement('td')
        col7.innerHTML = currList[prop].stock
        row.appendChild(col7)
        const col8 = document.createElement('td')
        col8.innerHTML = currList[prop].category
        row.appendChild(col8)
        const col9 = document.createElement('td')
        col9.innerHTML = currList[prop].thumbnail
        row.appendChild(col9)
        table.appendChild(row)
    }
})