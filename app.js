const buttons = document.querySelectorAll(".btn");

const pages = {
    mainPage: document.getElementById("mainPage"),
    hospitalPage: document.getElementById("hospitalPage"),
    informationPage: document.getElementById("informationPage"),
    dayPage: document.getElementById("dayPage"),
    timePage: document.getElementById("timePage"),
    inventoryPage: document.getElementById("inventoryPage"),
    inputPage: document.getElementById("inputPage"),
    mapPage: document.getElementById("mapPage")
};

function changePage(targetPageId) {
    // 모든 페이지 숨김 처리
    Object.values(pages).forEach(page => {
        if (page && page.classList) {
            page.classList.remove("active");
        }
    });

    // 타겟 페이지 활성화
    if (pages[targetPageId] && pages[targetPageId].classList) {
        pages[targetPageId].classList.add("active");
    }

    // 💥 중요: 다음 페이지로 넘어갔을 때 이전 페이지의 스크롤 위치에 머물지 않도록 최상단 강제 리셋
    window.scrollTo(0, 0);
}

// 안전한 버튼 바인딩 (존재하지 않는 타겟 페이지 예외 처리)
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        if (target && pages[target]) {
            changePage(target);
        }
    });
});

// 인풋 데이터 에러 방어 처리
const year = document.getElementById("dateInput1");
const month = document.getElementById("dateInput2");
const day = document.getElementById("dateInput3");

if (year && month && day) {
    function checkInput() {
        if (year.value.length === 4 && month.value.length === 2 && day.value.length === 2) {
            changePage("timePage");
        }
    }

    [year, month, day].forEach((input) => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/[^0-9]/g, '');
            checkInput();
        });
    });
}

const submitBtn = document.getElementById("complete");
const message = document.getElementById("message");

if (submitBtn && message) {
    submitBtn.onclick = function () {
        message.readOnly = false;
        message.focus();
    };
}