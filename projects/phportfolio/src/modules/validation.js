export function validationForm() {
	const getForm = document.querySelector('.contacts__form')
	const getEmail = getForm.querySelector('#email')
	const getName = getForm.querySelector('#name')
	const emailError = getForm.querySelector('#email-error')
	const nameError = getForm.querySelector('#name-error')

	const emailPattern = /^[a-z][a-z._0-9]+@[a-z]+\.[a-z]{2,3}$/i
	const namePattern = /^[A-Za-z]/

	// parsing minlength, maxlength
	const getMinMaxLength = element => ({
		min: Number(element.getAttribute('minlength')),
		max: Number(element.getAttribute('maxlength')),
	})
	// create field validation function
	const validateField = (
		field,
		pattern,
		minLength,
		maxLength,
		errorElement,
		fieldName
	) => {
		const value = field.value.trim() // get the current value input
		let errorMessage = ''

		if (!value || value.length < minLength) {
			errorMessage = `${fieldName} must be at least ${minLength} characters long.`
		} else if (value.length > maxLength) {
			errorMessage = `${fieldName} must be no more than ${maxLength} characters long.`
		} else if (!pattern.test(value)) {
			errorMessage = `Please enter a valid ${fieldName.toLowerCase()}.`
		}

		errorElement.textContent = errorMessage
		return !errorMessage // true, if there are no mistakes
	}

	const { min: minEmailLength, max: maxEmailLength } = getMinMaxLength(getEmail)
	const { min: minNameLength, max: maxNameLength } = getMinMaxLength(getName)

	const validateEmail = () =>
		validateField(
			getEmail,
			emailPattern,
			minEmailLength,
			maxEmailLength,
			emailError,
			'Email'
		)

	const validateName = () =>
		validateField(
			getName,
			namePattern,
			minNameLength,
			maxNameLength,
			nameError,
			'Name'
		)

	getEmail.addEventListener('input', validateEmail)
	getName.addEventListener('input', validateName)

	getForm.addEventListener('submit', e => {
		const isEmailValid = validateEmail()
		const isNameValid = validateName()
		if (!isEmailValid || !isNameValid) {
			e.preventDefault() // cancel page reload
		}
	})
}
