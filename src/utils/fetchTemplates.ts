export const getToken = () => {
    return localStorage.getItem('token');
  };
  

export const fetchWithToken = async (url: string, method: string = 'GET', body?: any) => {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '', 
  };

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Devolver los datos obtenidos
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error)
      throw new Error(`Error al hacer la solicitud: ${error.message}`);
    } else {
      console.log(error)
      throw new Error('Unknown error occurred');
    }
  }
};


export const fetchWithoutToken = async (url: string, method: string = 'GET', body?: any) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Si hay un cuerpo en la solicitud (para POST, PUT, etc.), lo convertimos a JSON
  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error desconocido'); 
    }
    
    const data = await response.json();
    return data; 
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al hacer la solicitud: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

  