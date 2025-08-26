const form = document.getElementById('loginForm');
const errorEl = document.getElementById('error');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = "";

    const id = document.getElementById('userId').value.trim();
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('users.json');
      const users = await res.json();

      const user = users.find(u => u.id === id && u.password === password);

      if (user) {
        // ログイン状態を保存
        localStorage.setItem('loggedInUser', id);
        // 会員ページへ移動
        location.href = 'member.html';
      } else {
        errorEl.textContent = "IDまたはパスワードが違います。";
      }
    } catch (err) {
      errorEl.textContent = "ユーザーデータの読み込みに失敗しました。";
    }
  });
}
