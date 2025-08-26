const form = document.getElementById('loginForm');
const errorEl = document.getElementById('error');
const loginArea = document.getElementById('loginArea');
const welcomeArea = document.getElementById('welcomeArea');
const welcomeMsg = document.getElementById('welcomeMsg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorEl.textContent = "";

  const id = document.getElementById('userId').value.trim();
  const password = document.getElementById('password').value;

  try {
    // 同じリポジトリ内の users.json を取得
    const res = await fetch('users.json');
    const users = await res.json();

    const user = users.find(u => u.id === id && u.password === password);

    if (user) {
      welcomeMsg.textContent = `${id} 様、ようこそ！`;
      loginArea.style.display = 'none';
      welcomeArea.style.display = 'block';
    } else {
      errorEl.textContent = "IDまたはパスワードが違います。";
    }
  } catch (err) {
    errorEl.textContent = "ユーザーデータの読み込みに失敗しました。";
  }
});
