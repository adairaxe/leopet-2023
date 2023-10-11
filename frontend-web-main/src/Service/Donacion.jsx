export async function createHistoria(historia, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/evidencia/crear';
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(historia),
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

export async function updateHistoria(historia, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/evidencia/update/' + historia.id;
  let response;
  try {
    response = await fetch(url, {
      method: 'PUT',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(historia),
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

export async function getDonaciones(props, { apiUrl, token }) {
  const { q, page = 1, limit = 15 } = props;
  const url = new URL(apiUrl);
  url.pathname = '/donacion';
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

  const { result, total } = await response.json();
  return {
    donaciones: result,
    totalRows: total,
    response,
  };
}

export async function getDineroDisponible({ apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/donacion/disponible';
  let response;
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
