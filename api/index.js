// ================== 数据区 ==================

// 国家坐标数据
const countryCoordinates = {
  US: [{ lat: 37.7749, lng: -122.4194 }, { lat: 34.0522, lng: -118.2437 }],
  UK: [{ lat: 51.5074, lng: -0.1278 }, { lat: 53.4808, lng: -2.2426 }],
  FR: [{ lat: 48.8566, lng: 2.3522 }, { lat: 45.764, lng: 4.8357 }],
  DE: [{ lat: 52.52, lng: 13.405 }, { lat: 48.1351, lng: 11.582 }],
  CN: [
    { lat: 39.9042, lng: 116.4074 },
    { lat: 31.2304, lng: 121.4737 },
    { lat: 23.1291, lng: 113.2644 }
  ],
  JP: [{ lat: 35.6895, lng: 139.6917 }],
  KR: [{ lat: 37.5665, lng: 126.978 }],
  TW: [{ lat: 25.033, lng: 121.5654 }],
  HK: [{ lat: 22.3193, lng: 114.1694 }]
};

// 姓名数据（简化版，够用）
const namesByCountry = {
  US: { first: ["Smith", "Johnson"], last: ["James", "Michael"] },
  CN: { first: ["Li", "Wang"], last: ["Wei", "Ming"] },
  JP: { first: ["Sato"], last: ["Hiroto"] },
  KR: { first: ["Kim"], last: ["Minjun"] },
  UK: { first: ["Brown"], last: ["Oliver"] },
  FR: { first: ["Martin"], last: ["Lucas"] },
  DE: { first: ["Schmidt"], last: ["Ben"] }
};

// 电话格式
const phoneFormats = {
  US: "+1 (XXX) XXX-XXXX",
  CN: "+86 1XX-XXXX-XXXX",
  JP: "+81 90-XXXX-XXXX",
  KR: "+82 10-XXXX-XXXX"
};

// ================== 工具函数 ==================

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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
  let format = phoneFormats[country] || phoneFormats.US;
  return format.replace(/X/g, () => Math.floor(Math.random() * 10));
}

function isValidAddress(d) {
  return d?.address?.road && (d.address.city || d.address.town);
}

// ================== HTML 页面 ==================

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
  cons
