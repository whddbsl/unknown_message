const loginButton = document.getElementById("kakao-login-btn");

// Kakao.init("eb30d553464bbd8de3a99db0f981a054");

// function kakaoLogin() {
//   Kakao.Auth.login({
//     success: function (authObj) {
//       Kakao.API.request({
//         url: "/v2/user/me",
//         success: function (response) {
//           let userId = response.id;
//           let userName = response.properties.nickname;
//           alert(
//             "로그인 성공!\n사용자 ID: " + userId + "\n사용자 이름: " + userName
//           );
//         },
//         fail: function (error) {
//           alert("로그인 실패!\n" + JSON.stringify(error));
//         },
//       });
//     },
//     fail: function (err) {
//       alert(JSON.stringify(err));
//     },
//   });
// }


// loginButton.addEventListener("click", kakaoLogin);

const REST_API_KEY = '9b8a9e552eb6a09fd2e055df11744ef7';
const REDIRECT_URI = 'http://localhost:5500/views/home.html';

const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const handleLogin = () => {
  window.location.href = kakaoURL;
}

loginButton.addEventListener("click", handleLogin);

