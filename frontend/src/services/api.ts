import { Platform } from "react-native";

// No Android Studio usa 10.0.2.2.
// No iOS ou Web usa localhost.
// Se for testar em um celular real, troca pelo IP do pc (ex: http://192.168.1.15:8080/api)
const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8080/api"
    : "http://localhost:8080/api";

// Tipos
export type Restaurant = {
  id: number;
  name: string;
  location: string;
  createdAt: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

export type Review = {
  id: number;
  content: string;
  rating: number;
  userId: number;
  restaurantId: number;
  createdAt: string;
  user?: User;
};

export type LoginResponse = {
  user: User;
  token?: string;
};

// Restaurantes
export async function getRestaurants(): Promise<Restaurant[]> {
  try {
    const response = await fetch(`${BASE_URL}/restaurants`);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar restaurantes:", error);
    throw error;
  }
}

export async function getRestaurant(id: number): Promise<Restaurant> {
  try {
    const response = await fetch(`${BASE_URL}/restaurants/${id}`);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar restaurante:", error);
    throw error;
  }
}

// Usuários (Auth)
export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    console.log('Tentando fazer login com:', email);
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Resposta do login:', response.status);

    if (!response.ok) {
      let errorMessage = "Erro ao fazer login";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        errorMessage = `Erro no servidor (${response.status})`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Login bem-sucedido');
    return data;
  } catch (error: any) {
    console.error("Erro ao fazer login:", error.message);
    if (error.message.includes('fetch')) {
      throw new Error("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
    }
    throw error;
  }
}

export async function register(name: string, email: string, password: string): Promise<LoginResponse> {
  try {
    console.log('Tentando criar conta com:', name, email);
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    console.log('Resposta do registro:', response.status);

    if (!response.ok) {
      let errorMessage = "Erro ao criar conta";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
        if (errorMessage.includes('unique')) {
          errorMessage = "Este email já está cadastrado";
        }
      } catch (e) {
        errorMessage = `Erro no servidor (${response.status})`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Registro bem-sucedido');
    return data;
  } catch (error: any) {
    console.error("Erro ao registrar:", error.message);
    if (error.message.includes('fetch')) {
      throw new Error("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
    }
    throw error;
  }
}

// Reviews
export async function getReviews(restaurantId?: number): Promise<Review[]> {
  try {
    const url = restaurantId 
      ? `${BASE_URL}/reviews?restaurantId=${restaurantId}`
      : `${BASE_URL}/reviews`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar reviews:", error);
    throw error;
  }
}

export async function createReview(data: {
  content: string;
  rating: number;
  userId: number;
  restaurantId: number;
}): Promise<Review> {
  try {
    console.log('Criando review:', data);
    const response = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log('Resposta do review:', response.status);

    if (!response.ok) {
      let errorMessage = "Erro ao criar avaliação";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        errorMessage = `Erro no servidor (${response.status})`;
      }
      throw new Error(errorMessage);
    }

    const reviewData = await response.json();
    console.log('Review criado com sucesso');
    return reviewData;
  } catch (error: any) {
    console.error("Erro ao criar review:", error.message);
    if (error.message.includes('fetch')) {
      throw new Error("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
    }
    throw error;
  }
}

export async function deleteReview(id: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/reviews/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
  } catch (error) {
    console.error("Erro ao deletar review:", error);
    throw error;
  }
}
