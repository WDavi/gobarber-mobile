import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 175 : 40}px;
`;

export const Title = styled.Text`
  margin: 64px 0 24px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 20px;
`;

export const GoToLogon = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  background: #312e38;

  border-top-width: 1px;
  border-color: #232129;

  padding: 16px 0 ${16 + getBottomSpace()}px;
`;

export const GoToLogonText = styled.Text`
  margin-left: 8px;
  font-family: 'RobotoSlab-Regular';
  color: #fff;
  font-size: 20px;
`;
