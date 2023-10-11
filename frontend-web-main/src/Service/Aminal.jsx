export async function getAnimals(props, { apiUrl, token }) {
  const { q, page, limit = 20, selectedSpecie, manada } = props;
  const url = new URL(apiUrl);
  url.pathname = '/animal/get/animals';
  if (q) {
    url.searchParams.append('q', q);
  }

  url.searchParams.append('page', page + 1);
  url.searchParams.append('limit', limit);

  let response;
  let payload = {};
  if (selectedSpecie && selectedSpecie !== 'Todos' && !manada) {
    payload.especie = selectedSpecie;
  }
  if (manada) {
    payload.manada = manada;
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

export async function getSpecies({ apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/animal/especies';
  let response;
  try {
    response = await fetch(url, {
      headers: { authorization: 'Bearer ' + token },
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
  return ['Todos', ...result] || [];
}

export async function getManadas(props, { apiUrl, token }) {
  const { q, page, limit = 20 } = props;
  const url = new URL(apiUrl);
  url.pathname = '/manada/all';
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

export async function getAnimalsByFundation(props, { apiUrl, token }) {
  const { q, page, limit = 15 } = props;
  const url = new URL(apiUrl);
  url.pathname = '/fundacion/animales';

  if (q) {
    url.searchParams.append('q', q);
  }

  url.searchParams.append('page', page);
  url.searchParams.append('limit', limit);

  let response;
  try {
    response = await fetch(url, {
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  } catch (error) {
    console.log(error);
    throw new Error('Please check your internet connection and try again');
  }
  if (response.status === 401) {
    window.location.replace('/logout');
  }
  if (response.status >= 400 && response.status < 600) {
    const { error } = await response.json();
    throw error;
  }
  const { result, count } = await response.json();
  return {
    animals: result,
    totalRows: count,
  };
}

export async function getAnimalsFundacionApp(props, { apiUrl, token }) {
  const { q, page, limit = 20, id_fundacion } = props;
  const url = new URL('/animal/get/animalsFundacionApp', apiUrl);
  if (q) {
    url.searchParams.append('q', q);
  }

  url.searchParams.append('page', page + 1);
  url.searchParams.append('limit', limit);    
  let response;
  let payload = {};
  
  if ( id_fundacion!=null ) {
    payload.id_fundacion = id_fundacion;
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

  if (response.status >= 400 && response.status < 600) {
    const { error } = await response.json();
    throw error;
  }
  const { result } = await response.json();
  return result;
}


export async function createAnimal(animal, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/animal/create';
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(animal),
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

export async function updateAnimal(animal, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/animal/update/' + animal.id;
  let response;
  try {
    response = await fetch(url, {
      method: 'PUT',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(animal),
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

export async function deleteAnimal(animal, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/animal/delete/' + animal.id;
  let response;
  try {
    response = await fetch(url, {
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + token,
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

export async function uploadPhoto({ files }, { apiUrl, token }) {
  const url = new URL(apiUrl);
  url.pathname = '/otros/uploadFile';
  let response;
  let formData = new FormData();
  files.forEach((foto) => {
    formData.append('file', foto);
  });
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token,
      },
      body: formData,
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
  const { fotos } = await response.json();
  return fotos;
}


export async function getAnimalesPadrinosFundacion(props, { apiUrl, token, 
  fundacionId }) {
    const { q, page, limit = 15 } = props;
    const url = new URL(apiUrl);
    url.pathname = '/fundacion/padrinos/'+fundacionId;
  
    if (q) {
      url.searchParams.append('q', q);
    }
      
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);
  
    let response;
    try {
      response = await fetch(url, {
        headers: {
          'authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
    } catch (error) {
      console.log(error);
      throw new Error('Please check your internet connection and try again');
    }
    if (response.status === 401) {
      window.location.replace('/logout');
    }
    if (response.status >= 400 && response.status < 600) {
      const { error } = await response.json();
      throw error;
    }
    const { result, count } = await response.json();
    return {
      animales: result,
      totalRows: count,
    };
  }

  export async function getAnimalesPadrinosCalificacion(props, { apiUrl, token, 
    fundacionId }) {
      const { q, page, limit = 15 } = props;
      const url = new URL(apiUrl);
      url.pathname = '/fundacion/padrinosCalificacion/'+fundacionId;
    
      if (q) {
        url.searchParams.append('q', q);
      }
        
      url.searchParams.append('page', page);
      url.searchParams.append('limit', limit);
    
      let response;
      try {
        response = await fetch(url, {
          headers: {
            'authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          method: 'GET',
        });
      } catch (error) {
        console.log(error);
        throw new Error('Please check your internet connection and try again');
      }
      if (response.status === 401) {
        window.location.replace('/logout');
      }
      if (response.status >= 400 && response.status < 600) {
        const { error } = await response.json();
        throw error;
      }
      const { result, count } = await response.json();
      return {
        animales: result,
        totalRows: count,
      };
    }