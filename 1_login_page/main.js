const $ = element => document.querySelector(element)
const $$ = elements => document.querySelectorAll(elements)

const $passwordInput = $('input[name="password"]')
const $confirmPasswordInput = $('input[name="confirmPassword"]')
const $eyeClosed = $('svg.eyeClosed')
const $eyeOpen = $('svg.eyeOpen')

$passwordInput.addEventListener('input', (e) => {
    if (checkPasswordPolicy(e.target.value)) {
        $passwordInput.classList.remove('passwordInvalid');
        $passwordInput.classList.add('passwordValid');
    } else {
        $passwordInput.classList.remove('passwordValid');
        $passwordInput.classList.add('passwordInvalid');
    }
})
$confirmPasswordInput.addEventListener('input', (e) => {
    if (checkPasswordsCoincide(e.target.value)) {
        $confirmPasswordInput.classList.remove('passwordInvalid');
        $confirmPasswordInput.classList.add('passwordValid');
    } else {
        $confirmPasswordInput.classList.remove('passwordValid');
        $confirmPasswordInput.classList.add('passwordInvalid');
    }
})
$eyeClosed.addEventListener('click', () => { setPasswordVisible(true) })
$eyeOpen.addEventListener('click', () => { setPasswordVisible(false) })

const checkPasswordPolicy = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasLowerCase && hasUpperCase && hasNumber && hasSymbol;
}
const checkPasswordsCoincide = (confirmPassword) => {
    return confirmPassword === $passwordInput.value
}
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