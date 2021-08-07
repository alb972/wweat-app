import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {G, Path, Circle} from 'react-native-svg';

export const CloseIconComponent = ({
  color,
  width,
  height,
}: {
  color: string;
  width: number;
  height: number;
}): JSX.Element => {
  return (
    <View style={styles.svgContainer}>
      <Svg width={width} height={height} viewBox="0 0 348.333 348.334">
        <Path
          fill={color}
          d="M336.559 68.611L231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z"
        />
      </Svg>
    </View>
  );
};

export const LeftArrowIconComponent = (props: {
  color: string;
  width: number;
  height: number;
}): JSX.Element => {
  const {color, width, height} = props;
  return (
    <View style={styles.svgContainer}>
      <Svg
        data-name="Iconly/Arrow/Left"
        width={width}
        height={height}
        viewBox="0 0 24 24">
        <G data-name="Arrow/Left">
          <Path
            data-name="Stroke 1"
            d="M15.5 19l-7-7 7-7"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
          />
        </G>
      </Svg>
    </View>
  );
};

export const RightArrowIconComponent = (props: {
  color: string;
  width: number;
  height: number;
}): JSX.Element => {
  const {color, width, height} = props;
  return (
    <View style={styles.svgContainer}>
      <Svg
        data-name="Iconly/Arrow/Right"
        width={width}
        height={height}
        viewBox="0 0 24 24">
        <G data-name="Arrow/Right">
          <Path
            data-name="Stroke 1"
            d="M8.5 5l7 7-7 7"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
          />
        </G>
      </Svg>
    </View>
  );
};

export const MenuBurgerIcon = ({
  color,
  width,
  height,
}: {
  color: string;
  width: number;
  height: number;
}): JSX.Element => {
  return (
    <View style={styles.svgContainer}>
      <Svg width={width} height={height} viewBox="0 0 11.643 8.833">
        <G
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
          data-name="Iconly/Light/Chart">
          <Path d="M10.893 8.083H.75" />
          <Path data-name="Line_183" d="M10.893 4.417H.75M10.893.75H.75" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  svgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
