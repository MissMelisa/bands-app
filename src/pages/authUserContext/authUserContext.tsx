import { createContext, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import firebase from "../../firebase";
import { User } from "../../types";
import useFirebaseAuth from "../Hooks/useFirebaseAuth/useFirebaseAuth";

type AuthUserContextType = {
  authUser: User | null;
  loading: boolean;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signOut: () => {};
};

const signInWithEmailAndPassword: any = async (
  email: string,
  password: string
) => {};
const createUserWithEmailAndPassword: any = async (
  email: string,
  password: string
) => {};

const AuthUserContext = createContext<AuthUserContextType>({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut: async () => {},
});

const PUBLIC_ROUTES = ["/register", "/login"];

export default function AuthUserProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const auth = useFirebaseAuth();
  const history = useHistory();

  useEffect(() => {
    if (
      !auth.loading &&
      !auth.authUser &&
      !PUBLIC_ROUTES.includes(history.location.pathname)
    )
      history.push("/login");
  }, [auth.authUser, auth.loading, history]);

  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);
