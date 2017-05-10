function App(){
	this.menu = $('.menu');
	this.slideHome = Handlebars.compile($('#slide-home').html())(arrays);
	this.contSlide = $('.slide-cont');
	this.handlerDots = $('.handler.dots');
	this.handlerLeft = $('.handler.left');
	this.handlerRight = $('.handler.right');
	this.nSlides = 3;
	this.header = $('header');
	this.positionSlide = 1;
	this.contFeatures = $('.cont-features');
	this.summarise = Handlebars.compile($('#features').html())(arrays);
	this.contGallery = $('.cont-gallery');
	this.gallery = Handlebars.compile($('#gallery').html())(arrays);
	this.contPopGallery = $('.cont-pop-gallery');
	this.popGallery = Handlebars.compile($('#pop').html())(arrays);
	this.handlerLeftPop = $('.left-pop');
	this.handlerRightPop = $('.right-pop');
	this.handlerClosePop = $('.close-pop');
	this.icoPlay = $('.ico-play');
	this.contPrices = $('.cont-prices');
	this.prices = Handlebars.compile($('#prices').html())(arrays);
	this.contTestimonials = $('.cont-tests');
	this.testimonials = Handlebars.compile($('#testimonials').html())(arrays);
	this.nTests = arrays.testimonials.length;
	this.form = $('#nav-contact form');
	this.nameRegex = /^([a-zA-ZñÑáéíóúÁÉÍÓÚ ]{2,30})\w+$/i;
	this.emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	this.animateIn = {right: '0'};
	this.animateOut = {right: '-37px'};
	this.contBurguerMenu = $('.cont-burguerMenu');
	this.burguerMenu = Handlebars.compile($('#burguerMenu').html())(arrays);
	this.icoMenu = $('.icoMenu');
	this.btnTop = $('.btnTop');
	this.logo = $('.img-logo a');
}

App.prototype.init = function(){
	var ob = this;
	this.llenarMenu();
	this.llenarSlide();
	this.rotateSlide();
	this.clickDot();
	this.handler();
	this.navScroll();
	this.zoomScreen();
	this.playVideo();
	this.rotateTest();
	this.zoomMap();
	this.focusInput('#name', 'Name');
	this.focusInput('#email', 'Email Address');
	this.focusInput('#subject', 'Subject');
	this.focusInput('#message', 'Message');
	this.validateData('#name', ob.nameRegex);
	this.validateData('#email', ob.emailRegex);
	this.heightMenu();
	this.toggleMenu();
	this.goTop();
	this.widthForm();
}

App.prototype.handler = function(){
	var ob = this;
	this.contFeatures.append(ob.summarise);
	this.contGallery.append(ob.gallery);
	this.contPopGallery.append(ob.popGallery);
	$('.pop-img:nth-child(2)').addClass('pop-img-active');
	
	this.contPrices.append(ob.prices);
	this.contTestimonials.append(ob.testimonials);
	
	for(i = 1; i <= arrays.testimonials.length; i++){
		$('.cont-handler-test').append('<span class="handler-test handler' + i + '" data-id="' + i + '"></span>');
	}
	$('.handler1').addClass('handler-test-active');

	this.contBurguerMenu.append(ob.burguerMenu);
	this.logo.click(function(ev){
		ev.preventDefault();
	});
}

App.prototype.llenarMenu = function(){
	var ob = this;
	for(i = 0; i < listMenu.length; i++){
		ob.menu.append('<li class="' + listMenu[i].href + '"><a class="' + listMenu[i].href + '" href="#' + listMenu[i].href + '">' + listMenu[i].name + '</a></li>');
	}
}

App.prototype.llenarSlide = function(){
	var ob = this;
	this.contSlide.append(ob.slideHome);
	$('.slide:nth-child(2)').addClass('slide-active');
	
	for(i = 0; i < ob.nSlides; i++){
		ob.handlerDots.append('<span class="dot' + ' dot-' + arrays.banner[i].idSlide + '" data-id="' + arrays.banner[i].idSlide + '"></span>');
	}

	$('.dot').eq(0).addClass('active-dot');
}

App.prototype.rotateSlide = function(){
	var ob = this;
	
	setInterval(function(){
		ob.slideAuto();
	}, 10000);
	
	this.handlerRight.click(function(){
		ob.slideAuto();
	});   
	this.handlerLeft.click(function(){
		if(ob.positionSlide <= ob.nSlides){
			$('.slide-active').removeClass('slide-active').prev().addClass('slide-active');
			ob.positionSlide--;
			if(ob.positionSlide < 1){
				$('.slide3').addClass('slide-active');
				$('.slide3').siblings().removeClass('slide-active');
				ob.positionSlide = ob.nSlides;
			}
		}
		ob.changeBg();
	}); 
}

