// types
import type { ViewStyle } from "react-native";

/**
 * Props for the `Skeleton` component.
 *
 * Defines the optional height and custom style for the skeleton placeholder.
 */
export type SkeletonProps = {
  /** Optional height of the skeleton in pixels. Default is 100 in the component. */
  height?: number;

  /** Optional additional styles for the container View */
  style?: ViewStyle;
};
