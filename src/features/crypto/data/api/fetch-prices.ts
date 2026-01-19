// types
import type { CryptoApiType, CryptoAssetType } from "../../domain/crypto-asset";

/**
 * Fetches the latest cryptocurrency prices from the Binance API.
 *
 * This function retrieves the 24-hour ticker data for all trading pairs
 * from Binance, selects the first 200 items, and maps them into the
 * internal `CryptoAssetType` format used in the app.
 *
 * @param signal Optional AbortSignal to cancel the request if needed.
 *
 * @returns A Promise that resolves to an array of `CryptoAssetType` objects.
 * Each object contains:
 * - `id`: the symbol of the asset (e.g., "BTCUSDT")
 * - `symbol`: same as `id`
 * - `price`: the last traded price (as a number)
 * - `change24h`: the 24-hour price change percentage (as a number)
 * - `trend`: initialized as "same"; will be updated elsewhere based on previous prices
 *
 * @throws Will throw an Error if the network response is not ok.
 *
 * @example
 * ```ts
 * const prices = await fetchPrices();
 * console.log(prices[0].symbol); // "BTCUSDT"
 * console.log(prices[0].price);  // 27834.12
 * ```
 */
export async function fetchPrices(
  signal?: AbortSignal,
): Promise<CryptoAssetType[]> {
  const response = await fetch("https://api.binance.com/api/v3/ticker/24hr", {
    signal,
  });

  if (!response.ok) {
    throw new Error("Network error");
  }

  const data: CryptoApiType[] = await response.json();

  // Map the API data to the internal CryptoAssetType format
  return data.slice(0, 200).map((item) => ({
    id: item.symbol,
    symbol: item.symbol,
    price: Number(item.lastPrice),
    change24h: Number(item.priceChangePercent),
    trend: "same",
  }));
}
