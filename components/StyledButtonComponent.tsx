import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface StyledButtonComponentProps {
  label: string;
  textColor: string;
  backgroundColor: string;
  shadowColor: string;
  clickHandler: any;
}

export function StyledButtonComponent(props: StyledButtonComponentProps) {
  let { label, textColor, backgroundColor, shadowColor, clickHandler } = props;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.styledButtonContainer, { backgroundColor: backgroundColor, shadowColor: shadowColor, }]}
      onPress={clickHandler}>
      <Text style={[styles.labelbutton, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  labelbutton: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: hp("2%"),
  },
  styledButtonContainer: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.6,
    elevation: 4,
    shadowRadius: 8,
    shadowOffset: { width: 1, height: 10 },
  },
});
