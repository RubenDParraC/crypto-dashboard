// external components
import AsyncStorage from "@react-native-async-storage/async-storage";

// types
import type { CryptoAssetType } from "../../domain/crypto-asset";

const KEY = "CRYPTO_CACHE";

/**
 * Saves an array of cryptocurrency assets to local storage.
 *
 * This function stores the provided `CryptoAssetType` array in AsyncStorage
 * under a predefined key (`CRYPTO_CACHE`) as a JSON string.
 *
 * @param data - An array of `CryptoAssetType` objects to persist locally.
 *
 * @returns A Promise that resolves when the data has been successfully saved.
 *
 * @example
 * ```ts
 * await saveCrypto([{ id: "BTCUSDT", symbol: "BTCUSDT", price: 27834, change24h: 2.3, trend: "up" }]);
 * ```
 */
export async function saveCrypto(data: CryptoAssetType[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}

/**
 * Retrieves the cached cryptocurrency assets from local storage.
 *
 * This function reads the stored JSON string from AsyncStorage (under `CRYPTO_CACHE`)
 * and parses it back into an array of `CryptoAssetType`. If no data is stored,
 * it returns `null`.
 *
 * @returns A Promise that resolves to an array of `CryptoAssetType` if cached,
 * or `null` if no cached data exists.
 *
 * @example
 * ```ts
 * const cached = await getCachedCrypto();
 * if (cached) {
 *   console.log(cached[0].symbol); // "BTCUSDT"
 * }
 * ```
 */
export async function getCachedCrypto(): Promise<CryptoAssetType[] | null> {
  const cached = await AsyncStorage.getItem(KEY);
  return cached ? JSON.parse(cached) : null;
}
