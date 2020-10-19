
let keyvalue = {
    "신사동 래미안" : "1",
    "압구정동 어울림" : "2",
    "대치동 더샵" : "3",
    "논현동 신도브레뉴" : "4",
    "일원동 중앙하이츠빌" : "5",
    "오륜동 미지엔" : "6",
    "잠실2동 좋은집" : "7",
    "송파1동 꿈에그린" : "8",
    "천호1동 SKview" : "9",
    "강일동 Xi" : "10",
    "상일동 몰라" : "11",
    "암사2동 현진에버빌" :"12",
    "공릉1동 e편한세상" : "13",
    "상계1동 미소지음" : "14",
    "상계3.4동 래미안" : "15",
    "하계1동 중앙하이츠빌" : "16",
    "남영동 경남아너스빌" : "17",
    "용문동 꿈에그린" : "18",
    "이촌1동 아이파크" : "19",
    "서빙고동 e편한세상" : "20",
    "남영동 더샵" : "21"
}

$( document ).ready( function() {
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
        var value= $(this).attr('name');
        $( '.passValue' ).val(value);
        $( '.signup_place_search span' ).text(value);
        $( '.signup_place_search span' ).css('color','black');
        $( '.background-place' ).css('display','none');
        return false;
    } );
});