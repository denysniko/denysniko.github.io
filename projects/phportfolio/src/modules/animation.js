import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// A function that creates a circle animation in the Hero section
export function createSpinner() {
	const spinText = document.querySelector('.hero__text p')
	spinText.innerHTML = spinText.innerText
		.split('')
		.map(
			(item, i) =>
				`<span style="transform:rotate(${i * 15.4}deg)">${item}</span>`
		)
		.join('')
}

// A function that creates a marquee effect
export function marqueeGsapAnimation() {
	const tween = gsap
		.to('.marquee__part', {
			xPercent: -100,
			repeat: -1,
			duration: 5,
			ease: 'linear',
		})
		.totalProgress(0.5)
}

// A function that creates a scroll animation for the Portfolio section
export function createSlideBar() {
	let target = 0
	let current = 0
	let ease = 0.075

	const slider = document.querySelector('.portfolio-slidebar')
	const sliderWrapper = document.querySelector('.portfolio-slidebar__wrapper')
	const slides = document.querySelectorAll('.slide')

	let maxScroll = sliderWrapper.offsetWidth - window.innerWidth

	function lerp(start, end, factor) {
		return start + (end - start) * factor
	}

	function updateScaleAndPosition() {
		slides.forEach(slide => {
			const rect = slide.getBoundingClientRect()
			const centerPosition = (rect.left + rect.right) / 2
			const distanceFromCenter = centerPosition - window.innerWidth / 2

			let scale, offsetX
			if (distanceFromCenter > 0) {
				scale = Math.min(1.75, 1 + distanceFromCenter / window.innerWidth)
				offsetX = (scale - 1) * 200 // reduce for shorter distance (was 300)
			} else {
				scale = Math.max(
					0.5,
					1 - Math.abs(distanceFromCenter) / window.innerWidth
				)
				offsetX = 0
			}

			gsap.set(slide, { scale: scale, x: offsetX })
		})
	}

	function update() {
		current = lerp(current, target, ease)

		gsap.set('.portfolio-slidebar__wrapper', {
			x: -current,
		})

		updateScaleAndPosition()

		requestAnimationFrame(update)
	}

	window.addEventListener('resize', () => {
		maxScroll = sliderWrapper.offsetWidth - window.innerWidth
	})

	window.addEventListener('wheel', e => {
		target += e.deltaY * 0.7 // reduce scrolling speed
		target = Math.max(0, target)
		target = Math.min(maxScroll, target)
	})

	gsap.registerPlugin(Draggable)

	// Swipe with GSAP
	Draggable.create(sliderWrapper, {
		type: 'x',
		edgeResistance: 0.65,
		bounds: { minX: -maxScroll, maxX: 0 },
		onDrag: function () {
			target = -this.x
			target = Math.max(0, target)
			target = Math.min(maxScroll, target)
		},
	})

	update()
}

// A function that creates an animation for the Gallery section
export function createAnimationGallery() {
	const gallery = document.querySelector('.gallery')

	// Check if the device is a mobile or tablet device.
	const mobileOrTablet = window.matchMedia('(max-width: 992px)').matches

	if (!mobileOrTablet) {
		window.onmousemove = e => {
			const mouseX = e.clientX,
				mouseY = e.clientY

			const xDecimal = mouseX / window.innerWidth,
				yDecimal = mouseY / window.innerHeight

			const maxX = gallery.offsetWidth - window.innerWidth,
				maxY = gallery.offsetHeight - window.innerHeight

			// const panX = maxX - xDecimal * -1,
			// 	panY = maxY - yDecimal * -1

			// Limit the panX and panY values to prevent the window from going out of bounds
			const panX = Math.min(0, Math.max(maxX, -xDecimal * maxX)),
				panY = Math.min(0, Math.max(maxY, -yDecimal * maxY))

			gallery.animate(
				{
					transform: `translate(${panX}px, ${panY}px)`,
				},
				{
					duration: 4000,
					fill: 'forwards',
					easing: 'ease',
				}
			)
		}

		const radius = 300,
			takeImg = document.querySelectorAll('.gallery__img'),
			radiusTwo = radius * radius

		takeImg.forEach(img => {
			let i = img.getBoundingClientRect()
			;(img.cx = i.left + i.width / 2 + window.pageXOffset),
				(img.cy = i.top + i.height / 2 + window.pageYOffset)

			img.tween = gsap
				.to(img, {
					scale: 2,
					ease: 'power1.in',
					paused: true,
				})
				.progress(1)
				.progress(0)

			document.addEventListener('mousemove', e => {
				let i = takeImg.length,
					dx,
					dy,
					img

				while (i--) {
					img = takeImg[i]
					dx = (img.cx - e.pageX) ** 2
					dy = (img.cy - e.pageY) ** 2
					img.tween.progress(1 - (dx + dy) / radiusTwo)
				}
			})
		})
	}
}

