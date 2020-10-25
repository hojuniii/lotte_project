$( document ).ready( function() {
    
    var now_page = document.querySelector(".now_page").innerText;
    //새로고침할때 맨위로
    $(window).bind('unload', function(){window.scrollTo({top:0});});
    window_size();
    $(window).on('resize', window_size);
    click_placebox();
    click();
    $( window ).scroll( scrollMove );
    switch (now_page){
        case 'home':
            $( '.home_page' ).css('color', '#ec1d25');
            $( '.switch' ).fadeIn(1500);
            $( '.footer' ).css('position', 'absolute');
            //처음 이미지
            $( '.img1_container' ).fadeIn(1500);
            $( '.img1_text' ).fadeIn(2200);
            $( window ).scroll( scrollMove_home );
            $( window ).scroll( scrollMove_homeswitch );
            break;
        case 'qrcode':
            $( '.qrcode_page' ).css('color', '#ec1d25');
            break;
        case 'members':
            $( '.members_page' ).css('color', '#ec1d25');
            var value= $( '.passValue' ).val();
            if(value=='all'){
                value="지역검색";
                $( '.members_h2_box a' ).css('color', '#e05247');
            }
            else{
                $( '.signup_place_search span' ).css('color','black');
            }
            $( '.signup_place_search span' ).text(value);
            break;
        case 'place':
            $( '.place_page' ).css('color', '#ec1d25');

            $( window ).scroll( scrollMove_place );
            break;
        case 'signin':
            $( '.signin_page' ).css('color', '#ec1d25');
            break;
        case 'signup':
            $( '.signup_page' ).css('color', '#ec1d25');
            break;
        case 'mypage':
            $( '.mypage_page' ).css('color', '#ec1d25');
            break;
        case 'mypage_edit':
            $( '.mypage_page' ).css('color', '#ec1d25');
            var value= $( '.passValue' ).val();
            $( '.signup_place_search span' ).text(value);
            break;
        default:
            break;
    }
} );

//윈도우 사이즈 변경시
function window_size() {
    var width_size = window.outerWidth;
    if (width_size <= 510) {
        //home.html
        $('.content3-member-container div').css('width',width_size-80+"px");
        $('.content3-card-div').css('width',"55%");
        //members.html
        $('.members_card').css('width',width_size-80+"px");
        $('.members_card div').css('width',"55%");
    }
    else{
        //home.html
        $('.content3-member-container div').css('width',"420px");
        $('.content3-card-div').css('width',"60%");
        //members.html
        $('.members_card').css('width',"420px");
        $('.members_card div').css('width',"60%");
    }
    if (width_size >= 800) {
        
        //home.html
        $('.youtube1').css('width','88%');
        $('.text-fitter0').css('font-size','25px');
        $('.text-fitter1').css({'font-size':'32px','line-height':'50px'});
        $('.text-fitter2').css({'font-size':'21px','line-height':'30px'});
        $('.img1_text').css('font-size','40px');
        $('.img2').css('width','700px');
        $('.img2_text').css({'font-size':'30px','bottom':'570px'});
        $('.img3_text').css('font-size','40px');
        $('.text1_box').css('margin','60px 30px 0px 50px');
        $('.text2_box').css('margin','20px 20px 0px 50px');
        $('.content2-cardbox').css('width',"100%");
        $('.content2-subbox').css('display',"none");

        //members.html
        $('.membersImg_text').css('font-size','40px');
        $('.members_h2_link').css({'width':"50%","text-align":"right"});

        //place.html
        $('.placeImg_text').css('font-size','40px');
        $('.place_card_container').css('text-align',"left");
    }
    else {
        //home.html
        $('.youtube1').css('width','100%');
        $('.text-fitter0').css('font-size','18px');
        $('.text-fitter1').css({'font-size':'23px','line-height':'35px'});
        $('.text-fitter2').css({'font-size':'14px','line-height':'24px'});
        $('.img1_text').css('font-size','28px');
        $('.img2').css('width','500px');
        $('.img2_text').css({'font-size':'23px','bottom':'440px'});
        $('.img3_text').css('font-size','28px');
        $('.text1_box').css('margin','25px 20px 0px 20px');
        $('.text2_box').css('margin','15px 15px 0px 15px');
        $('.content2-cardbox').css('width',"100%");
        $('.content2-subbox').css('display',"none");

        //members.html
        $('.membersImg_text').css('font-size','27px');
        $('.members_h2_link').css({'width':"100%","text-align":"left"});

        //place.html
        $('.placeImg_text').css('font-size','27px');
        $('.place_card_container').css('text-align',"center");
    }   
    
    if (width_size >= 1032) {
        //base.html
        $('.nav-link').css('display','inline');
        $('.nav-button').css('display','none');
        $('.background-nav').css('display','none');
        $('.footerInfo1').css('display','block');
        $('.footerInfo2').css('text-align','left');
        $('.footerInfo2_img').css({'display':'inline-block', 'margin':'10px 40px 20px 80px'});
        $('.footerInfo2_font').css({'font-size':'14px', 'margin' : '0px'});
        

        //home.html
        $('.content2-card-text').css({'font-size':'19px','left':'70px'});
        $('.content2-card-span').css('font-size','13px');
    }
    else{
        //base.html
        $('.nav-link').css('display','none');
        $('.nav-button').css('display','inline');
        $('.footerInfo1').css('display','none');
        $('.footerInfo2').css('text-align','center');
        $('.footerInfo2_img').css({'display':'block', 'margin':'0 auto'});
        $('.footerInfo2_font').css({'font-size':'10px', 'margin' : '20px 0px'});


        //home.html
        $('.content2-card-text').css({'font-size':'13px','left':'60px'});
        $('.content2-card-span').css('font-size','9px');
    }
    if (width_size >=1380){
        //members.html
        $('.members_card_container').css('text-align','left');
        $('.members_card').css('margin','0px 0px 30px 40px');
    }
    else{
        //members.html
        $('.members_card_container').css('text-align','center');
        $('.members_card').css('margin','0px 20px 30px 20px');
    }
}

