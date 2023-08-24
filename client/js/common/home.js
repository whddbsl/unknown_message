import { tiger } from "../../lib/utils/tiger.js";

const code = new URL(window.location.href).searchParams.get("code");

console.log(code);

const REST_API_KEY = "9b8a9e552eb6a09fd2e055df11744ef7";
const REDIRECT_URI = "http://localhost:5500/views/home.html";

// Redirect URI에서 인가 코드 추출
const urlParams = new URLSearchParams(window.location.search);
const authCode =
    {authCode : JSON.stringify(urlParams.get("code"))}


const userProfile = document.getElementById("user-profile");

console.log(authCode);

tiger.post('backURL', {
    authCode : authCode,
}).then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error("에러 발생: ", error);
});

// 카카오 액세스 토큰(인가 코드) 요청
if (authCode) {
  const tokenURL = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${authCode}`;
  fetch(tokenURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const accessToken = data.access_token;

      // 카카오 사용자 정보 요청
      const userInfoURL = "https://kapi.kakao.com/v2/user/me";
      fetch(userInfoURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          const userId = userData.id;
          const userName = userData.properties.nickname;

          // 이제 userId와 userName을 사용할 수 있습니다.
          alert(`사용자 ID: ${userId}\n사용자 이름: ${userName}`);
        })
        .catch((error) => {
          console.error("사용자 정보 가져오기 실패: " + error);
        });
    })
    .catch((error) => {
      console.error("액세스 토큰 가져오기 실패: " + error);
    });
}
