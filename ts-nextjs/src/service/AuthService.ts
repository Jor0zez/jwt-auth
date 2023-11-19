import { $api_config, API_URL } from "@/http";
import { AuthResponse } from "@/response/AuthResponse";
import axios, { AxiosResponse } from "axios";

export class AuthService {
  static async login(
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api_config.post<AuthResponse>("/login", { login, password });
  }

  static async registration(
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api_config.post<AuthResponse>("/registration", { login, password });
  }

  static async logout() {
    return $api_config.get<AuthResponse>("/logout");
  }
}
