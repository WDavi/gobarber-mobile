import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileImage,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  ProviderInfo,
  ProviderMeta,
  MetaText,
  ListTitle,
} from './styles';
import api from '../../services/api';

interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const DashBoard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <TouchableOpacity onPress={() => navigate('Profile')}>
          <ProfileImage source={{ uri: user.avatar_url }} />
        </TouchableOpacity>
      </Header>

      <FlatList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={<ListTitle>Cabeleireiros</ListTitle>}
        renderItem={({ item }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(item.id)}
          >
            <ProviderAvatar source={{ uri: item.avatar_url }} />

            <ProviderInfo>
              <ProviderName>{item.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <MetaText>Segunda à Sexta</MetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <MetaText>8hrs às 18hrs</MetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default DashBoard;
