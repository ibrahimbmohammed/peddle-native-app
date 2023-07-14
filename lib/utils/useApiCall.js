/* eslint-disable no-shadow */
import React from 'react';
import AppContext from '../../AppContext';
import axios from 'axios';

export const SERVER_DOMAIN = 'https://peddlesoft.com/api';

export const useApiCall = () => {
  const {token, dispatch} = React.useContext(AppContext);
  const callApi = (url, data, method, externalResource, passedToken) => {
    if (!token && !passedToken) {
      console.log(`Calling Api ${url}`);
    }
    let axiosOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      url: externalResource ? url : `${SERVER_DOMAIN}${url}`,
      method: method || 'GET',
    };
    if (token || passedToken) {
      axiosOptions.headers.Authorization = `${`Token ${
        passedToken ? passedToken : token
      }`}`;
      console.log(`Calling Secured Api ${url}`);
    }
    if (data) {
      axiosOptions.data = data;
    }
    return new Promise(function (resolve, reject) {
      axios(axiosOptions)
        .then(({data}) => {
          console.log(url, 'success');
          resolve(data);
        })
        .catch((error) => {
          console.log(url, 'error');
          // console.log(error.response);
          if (error && error.response && error.response.status === 401) {
            dispatch({
              isLoggedIn: false,
            });
          }
          reject(error);
        });
    });
  };

  return {
    callApi,
  };
};
