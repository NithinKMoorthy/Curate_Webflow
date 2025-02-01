export async function GET(req) {
    console.log("Proxy API HIT");
    try {
      const { searchParams } = new URL(req.url);
      let imageUrl = searchParams.get("url");
  
      if (!imageUrl) {
        return new Response(JSON.stringify({ error: "No URL provided" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      // Set default image in case of error
      const defaultImageUrl = "https://www.redditinc.com/assets/images/site/reddit-logo.png"; // Change this if needed
  
      // Fetch image from the given URL
      const response = await fetch(imageUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
  
      if (!response.ok) {
        console.error(`Image fetch failed (${response.status}) for:`, imageUrl);
        // Return default image instead
        const fallbackResponse = await fetch(defaultImageUrl);
        const fallbackBuffer = await fallbackResponse.arrayBuffer();
        return new Response(fallbackBuffer, {
          status: 200,
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "s-maxage=86400, stale-while-revalidate",
          },
        });
      }
  
      // If successful, return the fetched image
      const imageBuffer = await response.arrayBuffer();
      return new Response(imageBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "s-maxage=86400, stale-while-revalidate",
        },
      });
    } catch (error) {
      console.error("Unexpected error fetching image:", error);
      
      // Return the default Reddit icon in case of unexpected errors
      const fallbackResponse = await fetch("https://www.redditinc.com/assets/images/site/reddit-logo.png");
      const fallbackBuffer = await fallbackResponse.arrayBuffer();
      return new Response(fallbackBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "s-maxage=86400, stale-while-revalidate",
        },
      });
    }
  }
  