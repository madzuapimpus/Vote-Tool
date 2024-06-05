export async function GET(req, res) {
  console.log("Method:.................. ");

  return new Response(JSON.stringify({ isAuthenticated: false }));
}

const adminPin = 2137;
const adminUserName = "meow";

export async function POST(req, res) {
  const body = await req.json();

  const isAuthenticated =
    body.pin == adminPin && body.userName === adminUserName;

  if (!isAuthenticated) {
    return new Response(undefined, {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ isAuthenticated }));
}
