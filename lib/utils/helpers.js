import {useContext} from 'react';
import AppContext from '../../AppContext';

export const useAlert = () => {
  const {dispatch} = useContext(AppContext);
  const showAlert = (
    type,
    message,
    dismissable,
    acceptOption,
    declineOption,
    singleOption,
    children,
    duration,
  ) => {
    hideAlert();
    dispatch({
      alert: {
        type,
        message,
        dismissable,
        children,
        duration,
        singleOption,
        acceptOption,
        declineOption,
      },
    });
  };
  const hideAlert = () => {
    dispatch({
      alert: null,
    });
  };
  return {showAlert, hideAlert};
};

export const useToast = () => {
  const {dispatch} = useContext(AppContext);
  const showToast = (type, title, message, dismissable) => {
    hideToast();
    dispatch({
      toast: {
        type,
        title,
        message,
        dismissable,
      },
    });
  };
  const hideToast = () => {
    dispatch({
      toast: null,
    });
  };
  return {showToast, hideToast};
};

export const formatErrorMessage = (errors) => {
  console.log(errors.errors);
  if (typeof errors === 'string') {
    return errors;
  }
  // if (errors) {
  //   let objectKeys = Object.keys(errors);
  //   return errors[objectKeys[0]] && typeof errors[objectKeys[0]] === 'object'
  //     ? errors[objectKeys[0]][0]
  //     : 'Some error occurred';
  // } else {
  //   return 'Some error occurred';
  // }
  if (errors.hasOwnProperty('errors')) {
    if (errors.errors && Array.isArray(errors.errors)) {
      return errors.errors.password2[0].message;
    }
  } else {
    return 'Some error occurred';
  }
};

export const formatSignupErrorMessage = (errors) => {
  console.log(errors.errors);
  if (typeof errors === 'string') {
    return errors;
  }
  if (errors.hasOwnProperty('errors')) {
    if (errors.errors.username && Array.isArray(errors.errors.username)) {
      return errors.errors.username[0].message ===
        'A user with that username already exists.'
        ? 'A user with that email already exists.'
        : 'Some error occurred';
    }
    if (errors.errors.password2 && Array.isArray(errors.errors.password2)) {
      return errors.errors.password2[0].message;
    }
  } else {
    return 'Some error occurred';
  }
};

export const validatePhoneNumber = (phoneNumber) =>
  phoneNumber.match(/^[0]\d{10}$/);

export const convertNumber = (number) => {
  const rawNumber = number.substring(number.length - 10, number.length);
  const convNum = `+234${rawNumber}`;
  return convNum;
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  // const re = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/;
  const re = /([A-Za-z0-9])\w+/;
  return re.test(String(password));
};
// (?=.*[0-9]) - Assert a string has at least one number;
// (?=.*[!@#$%^&*]) - Assert a string has at least one special character.

export const capitaliseFirstLetter = (str) => {
  let newStr = str.split(' ');
  let arrStr = [];
  for (let i = 0; i < newStr.length; i++) {
    arrStr.push(newStr[i].charAt(0).toUpperCase());
  }
  return arrStr.join('');
};
