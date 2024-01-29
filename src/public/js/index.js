/*Home page */
const doc = document
const profileButton = document.getElementById('test')
const dropMenu = document.getElementById('collapse_menu')

profileButton.addEventListener('click', function (event) {
    if (dropMenu.style.display == 'none' || dropMenu.style.display == false) {
        dropMenu.style.visibility = 'visible'
        dropMenu.style.display = 'flex'
    }
})

doc.addEventListener('click', function (event) {
    if (dropMenu.style.display == 'flex' && event.target.id != 'test') {
        dropMenu.style.visibility = 'hidden'
        dropMenu.style.display = 'none'
    }
})