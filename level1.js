$(document).ready(function() {
    // 페이지가 로드될 때 페이드 인 효과 적용
    $('body').addClass('fade-in');

    // 페이지 이동 함수
    function goToPage(url) {
        $('body').addClass('fade-out'); // 페이드 아웃 효과 추가
        setTimeout(function() {
            window.location.href = url; // 지정된 시간 후에 새로운 페이지로 이동
        }, 500); // 페이드 아웃 애니메이션 시간과 동일
    }

    // 돌아가기 버튼 클릭 시 이전 html로 이동
    $('.back-button').click(function() {
        goToPage('level.html'); 
    });

    // 시작 버튼 클릭 시 새로운 블록 생성
    $('.play-button').click(function() {
       createPopup('level1_step1.html', 'level1_choice.png');
    });

    // 팝업 블록 생성 함수
    function createPopup(pageUrl, backgroundImageUrl) {

        // 새로운 블록 생성
        var popupBlock = $('<div class="popup-block"></div>');
        popupBlock.css({
            position: 'absolute', 
            top: '170px', 
            left: '50%', // 수평 가운데 정렬
            transform: 'translateX(-50%)',
            backgroundImage: 'url(' + backgroundImageUrl + ')', // 배경 이미지 지정
            backgroundSize: 'cover', 
            width: '600px',
            height: '419px',
            border: 'none',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            zIndex: '9999' // 요소 맨 위에 표시
        });

        // 시작하기 전 인트로 story 적기
        var start_intro = $('<div></div>');
        start_intro.css({
            // innerBlock이랑 크기 같음
            width: '520px',
            height: '210px',
            border: 'none',
            position: 'absolute', 
            margin: '100px 40px 50px 40px',
            ackgroundColor: 'transparent', 
            backgroundImage: 'url("ep1_start_intro.png")', 
            backgroundSize: 'cover' 
        });

        popupBlock.append(start_intro);

        // 선택가능한 쿠키들 보여주는 블록
        var innerBlock = $('<div class="inner-block"></div>');
        innerBlock.css({
            // start_intro랑 크기 같음
            width: '520px',
            height: '210px',
            border: 'none',
            position: 'absolute', 
            margin: '100px 40px 50px 40px',
            overflow: 'auto', // 내용이 넘칠 경우 스크롤 허용
            display: 'flex', // 버튼을 가로로 배열하기 위해 flex 사용
            justifyContent: 'space-around', // 가로 방향으로 공간을 균등하게 분배
            //alignItems: 'center' // 세로 방향으로 가운데 정렬
        });

        // 쿠키변경 버튼 추가
        // 공주맛 쿠키
        var cbutton1 = $('<button class="cookie-button"></button>');
        cbutton1.css({ 
            width: '170px', 
            height: '206px', 
            border: 'none',
            backgroundColor: 'transparent', 
            backgroundImage: 'url("princess1_cookie.png")', 
            backgroundSize: 'cover' 
        });

        function princessCookie(){ // 보너스타임을 더 오래 지속시켜준다.
            sessionStorage.setItem('paddleWidth', '200'); // 패들 길이 초기화
            sessionStorage.setItem('dx', '1.5');
            sessionStorage.setItem('dy', '-1.5'); // 공 속도 초기화
            sessionStorage.setItem('hearts', '3'); // 하트 갯수 초기화

            sessionStorage.setItem('wolfAbilityActive', 'false'); // 웨어울프 능력 비활성화

            sessionStorage.setItem('snowAbilityActive', 'false'); // 눈설탕 능력 비활성화

            sessionStorage.setItem('paddleSpeed', 5); // 패들 이동속도
            sessionStorage.setItem('ballRadius', 10); // 공 반지름
        }

        // 눈설탕맛 쿠키
        var cbutton2 = $('<button class="cookie-button"></button>');
        cbutton2.css({ 
            width: '170px', 
            height: '206px', 
            border: 'none',
            backgroundColor: 'transparent', 
            backgroundImage: 'url("snow1_cookie.png")', 
            backgroundSize: 'cover' 
        });

        function snowCookie(){ // 하단에 얼음벽을 생성한다.
            sessionStorage.setItem('paddleWidth', '100'); // 패들 길이 초기화
            sessionStorage.setItem('dx', '2'); // 공 속도 초기화
            sessionStorage.setItem('dy', '-2'); // 공 속도 초기화
            sessionStorage.setItem('hearts', '3'); // 하트 갯수 초기화

            sessionStorage.setItem('wolfAbilityActive', 'false'); // 웨어울프 능력 비활성화

            sessionStorage.setItem('snowAbilityActive', 'true'); // 눈설탕 능력 활성화
        }

        // 웨어울프맛 쿠키
        var cbutton3 = $('<button class="cookie-button"></button>');
        cbutton3.css({ 
            width: '170px', 
            height: '200px', 
            border: 'none',
            backgroundColor: 'transparent', 
            backgroundImage: 'url("wolf1_cookie.png")', 
            backgroundSize: 'cover' 
        });

        function wolfCookie(){ // 일정확률로 떨어진 공을 부활시킨다.
            sessionStorage.setItem('paddleWidth', '100'); // 패들 길이 초기화
            sessionStorage.setItem('dx', '2'); // 공 속도 초기화
            sessionStorage.setItem('dy', '-2'); // 공 속도 초기화
            sessionStorage.setItem('hearts', '3'); // 하트 갯수 초기화

            sessionStorage.setItem('wolfAbilityActive', 'true'); // 웨어울프 능력 활성화
        }

        // 각 버튼의 클릭된 상태를 추적하는 변수들
        var princessClicked = false;
        var snowClicked = false;
        var wolfClicked = false;

        // princess 버튼
        cbutton1.hover(function() {
            // 클릭되지 않았을 때만 hover 효과 적용
            if (!princessClicked) {
                $(this).css('backgroundImage', 'url("princess_skill.png")');
            }
        }, function() {
            if (!princessClicked) {
                $(this).css('backgroundImage', 'url("princess1_cookie.png")');
            }
        });

        cbutton1.click(function() {
            princessCookie();
            if (!princessClicked) {
                princessClicked = true;
                $(this).css('backgroundImage', 'url("princess2_cookie.png")');
                // 다른 버튼들의 클릭 상태 및 hover 상태 해제
                snowClicked = false;
                wolfClicked = false;
                cbutton2.css('backgroundImage', 'url("snow1_cookie.png")');
                cbutton3.css('backgroundImage', 'url("wolf1_cookie.png")');
            } else {
                princessClicked = false;
                $(this).css('backgroundImage', 'url("princess1_cookie.png")');
            }
        });

        // snow 버튼
        cbutton2.hover(function() {
            if (!snowClicked) {
                $(this).css('backgroundImage', 'url("snow_skill.png")');
            }
        }, function() {
            if (!snowClicked) {
                $(this).css('backgroundImage', 'url("snow1_cookie.png")');
            }
        });

        cbutton2.click(function() {
            snowCookie();
            if (!snowClicked) {
                snowClicked = true;
                $(this).css('backgroundImage', 'url("snow2_cookie.png")');
                princessClicked = false;
                wolfClicked = false;
                cbutton1.css('backgroundImage', 'url("princess1_cookie.png")');
                cbutton3.css('backgroundImage', 'url("wolf1_cookie.png")');
            } else {
                snowClicked = false;
                $(this).css('backgroundImage', 'url("snow1_cookie.png")');
            }
        });

        // wolf 버튼
        cbutton3.hover(function() {
            if (!wolfClicked) {
                $(this).css('backgroundImage', 'url("wolf_skill.png")');
            }
        }, function() {
            if (!wolfClicked) {
                $(this).css('backgroundImage', 'url("wolf1_cookie.png")');
            }
        });

        cbutton3.click(function() {
            wolfCookie();
            if (!wolfClicked) {
                wolfClicked = true;
                $(this).css('backgroundImage', 'url("wolf2_cookie.png")');
                princessClicked = false;
                snowClicked = false;
                cbutton1.css('backgroundImage', 'url("princess1_cookie.png")');
                cbutton2.css('backgroundImage', 'url("snow1_cookie.png")');
            } else {
                wolfClicked = false;
                $(this).css('backgroundImage', 'url("wolf1_cookie.png")');
            }
        });


        // innerBlock에 버튼 추가
        innerBlock.append(cbutton1);
        innerBlock.append(cbutton2);
        innerBlock.append(cbutton3);


        // 쿠키변경 버튼 (하단 왼쪽)
        var cbutton = $('<button></button>');
        cbutton.css({ 
            position: 'absolute',
            top: '360px', 
            left: '110px', 
            width: '170px', 
            height: '56.5px', 
            border: 'none',
            transition: 'transform 0.2s ease',
            backgroundColor: 'transparent', 
            backgroundImage: 'url("choice_button.png")', 
            backgroundSize: 'cover' 
        });
        cbutton.hover(function() {
            $(this).css('transform', 'scale(1.1)'); 
        }, function() {
            $(this).css('transform', 'scale(1)'); // 호버 해제 시에 크기 복원
        });

        // 처음엔 쿠키 선택 못하게
        innerBlock.hide();

    cbutton.click(function() {

    // 쿠키 변경 버튼 클릭 시 내부 블록 토글
        innerBlock.toggle();
        start_intro.hide();
        // 내부 블록이 보일 때
        if (innerBlock.is(":visible")) {
            // cbutton 이미지를 쿠키선택 -> 선택완료로 변경
            cbutton.css('backgroundImage', 'url("choice_button_active.png")');

            // 플레이 버튼 추가
            var button = $('<button></button>');
            button.css({ 
                position: 'absolute',
                top: '360px', 
                right: '110px', 
                width: '170px', 
                height: '55.5px', 
                border: 'none',
                transition: 'transform 0.2s ease',
                backgroundColor: 'transparent', 
                backgroundImage: 'url("play2_button_not.png")', 
                backgroundSize: 'cover' 
            });

            // button변수가 함수 내에서 정의되어 있으므로 함수내에서 append해줘야 함
            popupBlock.append(button);
        } else {
            // 내부 블록이 사라질 때
            start_intro.toggle();

            // cbutton 이미지 원래대로 복원
            cbutton.css('backgroundImage', 'url("choice_button.png")');

            var button = $('<button></button>');
            button.css({ 
                position: 'absolute',
                top: '360px', 
                right: '110px', 
                width: '170px', 
                height: '56.5px', 
                border: 'none',
                transition: 'transform 0.2s ease',
                backgroundColor: 'transparent', 
                backgroundImage: 'url("play2_button.png")', 
                backgroundSize: 'cover' 
            });

            button.hover(function() {
                $(this).css('transform', 'scale(1.1)'); 
            }, function() {
                $(this).css('transform', 'scale(1)'); 
            });

            button.click(function() {
                goToPage(pageUrl);
            });

            popupBlock.append(button);
        }
    });

        // 닫기 버튼
        var closeButton = $('<button class="close-button"></button>');
        closeButton.css({
            position: 'absolute',
            top: '60px',
            right: '23px',
            width: '40px',
            height: '40px',
            border: 'none',
            backgroundColor: 'transparent',
            backgroundImage: 'url("x_button.png")', 
            backgroundSize: 'cover' 
        });

        closeButton.click(function() {
            popupBlock.remove(); // 팝업 블록 제거
        });

        popupBlock.append(cbutton);
        popupBlock.append(closeButton);
        popupBlock.append(innerBlock);

        // body에 새로운 블록 추가
        $('body').append(popupBlock);
    }
});
