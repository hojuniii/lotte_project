$.getScript('//code.jquery.com/jquery-3.3.1.min.js', function()
{
    $( document ).ready( function() {
        //스크롤
        //새로고침할때 맨위로
        $(window).bind('unload', function(){window.scrollTo({top:0});});
        $( window ).scroll( scrollMove );
        function scrollMove() {
            if ( $( this ).scrollTop() > 400 ) {
                $( '.top' ).fadeIn();
            } else {
                $( '.top' ).fadeOut();
            }
            if ( $( this ).scrollTop() > 150 ){
                $( '.background' ).slideDown(1500);
            }
            if ( $( this ).scrollTop() > 250 ){
                $( '.text1' ).slideDown(1000);
                $( '.contentImg1' ).fadeIn(1000);
            }
            if ( $( this ).scrollTop() > 920 ){
                $( '.text2' ).slideDown(1000);
                $( '.contentImg2' ).fadeIn(1000);
            }
            if ( $( this ).scrollTop() > 1590 ){
                $( '.text3' ).slideDown(500);
                $( '.contentImg2' ).fadeIn(1000);
            }
            if ( $( this ).scrollTop() > 2500 ){
                $( '.img2' ).animate({
                    bottom: '90px'
                });
                $( '.img2' ).animate({
                    bottom: '70px'
                });
                $( '.img2_background' ).animate({
                    width: '100%'
                });
            }
            if ( $( this ).scrollTop() > 2750 ){
                $( '.img3_text' ).fadeIn(1000);
            }
        }


        //화살표 클릭
        $( '.top' ).click( function() {
            $( 'html, body' ).animate( { scrollTop : 0 }, 800 );
            return false;
        } );
    
        //이미지
        $( '.img1_container' ).fadeIn(1500);
        $( '.img1_text' ).fadeIn(2200);
    
    
        //폰트사이즈
        
        textfit();
        
        function textfit() {
            var width_size = window.outerWidth;
            if (width_size >= 920) {
                $('.text-fitter1').css('font-size','36px');
                $('.text-fitter2').css('font-size','25px');
                $('.text').css('margin-left','60px');
            }
            else {
                $('.text-fitter1').css('font-size','25px');
                $('.text-fitter2').css('font-size','16px');
            }
        }
        $(window).on('resize', textfit);
    } );
});

