// 暗号学的乱数を使って安全に生成
function cryptoRandomInt(min, max) {
  const range = max - min + 1;
  if (range <= 0) return min;
  const maxUint32 = 0xFFFFFFFF;
  const limit = Math.floor(maxUint32 / range) * range;
  const arr = new Uint32Array(1);
  let num;
  do {
    crypto.getRandomValues(arr);
    num = arr[0];
  } while (num >= limit);
  return min + (num % range);
}

document.getElementById("generateBtn").addEventListener("click", () => {
  const min = parseInt(document.getElementById("min").value, 10);
  const max = parseInt(document.getElementById("max").value, 10);
  const count = parseInt(document.getElementById("count").value, 10);
  const unique = document.getElementById("unique").checked;
  const resultBox = document.getElementById("result");

  if (isNaN(min) || isNaN(max) || min > max) {
    resultBox.textContent = "最小値と最大値を正しく入力してください";
    return;
  }

  if (unique && count > (max - min + 1)) {
    resultBox.textContent = "ユニーク抽選の個数が範囲を超えています";
    return;
  }

  const results = [];
  const used = new Set();

  while (results.length < count) {
    const num = cryptoRandomInt(min, max);
    if (unique) {
      if (!used.has(num)) {
        used.add(num);
        results.push(num);
      }
    } else {
      results.push(num);
    }
  }

  resultBox.textContent = results.join(", ");
});
