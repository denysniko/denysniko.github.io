import './index.html'
import './sass/style.scss'
import {
	marqueeGsapAnimation,
	createSlideBar,
	createSpinner,
	createAnimationGallery,
	siteAnimation,
} from './modules/animation.js'
import { validationForm } from './modules/validation'

document.addEventListener('DOMContentLoaded', () => {
	const menuOpen = document.querySelector('.menu')
	const menuClose = document.querySelector('.menu__close')
	const menuLinks = document.querySelectorAll('.menu__link')
	const hamburger = document.querySelector('.hamburger')
	// Switching menus when you click on a hamburger
	hamburger.addEventListener('click', () => {
		menuOpen.classList.toggle('menu_active')
	})
	// Closing the menu when clicking on the button
	menuClose.addEventListener('click', () => {
		menuOpen.classList.toggle('menu_active')
	})
	// Closing the menu when clicking on any link in the menu
	menuLinks.forEach(link => {
		link.addEventListener('click', () => {
			menuOpen.classList.toggle('menu_active')
		})
	})

	marqueeGsapAnimation()
	createSlideBar()
	createSpinner()
	createAnimationGallery()
	siteAnimation()
	validationForm()
})
