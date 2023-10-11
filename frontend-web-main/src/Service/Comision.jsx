export async function createComision(comision, 
    { apiUrl, token }) {
    const url = new URL(apiUrl);
    url.pathname = '/comision/create';
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comision),
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
