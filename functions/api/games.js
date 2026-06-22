export async function onRequestGet() {
  try {
    const response = await fetch("https://worldcup26.ir/get/games", {
      cf: { cacheTtl: 0, cacheEverything: false },
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
  } catch (error) {
    console.error("Live games request failed", error);
    return new Response(JSON.stringify({ games: [] }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store, max-age=0",
        "access-control-allow-origin": "*",
      },
    });
  }
}
