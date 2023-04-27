import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

// Define Redux store
const initialState = {
  users: [
    { id: '1', name: 'Chandan:', email:'Chandan@example.com', password: 'password123' },
    { id: '2', name: 'Chandan:', email: 'Chandan@example.com', password: 'password456' },
  ],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

// Define a validation for the login/signup form
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

// Define the login/signup form
const LoginForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry={true}
          />
          {touched.password && errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <Button onPress={handleSubmit} title="Submit" />
        </>
      )}
    </Formik>
  );
};

// Define the user details list
const UserDetailsList = ({ users, onEditUser }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onEditUser(item)}>
        <View style={styles.userItem}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList data={users} renderItem={renderItem} keyExtractor={(item) => item.id} />
  );
};

// Define the user details form
const UserDetailsForm = ({ user, onSubmit }) => {
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [password, setPassword] = React.useState(user.password);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };
}