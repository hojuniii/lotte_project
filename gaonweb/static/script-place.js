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
}

$( document ).ready( function() {
    var now_page = document.querySelector(".now_page").innerText;
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
});