import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useAuth } from '../../hooks/auth';

const Profile: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={() => signOut()}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#fff',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: '#fff',
          }}
        >
          Log-out
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Profile;
