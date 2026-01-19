import { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

// types
import type { SkeletonProps } from "./types";

/**
 * Skeleton component to indicate loading state.
 *
 * Displays a pulsing placeholder box, typically used while
 * content is being fetched or rendered. This improves perceived
 * performance and provides visual feedback to users.
 *
 * @param height - Optional height of the skeleton in pixels. Default is 100.
 * @param style - Optional additional styles for the container View.
 *
 * @example
 * ```tsx
 * <Skeleton height={150} style={{ marginVertical: 12 }} />
 * ```
 */
export function Skeleton({ height = 100, style }: SkeletonProps) {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  // Start pulsing animation on mount
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    // Stop animation on unmount
    return () => animation.stop();
  }, [fadeAnim]);

  return (
    <View style={[styles.container, { height }, style]}>
      <Animated.View
        style={[styles.skeletonBox, { opacity: fadeAnim, height }]}
      />
    </View>
  );
}

// Default styles for Skeleton component
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  skeletonBox: {
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
});
