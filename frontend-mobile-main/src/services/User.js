import Constants from 'expo-constants';

export async function login(props, { apiUrl }) {
  const { manifest } = Constants;
  const uri = `http://localhost:8181`;

  const { correo, contrasenia } = props;
  const url = new URL('/auth/login', apiUrl);
  console.log(url);
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: correo,
        password: contrasenia,
      }),
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }

  if (response.status >= 400 && response.status < 600) {
    const { error } = await response.json();
    throw error;
  }
  const { result } = await response.json();
  return {
    ...result,
    apiUrl: uri,
  };
}

export async function register({ user, fundation }, { apiUrl, token }) {
  const url = new URL('/auth/register', apiUrl);
  let response;

  if (fundation) {
    user.role = 2;
    user.fundacionId = fundation.id;
  }
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }
  if (response.status >= 400 && response.status < 600) {
    const { error } = await response.json();
    throw error;
  }
  const { result } = await response.json();
  return {
    ...result,
  };
}

export async function loginSocialApp(user, { apiUrl }) {
  const { manifest } = Constants;
  const uri = `http://localhost:8181`;
  console.log(user);

  const url = new URL('/auth/loginSocialApp', apiUrl);
  console.log(url);
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }

  if (response.status >= 400 && response.status < 600) {
    const { error } = await response.json();
    throw error;
  }
  const { result } = await response.json();
  return {
    ...result,
    apiUrl: uri,
  };
}
