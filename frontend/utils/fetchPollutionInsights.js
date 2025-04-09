export async function fetchPollutionInsights(historicalPollutants) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/generate-insights`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(historicalPollutants),
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error("Error from backend:", error);
        throw new Error(error?.error || "Failed to fetch insights.");
      }
  
      const data = await response.json();
      return {
        possible_causes: data.possible_causes,
        health_recommendation: data.health_recommendation,
        insights: data.insights,
      };
    } catch (err) {
      console.error("API error:", err);
      return {
        possible_causes: null,
        health_recommendation: null,
        insights: [],
        error: err.message,
      };
    }
  }
  