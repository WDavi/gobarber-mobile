import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { FlatList, RectButton } from 'react-native-gesture-handler';

import { Provider } from './index';
import Button from '../../components/Button';

interface ProviderContainerProp {
  selected: boolean;
}

interface ProviderNameProps {
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

export const ProviderList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
  padding-left: 0px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProp>`
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

export const ProviderName = styled.Text<ProviderNameProps>`
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 8px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  color: #f4ede8;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 16px;
`;
export const PickerButton = styled(Button)`
  height: 46px;
  align-self: center;
  width: 90%;
`;
