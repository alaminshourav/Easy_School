import { createContext, useEffect, useReducer } from "react";
interface AuthState {
  user: any;
  loading: boolean;
  error: any;
}

interface AuthAction {
  type: "LOGIN_START" | "LOGIN_SUCCESS" | "LOGIN_FAILURE" | "LOGOUT";
  payload?: any;
}

interface AuthContextType extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

let storedUser;
try {
  const rawUser = localStorage.getItem("user");
  storedUser = rawUser ? JSON.parse(rawUser) : null;
} catch (e) {
  console.error("Failed to parse user from localStorage:", e);
  storedUser = null;
}
const INITIAL_STATE: AuthState = {
  user: storedUser,
  loading: false,
  error: null,
};

export const AuthContext = createContext<AuthContextType>(
  INITIAL_STATE as AuthContextType
);

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
