export async function createManada(manada, { apiUrl, token }) {
  console.log('====================================');
  console.log('createManada');
  console.log('manada', manada);
  console.log('apiUrl', apiUrl);
  console.log('token', token);
  console.log('====================================');
  const url = new URL('/manada/create', apiUrl);
  let response;
  try {
    response = await fetch(url, {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(manada),
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }

  if (response.status >= 400 && response.status < 600) {
    const error = await response.json();
    throw error;
  }
  const { result } = await response.json();
  return result;
}

export async function getManadas(props, { apiUrl, token }) {
  const { q, page, limit = 20 } = props;
  const url = new URL('/manada/all', apiUrl);
  if (q) {
    url.searchParams.append('q', q);
  }
  url.searchParams.append('page', page + 1);
  url.searchParams.append('limit', limit);

  let response;
  try {
    response = await fetch(url, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }

  if (response.status >= 400 && response.status < 600) {
    const { error } = await response.json();
    throw error;
  }
  const { result } = await response.json();
  return result;
}

export async function apadrinar(props, { apiUrl, token }) {
  const { animalId, manadaId } = props;
  const url = new URL('/manada/add_animals', apiUrl);
  let response;
  try {
    response = await fetch(url, {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        manada: {
          animalId: [animalId],
        },
        manadaId,
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
  return result;
}

export async function actualizarManada(manada, { apiUrl, token }) {
  const url = new URL('/manada/update_info', apiUrl);
  let response;
  try {
    response = await fetch(url, {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(manada),
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }

  if (response.status >= 400 && response.status < 600) {
    const error = await response.json();
    throw error;
  }
  const { result } = await response.text();
  return result;
}

export async function deleteAnimalsManadaApp(props, { apiUrl, token }) {
  const { manadaId, animalId } = props;
  const url = new URL('/manada/delete_animal', apiUrl);

  let response;
  let payload = {};

  if (manadaId != null) {
    payload.manadaId = manadaId;
  }
  if (animalId != null) {
    payload.animalId = animalId;
  }
  try {
    response = await fetch(url, {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }

  if (response.status >= 400 && response.status < 600) {
    const { error } = await response.json();
    throw error;
  }
  const { result } = await response.json();
  return result;
}

export async function deleteAllAnimalsManadaApp(props, { apiUrl, token }) {
  const { manadaId } = props;
  const url = new URL('/manada/delete', apiUrl);

  let response;
  let payload = {};

  if (manadaId != null) {
    payload.id = manadaId;
  }
  try {
    response = await fetch(url, {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }

  if (response.status >= 400 && response.status < 600) {
    const { error } = await response.json();
    throw error;
  }
  const { result } = await response.json();
  return result;
}
