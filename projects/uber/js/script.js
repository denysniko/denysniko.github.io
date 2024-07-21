document.addEventListener('DOMContentLoaded', () => {
	const menuBtn = document.querySelector('.nav-menu-btn')
	const closeBtn = document.querySelector('.nav-close-btn')
	const navigations = document.querySelector('.navigation')
	const navItems = document.querySelectorAll('.nav-items a')

	menuBtn.addEventListener('click', () => {
		navigations.classList.add('active')
	})

	closeBtn.addEventListener('click', () => {
		navigations.classList.remove('active')
	})

	navItems.forEach(navItems => {
		navItems.addEventListener('click', () => {
			navigations.classList.remove('active')
		})
	})

	const appsModals = document.querySelectorAll('.apps-model')
	const imgCards = document.querySelectorAll('.img-card')
	const appsCloseBtns = document.querySelectorAll('.apps-btn')

	var appsModal = function (modalClick) {
		appsModals[modalClick].classList.add('active')
	}

	imgCards.forEach((imgCard, i) => {
		imgCard.addEventListener('click', () => {
			appsModal(i)
		})
	})

	appsCloseBtns.forEach(appsCloseBtn => {
		appsCloseBtn.addEventListener('click', () => {
			appsModals.forEach(appsModalView => {
				appsModalView.classList.remove('active')
			})
		})
	})

	const scrollTopBtn = document.querySelector('.scrollTop-btn')

	window.addEventListener('scroll', function () {
		scrollTopBtn.classList.toggle('active', window.scrollY > 500)
	})

	scrollTopBtn.addEventListener('click', () => {
		document.body.scrollTop = 0
		document.documentElement.scrollTop = 0
	})
})
