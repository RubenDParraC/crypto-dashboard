import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

// fetcher
import { fetchPrices } from "../../data/api/fetch-prices";

// types
import type { CryptoAssetType } from "../../domain/crypto-asset";

// utils
import { getCachedCrypto, saveCrypto } from "../../data/local/crypto-storage";

/**
 * Custom hook to poll cryptocurrency prices from the API.
 *
 * This hook handles:
 * - Fetching data from Binance API at regular intervals.
 * - Calculating price trends (`up`, `down`, `same`) based on previous values.
 * - Caching the latest data in AsyncStorage for offline access.
 * - Managing app lifecycle to abort requests when the app goes to background.
 * - Exposing refresh capability for pull-to-refresh.
 *
 * @param interval - Optional polling interval in milliseconds. Default is 10,000 ms (10 seconds).
 *
 * @returns An object containing:
 * - `data`: Array of `CryptoAssetType` with latest prices and trend.
 * - `loading`: Boolean indicating if data is being loaded.
 * - `error`: Error object if fetching failed.
 * - `refresh`: Function to manually trigger a data reload.
 *
 * @example
 * ```ts
 * const { data, loading, error, refresh } = useCryptoPolling();
 * ```
 */
export function useCryptoPolling(interval = 10_000) {
  // State to hold crypto data, loading status, and error
  const [data, setData] = useState<CryptoAssetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Ref to manage AbortController for cancelling in-flight requests
  const controllerRef = useRef<AbortController | null>(null);

  // Ref to store previous prices for trend calculation
  const previousPricesRef = useRef<Map<string, number>>(new Map());

  // Ref to track the current app state
  const appState = useRef(AppState.currentState);

  /**
   * Fetch data from API and update state.
   *
   * Steps:
   * 1. Abort previous request if still pending.
   * 2. Fetch fresh data from API.
   * 3. Compare each asset with previous price to calculate trend.
   * 4. Save data to AsyncStorage for offline access.
   * 5. Update state with fresh or cached data.
   * 6. Handle errors gracefully.
   */
  const load = async () => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    try {
      const fresh = await fetchPrices(controllerRef.current.signal);

      const previousMap = new Map(previousPricesRef.current);

      const withTrend: CryptoAssetType[] = fresh.map((item) => {
        const prevPrice = previousMap.get(item.id);

        const trend: CryptoAssetType["trend"] =
          prevPrice === undefined
            ? "same"
            : item.price > prevPrice
              ? "up"
              : item.price < prevPrice
                ? "down"
                : "same";

        previousMap.set(item.id, item.price);

        return {
          ...item,
          trend,
        };
      });

      previousPricesRef.current = previousMap;

      setData(withTrend);
      saveCrypto(withTrend);
      setError(null);
    } catch (err) {
      // Fallback to cached data if API fails
      const cached = await getCachedCrypto();
      if (cached) {
        setData(cached);
      }
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // Setup polling and app lifecycle management
  useEffect(() => {
    load();

    const intervalId = setInterval(load, interval);

    const subscription = AppState.addEventListener("change", (nextState) => {
      // Abort request if app goes to background
      if (appState.current === "active" && nextState === "background") {
        controllerRef.current?.abort();
      }
      appState.current = nextState;
    });

    return () => {
      clearInterval(intervalId);
      controllerRef.current?.abort();
      subscription.remove();
    };
  }, [interval]);

  // Return state and refresh function
  return {
    data,
    loading,
    error,
    refresh: load,
  };
}
