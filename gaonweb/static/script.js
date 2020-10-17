
    $( document ).ready( function() {
        var now_page = document.querySelector(".now_page").innerText;
        
        //스크롤
        window_size();
        //새로고침할때 맨위로
        $(window).bind('unload', function(){window.scrollTo({top:0});});
        //window 사이즈
        $(window).on('resize', window_size);
        //scroll
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
                break;
            case 'members':
                $( '.members_page' ).css('color', '#ec1d25');
                $( '.footer' ).css('position', 'static');
                break;
            case 'place':
                $( '.place_page' ).css('color', '#ec1d25');
                $( '.footer' ).css('position', 'static');
                break;
            case 'signin':
                $( '.signin_page' ).css('color', '#ec1d25');
                $( '.footer' ).css('position', 'static');
                break;
            case 'signup':
                $( '.signup_page' ).css('color', '#ec1d25');
                $( '.footer' ).css('position', 'static');
                break;
            case 'mypage':
                $( '.mypage_page' ).css('color', '#ec1d25');
                $( '.footer' ).css('position', 'static');
                break;
            case 'mypage_edit':
                $( '.mypage_page' ).css('color', '#ec1d25');
                $( '.footer' ).css('position', 'static');
                //selected 선택
                var opcnt = document.getElementById("service_place").options.length;
                for(i=0; i<opcnt; i++){
                    
                    if(document.getElementById("service_place").options[i].value == document.getElementById("comp").innerText){
                        document.getElementById("service_place").options[i].selected = true;
                        break;
                    }
                }
                break;
            
            default:
                break;
        }
        

        //클릭 모션
        $( '.top' ).click( function() {
            $( 'html, body' ).animate( { scrollTop : 0 }, 800 );
            return false;
        } );
        $( '.switch1' ).click( function() {
            $( 'html, body' ).animate( { scrollTop : 620 }, 800 );
            return false;
        } );
        $( '.switch2' ).click( function() {
            $( 'html, body' ).animate( { scrollTop : 1270 }, 800 );
            return false;
        } );
        $( '.switch3' ).click( function() {
            $( 'html, body' ).animate( { scrollTop : 2000 }, 800 );
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
                $( '.content3-member-container' ).animate( { left : (temp2+460) }, 500 );
                $( '.content3-button-r' ).css('color',"#e05247");
                if(temp2+460 >=0)
                    $( '.content3-button-l' ).css('color',"#e051473f");
            }
            else{
                $( '.content3-member-container' ).animate( { left : 0 }, 500 );
                $( '.content3-button-l' ).css('color',"#e051473f");
            }
            return false;
        } );
        $( '.content3-button-r' ).click( function(){
            var temp2 = $( '.content3-member-container' ).offset().left;
            if(temp2 > -460*(6-1) ){
                $( '.content3-member-container' ).animate( { left : (temp2-460) }, 500 );
                $( '.content3-button-l' ).css('color',"#e05247");
                if(temp2-460 <= -460*(6-1))
                    $( '.content3-button-r' ).css('color',"#e051473f");
            }
            else{
                $( '.content3-member-container' ).animate( { left : -460*(6-1) }, 500 );
                $( '.content3-button-r' ).css('color',"#e051473f");
            }
            return false;
        } );

    

    


        //윈도우사이즈
        function window_size() {
            var width_size = window.outerWidth;
            if (width_size <= 500) {
                $('.content3-member-container div').css('width',width_size-80+"px");
            }
            else
            $('.content3-member-container div').css('width',"420px");
            if (width_size >= 800) {
                $('.footerInfo1').css('display','block');
                $('.footerInfo2').css('text-align','left');
                $('.footerInfo2_img').css({'display':'inline-block', 'margin':'10px 40px 20px 80px'});
                $('.footerInfo2_font').css({'font-size':'14px', 'margin' : '0px'});
                $('.youtube1').css('width','88%');
                $('.text-fitter1').css('font-size','36px');
                $('.text-fitter2').css('font-size','25px');
                $('.img1_text').css('font-size','40px');
                $('.img2_text').css({'font-size':'30px','bottom':'560px'});
                $('.img3_text').css('font-size','40px');
                $('.membersImg_text').css('font-size','40px');
                $('.text').css('margin','60px 30px 0px 50px');
                $('.img2').css('width','700px');
            }
            else {
                $('.footerInfo1').css('display','none');
                $('.footerInfo2').css('text-align','center');
                $('.footerInfo2_img').css({'display':'block', 'margin':'0 auto'});
                $('.footerInfo2_font').css({'font-size':'10px', 'margin' : '20px 0px'});
                $('.youtube1').css('width','100%');
                $('.text-fitter1').css('font-size','25px');
                $('.text-fitter2').css('font-size','16px');
                $('.img1_text').css('font-size','28px');
                $('.img2_text').css({'font-size':'20px','bottom':'450px'});
                $('.img3_text').css('font-size','28px');
                $('.membersImg_text').css('font-size','27px');
                $('.text').css('margin','50px 20px 0px 40px');
                $('.img2').css('width','500px');
            }
            
            if (width_size >= 1032) {
                $('.nav-link').css('display','inline');
                $('.nav-button').css('display','none');
                $('.background-nav').css('display','none');
            }
            else{
                $('.nav-link').css('display','none');
                $('.nav-button').css('display','inline');
            }

        }
        //스크롤 home
        function scrollMove_home(){
            if ( $( this ).scrollTop() > 150 ){
                $( '.background' ).slideDown(1500);
            }
            if( $( this ).scrollTop() >= 250 && $( this ).scrollTop() < 920 ){
                $( '.switch1' ).css('background-color', '#e05247');
                $( '.switch2' ).css('background-color', 'white');
                $( '.switch3' ).css('background-color', 'white');
                $( '.text1' ).slideDown(1000);
                $( '.contentImg1' ).fadeIn(1000);
            }
            else if( $( this ).scrollTop() >= 920 && $( this ).scrollTop() < 1600 ){
                $( '.switch1' ).css('background-color', 'white');
                $( '.switch2' ).css('background-color', '#e05247');
                $( '.switch3' ).css('background-color', 'white');
                $( '.text2' ).slideDown(1000);
                $( '.contentImg2' ).fadeIn(1000);
            }
            else if( $( this ).scrollTop() >= 1600 && $( this ).scrollTop() < 2490 ){
                $( '.switch1' ).css('background-color', 'white');
                $( '.switch2' ).css('background-color', 'white');
                $( '.switch3' ).css('background-color', '#e05247');
                $( '.text3' ).slideDown(500);
                $( '.content3-member-container' ).fadeIn(1500);
                $( '.content3-button-container' ).fadeIn(1500);
            }
            else if( $( this ).scrollTop() >= 2490 && $( this ).scrollTop() < 2800 ){
                $( '.img2_text' ).fadeIn(1000);
                $( '.img2' ).animate({
                    bottom: '40px'
                });
                $( '.img2' ).animate({
                    bottom: '20px'
                });
                $( '.img2_background' ).animate({
                    width: '100%'
                });
                $( '.switch1' ).css('background-color', 'white');
                $( '.switch2' ).css('background-color', 'white');
                $( '.switch3' ).css('background-color', 'white');
            }
            else{
                $( '.switch1' ).css('background-color', 'white');
                $( '.switch2' ).css('background-color', 'white');
                $( '.switch3' ).css('background-color', 'white');
            }

            if ( $( this ).scrollTop() > 2800 ){
                $( '.img3_text' ).fadeIn(1000);
            }
        }

        //top이동
        function scrollMove() {
            if ( $( this ).scrollLeft() > 0 ) {
                window.scrollTo({left:0});
            }
            if ( $( this ).scrollTop() > 400 ) {
                $( '.top' ).fadeIn();
            } else {
                $( '.top' ).fadeOut();
            }
        }
        



        
    } );


