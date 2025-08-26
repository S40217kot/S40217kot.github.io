// localStorage に保存する新規登録ユーザーのキー
const EXTRA_USERS_KEY = 'extraUsers';

// users.json と localStorage を合体して返す
async function loadUsers() {
  const res = await fetch('users.json?v=1'); // キャッシュ回避のためのv=1は任意
  if (!res.ok) throw new Error('users.json load failed');
  const baseUsers = await res.json();

  const extra = JSON.parse(localStorage.getItem(EXTRA_USERS_KEY) || '[]');
  // 同じIDがある場合は「追加分を後勝ち」にしたいなら以下のように Map 化
  const map = new Map(baseUsers.map(u => [u.id, u]));
  for (const u of extra) map.set(u.id, u);
  return Array.from(map.values());
}

// 新規登録ユーザーを localStorage に追記保存
function saveExtraUser(user) {
  const extra = JSON.parse(localStorage.getItem(EXTRA_USERS_KEY) || '[]');
  extra.push(user);
  localStorage.setItem(EXTRA_USERS_KEY, JSON.stringify(extra));
}

// ログインフォームのセットアップ（index.html から呼ぶ）
function setupLogin() {
  const form = document.getElementById('loginForm');
  const errorEl = document.getElementById('error');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = '';

    const id = document.getElementById('userId').value.trim();
    const pass = document.getElementById('password').value;

    try {
      const users = await loadUsers();
      const ok = users.some(u => u.id === id && u.password === pass);
      if (ok) {
        localStorage.setItem('loggedInUser', id);
        location.href = 'member.html';
      } else {
        errorEl.textContent = 'IDまたはパスワードが違います。';
      }
    } catch {
      errorEl.textContent = 'ユーザーデータの読み込みに失敗しました。';
    }
  });
}
