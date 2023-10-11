import { GLOBALCONFIG } from '../Components/Config';


export async function login(props, { apiUrl }) {
  const { correo, contrasenia } = props;
  const url = new URL(apiUrl);
  url.pathname = '/auth/login';
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
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
  if (response.status === 401) {
    window.location.replace('/login');
  }
  if (response.status >= 400 && response.status < 600) {
    const { error } = await response.json();
    throw error;
  }
  const { result } = await response.json();
  return {
    ...result,
    apiUrl: GLOBALCONFIG.EndpointBackHost+':'+
            GLOBALCONFIG.EndpointBackPort,
    
  };
}

export async function register({ user, fundation }, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/auth/register';
  let response;

  if (fundation) {
    user.role = 2;
    user.fundacionId = fundation.id;
  }
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }
  if (response.status === 401) {
    window.location.replace('/login');
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

export async function updateUser(user, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/usuario/' + user.id;
  let response;

  try {
    response = await fetch(url, {
      method: 'PUT',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }
  if (response.status === 401) {
    window.location.replace('/logout');
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

export async function cambiarContrasenia({ id, password }, { apiUrl, token }) {
  console.log(apiUrl);
  const url = new URL(apiUrl);
  url.pathname = '/usuario/update';
  let response;

  try {
    response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        password: password.actual,
        newPassword: password.nueva,
      }),
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }
  if (response.status === 401) {
    window.location.replace('/logout');
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
