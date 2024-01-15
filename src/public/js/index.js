//const socket = io()

/*async function test () {
    const response = await fetch('http://192.168.100.24:8080/api/products',{
        method: 'GET'
    })
    const j = await response.json()
    console.log(j)
}*/
const resbtn = document.getElementById('restorebutton')
const fpass = document.getElementById('fpassword')
const spass = document.getElementById('spassword')

fpass.addEventListener('input', function (event) {
    if (fpass.value != spass.value) {
        fpass.style.borderColor = 'red'
        spass.style.borderColor = 'red'
        resbtn.disabled = true
    }
    else {
        fpass.style.borderColor = 'white'
        spass.style.borderColor = 'white'
        resbtn.disabled = false
    }
})

spass.addEventListener('input', function (event) {
    if (fpass.value != spass.value) {
        fpass.style.borderColor = 'red'
        spass.style.borderColor = 'red'
        resbtn.disabled = true
    }
    else {
        fpass.style.borderColor = 'white'
        spass.style.borderColor = 'white'
        resbtn.disabled = false
    }
})