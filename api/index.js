export const config = {
  runtime: "edge"
};

const html = `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<title>随机地址生成器</title>
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
body{font-family:system-ui;padding:40px;background:#f5f7fb}
button{padding:10px 16px;font-size:16px}
pre{background:#fff;padding:16px;border-radius:8px}
</style>
</head>
<body>
<h1>随机地址生成器</h1>
<button onclick="load()">生成地址</button>
<pre id="out">点击生成</pre>
<script>
async function load(){
  const r = await fetch('/api?country=US');
  document.getElementById('out').textContent =
    JSON.stringify(await r.json(),null,2);
}
</script>
</body>
</html>`;

export default async function handler(request) {
  const url = new URL(request.url);

  // 首页
  if (url.pathname === "/") {
    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }

  // API
  if (url.pathname === "/api") {
    return new Response(JSON.stringify({
      ok: true,
      msg: "API works",
      country: url.searchParams.get("country") || "US"
    }), {
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      }
    });
  }

  return new Response("Not Found", { status: 404 });
}
