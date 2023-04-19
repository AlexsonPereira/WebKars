import { createContext, useState } from "react";
import {
  IAuthContext,
  IAxiosData,
  IProviderProps,
  IReqLogin,
  IToken,
  IUser,
  IUserReq,
} from "../../interface";
import { useNavigate } from "react-router-dom";
import { Instance } from "../../services/axios";
import { Erro, Success } from "../../services/toast";
import axios from "axios";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: IProviderProps) => {
  const token = localStorage.getItem(`@WebKars:token`);
  const id = localStorage.getItem(`@WebKars:id`);
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const login = async (body: IReqLogin) => {
    setLoading(true);
    try {
      const { data } = await Instance.post<IToken>("/session", body);
      localStorage.setItem(`@WebKars:token`, data.token);
      localStorage.setItem(`@WebKars:id`, data.user_id);
      Success(`✅Usuário logado com sucesso!`);
      navigate(`/`, { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as IAxiosData;
        Erro(`${data.message}❗❗`);
      }
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (body: IUserReq) => {
    console.log(body);
    setLoading(true);
    try {
      await Instance.post("/users", body);
      navigate("/session");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as IAxiosData;
        Erro(`${data.message}❗❗`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        registerUser,
        token,
        id,
        setLoading,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
