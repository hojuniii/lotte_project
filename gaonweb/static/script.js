
    $( document ).ready( function() {
        //스크롤
        //새로고침할때 맨위로
        $(window).bind('unload', function(){window.scrollTo({top:0});});
        $( window ).scroll( scrollMove );
        function scrollMove() {
            //top이동
            
            if ( $( this ).scrollLeft() > 0 ) {
                window.scrollTo({left:0});
            }

            if ( $( this ).scrollTop() > 400 ) {
                $( '.top' ).fadeIn();
            } else {
                $( '.top' ).fadeOut();
            }


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


        //화살표 클릭
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

    
        //처음 이미지
        $( '.img1_container' ).fadeIn(1500);
        $( '.img1_text' ).fadeIn(2200);
    
    


        //폰트사이즈
        
        textfit();
        
        function textfit() {
            var width_size = window.outerWidth;
            if (width_size >= 800) {
                $('.text-fitter1').css('font-size','36px');
                $('.text-fitter2').css('font-size','25px');
                $('.img1_text').css('font-size','40px');
                $('.img2_text').css('font-size','30px');
                $('.img2_text').css('bottom','560px');
                $('.img3_text').css('font-size','40px');
                $('.text').css('margin','60px 30px 0px 50px');
                $('.img2').css('width','700px');
            }
            else {
                $('.text-fitter1').css('font-size','25px');
                $('.text-fitter2').css('font-size','16px');
                $('.img1_text').css('font-size','28px');
                $('.img2_text').css('font-size','20px');
                $('.img2_text').css('bottom','450px');
                $('.img3_text').css('font-size','28px');
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

        $(window).on('resize', textfit);
    } );


