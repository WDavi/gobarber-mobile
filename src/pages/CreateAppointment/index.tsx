import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/Feather';

import { useRoute, useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  UserAvatar,
  ProviderList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  PickerButton,
} from './styles';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface IAvailability {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();

  const navigation = useNavigation();

  const [providers, setProviders] = useState<Provider[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState<IAvailability[]>([]);

  const routeParams = route.params as RouteParams;

  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  const { user } = useAuth();

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleDate = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') setShowPicker(false);

    if (date) setSelectedDate(date);
  }, []);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') setShowPicker(true);
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAvailability(response.data);
      });
  }, [selectedProvider, selectedDate]);

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </TouchableOpacity>

        <Title>Cabeleireiros</Title>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <View style={{ height: 112 }}>
        <ProviderList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(item.id)}
              selected={item.id === selectedProvider}
            >
              <ProviderAvatar source={{ uri: item.avatar_url }} />
              <ProviderName selected={item.id === selectedProvider}>
                {item.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </View>

      <Calendar>
        <Title>Escolha a data</Title>

        {Platform.OS !== 'ios' && (
          <PickerButton onPress={() => setShowPicker(state => !state)}>
            Selecionar data
          </PickerButton>
        )}

        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="calendar"
            textColor="#f4ede8"
            onChange={handleDate}
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
