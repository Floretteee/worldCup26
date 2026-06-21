export async function GET() {
  const response = await fetch("https://worldcup26.ir/get/games", {
    headers: { accept: "application/json" },
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json",
      "cache-control": "no-store, max-age=0",
      "access-control-allow-origin": "*",
    },
  });
}
