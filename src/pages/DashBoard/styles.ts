import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

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

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-size: 20px;
  font-family: 'RobotoSlab-Bold';
`;

export const ListTitle = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileImage = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProviderContainer = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: 6px;
  margin: 8px 24px;
  flex: 1;
  background: #3e3b47;

  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProviderInfo = styled.View``;

export const ProviderName = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Bold';
  margin-left: 8px;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  margin-left: 8px;
  margin-bottom: 4px;

  align-items: center;
`;

export const MetaText = styled.Text`
  margin-left: 4px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
`;
