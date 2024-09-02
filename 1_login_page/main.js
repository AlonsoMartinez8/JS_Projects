// Region Consts
const $ = element => document.querySelector(element)
const $$ = elements => document.querySelectorAll(elements)
const $passwordInput = $('input[name="password"]')
const $confirmPasswordInput = $('input[name="confirmPassword"]')
const $eyeClosed = $('svg.eyeClosed')
const $eyeOpen = $('svg.eyeOpen')
const $eMailInput = $('input[name="eMail"]')
const $formState = $('.formState')
const STRINGS = {
    Valid: 'valid',
    Invalid: 'invalid',
    DisplayNone: 'none',
    DisplayBlock: 'block',
    TypeText: 'text',
    TypePassword: 'password',
    Empty: '',
    STATES: {
        InvalidPassword: 'Invalid password',
        PasswordsDoNotCoincide: 'Passwords do not coincide',
        InvalidEMail: 'Invalid E-Mail',
        EmptyFields: 'Fill every field',
        CompletedAndValid: 'All fields are completed and valid',
    }
}
const STATES = {
    Uncompleted: 'Uncompleted',
    Invalid:{
        InvalidPassword: 'InvalidPassword',
        PasswordsDoNotCoincide: 'PasswordsDoNotCoincide',
        InvalidEMail: 'InvalidEMail',
    },
    Completed: 'Completed',
}
let _currentState = STATES.Uncompleted
Object.defineProperty(window, 'currentState', {
    get() {
        return _currentState
    },
    set(newState) {
        _currentState = newState
        updateFormState(newState)
    }
})
// End Region Consts

// Region Listeners
$passwordInput.addEventListener('input', (e, input = $passwordInput) => {
    if (e.target.value === STRINGS.Empty) {
        input.classList.remove(STRINGS.Valid)
        input.classList.remove(STRINGS.Invalid)
        window.currentState = STATES.Uncompleted
    } else if (checkPasswordPolicy(e.target.value)) {
        input.classList.remove(STRINGS.Invalid)
        input.classList.add(STRINGS.Valid)
    } else {
        input.classList.remove(STRINGS.Valid)
        input.classList.add(STRINGS.Invalid)
        window.currentState = STATES.Invalid.InvalidPassword
    }
    validateFormCompletion()
})
$confirmPasswordInput.addEventListener('input', (e, input = $confirmPasswordInput) => {
    if (e.target.value === STRINGS.Empty) {
        input.classList.remove(STRINGS.Valid)
        input.classList.remove(STRINGS.Invalid)
        window.currentState = STATES.Uncompleted
    } else if (checkPasswordsCoincide(e.target.value)) {
        input.classList.remove(STRINGS.Invalid)
        input.classList.add(STRINGS.Valid)
    } else {
        input.classList.remove(STRINGS.Valid)
        input.classList.add(STRINGS.Invalid)
        window.currentState = STATES.Invalid.PasswordsDoNotCoincide
    }
    validateFormCompletion()
})
$eyeClosed.addEventListener('click', () => { setPasswordVisible(true) })
$eyeOpen.addEventListener('click', () => { setPasswordVisible(false) })
$eMailInput.addEventListener('input', (e, input = $eMailInput) => {
    if (e.target.value === STRINGS.Empty) {
        input.classList.remove(STRINGS.Valid)
        input.classList.remove(STRINGS.Invalid)
        window.currentState = STATES.Uncompleted
    } else if (checkEMail(e.target.value)) {
        input.classList.remove(STRINGS.Invalid)
        input.classList.add(STRINGS.Valid)
    } else {
        input.classList.remove(STRINGS.Valid)
        input.classList.add(STRINGS.Invalid)
        window.currentState = STATES.Invalid.InvalidEMail
    }
    validateFormCompletion()
})
// End Region Listeners

// Region Validation
const checkPasswordPolicy = (password) => {
    const hasLowerCase = /[a-z]/.test(password)
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    return hasLowerCase && hasUpperCase && hasNumber && hasSymbol
}
const checkPasswordsCoincide = (confirmPassword) => {
    return confirmPassword === $passwordInput.value
}
const checkEMail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
}
const validateFormCompletion = () => {
    const isPasswordValid = $passwordInput.classList.contains(STRINGS.Valid)
    const isConfirmPasswordValid = $confirmPasswordInput.classList.contains(STRINGS.Valid)
    const isEmailValid = $eMailInput.classList.contains(STRINGS.Valid)

    if (isPasswordValid && isConfirmPasswordValid && isEmailValid) {
        window.currentState = STATES.Completed
    } else if ($passwordInput.value === STRINGS.Empty || 
               $confirmPasswordInput.value === STRINGS.Empty || 
               $eMailInput.value === STRINGS.Empty) {
        window.currentState = STATES.Uncompleted
    } else {
        if (!isPasswordValid) {
            window.currentState = STATES.Invalid.InvalidPassword
        } else if (!isConfirmPasswordValid) {
            window.currentState = STATES.Invalid.PasswordsDoNotCoincide
        } else if (!isEmailValid) {
            window.currentState = STATES.Invalid.InvalidEMail
        }
    }
}
// End Region Validation

// Region Functions
const setPasswordVisible = (visible) => {
    if (visible) {
        $passwordInput.type = STRINGS.TypeText
        $eyeClosed.style.display = STRINGS.DisplayNone
        $eyeOpen.style.display = STRINGS.DisplayBlock
    } else {
        $passwordInput.type = STRINGS.TypePassword
        $eyeClosed.style.display = STRINGS.DisplayBlock
        $eyeOpen.style.display = STRINGS.DisplayNone
    }
}
const updateFormState = (state) => {
    switch (state) {
        case STATES.Idle:
            $formState.textContent = STRINGS.Empty
            break;
        case STATES.Uncompleted:
            $formState.textContent = STRINGS.STATES.EmptyFields
            break;
        case STATES.Invalid.InvalidPassword:
            $formState.textContent = STRINGS.STATES.InvalidPassword
            break;
        case STATES.Invalid.PasswordsDoNotCoincide:
            $formState.textContent = STRINGS.STATES.PasswordsDoNotCoincide
            break;
        case STATES.Invalid.InvalidEMail:
            $formState.textContent = STRINGS.STATES.InvalidEMail
            break;
        case STATES.Completed:
            $formState.textContent = STRINGS.STATES.CompletedAndValid
            break;
        default:
            $formState.textContent = STRINGS.Empty
    }
}
// End Region Functions