export const getToken = () => {
    return localStorage.getItem('token');
  };
  

  export const fetchWithToken = async (url: string, method: string = "GET", body?: any) => {
    const token = getToken();
  
    // Inicializamos los headers solo con el Authorization
    const headers: HeadersInit = {
      Authorization: token ? `Bearer ${token}` : "", // Agrega el token si existe
    };
  
    // Preparamos el body y los headers
    const isFormData = body instanceof FormData;
  
    const options: RequestInit = {
      method,
      headers: isFormData ? headers : { ...headers, "Content-Type": "application/json" }, // Si no es FormData, añadimos Content-Type
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined, // Si es FormData, lo enviamos tal cual
      credentials: "include", // Incluye cookies si es necesario
    };
  
    try {
      const response = await fetch(url, options);
  
      if (response.status === 204) {
        return null; // Si no hay contenido (204 No Content), regresamos null
      }
  
      if (!response.ok) {
        const errorMessage = await response.text(); // Intenta leer el mensaje de error del servidor
        throw new Error(`Error en la respuesta: ${response.status} - ${errorMessage}`);
      }
  
      // Intenta parsear el JSON si la respuesta es válida
      return await response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error al hacer la solicitud: ${error.message}`);
        throw new Error(`Error al hacer la solicitud: ${error.message}`);
      } else {
        console.error("Error desconocido ocurrió durante la solicitud.");
        throw new Error("Error desconocido ocurrió durante la solicitud.");
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

    if (response.status === 204) {
      // Si es 204 No Content, no intentamos parsear JSON
      return null;
    }

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

  