/**
 * Represents a cryptocurrency asset in the application.
 *
 * This is the internal model used throughout the app after mapping
 * the API response. It contains the key properties needed for
 * display, calculations, and trend tracking.
 */
export interface CryptoAssetType {
  /** Unique identifier for the asset (typically the trading pair symbol, e.g., "BTCUSDT") */
  id: string;

  /** The symbol of the asset (e.g., "BTCUSDT") */
  symbol: string;

  /** Current price of the asset as a number */
  price: number;

  /** 24-hour price change percentage as a number */
  change24h: number;

  /**
   * Trend of the asset compared to the previous price.
   * Can be "up" if price increased, "down" if decreased, or "same" if unchanged.
   * Optional because it may be calculated after fetching data.
   */
  trend?: "up" | "down" | "same";
}

/**
 * Represents the raw cryptocurrency data returned by the Binance API.
 *
 * This interface matches the API response exactly and is used
 * when fetching prices before mapping to `CryptoAssetType`.
 */
export interface CryptoApiType {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}
