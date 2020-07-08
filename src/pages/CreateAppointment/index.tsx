import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

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
  TimeButton,
  TimeButtonText,
  TimeText,
  CreateAppointmentButton,
} from './styles';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface IRouteParams {
  providerId: string;
}

export interface IProvider {
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

  const routeParams = route.params as IRouteParams;

  const navigation = useNavigation();

  const [providers, setProviders] = useState<IProvider[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState<IAvailability[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );
  const [selectedTime, setSelectedTime] = useState(0);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const { user } = useAuth();

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleDate = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') setShowPicker(false);

    if (date) setSelectedDate(date);
  }, []);

  const handleAppointment = useCallback(() => {
    api
      .post('/appointments', {
        provider_id: selectedProvider,
        date: selectedDate.setHours(selectedTime),
      })
      .then(response => navigation.navigate('AppointmentCreated'))
      .catch(err => {
        Alert.alert('Não foi possível criar o agendamento', 'Tente Novamente');
        console.log(err.response.data);
      });

    setShouldRefresh(true);
  }, [selectedProvider, selectedDate, selectedTime, navigation]);

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
    setShouldRefresh(false);
  }, [selectedProvider, selectedDate, shouldRefresh]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        if (selectedTime === hour && !available) setSelectedTime(0);
        return {
          hour,
          available,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability, selectedTime]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        if (selectedTime === hour && !available) setSelectedTime(0);
        return {
          hour,
          available,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability, selectedTime]);

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </TouchableOpacity>

        <Title>Cabeleireiros</Title>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <ScrollView>
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

        <View style={{ marginTop: 6 }}>
          <Title>Escolha o Horário</Title>
          <TimeText>Manhã</TimeText>
          <ScrollView
            horizontal
            style={{ paddingHorizontal: 12 }}
            contentContainerStyle={{ paddingHorizontal: 12 }}
          >
            {morningAvailability.map(item => (
              <TimeButton
                selected={item.hour === selectedTime}
                onPress={() => setSelectedTime(item.hour)}
                key={item.hour}
                enabled={item.available}
              >
                <TimeButtonText selected={item.hour === selectedTime}>
                  {item.formattedHour}
                </TimeButtonText>
              </TimeButton>
            ))}
          </ScrollView>
        </View>

        <View style={{ marginTop: 6 }}>
          <TimeText>Tarde</TimeText>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 12 }}
          >
            {afternoonAvailability.map(item => (
              <TimeButton
                selected={item.hour === selectedTime}
                onPress={() => setSelectedTime(item.hour)}
                key={item.hour}
                enabled={item.available}
              >
                <TimeButtonText selected={item.hour === selectedTime}>
                  {item.formattedHour}
                </TimeButtonText>
              </TimeButton>
            ))}
          </ScrollView>
        </View>

        <CreateAppointmentButton onPress={handleAppointment}>
          Agendar
        </CreateAppointmentButton>
      </ScrollView>
    </Container>
  );
};

export default CreateAppointment;
