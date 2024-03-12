var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
var agent = navigator.userAgent.toLowerCase();
var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);

var _w;
var _breakpoint = 720;
var _breakpointDesktop = 1100;
var _wrap;
var _navHei;
var _wid;

var _gnb;
var _menu;
var _menuIcon;
var _dim;


var _header;

$(function(){
    init();
});

function init(){
    create();
    addEvent();

}

function create(){
    _w = $(window);
    _wrap = $('#wrap');
    _wid = _w.width();
    
    _gnb = $("#gnb");
    _menu = $(".menu");
    _menuIcon = $(".menu-icon");
    _dim = $( ".dim" );

    _header = $("header");
    _navHei = _header.height();

}

function addEvent(){
    _w.on("resize", resizeEvent);
    resizeEvent();

    _w.on("scroll", scrollEvent);
    scrollEvent();

    _menuIcon.on("click", menuEvent);

    tabEvent('.form-field-tab1');
	tabEvent('.form-field-tab2');
    fileUploadEvent();
    
    //slideEvent();
    // faqClickEvent();
   
 
    if(_wid > _breakpoint){
      pageMove('.page-move');
    }else{
      pageMove('.page-move', -(_navHei/2));
    }

    // 210105 수정
    $('html').click(function(e){ 
        if($(e.target).parents('.popup-wrap').length < 1){ 
            popupClose('#popupCard');
            popupClose('#popupRequest');
        } 
    });

}

function faqClickEvent(){
    $('.fag-toggle').on('click', function(){
        var $this = $(this);

        $this.parents('dl').toggleClass('unfold').siblings().removeClass('unfold');
    });
}

function tabEvent($selector){
    $($selector).find('.tab-list').children('li').on('click', function(){
        var idx = $(this).index(),
            tabList = $($selector).find('.tab-list').children('li');

        tabList.removeClass("active");
        $(this).addClass("active");

        $($selector).find('.tab-view').hide();
        $($selector).find('.tab-view').eq(idx).show();
        // var videoList = [
        //     "https://www.youtube.com/embed/b0RL6uLlVXk",
        //     "https://www.youtube.com/embed/-5SHA86P0yY",
        //     "https://www.youtube.com/embed/kXdZMpAlNf0"
        // ];
        // $($selector).find('.tab-view').find(".video-box").empty();
        // $($selector).find('.tab-view').find(".video-box").html('<iframe src="'+videoList[idx]+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    });
}



function scrollEvent(){
    var st = $(window).scrollTop();
    var sh = $(window).height() / 1.2;
    var section = $('.section');

    section.each(function(i){
        if( st > section.eq(i).offset().top - sh){
            $(this).addClass('active');
        }
        //  else {
        //     $(this).removeClass('active');
        // }
    });

	// 20211214 수정
    if(st > _navHei){
       // _header.addClass("fixed");
	   $(".fixed-bottom").css({bottom:0});
    }else{
        //_header.removeClass("fixed");
		$(".fixed-bottom").css({bottom:-200});
    }

}


function resizeEvent(){
    _wid = _w.width();
    _navHei = _header.height();

    $('.responsive').each(function() {
        var $src = $(this).attr("src");
        var val = (_wid > _breakpoint) ? $src.replace('mobile', 'pc') : $src.replace('pc', 'mobile');

        $(this).attr("src", val);
    });

    if(_wid > _breakpoint){
        _gnb.css("display","flex");
        _menu.hide();
       
    }else{
        _gnb.hide();
        _menu.show();
        
    }
}


function menuEvent(){
    $(this).toggleClass("active");

    if(_menuIcon.hasClass("active")){
        _dim.show();
        _gnb.slideDown();
        _gnb.css("display","block");
        _header.addClass("change");

    }else{
        _dim.hide();
        _gnb.slideUp();
        _header.removeClass("change");
    }
}


function slideEvent() {

    
    $('.slide-container').each(function(key, item) {
		var sliderIdName = 'slider' + key;
			this.id = sliderIdName;
		var sliderId = '#' + sliderIdName;

        $(sliderId).not('.slick-initialized').slick({
            autoplay: false,
            autoplaySpeed: 3000,
            infinite: true,
            arrows: true,
            dots: false,
            slidesToScroll: 1,
            speed: 700,
            slidesToShow: 1,
            pauseOnHover: false,
            pauseOnFocus: false,
            centerMode: true,
            variableWidth: true,
            initialSlide:0
        });


	});
}


function pageMove($selector, $position){
	if($position == undefined) $position = 0;

	var selector = $selector;
	$(selector).on('click', function (e) {
		e.preventDefault();

		var _top = $($(this).attr('href'));
		var $target = _top.offset().top;

    // 모바일에서 gnb 클릭시 gnb 닫기 
    if(_wid < _breakpoint){
      _menuIcon.removeClass("active");
      _dim.hide();
      _gnb.slideUp();
      _header.removeClass("change");
    }

		$('html,body').animate({
			scrollTop: $target+$position
		}, 500);


	});
}


// 210105 수정
function popupOpen($selector){
	$($selector).show();

    if($selector == "#popupCard"){
        btnNextClick(1);
        slideEvent();
    }
    
	if($(window).height() <= $($selector).find(".popup-wrap").outerHeight() || $selector == "#popupRequest"){
		// 팝업이클때는 
		var st = $(window).scrollTop()+50;
		$($selector).addClass("wide").css({top:st});
		$("body").append('<div class="popup-dim"></div>');
	}else{
		// 팝업이 작을때는
		$($selector).removeClass("wide");
		$($selector).css({display:"flex"});
	}
}


// popupClose('#brandLayerEvent');
function popupClose($selector){
    //$('.slide-container').slick("unslick");
	$($selector).hide();

	if($(".popup-dim").is(':visible')){
		$(".popup-dim").remove();
	}

}

function fileUploadEvent() {
    //file upload
    var fileTarget = $('.file-box .upload-hidden');
    fileTarget.on('change', function () {
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).siblings('.upload-name').val(filename);
    });
}




