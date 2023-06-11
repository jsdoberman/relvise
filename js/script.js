window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header__nav'), //Блок, которому присваиваем активность
        menuItem = document.querySelectorAll('.header__menu-item'), // Элементы меню
        hamburger = document.querySelector('.humburger'); // Кнопка меню
        
    //Нажатие на кнопку меню
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('header__nav_act');
        hamburger.classList.toggle('humburger_active');
    });

});


// =================================================Модуль анімація цифрового лічильника
//Цифри котрі мають анимуватись обгортаємо тегом з атрибутом data-digits-counter
window.addEventListener('load', windowLoad);

function windowLoad() { 

	// Функція ініціалізації
	function digitsCountersInit(digitsCountersItems) {
		let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
		if (digitsCounters.length) {
			digitsCounters.forEach(digitsCounter => {
				digitsCountersAnimate(digitsCounter);
			});
		}
	}

	// Функція анімації
	function digitsCountersAnimate(digitsCounter) {
		let startTimestamp = null;
		const duration = parseInt(digitsCounter.dataset.digitsCounterSpeed) ? parseInt(digitsCounter.dataset.digitsCounterSpeed) : 1000; //Час анімації
		const startValue = parseInt(digitsCounter.innerHTML);
		const startPosition = 0;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}

	/* Пуск при завантажені сторінки */
	//digitsCountersInit();

	//--------Пуск при скролі до блока:
		let options = {
			threshold: 0.5
		};

		let observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if(entry.isIntersecting) {
					const targetElement = entry.target;
					const digitsCountersItems = targetElement.querySelectorAll('[data-digits-counter]');
					if (digitsCountersItems.length) {
						digitsCountersInit(digitsCountersItems);
					}
					//Вимкнути після спрацювання
					//observer.unobserve(targetElement);
				}
			});
		}, options);

		let sections = document.querySelectorAll('.block-design') //Батьківський єлемент, який з'являється на екрані
		if(sections.length) {
			sections.forEach(section => {
				observer.observe(section);
			});
		}
 } 
