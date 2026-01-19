import { Text, RefreshControl, View } from "react-native";

// external components
import { FlashList } from "@shopify/flash-list";

// hooks
import { useCryptoPolling } from "../hooks/use-crypto-polling";

// components
import { Skeleton } from "../components/skeleton/skeleton";
import { CryptoRow } from "../components/crypto-row/crypto-row";
import HeaderComponent from "../components/header-component/header-component";

/**
 * CryptoDashboard screen
 *
 * Displays a list of cryptocurrency assets with their prices and trends.
 *
 * Features:
 * - Header with theme toggle.
 * - Real-time price updates via `useCryptoPolling` hook.
 * - Loading placeholders using `Skeleton` while data is being fetched.
 * - Pull-to-refresh to manually update the data.
 * - Offline support with cached data.
 *
 * Components used:
 * - HeaderComponent: App header with theme toggle.
 * - CryptoRow: Renders each cryptocurrency row with price, trend, and change.
 * - Skeleton: Placeholder used during loading.
 * - FlashList: Efficient, high-performance list for large data sets.
 *
 * Behavior:
 * - Shows Skeleton placeholders when `loading` is true.
 * - Shows list of `CryptoRow` items when data is available.
 * - Displays "Offline mode" text if fetching fails and no cached data is available.
 *
 * @example
 * ```tsx
 * <CryptoDashboard />
 * ```
 */
export function CryptoDashboard() {
  const { data, loading, error, refresh } = useCryptoPolling();

  // Display offline message if there is an error
  if (error) return <Text>Offline mode</Text>;

  return (
    <View className="flex-1 flex gap-5 pb-16 bg-white">
      {/* App Header */}
      <HeaderComponent />

      {loading ? (
        // Show skeleton placeholders while loading
        <FlashList
          data={Array.from({ length: 10 })}
          renderItem={() => <Skeleton height={100} />}
          className="px-5"
        />
      ) : (
        // Show crypto assets when data is available
        <FlashList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CryptoRow asset={item} />}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={refresh} />
          }
          className="px-5"
        />
      )}
    </View>
  );
}
