const $ = element => document.querySelector(element)
const $$ = elements => document.querySelectorAll(elements)

const $passwordInput = $('input[name="password"]')
const $eyeClosed = $('svg.eyeClosed')
const $eyeOpen = $('svg.eyeOpen')

$eyeClosed.addEventListener('click', () => { setPasswordVisible(true) })
$eyeOpen.addEventListener('click', () => { setPasswordVisible(false) })

const setPasswordVisible = (visible) => {

    if (visible) {
        $passwordInput.type = 'text'
        $eyeClosed.style.display = 'none'
        $eyeOpen.style.display = 'block'
    } else {
        $passwordInput.type = 'password'
        $eyeClosed.style.display = 'block'
        $eyeOpen.style.display = 'none'
    }
}