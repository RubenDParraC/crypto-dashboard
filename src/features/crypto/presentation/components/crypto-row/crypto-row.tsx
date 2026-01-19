import { useEffect, useRef } from "react";
import { Animated, View, Text } from "react-native";

// types
import type { CryptoRowProps } from "./types";

// utils
import { colors } from "../icon-component/utils";

// components
import IconComponent from "../icon-component/icon-components";

/**
 * Component that displays a single cryptocurrency row.
 *
 * This component shows the asset symbol, current price, 24-hour change,
 * and a visual indication of price trend (up, down, same). It includes
 * an animated color effect on the price when the trend changes.
 *
 * @param asset - The cryptocurrency asset to display. It must include:
 *   - symbol: string
 *   - price: number
 *   - change24h: number
 *   - trend?: "up" | "down" | "same"
 *
 * @behavior
 * - Animates the price color briefly when the trend is "up" or "down".
 * - Displays an icon representing the trend: caret-up, caret-down, or border.
 * - Formats price and 24h change in USD currency with 2 decimals.
 *
 * @example
 * ```tsx
 * <CryptoRow asset={{ id: "BTCUSDT", symbol: "BTCUSDT", price: 27834, change24h: 2.5, trend: "up" }} />
 * ```
 */
export function CryptoRow({ asset }: CryptoRowProps) {
  // Animated value for price color transition
  const anim = useRef(new Animated.Value(0)).current;

  // Trigger color animation whenever the trend changes
  useEffect(() => {
    if (asset.trend === "same") return;

    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(anim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [asset.trend]);

  // Interpolate the animated color based on trend
  const color = anim.interpolate({
    inputRange: [0, 1],
    outputRange:
      asset.trend === "up"
        ? [colors.white, colors.success]
        : [colors.white, colors.error],
  });

  return (
    <View className="px-4 py-3 border-b border-neutral-800 flex flex-row justify-between items-center">
      {/* Left column: asset symbol, price, 24h change */}
      <View className="flex flex-col gap-2">
        <Text className="text-lg font-bold">{asset.symbol}</Text>
        <Text className="text-sm font-bold">
          Price:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(Number(asset.price))}
        </Text>
        <Text className="text-sm font-bold">
          Change (24h):{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(Number(asset.change24h))}
        </Text>
      </View>

      {/* Right column: trend label, animated price, trend icon */}
      <View className="flex flex-col items-end gap-2">
        <Text
          className={`text-xs font-bold uppercase ${
            asset.trend === "up"
              ? "text-green-600"
              : asset.trend === "down"
                ? "text-red-600"
                : "text-yellow-600"
          }`}
        >
          {asset.trend}
        </Text>

        <Animated.Text className="text-sm" style={{ color }}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(Number(asset.price))}
        </Animated.Text>

        <Animated.View>
          <IconComponent
            icon="AntDesign"
            size={16}
            name={
              asset.trend === "up"
                ? "caret-up"
                : asset.trend === "down"
                  ? "caret-down"
                  : "border"
            }
            color={
              asset.trend === "up"
                ? "success"
                : asset.trend === "down"
                  ? "error"
                  : "warning"
            }
          />
        </Animated.View>
      </View>
    </View>
  );
}
