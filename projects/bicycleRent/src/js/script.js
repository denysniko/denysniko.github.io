$(document).ready(function () {
	$('.carousel__inner').slick({
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		prevArrow:
			'<button type="button" class="slick-prev"><i class="fa-solid fa-arrow-left-long fa-1x"></i></button>',
		nextArrow:
			'<button type="button" class="slick-next"><i class="fa-solid fa-arrow-right-long fa-1x"></button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					dots: true,
					arrows: false,
				},
			},
		],
	})
	$('ul.catalog__tabs').on(
		'click',
		'li:not(.catalog__tab_active)',
		function () {
			$(this)
				.addClass('catalog__tab_active')
				.siblings()
				.removeClass('catalog__tab_active')
				.closest('div.container')
				.find('div.catalog__content')
				.removeClass('catalog__content_active')
				.eq($(this).index())
				.addClass('catalog__content_active')
		}
	)

	$('[data-modal=call]').on('click', function () {
		$('.nav__burger').removeClass('nav__burger_active')
		$('.nav__menu').removeClass('nav__menu_active')

		$('.overlay, #call').show()
	})

	$('.nav__burger').on('click', function () {
		$(this).toggleClass('nav__burger_active')
		$('.nav__menu').toggleClass('nav__menu_active')
	})

	$('.nav__item').on('click', function () {
		$('.nav__burger').removeClass('nav__burger_active')
		$('.nav__menu').removeClass('nav__menu_active')
	})

	$('.modal__close').on('click', function () {
		$('.overlay, #order, #thanks').hide()
	})
	$('.button_catalog').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
			$('.overlay, #order').show()
		})
	})

	$('.header__logo').on('click', function (e) {
		e.preventDefault()

		window.scrollTo(0, 0)
	})

	function validateForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2,
				},
				phone: 'required',
				email: {
					required: true,
					email: true,
				},
			},
			messages: {
				name: {
					required: 'Будь ласка, введіть своє ім`я',
					minlength: jQuery.validator.format('Введіть {0} символа!'),
				},
				phone: 'Будь ласка, введіть свій номер телефону',
				email: {
					required: 'Будь ласка, введіть свою пошту',
					email: 'Має бути у форматі example@gmail.com',
				},
			},
		})
	}

	validateForms('#consultation form')
	validateForms('#contacts form')
	validateForms('#call form')
	validateForms('#order form')

	$('input[name=phone]').mask('+ 380 (99) 999 99 99')
})

let swiper = new Swiper('.swiper', {
	loop: true,
	speceBetween: 24,
	slidesPerView: 'auto',
	grabCursor: true,
	pagination: {
		el: '.swiper-pagination',
		dynamicBullets: true,
	},
	breakpoints: {
		320: {
			spaceBetween: 15,
		},
		575: {
			slidesPerView: 1,
			spaceBetween: 25,
		},
		768: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 32,
		},
	},
})
