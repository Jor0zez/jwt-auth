import { API_URL } from "@/http";
import { AuthResponse } from "@/response/AuthResponse";
import { AuthService } from "@/service/AuthService";
import axios from "axios";
import { makeAutoObservable } from "mobx";

class appStore {
  userLogin: string | undefined;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: string | undefined) {
    this.userLogin = user;
  }

  async login(login: string, password: string) {
    try {
      const response = await AuthService.login(login, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.login);
    } catch (e) {
      console.log(e);
    }
  }

  async registration(login: string, password: string) {
    try {
      const response = await AuthService.registration(login, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.login);

      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser(undefined);

      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.login);

      return response;
    } catch (e) {
      console.log(e);
    }
  }
}

const store = new appStore();
export default store;
