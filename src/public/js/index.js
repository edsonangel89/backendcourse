/*Restore passwords page */

const resbtn = document.getElementById('restorebutton')
const fpass = document.getElementById('fpassword')
const spass = document.getElementById('spassword')
/*
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
*/
/*Home page */
const doc = document
const profileButton = document.getElementById('test')
const dropMenu = document.getElementById('collapse_menu')

profileButton.addEventListener('click', function (event) {
    //console.log(event.target)
    if (dropMenu.style.display == 'none' || dropMenu.style.display == false) {
        dropMenu.style.visibility = 'visible'
        dropMenu.style.display = 'flex'
    }
})

doc.addEventListener('click', function (event) {
    //console.log(event.target.id)
    if (dropMenu.style.display == 'flex' && event.target.id != 'test') {
        dropMenu.style.visibility = 'hidden'
        dropMenu.style.display = 'none'
    }
})

/*doc.addEvent0Listener('click', function(event) {
    
    const obj = JSON.stringify('e')
    console.log(obj)
    const response = fetch('http://localhost:8080/test', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: obj
    })
})*/