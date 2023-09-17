// Date -> string 변환 함수
const dateToStr = (date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}.${month}.${day}`;
};

// 유효성 검사 함수
const validateData = (date) => {
  const selectDateStr = dateToStr(new Date(date));
  return date === selectDateStr;
};

const $date = document.getElementById("date");
const $btnSubmit = document.getElementById("btn-submit");
const $startDate = document.querySelector("#start-date");

const today = new Date();
const todayStr = dateToStr(today);
$date.value = todayStr;

// 년, 월, 일 data 배열
const yearArr = Array(5)
  .fill()
  .map((_, index) => today.getFullYear() + index);
const monthArr = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, "0")
);
const dayArr = Array.from({ length: 31 }, (_, index) =>
  String(index + 1).padStart(2, "0")
);

// mobile-select 세팅
let mobileSelect1 = new MobileSelect({
  trigger: $startDate,
  title: "날짜를 선택해주세요.",
  connector: ".",
  ensureBtnText: "확인",
  cancelBtnText: "취소",
  wheels: [{ data: yearArr }, { data: monthArr }, { data: dayArr }],
  initValue: todayStr,
  onChange: function (data) {
    $date.value = data.join(".");
  },
});

// form 제출
$btnSubmit.addEventListener("click", () => {
  const date = $date.value;
  const result = date.split(".");

  // 날짜 미선택 시
  if (!date) return alert("날짜를 선택해주세요.");

  // 유효성 검사 실패 시
  if (!validateData(date)) return alert("유효하지 않은 날짜입니다.");

  // 유효성 검사 성공 시
  alert(`선택하신 날짜는 ${result[0]}년 ${result[1]}월 ${result[2]}일입니다.`);
});