//스크롤 이동시(home.html)
function scrollMove_home(){
    //scroll switch bar
    var temp_scroll=$( this ).scrollTop();
    var display_background=$( '.background' ).css('display');
    var display_text1=$( '.text1' ).css('display');
    var display_text2=$( '.text2' ).css('display');
    var display_text3=$( '.text3' ).css('display');
    var display_img2_text=$( '.img2_text' ).css('display');
    var display_img3_text=$( '.img3_text' ).css('display');
    var display=false;
    if(display_background=='none' || display_text1=='none' ||
    display_text2=='none' || display_text3=='none' ||
    display_img2_text=='none' || display_img3_text=='none')
        display=true;
    
    //main scroll
    if(display){
        if (temp_scroll < 250){
            $( '.background' ).slideDown(1500);
        }
        else if(temp_scroll < 920 ){
            $( '.text1' ).slideDown(1000);
            $( '.contentImg1' ).fadeIn(1000);
        }
        else if(temp_scroll < 1600 ){
            $( '.text2' ).slideDown(1000);
            $( '.contentImg2' ).fadeIn(1000);
            $( '.content2-text' ).fadeIn(2000);
        }
        else if(temp_scroll < 2480 ){
            $( '.text3' ).slideDown(500);
            $( '.content3-member-container' ).fadeIn(1500);
            $( '.content3-button-container' ).fadeIn(1500);
        }
        else if(temp_scroll < 2800 ){
            $( '.img2_text' ).fadeIn(1000);
            
            $( '.img2_background' ).animate({width: '0%'});
        }
        else{
            $( '.img3_text' ).fadeIn(1000);
        }
    }
}

function scrollMove_homeswitch(){
    var temp_scroll=$( this ).scrollTop();
    if(temp_scroll < 250){
        $( '.switch1' ).css('background-color', 'white');
        $( '.switch2' ).css('background-color', 'white');
        $( '.switch3' ).css('background-color', 'white');
    }
    else if(temp_scroll < 920 ){
        $( '.switch1' ).css('background-color', '#e05247');
        $( '.switch2' ).css('background-color', 'white');
        $( '.switch3' ).css('background-color', 'white');
    }
    else if(temp_scroll < 1600 ){
        $( '.switch1' ).css('background-color', 'white');
        $( '.switch2' ).css('background-color', '#e05247');
        $( '.switch3' ).css('background-color', 'white');
    }
    else if(temp_scroll < 2450 ){
        $( '.switch1' ).css('background-color', 'white');
        $( '.switch2' ).css('background-color', 'white');
        $( '.switch3' ).css('background-color', '#e05247');
    }
    else{
        $( '.switch1' ).css('background-color', 'white');
        $( '.switch2' ).css('background-color', 'white');
        $( '.switch3' ).css('background-color', 'white');
        $( '.img2' ).animate({bottom: '20px'});
        $( '.img2' ).animate({bottom: '0px'});
    }
}

