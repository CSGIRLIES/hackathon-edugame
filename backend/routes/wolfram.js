import express from "express";
import fetch from "node-fetch";

const router = express.Router();

const WOLFRAM_API_URL = "https://api.wolframalpha.com/v2/query";

/**
 * POST /api/wolfram/query
 *
 * Body:
 * {
 *   "input": "expression ou question Wolfram",
 *   "params"?: { ...options avancées passées à Wolfram Alpha ... }
 * }
 *
 * Utilisation prévue :
 * - Vérifier / évaluer une expression Wolfram
 * - Récupérer une explication textuelle (pods) venant de Wolfram Alpha
 */
router.post("/query", async (req, res) => {
  try {
    const appId = process.env.WOLFRAM_APPID;
    if (!appId) {
      return res.status(500).json({
        error: "WOLFRAM_APPID is not set in environment",
      });
    }

    const { input, params = {} } = req.body || {};

    if (!input || typeof input !== "string") {
      return res.status(400).json({ error: "Missing or invalid 'input'" });
    }

    const searchParams = new URLSearchParams({
      appid: appId,
      input,
      output: "JSON",
      // On peut ajuster ces options plus tard pour cibler certains pods
      ...Object.fromEntries(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ),
    });

    const url = `${WOLFRAM_API_URL}?${searchParams.toString()}`;

    const wolframRes = await fetch(url);
    if (!wolframRes.ok) {
      const text = await wolframRes.text().catch(() => "");
      console.error("[WolframRoute] HTTP error from Wolfram Alpha:", text);
      return res
        .status(502)
        .json({ error: "Wolfram Alpha API error", status: wolframRes.status });
    }

    const data = await wolframRes.json();

    // data.queryresult contient les pods (résultat, explications, etc.)
    const queryResult = data.queryresult || {};
    const pods = Array.isArray(queryResult.pods) ? queryResult.pods : [];

    // On essaie de trouver un résultat principal (pod "Result" ou primary=true)
    let primaryPod = pods.find((p) => p.primary) ||
      pods.find((p) => (p.id || "").toLowerCase() === "result");

    let primaryPlaintext = "";
    if (primaryPod && Array.isArray(primaryPod.subpods) && primaryPod.subpods[0]) {
      primaryPlaintext = primaryPod.subpods[0].plaintext || "";
    }

    // On construit une liste d'explications textuelles simples
    const explanations = pods
      .map((pod) => {
        const title = pod.title || pod.id || "";
        const firstSubpod = Array.isArray(pod.subpods) ? pod.subpods[0] : null;
        const plaintext = firstSubpod?.plaintext || "";
        return plaintext
          ? {
              title,
              plaintext,
            }
          : null;
      })
      .filter(Boolean);

    return res.json({
      status: "success",
      input,
      primaryResult: primaryPlaintext,
      explanations,
      // On renvoie aussi une version brute si tu veux exploiter tous les pods côté frontend
      raw: queryResult,
    });
  } catch (err) {
    console.error("[WolframRoute] Unexpected error", err);
    return res.status(500).json({ error: "Failed to query Wolfram Alpha" });
  }
});

export default router;