// A function that creates animations for the entire site
export function siteAnimation() {
	gsap.registerPlugin(ScrollTrigger)

	gsap.from('.hero__title', {
		opacity: 0,
		y: 50,
		scrollTrigger: {
			opacity: 1,
			x: 0,
			duration: 3,
			trigger: '.hero__title',
			start: 'top 85%',
			toggleActions: 'play none none',
		},
	})

	gsap.from('.hero__buttons, .hero__bottom', {
		opacity: 0,
		y: 50,
		scrollTrigger: {
			opacity: 1,
			y: 0,
			duration: 2,
			trigger: '.hero__buttons',
			start: 'top 85%',
			toggleActions: 'play none none',
		},
	})

	gsap.from('.about__img', {
		opacity: 0,
		y: 50,
		scrollTrigger: {
			opacity: 1,
			x: 0,
			duration: 3,
			trigger: '.about__img',
			start: 'top 80%',
			toggleActions: 'play none none',
		},
	})

	gsap.from('.about__content', {
		opacity: 0,
		y: 50,
		scrollTrigger: {
			opacity: 1,
			x: 0,
			duration: 3,
			trigger: '.about__content',
			start: 'top 80%',
			toggleActions: 'play none none',
		},
	})

	gsap.from('.about__skills', {
		opacity: 0,
		y: 50,
		scrollTrigger: {
			opacity: 1,
			y: 0,
			duration: 3,
			trigger: '.about__skills',
			start: 'top 80%',
			toggleActions: 'play none none',
		},
	})

	gsap.from('.title__section-title, .title__section-subtitle, .divider', {
		opacity: 0,
		y: 50,
		scrollTrigger: {
			opacity: 1,
			y: 0,
			duration: 3,
			trigger: '.title__section-title',
			start: 'top 80%',
			toggleActions: 'play none none',
		},
	})

	gsap.from('.services__item.first', {
		opacity: 0,
		y: -50,
		scrollTrigger: {
			opacity: 1,
			x: 0,
			duration: 3,
			trigger: '.services__item.first',
			start: 'top 75%',
			toggleActions: 'play none none',
		},
	})

	gsap.from('.services__item.second', {
		opacity: 0,
		y: 50,
		scrollTrigger: {
			opacity: 1,
			x: 0,
			duration: 2,
			trigger: '.services__item.second',
			start: 'top 75%',
			toggleActions: 'play none none',
		},
	})

	gsap.from('.services__item.third', {
		opacity: 0,
		y: 50,
		scrollTrigger: {
			opacity: 1,
			y: 0,
			duration: 3,
			trigger: '.services__item.third',
			start: 'top 80%',
			toggleActions: 'play none none',
		},
	})

	gsap.from('.pricing__card', {
		opacity: 0,
		y: 50,
		scrollTrigger: {
			opacity: 1,
			y: 0,
			duration: 3,
			trigger: '.pricing__card',
			start: 'top 80%',
			toggleActions: 'play none none',
		},
	})

	gsap.from('.contacts__wrapper', {
		opacity: 0,
		y: 50,
		scrollTrigger: {
			opacity: 1,
			y: 0,
			duration: 3,
			trigger: '.contacts__wrapper',
			start: 'top 85%',
			toggleActions: 'play none none',
		},
	})
}
