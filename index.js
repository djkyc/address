export const config = { runtime: "edge" };

export default function handler() {
  return new Response(`<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <title>随机地址生成器</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">

  <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
    <h1 class="text-2xl font-bold text-center text-indigo-600 mb-6">
      🌍 随机地址生成器
    </h1>

    <div class="flex gap-2 mb-4">
      <select id="country" class="flex-1 border rounded-lg p-2">
        <option value="US">美国</option>
        <option value="CN">中国</option>
        <option value="JP">日本</option>
        <option value="KR">韩国</option>
      </select>

      <button onclick="load()" class="bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700">
        生成
      </button>
    </div>

    <div class="space-y-2 text-sm bg-gray-50 rounded-lg p-4">
      <div><strong>姓名：</strong><span id="name"></span></div>
      <div><strong>性别：</strong><span id="gender"></span></div>
      <div><strong>电话：</strong><span id="phone"></span></div>
      <div><strong>地址：</strong><span id="address"></span></div>
    </div>

    <p class="text-center text-xs text-gray-400 mt-6">
      Powered by Vercel Edge
    </p>
  </div>

<script>
async function load(){
  const country = document.getElementById('country').value;
  const res = await fetch('/api?country=' + country);
  const d = await res.json();

  document.getElementById('name').textContent = d.name;
  document.getElementById('gender').textContent = d.gender;
  document.getElementById('phone').textContent = d.phone;
  document.getElementById('address').textContent = d.address;
}
</script>

</body>
</html>`, {
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