App.prototype.changeBg = function(){
	var ob = this;
	if($('.slide1').hasClass('slide-active')){
		ob.header.css('background-image', 'url(images/bg.jpg)');
		$('.dot').eq(0).addClass('active-dot').siblings().removeClass('active-dot');
	}
	if($('.slide2').hasClass('slide-active')){
		ob.header.css('background-image', 'url(images/bg2.png)');
		$('.dot').eq(1).addClass('active-dot').siblings().removeClass('active-dot');
	}
	if($('.slide3').hasClass('slide-active')){
		ob.header.css('background-image', 'url(images/bg3.jpg)');
		$('.dot').eq(2).addClass('active-dot').siblings().removeClass('active-dot');
	}
}

App.prototype.slideAuto = function(){
	var ob = this;
	if(ob.positionSlide <= ob.nSlides){
		$('.slide-active').removeClass('slide-active')
			.next()
			.addClass('slide-active');
		ob.positionSlide++;
		if(ob.positionSlide > ob.nSlides){
			$('.slide1').addClass('slide-active');
			$('.slide1').siblings()
				.removeClass('slide-active');
			ob.positionSlide = 1;
		}
	}
	ob.changeBg();
}

App.prototype.clickDot = function(){
	var ob = this;
	$('.dot').click(function(ev){
		var target = ev.target;
		var nDot = $(target).attr('data-id')
		switch(nDot){
			case nDot:
				$('.slide' + nDot).addClass('slide-active').siblings().removeClass('slide-active');
				ob.changeBg();
				console.log($(target).attr('data-id'));
				break;
		}
	});
}

App.prototype.navScroll = function(){
	$('.menu').click(function(ev){
		ev.preventDefault();
		var target = ev.target;
		var position = $('#' + $(target).attr('class')).position();
		$('html, body').animate({scrollTop: position.top + 'px'});
	});
	$('.burguerMenu').click(function(ev){
		ev.preventDefault();
		var target = ev.target;
		var position = $('#' + $(target).attr('class')).position();
		$('html, body').animate({scrollTop: position.top + 'px'});
	});
}

App.prototype.zoomScreen = function(){
	var ob = this;
	$('.hover-screen-shot').click(function(){
		$('#pop-gallery').addClass('pop-gallery-active');
	});
	this.handlerClosePop.click(function(){
		$('#pop-gallery').removeClass('pop-gallery-active');
	});
	$('#pop-gallery').click(function(ev){
		var target = ev.target;
		if(!$(target).hasClass('pop-img') && !$(target).hasClass('fa')){
			$(this).removeClass('pop-gallery-active');
		}
	});
	this.handlerLeftPop.click(function(){
		var nPop = 4;
		if(ob.positionSlide <= nPop){
			$('.pop-img-active').removeClass('pop-img-active').prev().addClass('pop-img-active');
			ob.positionSlide--;
			if(ob.positionSlide < 1){
				$('.pop-img:last-child').addClass('pop-img-active').siblings().removeClass('pop-img-active');
				ob.positionSlide = 4;
			}
		}
	});
	this.handlerRightPop.click(function(){
		var nPop = 4;
		if(ob.positionSlide <= nPop){
			$('.pop-img-active').removeClass('pop-img-active').next().addClass('pop-img-active');
			ob.positionSlide++;
			if(ob.positionSlide == (nPop + 1)){
				$('.pop-img:nth-child(2)').addClass('pop-img-active').siblings().removeClass('pop-img-active');
				ob.positionSlide = 1;
			}
		}
	});
	$('.screen-shot').click(function(ev){
		for(i = 0; i < arrays.gallery.length; i++){
			var idPop = arrays.gallery[i].idPop;
			var target = ev.target;
			if($(target).hasClass('screenShot-' + idPop)){
				$('.popImg-' + idPop).addClass('pop-img-active')
					.siblings()
					.removeClass('pop-img-active');
			}
		}
	});
}

App.prototype.playVideo = function(){
	var ob = this;
	this.icoPlay.click(function(){
		$('#pop-video').addClass('pop-video-active');
		console.log('Play');
	});
	$('#pop-video .close-pop').click(function(){
		$('#pop-video').removeClass('pop-video-active');
		console.log('cerrar');
	});
	$('#pop-video').click(function(ev){
		var target = ev.target;
		if(!$(target).hasClass('video-iphone') && !$(target).hasClass('fa')){
			$(this).removeClass('pop-video-active');
		}
	});
}

