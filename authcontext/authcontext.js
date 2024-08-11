import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../config';

const TOKEN_KEY = 'testing'

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState({token : null, authenticated: null})

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem(TOKEN_KEY);
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true
                })
            }
        }
        loadToken();
    },[])

    const register = async (email,password, firstname, lastname) => {
        try {
            return await axios.post(`${API_URL}/register`, {email, password, firstname, lastname});
        } catch (e) {
            return { error: e, msg: e.message };
        }
    };

    const login = async (email,password) => {
        try {
            const result = await axios.post(`${API_URL}/users/login`, {email, password});

            setAuthState({
                token: result.data.token,
                authenticated: true
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await AsyncStorage.setItem(TOKEN_KEY, result.data.token)

            return result;

        } catch (error) {
            if (error.response) {
              // The request was made, and the server responded with a non-2xx status
              const status = error.response.status;
              return { error, status, msg: `Server responded with status ${status}` };
            } else if (error.request) {
              // The request was made but no response was received
              return { error, msg: 'No response received from the server' };
            } else {
              // Something happened in setting up the request that triggered an error
              return { error, msg: 'Error setting up the request' };
            }
          }
        };
    
    const biometric_login = async (secondaryToken) => {
        try {
            const result = await axios.post(`${API_URL}/biometric-login`, {secondaryToken});

            setAuthState({
                token: result.data.token,
                authenticated: true
        })
    
        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
    
        await AsyncStorage.setItem(TOKEN_KEY, result.data.token)
    
        return result;
    
    } catch (error) {
        if (error.response) {
        // The request was made, and the server responded with a non-2xx status
          const status = error.response.status;
          return { error, status, msg: `Server responded with status ${status}` };
        } else if (error.request) {
          // The request was made but no response was received
          return { error, msg: 'No response received from the server' };
        } else {
            // Something happened in setting up the request that triggered an error
          return { error, msg: 'Error setting up the request' };
        }
        }
    };

    const logout = async () => {
        // Delete token from storage
        await AsyncStorage.removeItem(TOKEN_KEY);

        // Update HTTP Headers
        axios.defaults.headers.common['Authorization'] = '';

        // Reset auth state
        setAuthState({
            token: null,
            authenticated: false
        });
    };


    const value = {
        onRegister: register,
        onLogin: login,
        onBiometricLogin: biometric_login,
        onLogout: logout,
        authState
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}