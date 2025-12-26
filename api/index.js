// ================== 数据 ==================

const countryCoordinates = {
  US: [{ lat: 37.7749, lng: -122.4194 }, { lat: 34.0522, lng: -118.2437 }],
  CN: [{ lat: 39.9042, lng: 116.4074 }, { lat: 31.2304, lng: 121.4737 }],
  JP: [{ lat: 35.6895, lng: 139.6917 }],
  KR: [{ lat: 37.5665, lng: 126.978 }]
};

const namesByCountry = {
  US: { first: ["Smith", "Johnson"], last: ["James", "Michael"] },
  CN: { first: ["Li", "Wang"], last: ["Wei", "Ming"] },
  JP: { first: ["Sato"], last: ["Hiroto"] },
  KR: { first: ["Kim"], last: ["Minjun"] }
};

const phoneFormats = {
  US: "+1 (XXX) XXX-XXXX",
  CN: "+86 1XX-XXXX-XXXX",
  JP: "+81 90-XXXX-XXXX",
  KR: "+82 10-XXXX-XXXX"
};

// ================== 工具函数 ==================

const random = arr => arr[Math.floor(Math.random() * arr.length)];

function getRandomLocation(country) {
  const base = random(countryCoordinates[country]);
  return {
    lat: base.lat + (Math.random() - 0.5) * 0.05,
    lng: base.lng + (Math.random() - 0.5) * 0.05
  };
}

function getRandomName(country) {
  const n = namesByCountry[country] || namesByCountry.US;
  return `${random(n.first)} ${random(n.last)}`;
}

function getRandomPhone(country) {
  const format = phoneFormats[country] || phoneFormats.US;
  return format.replace(/X/g, () => Math.floor(Math.random() * 10));
}

function isValidAddress(d) {
  return d?.address?.road && (d.address.city || d.address.town);
}

// ================== HTML ==================

const html = `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<title>随机地址生成器</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
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

// ================== 主处理 ==================

async function handleRequest(request) {
  const url = new URL(request.url);

  // API
  if (url.pathname === "/api") {
    const country = url.searchParams.get("country") || "US";

    if (!countryCoordinates[country]) {
      return json({ error: "Invalid country" }, 400);
    }

    for (let i = 0; i < 10; i++) {
      const loc = getRandomLocation(country);
      const api = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.lat}&lon=${loc.lng}&zoom=18&addressdetails=1`;

      const r = await fetch(api, {
        headers: { "User-Agent": "Vercel-Edge" }
      });

      const d = await r.json();
      if (isValidAddress(d)) {
        return json({
          name: getRandomName(country),
          gender: Math.random() > 0.5 ? "Male" : "Female",
          phone: getRandomPhone(country),
          address: `${d.address.road}, ${d.address.city || d.address.town}`,
          coordinates: loc
        });
      }
    }

    return json({ error: "Failed to generate address" }, 500);
  }

  // 页面
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*"
    }
  });
}

// ================== Vercel Edge 导出 ==================

export const config = {
  runtime: "edge"
};

export default handleRequest;
