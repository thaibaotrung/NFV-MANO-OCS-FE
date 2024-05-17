import React, { createContext, useEffect, useReducer } from 'react';

// third-party
// import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';

// project import
import Loader from 'components/Loader';
import { KeyedObject } from 'types/root';
import { AuthProps, JWTContextType } from 'types/auth';
import { AxiosCSRequest } from 'request';
import { DEFAULT_API_URL } from 'config';

// const chance = new Chance();

// constant
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const axios = new AxiosCSRequest(DEFAULT_API_URL || '');

const verifyToken: (st: string) => boolean = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded: KeyedObject = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null) => {
  console.log('setSession', serviceToken);
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
  } else {
    localStorage.removeItem('serviceToken');
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(
      '/api/admin/login',
      { username: email, password },
      {
        baseURL: DEFAULT_API_URL
      }
    );
    console.log('response', response.data);
    const { token: serviceToken, payload } = response;
    setSession(serviceToken);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user: { name: payload?.username }
      }
    });
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    // // todo: this flow need to be recode as it not verified
    // const id = chance.bb_pin();
    // const response = await axios.post('/api/account/register', {
    //   id,
    //   email,
    //   password,
    //   firstName,
    //   lastName
    // });
    // let users = response.data;
    // if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
    //   const localUsers = window.localStorage.getItem('users');
    //   users = [
    //     ...JSON.parse(localUsers!),
    //     {
    //       id,
    //       email,
    //       password,
    //       name: `${firstName} ${lastName}`
    //     }
    //   ];
    // }
    // window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email: string) => {};

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
