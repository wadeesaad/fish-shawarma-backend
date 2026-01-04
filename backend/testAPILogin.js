import fetch from "node-fetch";

async function testLogin() {
  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "admin",
      password: "12345" // use your plain password here
    })
  });

  const data = await response.json();
  console.log(data);
}

testLogin().catch(err => console.error(err));
