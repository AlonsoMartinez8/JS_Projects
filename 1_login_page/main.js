// Region Consts
const $ = element => document.querySelector(element)
const $$ = elements => document.querySelectorAll(elements)
const $confirmPasswordInput = $('input[name="confirmPassword"]')
const $eMailInput = $('input[name="eMail"]')
const $eyeClosed = $('svg.eyeClosed')
const $eyeOpen = $('svg.eyeOpen')
const $formState = $('.formState')
const $nameInput = $('input[name="name"]')
const $passwordInput = $('input[name="password"]')

const STATES = {
    Completed: 1,
    InvalidCredentials: 0,
    Uncompleted: -1,
}

const STRINGS = {
    DisplayBlock: 'block',
    DisplayNone: 'none',
    Empty: '',
    Invalid: 'invalid',
    STATES: {
        CompletedAndValid: 'All fields are completed and valid',
        EmptyFields: 'Fill every field',
        InvalidCredentials: 'Invalid credentials. Please check the fields',
    },
    TypePassword: 'password',
    TypeText: 'text',
    Uncompleted: 'uncompleted',
    Valid: 'valid',
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
$confirmPasswordInput.addEventListener('input', (e, input = $confirmPasswordInput) => {
    if (e.target.value === STRINGS.Empty) {
        input.classList.remove(STRINGS.Valid)
        input.classList.remove(STRINGS.Invalid)
        input.classList.add(STRINGS.Uncompleted)
        window.currentState = STATES.Uncompleted
    } else if (checkPasswordsCoincide(e.target.value)) {
        if (!checkPasswordPolicy(e.target.value)) {
            input.classList.remove(STRINGS.Valid)
            input.classList.add(STRINGS.Invalid)
            input.classList.remove(STRINGS.Uncompleted)
            window.currentState = STATES.InvalidCredentials
        } else {
            input.classList.add(STRINGS.Valid)
            input.classList.remove(STRINGS.Invalid)
            input.classList.remove(STRINGS.Uncompleted)
        }
    } else {
        input.classList.remove(STRINGS.Valid)
        input.classList.add(STRINGS.Invalid)
        input.classList.remove(STRINGS.Uncompleted)
        window.currentState = STATES.InvalidCredentials
    }
    validateFormCompletion()
})

$eMailInput.addEventListener('input', (e, input = $eMailInput) => {
    if (e.target.value === STRINGS.Empty) {
        input.classList.remove(STRINGS.Valid)
        input.classList.remove(STRINGS.Invalid)
        input.classList.add(STRINGS.Uncompleted)
        window.currentState = STATES.Uncompleted
    } else if (checkEMail(e.target.value)) {
        input.classList.add(STRINGS.Valid)
        input.classList.remove(STRINGS.Invalid)
        input.classList.remove(STRINGS.Uncompleted)
    } else {
        input.classList.remove(STRINGS.Valid)
        input.classList.add(STRINGS.Invalid)
        input.classList.remove(STRINGS.Uncompleted)
        window.currentState = STATES.InvalidCredentials
    }
    validateFormCompletion()
})

$eyeClosed.addEventListener('click', () => { setPasswordVisible(true) })
$eyeOpen.addEventListener('click', () => { setPasswordVisible(false) })

$nameInput.addEventListener('input', (e, input = $nameInput) => {
    if (e.target.value === STRINGS.Empty) {
        input.classList.remove(STRINGS.Valid)
        input.classList.remove(STRINGS.Invalid)
        input.classList.add(STRINGS.Uncompleted)
        window.currentState = STATES.Uncompleted
    } else {
        input.classList.add(STRINGS.Valid)
        input.classList.remove(STRINGS.Invalid)
        input.classList.remove(STRINGS.Uncompleted)
    }
    validateFormCompletion()
})

$passwordInput.addEventListener('input', (e, input = $passwordInput) => {
    if (e.target.value === STRINGS.Empty) {
        input.classList.remove(STRINGS.Valid)
        input.classList.remove(STRINGS.Invalid)
        input.classList.add(STRINGS.Uncompleted)
        window.currentState = STATES.Uncompleted
    } else if (checkPasswordPolicy(e.target.value)) {
        input.classList.add(STRINGS.Valid)
        input.classList.remove(STRINGS.Invalid)
        input.classList.remove(STRINGS.Uncompleted)
    } else {
        input.classList.remove(STRINGS.Valid)
        input.classList.add(STRINGS.Invalid)
        input.classList.remove(STRINGS.Uncompleted)
        window.currentState = STATES.InvalidCredentials
    }
    validateFormCompletion()
})
// End Region Listeners

// Region Validation
const checkEMail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
}

const checkPasswordPolicy = (password) => {
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const hasUpperCase = /[A-Z]/.test(password)
    return hasLowerCase && hasUpperCase && hasNumber && hasSymbol
}

const checkPasswordsCoincide = (confirmPassword) => {
    return confirmPassword === $passwordInput.value
}

const validateFormCompletion = () => {
    const isEmailValid = $eMailInput.classList.contains(STRINGS.Valid)
    const isNameValid = $nameInput.classList.contains(STRINGS.Valid)
    const isPasswordValid = $passwordInput.classList.contains(STRINGS.Valid)
    const isConfirmPasswordValid = $confirmPasswordInput.classList.contains(STRINGS.Valid)

    if ($passwordInput.value === STRINGS.Empty ||
        $confirmPasswordInput.value === STRINGS.Empty ||
        $eMailInput.value === STRINGS.Empty ||
        $nameInput.value === STRINGS.Empty) {
        window.currentState = STATES.Uncompleted
        return
    }

    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
        window.currentState = STATES.InvalidCredentials
        return
    }

    if (isEmailValid && isNameValid && isPasswordValid && isConfirmPasswordValid) {
        window.currentState = STATES.Completed
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
        case STATES.Uncompleted:
            $formState.textContent = STRINGS.STATES.EmptyFields
            $formState.classList.remove(STRINGS.Valid)
            $formState.classList.remove(STRINGS.Invalid)
            $formState.classList.add(STRINGS.Uncompleted)
            break
        case STATES.InvalidCredentials:
            $formState.textContent = STRINGS.STATES.InvalidCredentials
            $formState.classList.remove(STRINGS.Valid)
            $formState.classList.remove(STRINGS.Uncompleted)
            $formState.classList.add(STRINGS.Invalid)
            break
        case STATES.Completed:
            $formState.textContent = STRINGS.STATES.CompletedAndValid
            $formState.classList.remove(STRINGS.Invalid)
            $formState.classList.remove(STRINGS.Uncompleted)
            $formState.classList.add(STRINGS.Valid)
            break
        default:
            $formState.textContent = STRINGS.Empty
    }
}
// End Region Functions