//스크롤 이동시(모든 페이지)
function scrollMove() {
    temp_scroll=$(this).scrollTop();
    // if ( $( this ).scrollLeft() > 0 ) {
    //     window.scrollTo({left:0});
    // }
    if ( temp_scroll > 400 ) {
        $( '.top' ).fadeIn();
    } else {
        $( '.top' ).fadeOut();
    }
}

//스크롤 이동시(place.html)
function scrollMove_place() {
    var pos1= $( '.pos1' ).offset().top -510;
    var pos2= $( '.pos2' ).offset().top -510;
    var pos3= $( '.pos3' ).offset().top -510;
    var pos4= $( '.pos4' ).offset().top -510;
    var pos5= $( '.pos5' ).offset().top -510;
    if ( $( this ).scrollTop() > pos1 && $( this ).scrollTop() < pos2) {
        $( '.pos1' ).children('div.place_card_container').slideDown(800);
        $( '.pos1' ).children('div.place_bar1').animate( { width : '40%' }, 500 );
    }
    else if ( $( this ).scrollTop() > pos2 && $( this ).scrollTop() < pos3) {
        $( '.pos2' ).children('div.place_card_container').slideDown(800);
        $( '.pos2' ).children('div.place_bar1').animate( { width : '40%' }, 500 );
    }
    else if ( $( this ).scrollTop() > pos3 && $( this ).scrollTop() < pos4) {
        $( '.pos3' ).children('div.place_card_container').slideDown(800);
        $( '.pos3' ).children('div.place_bar1').animate( { width : '40%' }, 500 );
    }
    else if ( $( this ).scrollTop() > pos4 && $( this ).scrollTop() < pos5) {
        $( '.pos4' ).children('div.place_card_container').slideDown(800);
        $( '.pos4' ).children('div.place_bar1').animate( { width : '40%' }, 500 );
    }
    else if ( $( this ).scrollTop() > pos5) {
        $( '.pos5' ).children('div.place_card_container').slideDown(800);
        $( '.pos5' ).children('div.place_bar1').animate( { width : '40%' }, 500 );
    }
}

