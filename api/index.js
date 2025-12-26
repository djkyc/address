export const config = { runtime: "edge" };

const data = {
  US: {
    names: [["Smith","James"],["Johnson","Michael"]],
    phones: "+1 (XXX) XXX-XXXX",
    addresses: ["New York","Los Angeles","San Francisco"]
  },
  CN: {
    names: [["Li","Wei"],["Wang","Ming"]],
    phones: "+86 1XX-XXXX-XXXX",
    addresses: ["北京","上海","广州"]
  },
  JP: {
    names: [["Sato","Hiroto"],["Suzuki","Ren"]],
    phones: "+81 90-XXXX-XXXX",
    addresses: ["东京","大阪"]
  },
  KR: {
    names: [["Kim","Minjun"],["Lee","Jihun"]],
    phones: "+82 10-XXXX-XXXX",
    addresses: ["首尔","釜山"]
  }
};

const rand = a => a[Math.floor(Math.random()*a.length)];

export default function handler(req) {
  const url = new URL(req.url);
  const country = url.searchParams.get("country") || "US";
  const c = data[country] || data.US;

  const [last, first] = rand(c.names);
  const phone = c.phones.replace(/X/g,()=>Math.floor(Math.random()*10));

  return new Response(JSON.stringify({
    name: `${last} ${first}`,
    gender: Math.random() > 0.5 ? "Male" : "Female",
    phone,
    address: rand(c.addresses),
    country
  }), {
    headers: {
      "content-type":"application/json",
      "access-control-allow-origin":"*"
    }
  });
}
