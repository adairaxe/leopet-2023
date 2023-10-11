export async function getActualizacion(props, { apiUrl, token, 
  fundacionId }) {
    const { q, page, limit = 15 } = props;
    const url = new URL(apiUrl);
    url.pathname = '/actualizacion/';
  
    if (q) {
      url.searchParams.append('q', q);
    }
  
    url.searchParams.append('fundacionId', fundacionId);
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
      actualizaciones: result,
      totalRows: count,
    };
  }

  export async function createActualizacion(actualizacion, 
    { apiUrl, token }) {
    const url = new URL(apiUrl);
    url.pathname = '/actualizacion/create';
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actualizacion),
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


  export async function updateActualizacion(actualizacion, { apiUrl, token }) {
    const url = new URL(apiUrl);
    url.pathname = '/actualizacion/update/' + actualizacion.id;
    let response;
    try {
      response = await fetch(url, {
        method: 'PUT',
        headers: {
          'authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actualizacion),
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

  export async function deleteActualizacion(actualizacion, { apiUrl, token }) {
    const url = new URL(apiUrl);
    url.pathname = '/actualizacion/delete/' + actualizacion.id;
    let response;
    try {
      response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'authorization': 'Bearer ' + token,
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

  export async function deletePhoto(imagen, { apiUrl, token }) {
    const url = new URL(apiUrl);
    url.pathname = '/otros/deleteFile';      
    let response;    
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: imagen.toString(),
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
    const { message } = await response.json();
    return message;
  }
  