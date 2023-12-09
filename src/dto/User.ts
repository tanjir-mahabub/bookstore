// Create DTOs in a separate file (e.g., user.dto.ts)

export interface RegisterUserDTO {
    name: string;
    email: string;
    password: string;
  }
  
  export interface LoginUserDTO {
    email: string;
    password: string;
  }
  