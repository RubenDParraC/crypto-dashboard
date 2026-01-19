// types
import type { CryptoAssetType } from "../../../domain/crypto-asset";

/**
 * Props for the `CryptoRow` component.
 *
 * This type defines the expected properties for a single cryptocurrency row.
 * It ensures that the component receives a valid crypto asset with all
 * required fields, including symbol, price, 24h change, and optional trend.
 */
export type CryptoRowProps = {
  /** The cryptocurrency asset to display in the row */
  asset: CryptoAssetType;
};
