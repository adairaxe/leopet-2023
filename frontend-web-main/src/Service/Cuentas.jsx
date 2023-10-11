export async function getCuentas(props, cuenta, { apiUrl, token }) {
    const { q, page = 1, limit = 15 } = props;
    const url = new URL(apiUrl);
    url.pathname = '/cuenta/getAll/'+cuenta.fundacionId;
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
        cuentas: result,
        totalRows: count,
      };
    
  }

  export async function updateCuentaPrincipal(cuenta, { apiUrl, token }) {
    const url = new URL(apiUrl);
    url.pathname = '/cuenta/updatePrincipal/' + cuenta.fundacion_id;
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

  export async function createCuentaBancaria(cuenta, 
    { apiUrl, token }) {
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

  export async function updateCuentaBancaria(cuenta, { apiUrl, token }) {
    const url = new URL(apiUrl);
    url.pathname = '/cuenta/updateCuentaID/' + cuenta.id;
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

  export async function deleteCuentaBancaria(cuenta, { apiUrl, token }) {
    const url = new URL(apiUrl);
    url.pathname = '/cuenta/delete/' + cuenta.id;
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


  export async function getCuentaPrincipal( cuenta, { apiUrl, token }) {   
    const url = new URL(apiUrl);
    url.pathname = '/cuenta/getPrincipal/'+cuenta.fundacionId;
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
    const resultCuenta= await response.json();
      return  resultCuenta  ;
    
  }