App.prototype.rotateTest = function(){
	var ob = this;
	var test = $('.cont-tests').children('.test');
	test.eq(0)
		.addClass('test-active');
	$('.cont-handler-test').click(function(ev){
		var target = ev.target;
		var handlerId = $(target).attr('data-id');
		switch(handlerId) {
			case handlerId:
				$('.test-' + handlerId).addClass('test-active')
					.siblings()
					.removeClass('test-active');
				$('.handler' + handlerId).addClass('handler-test-active')
					.siblings()
					.removeClass('handler-test-active');
			break;
		}
		if(handlerId == 1){
			$('.handler-test')
				.css('backgroundColor', 'rgba(52, 143, 180, 0.5)');
			$('.handler-test-active')
				.css('backgroundColor', '#348FB4');
		}
		if(handlerId == 2){
			$('.handler-test')
				.css('backgroundColor', 'rgba(101, 139, 72, 0.5)');
			$('.handler-test-active')
				.css('backgroundColor', '#658B48');
		}
		if(handlerId == 3){
			$('.handler-test')
				.css('backgroundColor', 'rgba(188, 92, 0, 0.5)');
			$('.handler-test-active')
				.css('backgroundColor', '#BC5C00');
		}
	});

	var position = 1;
	setInterval(function(){
		var nTest = 3;
		if(position <= nTest) {
			$('.cont-tests').children('.test-active')
			    .next()
			    .addClass('test-active')
			    .siblings()
			    .removeClass('test-active');
			$('.cont-handler-test').children('.handler-test-active')
				.next()
			    .addClass('handler-test-active')
			    .siblings()
			    .removeClass('handler-test-active');
			position++;
			console.log(position);
			if(position > nTest) {
				position = 1;
			    $('.cont-tests').children('.test')
			        .eq(0)
			        .addClass('test-active')
			        .siblings()
			        .removeClass('test-active');
				$('.cont-handler-test').children('.handler-test')
					.eq(0)
				    .addClass('handler-test-active')
				    .siblings()
				    .removeClass('handler-test-active');
			}
			if($('.test-1').hasClass('test-active')){
				$('.handler-test')
					.css('backgroundColor', 'rgba(52, 143, 180, 0.5)');
				$('.handler-test-active')
					.css('backgroundColor', '#348FB4');
			}
			if($('.test-2').hasClass('test-active')){
				$('.handler-test')
					.css('backgroundColor', 'rgba(101, 139, 72, 0.5)');
				$('.handler-test-active')
					.css('backgroundColor', '#658B48');
			}
			if($('.test-3').hasClass('test-active')){
				$('.handler-test')
					.css('backgroundColor', 'rgba(188, 92, 0, 0.5)');
				$('.handler-test-active')
					.css('backgroundColor', '#BC5C00');
			}
		}
	}, 5000);
}

App.prototype.zoomMap = function() {
	$('#nav-contact').click(function(){
		$(this).find('iframe').css('pointerEvents', 'auto');

	}).mouseleave(function(){
		$(this).find('iframe').css('pointerEvents', 'none');
	});
}

App.prototype.focusInput = function(idInput, placeholder) {
	var ob = this;
	$(idInput).focusin(function(){
		$(this).attr('placeholder', '');
	}).focusout(function(){
		$(this).attr('placeholder', placeholder);
	});
}

App.prototype.validateData = function(idInput, regex) {
	var ob = this;
	$(idInput).focusout(function(){
		if(regex.test($(idInput).val())){
			console.log('correct');
			$(idInput).siblings('.check').animate(ob.animateIn, 'fast')
			.siblings('.error').animate(ob.animateOut, 'fast');
		}
		else {
			console.log('incorrect')
			$(idInput).siblings('.error').animate(ob.animateIn, 'fast')
			.siblings('.check').animate(ob.animateOut, 'fast');;
		}
	});
}

App.prototype.heightMenu = function() {
	var parentMenu = this.contBurguerMenu.parent();
	if(parentMenu.outerHeight() > window.innerHeight)
		$(parentMenu).css({
			position: 'absolute',
			maxHeight: '100vh'
		});
	else
		console.log('menor');
}

App.prototype.toggleMenu = function() {
	this.icoMenu.toggle(function(){
		$('.burguerMenu').animate({right: '0'}, 'fast');
	}, function(){
		$('.burguerMenu').animate({right: '-300px'}, 'fast');
	});
}

App.prototype.goTop = function() {
	this.btnTop.click(function(){
		$('html, body').animate({scrollTop: '0'});
	});
}

App.prototype.widthForm = function() {
	if(window.innerWidth <= 400)
		$('form').css('left', '0');
	else
		$('form').css('left', 'calc(50% - 200px)');
	$(window).resize(function(){
		if(window.innerWidth <= 400)
			$('form').css('left', '0');
		else
			$('form').css('left', 'calc(50% - 200px)');
	});
}