import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { FlatList, RectButton } from 'react-native-gesture-handler';

import { IProvider } from './index';
import Button from '../../components/Button';

interface ISelectedContainerProps {
  selected: boolean;
}

interface ISelectedTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${Platform.OS === 'android' ? 12 : getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const ProviderList = styled(FlatList as new () => FlatList<IProvider>)`
  padding: 32px 24px;
  padding-left: 0px;
`;

export const ProviderContainer = styled(RectButton)<ISelectedContainerProps>`
  flex-direction: row;
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  margin: 4px 8px;
  align-items: center;
  padding: 4px 8px;

  border-radius: 5px;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<ISelectedTextProps>`
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 8px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 16px;
`;
export const PickerButton = styled(Button)`
  margin: 12px;
  height: 35px;
  width: auto;
`;

export const TimeButton = styled(RectButton)<ISelectedContainerProps>`
  margin-left: 8px;
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 5px;
  padding: 6px;
  margin-top: 4px;
  margin-bottom: 4px;
  opacity: ${props => (props.enabled ? 1 : 0.3)};
`;

export const TimeButtonText = styled.Text<ISelectedTextProps>`
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};

  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
`;

export const TimeText = styled.Text`
  color: #999591;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin: 6px 24px 12px;
`;

export const CreateAppointmentButton = styled(Button)`
  margin: 24px 12px;
  width: auto;
  height: 40px;
`;