//클릭시
function click_placebox() {
    var now_page = document.querySelector(".now_page").innerText;
    let place_value= {
        0:"all",
        1:"서울 강남구 신사동 래미안",
        2:"서울 강남구 압구정동 어울림",
        3:"서울 강남구 대치동 더샵",    
        4:"서울 강남구 논현동 신도브레뉴",
        5:"서울 강남구 일원동 중앙하이츠빌",
        6:"서울 송파구 오륜동 미지엔",
        7:"서울 송파구 잠실2동 좋은집",
        8:"서울 송파구 송파1동 꿈에그린",
        9:"서울 강동구 천호1동 SKview",
        10:"서울 강동구 강일동 Xi",
        11:"서울 강동구 상일동 몰라",
        12:"서울 강동구 암사2동 현진에버빌",
        13:"서울 노원구 공릉1동 e편한세상",
        14:"서울 노원구 상계1동 미소지음",
        15:"서울 노원구 상계3.4동 래미안",
        16:"서울 노원구 하계1동 중앙하이츠빌",
        17:"서울 용산구 남영동 경남아너스빌",
        18:"서울 용산구 용문동 꿈에그린",
        19:"서울 용산구 이촌1동 아이파크",
        20:"서울 용산구 서빙고동 e편한세상",
        21:"서울 용산구 남영동 더샵"
    };
    $( '.signup_place_search' ).click( function() {
        $( '.background-place' ).css('display','block');
        return false;
    } );
    $( '.background-place-close' ).click( function() {
        $( '.background-place' ).css('display','none');
        return false;
    } );

    $( '.background-place-content' ).click( function() {
        $( '.background-place-alert' ).css('display','none');
        return false;
    } );

    $( '.background-place-2' ).click( function() {
        $( '.background-place-alert' ).css('display','inline');
        return false;
    } );

    $( '.background-place-1 .triangle1' ).click( function() {
        var temp = $('.background-place-container2').css('display');
        if(temp=="none"){
            $(this).css('color', '#e05247');
            $(this).text("▲");
            $( '.background-place-alert' ).css('display','none');
            $('.background-place-container2').css('display', 'block');
        }
        else{
            $(this).css('color', 'black');
            $(this).text("▼");
            $('.background-place-container2').css('display','none');
        }
        return false;
    } );
    

    $( '.background-place-1 .triangle2' ).click( function() {
        var temp = $(this).parent('div.background-place-content2').children('div.background-place-container3').css('display');
        if(temp=="none"){
            $('.triangle2').css('color', 'black');
            $('.triangle2').text("▶");
            $(this).css('color', '#e05247');
            $(this).text("◀");
            $('.background-place-container3').css('display','none');
            $(this).parent('div.background-place-content2').children('div.background-place-container3').css('display', 'block');
        }
        else{
            $(this).css('color', 'black');
            $(this).text("▶");
            $(this).parent('div.background-place-content2').children('div.background-place-container3').css('display','none');
        }
        return false;
    } );
    
    $( '.background-place-content3' ).click( function() {
        var key = Number($(this).attr('name'));
        $( '.passValue' ).val(place_value[key]);
        $( '.signup_place_search span' ).text(place_value[key]);
        $( '.signup_place_search span' ).css('color','black');
        $( '.background-place' ).css('display','none');
        if (now_page=='members'){
            location.href="/gaonweb/placetemp/"+key;
        }
        return false;
    } );
}
function click(){
    $( '.top' ).click( function() {
        $( 'html, body' ).filter(":not(:animated)").animate( { scrollTop : 0 }, 600 );
        return false;
    } );
    $( '.switch1' ).click( function() {
        $( 'html, body' ).filter(":not(:animated)").animate( { scrollTop : 600 }, 800 );
        return false;
    } );
    $( '.switch2' ).click( function() {
        $( 'html, body' ).filter(":not(:animated)").animate( { scrollTop : 1270 }, 800 );
        return false;
    } );
    $( '.switch3' ).click( function() {
        $( 'html, body' ).filter(":not(:animated)").animate( { scrollTop : 1980 }, 800 );
        return false;
    } );


    $( '.nav-button' ).click( function() {
        var temp = $('.background-nav').css('display');
        if(temp=="none")
            $('.background-nav').css('display', 'block');
        else
        $('.background-nav').css('display','none');
        return false;
    } );
    $( '.content3-button-l' ).click( function(){
        var temp2 = $( '.content3-member-container' ).offset().left;
        if(temp2 < 0 ){
            $( '.content3-member-container' ).filter(":not(:animated)").animate( { left : (temp2+460) }, 600 );
            $( '.content3-button-r' ).css('color',"#e05247");
            if(temp2+460 >=0)
                $( '.content3-button-l' ).css('color',"#e051473f");
        }
        else{
            $( '.content3-member-container' ).filter(":not(:animated)").animate( { left : 0 }, 600 );
            $( '.content3-button-l' ).css('color',"#e051473f");
        }
        return false;
    } );
    $( '.content3-button-r' ).click( function(){
        var temp2 = $( '.content3-member-container' ).offset().left;
        if(temp2 > -460*(6-1) ){
            $( '.content3-member-container' ).filter(":not(:animated)").animate( { left : (temp2-460) }, 600 );
            $( '.content3-button-l' ).css('color',"#e05247");
            if(temp2-460 <= -460*(6-1))
                $( '.content3-button-r' ).css('color',"#e051473f");
        }
        else{
            $( '.content3-member-container' ).filter(":not(:animated)").animate( { left : -460*(6-1) }, 600 );
            $( '.content3-button-r' ).css('color',"#e051473f");
        }
        return false;
    } );

    $( '.qrcode_card' ).click( function(){
        var src = $(this).children('img.qrcode_img').attr('src');
        var span_text = $(this).children('span.qrcode_span').text();
        $( '.background-qrcode' ).css('display','block');
        $( '.background-qrcode img' ).attr('src',src);
        $( '.background-qrcode span' ).text("운송장번호 : "+span_text);
        return false;
    } );
    
    $( '.background-qrcode-close' ).click( function() {
        $( '.background-qrcode' ).css('display','none');
        return false;
    } );

    $( '.apple' ).click( function() {
        alert("ios 앱은 설치할 수 없습니다.");
        return false;
    } );
    $( '.question_mark' ).click( function() {
        var temp = $('.question_mark_container').css('display');
        if(temp=="none")
            $('.question_mark_container').css('display', 'block');
        else
            $('.question_mark_container').css('display','none');
        return false;
    } );
    $( '.question_mark_container' ).click( function() {
        $('.question_mark_container').css('display','none');
    } );
}

//로딩
window.onload = function() { 
    $( '.loader' ).css('display', 'none');
    $( '.onload' ).css('display', 'block');
}
