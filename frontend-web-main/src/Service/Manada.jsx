export async function apadrinar(props, { apiUrl, token }) {
  const { animalId, manadaId } = props;
  const url = new URL(apiUrl);
  url.pathname = '/manada/add_animals';
  let response;
  try {
    response = await fetch(url, {
      headers: {
        'authorization': 'Bearer ' + token,
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
  if (response.status === 401) {
    window.location.replace('/logout');
  }
  if (response.status >= 400 && response.status < 600) {
    const { error } = await response.json();
    throw error;
  }
  const { result } = await response.json();
  return result;
}

export async function createManada(manada, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/manada/create';
  let response;
  try {
    response = await fetch(url, {
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(manada),
    });
  } catch (error) {
    throw new Error('Please check your internet connection and try again');
  }
  if (response.status === 401) {
    window.location.replace('/logout');
  }
  if (response.status >= 400 && response.status < 600) {
    const error = await response.json();
    throw error;
  }
  const { result } = await response.json();
  return result;
}

export async function updateManada(manada, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/manada/update_info';
  let response;
  try {
    response = await fetch(url, {
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(manada),
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
  return result;
}

export async function deleteManada(manada, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/manada/delete';
  let response;
  try {
    response = await fetch(url, {
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(manada),
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
  return result;
}

export async function deleteAllAnimalManada(manada, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/manada/delete_all_animal';
  let response;
  let payload = {};
  if ( manada != null ) {    
    payload.manadaId = manada.id;
  }

  try {
    response = await fetch(url, {
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
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
  return result;
}

export async function deleteFromManada(
  { animalId, manadaId },
  { apiUrl, token }
) {
  const url = new URL(apiUrl);
  url.pathname = 'manada/delete_animal';
  let response;
  try {
    response = await fetch(url, {
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        animalId,
        manadaId,
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
  return result;
}

export async function approveDonation(
  { donationId, approved },
  { apiUrl, token }
) {
  const url = new URL(apiUrl);
  url.pathname = '/donacion/aprobar';
  let response;
  try {
    response = await fetch(url, {
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        id: donationId,
        aprobado: approved,
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
  return result;
}

export async function subscribir({ manadaId }, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/donacion/crear';
  let response;
  try {
    response = await fetch(url, {
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        manadaId,
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
  return result;
}

export async function cancelSubscripcion({ manadaId }, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/paypal/cancel';
  let response;
  try {
    response = await fetch(url, {
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        manadaId,
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
  return result;
}
