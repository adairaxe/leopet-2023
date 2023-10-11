export async function getFundaciones(props, { apiUrl, token }) {
  const { q, page = 1, limit = 15 } = props;
  const url = new URL(apiUrl);
  url.pathname = '/fundacion';
  let response;
  if (q) {
    url.searchParams.append('q', q);
  }
  url.searchParams.append('page', page);
  url.searchParams.append('limit', limit);
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
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
  const { result, count } = await response.json();
  return {
    fundaciones: result,
    totalRows: count,
  };
}

export async function createFundacion(fundacion, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/fundacion/create';
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fundacion),
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
  return result;
}

export async function registerFundacion(fundacion, { apiUrl }) {
  const url = new URL(apiUrl);
  url.pathname = '/fundacion/register';
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fundacion),
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }
  if (response.status === 401) {
    window.location.replace('/home');
  }

  if (response.status >= 400 && response.status < 600) {
    const { error } = await response.json();
    throw error;
  }
  const { result } = await response.json();
  return result;
}

export async function upadteFundacion(fundacion, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/fundacion/update';
  let response;
  try {
    response = await fetch(url, {
      method: 'PUT',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fundacion),
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }
  if (response.status === 401) {
    window.location.replace('/home');
  }
  if (response.status >= 400 && response.status < 600) {
    const { error } = await response.json();
    throw error;
  }
  const { result } = await response.json();
  return result;
}

export async function deleteFundacion(fundacion, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/auth/login';
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fundacion),
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }
  if (response.status === 401) {
    window.location.replace('/login');
  }
  /*
  If (response.status >= 400 && response.status < 600) {
    const {error} = await response.json();
    throw error;
  }
  const { result } = await response.json();
  return {
    ...result,
    apiUrl: '',
  };
*/
  return true;
}

export async function getReport(props, { apiUrl, token }) {
  const { fecha } = props;
  const url = new URL(apiUrl);
  url.pathname = '/reportes/transferencias';
  let response;
  url.searchParams.append('fecha', fecha);
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }

  if (response.status === 401) {
    window.location.replace('/home');
  }

  if (response.status >= 400 && response.status < 600) {
    const { error } = await response.json();
    throw error;
  }

  const { result } = await response.json();
  return {
    pagos: result,
  };
}

export async function createCuenta(cuenta, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/cuenta/crear';
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cuenta),
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
  return result;
}

export async function upadteCuenta(cuenta, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/cuenta/update/' + cuenta.id;
  let response;
  try {
    response = await fetch(url, {
      method: 'PUT',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cuenta),
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
  return result;
}


export async function getFundaciones2(props, { apiUrl, token }) {
  const { q, page = 1, limit = 15 } = props;
  const url = new URL(apiUrl);
  url.pathname = '/fundacion';
  let response;
  if (q) {
    url.searchParams.append('q', q);
  }
  url.searchParams.append('page', page);
  url.searchParams.append('limit', limit);
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
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
  return result;    
  
}