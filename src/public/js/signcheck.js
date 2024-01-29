const signbtn = document.getElementById('signbtn')
const signfpass = document.getElementById('password')
const signspass = document.getElementById('repassword')

signfpass.addEventListener('input', function (event) {
    if (signfpass.value != signspass.value) {
        signfpass.style.borderColor = 'red'
        signspass.style.borderColor = 'red'
        signbtn.disabled = true
    }
    else {
        signfpass.style.borderColor = 'white'
        signspass.style.borderColor = 'white'
        signbtn.disabled = false
    }
})

signspass.addEventListener('input', function (event) {
    if (signfpass.value != signspass.value) {
        signfpass.style.borderColor = 'red'
        signspass.style.borderColor = 'red'
        signbtn.disabled = true
    }
    else {
        signfpass.style.borderColor = 'white'
        signspass.style.borderColor = 'white'
        signbtn.disabled = false
    }
})