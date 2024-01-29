/*Restore passwords page */

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