export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('access_token'));
    if (token) {
      return { Authorization: token };
    } else {
      return {};
    }
  }