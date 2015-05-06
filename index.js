//0-1. 전역 변수
var date = new Date();
year = date.getFullYear();
month = date.getMonth();
day = date.getDate();
jQuery(function($){
    
    //0. 기본 변수
    var $this = $(this);
    var $win = $(window);
    var $doc = $(document);
    
    //1-1. gameList 변수
    var $gamelistul = $('#gamelistul');
    var $tpl = $gamelistul.find('>li').remove();
    var data = {items : []};
    
    //2-1. gamebtn/lnbbtn 변수
	var	$gamebtn = $(".gamebtn");
	var	$gamelist = $(".gamelist");
	var	$gamebtnToggle = $(".gamebtnToggle");
	var	$main = $("#main");
	var	$lnbbtn = $(".lnbbtndiv");
	var	$lnbbtn = $(".lnbbtn");
	var	$lnbMenu = $(".lnbMenu");
	var	$footer = $("footer");
    var toggleOn = false;
    
    //3-1. main 변수(변경할 것)
    var $mainUl = $('#main >ul');
    var $mainLiRemove = $('#main > ul >li').remove();
    var mainData = {
        users : [],
//            userId: '',
//            userPic: '',
//            userName: ''
        writes : []
//            writeId: '',
//            wirteDate: '',
//            writeTitle: '',
//            commentCount: '',
//            smileCount: ''
    };
    var friData = {
        friends : []
    };

    
    //1-2. game을 배열로 만들어, items에 넣기
    for(var i = 0; i < 100; i++){
        var j = i%5
        var item={
            id: data.items.length +1,
            name: 'Game #'+i,
            image: './image/gameimage'+j+'.png',
            comment: '('+Math.floor(Math.random() *100)+')'
        };
        data.items.push(item);
    }
    //1-3. game 나열하기
    for(var i = 0; i < data.items.length; i++){
        $tpl.clone()
            .find('.gameImg').attr('src', data.items[i].image).end()
            .find('.gameTitle').text(data.items[i].name).end()
            .find('.comment').text(data.items[i].comment).end()
            .appendTo($gamelistul);
    }
    
    //2-2. gamebtn 토글 버튼	
	$gamebtn.on('click',function(){
        if($main.is(':animated') || $lnbbtn.is(':animated') || $lnbbtn.is(':animated') || $lnbMenu.is(':animated')  || $footer.is(':animated') ){
           return;
        }
//        $gamelist.css({top: $(window).scrollTop()});
		$gamelist.toggle("slide");
        if($gamebtnToggle.text() == '추천메뉴 열기'){
            $gamebtnToggle.text('추천메뉴 닫기');
            $main.animate({left: '90px'});
            $lnbbtn.animate({left: '90px'});
            var target = 0;
                if(toggleOn ==false){
                    target = 118;
                }else{
                    target = 268;   
                }
                $lnbbtn.animate({left: target});
                $lnbMenu.animate({left: target-150});
                $footer.animate({left: '90px'});
                
        }else{
            $gamebtnToggle.text('추천메뉴 열기');
            $main.animate({left: '0'});
            $lnbbtn.animate({left: '0'});
            var target2 = 0;
                if(toggleOn == false){
                    target2 = 0;
                }else{
                    target2 = 150;   
                }
                $lnbbtn.animate({left:target2});
                $lnbMenu.animate({left: target2-150});
                $footer.animate({left: '32px'});         
        }
    });	

    
    //2-3. lnbbtn 토글 버튼
    var $lnbbtnToggle = $('.lnbbtnToggle');
    $('.lnbbtn').on('click',function(event){
        var $this = $(this);
        if($this.is(':animated') || $lnbMenu.is(':animated')){
           return;
        }
        if(toggleOn == false){
            $(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
                e.preventDefault();
                return;
            });//스크롤 막기
            
            $lnbbtnToggle.text('메뉴 닫기');
            if($gamebtnToggle.text() === '추천메뉴 열기'){
                $this.animate({left: 150},300);
                $lnbMenu.css({display: 'block'});
                $lnbMenu.animate({left: 0},300);
            }else{
                $this.animate({left: 268},300);
                $lnbMenu.css({display: 'block'});
                $lnbMenu.animate({left: 118},300);
            }
            toggleOn = true;
        }else{
            
            $lnbbtnToggle.text('메뉴 열기');
            if($gamebtnToggle.text() === '추천메뉴 열기'){
                $this.animate({left: 0},300);
                $lnbMenu.animate({left: -150},300);
            }else{
                $this.animate({left: 118},300);
                $lnbMenu.animate({left: -150},300);
            }
            $(window).off(".disableScroll");//스크롤 막기
            toggleOn =false;
        }
    });
     //3-2. 게시판 리스트 작성
    for(var i = 0; i < 100; i++){
        var j = i%4
        var user ={
            userId : mainData.users.length +1,
            userPic : './image/user'+j+'.png',
            userName : '홍길동 #'+i
        };
        var write={
            writeId: mainData.writes.length +1,
            writeDate: year+','+month+','+day,
            writeTitle: '가나다라마바사아자차카타파',
            commentCount: Math.floor(Math.random() *100),
            smileCount: Math.floor(Math.random() *100),
        };
        mainData.users.push(user);
        mainData.writes.push(write);
    }
    //3-3. 게시글 나열하기
    for(var i = 0; i < mainData.writes.length; i++){
        $mainLiRemove.clone()
            .find('.userPic').attr('src', mainData.users[i].userPic).end()
            .find('.scatchTape').after('<sup>No.'+mainData.writes[i].writeId+'</sup>').end()
            .find('.userName').text(mainData.users[i].userName).end()
            .find('.writeDate').text(mainData.writes[i].writeDate).end()
            .find('.writeTitle').text(mainData.writes[i].writeTitle).end()
            .find('.commentCount').text(mainData.writes[i].commentCount).end()
            .find('.smileCount').text(mainData.writes[i].smileCount).end()
            .prependTo($mainUl);
    }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////    
//        var connectUser = Math.floor(Math.random() *(9-1)+1);
//
//    for(var z = 0; z < connectUser; z++){
//        var connectUser2 = Math.floor(Math.random() *8);
//        var friend={
//            userPic1: 'user'+connectUser2+'.png'   
//        };
//        friData.friends.push(friend);
//        console.log(friData.friends[0].userPic1);
//    }
//    
//console.log('connectUser: '+connectUser);
//console.log('connectUser2: '+connectUser2);
//console.log('friends 길이: '+friData.friends.length);
//    
//    var $connectUserUl = $('.connectUser >ul');
//    var $connectUserLi = $('.connectUser >ul >li').remove();
//    console.log($connectUserLi);
//    $connectUserLi.clone()
//        .find('.connectPic').attr('src', 'user0.png').end()
//        .appendTo($connectUserUl);
//    
    
    
    
    
//    console.log($connectUserLi.find('.connectPic'));
 /////////////////////////////////////////////////////////////////////////////////////////////////////////  
    
    
    
//    //4-1. lnbMenu ul>li>a 색상 넣기
//    $('.lnbMenu > ul >li :even').css({background:'#fff'});
//    $('.lnbMenu > ul >li :odd').css({background:'#fff'});

    //5-1. mainLiRemovest 변수
    var $mainLiRemovest = $('#main> ul >li');
    var $writeUserInfor = $('.writeUserInfor');
    var $writeUserInforA = $('.writeUserInfor >a');
    var $userPic = $('.userPic');
    var $connectUser = $('.connectUser');
    var $countView = $('.countView');
    
    //5-2. mainLiRemovest height 가변 값 만들기
    function mainLiRemovestHeight(x,y){
        $mainLiRemovest.css({height:x+y+10});
        $writeUserInfor.css({height: x-8});
        $writeUserInforA.css({height: x});
        $writeUserInforA.css({width: x});
        $userPic.css({height:x-12});
        $userPic.css({width:x-12});
        $connectUser.css({height: x});
        $countView.css({top:x+y});        
    };
    mainLiRemovestHeight(60,30);

    //6-1. scroll조작 시 head_single, bottommenu 보이고,사라지고...
    var prevScrollTop = 0;
    var $header_single = $('.header_single');
    var $gamelist = $('.gamelist');
    var $lnbbtn = $('.lnbbtn');
    var $bottommenu = $('.bottommenu');
    var lists = $doc.find('#main>ul>li');
    var flagY = 130;
    
    $(window).on('scroll', function(event){
        console.log($win.scrollTop());
        var $this = $(this);
        var scrollTop = $this.scrollTop();
        //6-2. 변수: scroll의 이전위치, 현재위치 체크
        //(6-2)의 class 추가/삭제를 이용해 .is() 체크
        if(scrollTop > prevScrollTop){ //스크롤을 내릴 때 & 내리고 멈춘 상태
            if($gamelist.css("display") == 'block'){
    //            $header_single.animate({top:-42});
                $header_single.css({visibility: 'visible'}).removeClass("h").addClass("v"); 
                $lnbbtn.css({visibility: 'visible'});                 
            }else{
    //            $header_single.animate({top:-42});
                $header_single.css({visibility: 'hidden'}).removeClass("v").addClass("h"); 
                $bottommenu.css({visibility: 'visible'}).addClass("v").removeClass("h"); 
                $lnbbtn.css({visibility: 'visible'}); 
            }
        }else{ //스크롤을 올릴 때 & 올리고 멈춘 상태
//            $header_single.animate({top:0});
            $header_single.css({visibility: 'visible'}).addClass("v").removeClass("h"); 
            $bottommenu.css({visibility: 'hidden'}).removeClass("v").addClass("h"); 
        }
        prevScrollTop = scrollTop;
////////////////////////////////////////////////////////
//        var $list = $('#main>ul>li');
//        var $listTop = $list.offset().top;
//            if($listTop > 42 && $listTop < 137){
//                $list.css({height: 150});
//        //        $('.overView').removeClass('hiddenView');   
//            }
//                $list.css({heigth : 90});
//        //    $('.overView').addClass('hiddenView');
//////////////////////////////////////////////////////
//8-1. 일정 위치에 있을 때 내용 보이기
// 스크롤 내릴 때 특정 지점의 게시글이 펼쳐지도록 하는 코딩       
//        //높이를 모두 초기화.
//        $(lists).css({height: 100});
//
//        //현재 스크롤 탑
//        scrollTop = $win.scrollTop();
//        //console.info('scrollTop:', scrollTop);
//
//        var from, to;
//
//        for(i = 0; i < lists.length; i++) {
//            var $list = $(lists[i]);
//            //시작위치 = div탑 -  윈도우 스크롤탑
//            from = $(lists[i]).offset().top - scrollTop;
//            //종료위치 = 시작위치 + div 높이
//            to = from + lists[i].offsetHeight;
//            //console.info('from - to:', from, '~', to, divs[i]);
//
//            if ( from <= flagY && flagY < to ) {
//                $list.css({height: 330});
//                $list.find('.overView').removeClass('hiddenView');
//            } else {
//                $list.css({height: 100});
//                $list.find('.overView').addClass('hiddenView');
//            }
//        }
    
    });
    $win.trigger('scroll');
    
    
    //2-5. lnbMenu 높이와 너비 맞추기
    $lnbbtn.on('click',function(event){
        //2-4.lnblist moving
        var head_singleHeight = $('.header_single').height();
        var bottommenuHeight = $('.bottommenu').height();
        var lnbHeight = $(window).height()-head_singleHeight;
        var $lnbLi = $('.lnbMenu li');
        var $lnbLiA = $('.lnbMenu li >a');
        if($header_single.is('.v')){
            //위아래 다 보일 때
            if($bottommenu.is('.v')){
                $lnbMenu.css({top: head_singleHeight});
                $lnbMenu.css('height', lnbHeight-bottommenuHeight+'px');
            }
            //위만 보일 때
            else if($bottommenu.is('.h')){
                $lnbMenu.css({top: head_singleHeight});
                $lnbMenu.css('height',lnbHeight+'px');
            }
        }else if($header_single.is('.h')){
            $lnbMenu.css({visibility: 'visible'});
            //아래만 보일 때
            if($bottommenu.is('.v')){
                $lnbMenu.css({top: 0});
                $lnbMenu.css('height', lnbHeight+head_singleHeight-bottommenuHeight+'px');
            }
            //모두 안보일 때
            else if($bottommenu.is('.h')){
                $lnbMenu.css({top:0});
                $lnbMenu.css({height:lnbHeight+head_singleHeight});
            }
        }
    });
    //7-1. 색상 넣기
        
    var backColor = ['#f3bbcc','#6B78BF','#F6F1DB','#F294AD', '#3366cc', '#f2f2f2'];
//    var backColor = ['#f3bbcc','#233F61','#F6F1DB','#F294AD'];
//    var backColor = ['#F294AD','#F279A6','#C0D3C7','#7BA595'];
//    var backColor = ['#F2949C','#F2949C','#C0D3C7','#7BA595'];
//    var backColor = ['#DAD0D0','#233F61','#F6F1DB','#B57D9D'];
    
    function mainColor(w,x,y,z,a){
        //w: user 배경
        //x: 테두리
        //y: 배경
        //z: 리스트 배경
        $('.writeUserInfor').css({background:w});
        $('.header_single').css({background:x});
        $('.gamelist>li').css({background:x});
        $('#gamelistul li:nth-child(even)').css({background:x});
        $('.search [type="search"]').css({background:x});
        $('.bottommenu').css({background:x});
        $('.header_body').css({background:y});
        $('#main>ul>li').css({background:z});
        $('.circle').css({background:z});
        $('.circle1').css({background:y});
        $('.scatchTape>div:nth-child(odd)').css('border-top','3.4px solid '+w);
        $('.scatchTape>div:nth-child(even)').css('border-bottom','3.4px solid '+w);

        $('.bottommenu > button').css({background:w});
        $('.overView >div').css({background:a});
//        $('.writeTitleDiv').css({background:y});
//        $('.overView').css({background:y});
    }
    mainColor(backColor[0],backColor[1],backColor[2],backColor[3], backColor[4]);
    
    //9-1. 리스트 선택 변수
    var $mainList = $('#main>ul>li');
    var preTop = 0;
    //9-2. 리스트 선택
    $mainList.on('click', function(event){
        var $this = $(this);
        var listHeight = $this.offset().top;
        var $mainListOther = $this.siblings();
        if($this.is(':animated')){
           return;
        }
        $this.css({background: backColor[1]})
            .find('.scatchTape>div:nth-child(odd)').css('border-top','3.4px solid '+backColor[5]).end()
            .find('.scatchTape>div:nth-child(even)').css('border-bottom','3.4px solid '+backColor[5]).end()
            .find('.writeUserInfor').css({background: backColor[5]}).end()
            .find('.circle').css({background: backColor[1]}).end()
            .siblings().css({background: backColor[3]})
                .find('.scatchTape>div:nth-child(odd)').css('border-top','3.4px solid '+backColor[0]).end()
                .find('.scatchTape>div:nth-child(even)').css('border-bottom','3.4px solid '+backColor[0]).end()
                .find('.writeUserInfor').css({background: backColor[0]}).end()
                .find('.circle').css({background: backColor[3]});
            
        var articleHeight = parseInt($this.find('.overView').css('height').slice(0,-2));
        if($this.is('.listOn')){//열려 있을 때
            $this.removeClass('listOn')
                .find('.overView').slideUp(200);
            $mainListOther.removeClass('listOff');
            $this.animate({height : 100})
                .find('.clip').css({display:'block'});
            $('html,body').animate({'scrollTop':preTop},200);
        }else{//닫혀 있을 때
            preTop = $win.scrollTop();
            
            $this.addClass('listOn').find('.overView').slideDown(200);
//            console.log(articleHeight);
            $this.animate({height : articleHeight + 110 },200);
            $('html,body').animate({'scrollTop':listHeight},200);
        }
    });
    var $refresh = $('.bottommenu img[src="./image/refresh.png"]');
    console.log($refresh);
    $refresh.on('click',function(event){
        $('html,body').animate({'scrollTop':0},0);
         
    });
});


        

//jQuery(function($){
//    var point = 0;
//    var point1 = 0;
//    var point2 = 0;
//    var point3 = 0;
//    
//    $('.1point').on('click',function(event){
//        point= point+1;
//        point1 = point1+1;
//        $('.totalPoint').html(point+'점');
//        $('.total1Point').html('1점 득점 : '+point1+'골');
//        console.log(point);
//    });
//    
//    $('.2point').on('click',function(event){
//         point = point+2;
//        point2 = point2+1;
//        $('.totalPoint').html(point+'점');
//        $('.total2Point').html('2점 득점 : '+point2+'골');
//        console.log(point);
//    });
//    
//    $('.3point').on('click',function(event){
//         point = point+3;
//        point3 = point3+1;
//        $('.totalPoint').html(point+'점');
//        $('.total3Point').html('3점 득점 : '+point3+'골');
//        console.log(point);
//    });
//    
//});


















