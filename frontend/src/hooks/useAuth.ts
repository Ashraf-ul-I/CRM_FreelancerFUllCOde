import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function useAuth() {
  const { token } = useSelector((state: RootState) => state.auth || {});

  return !!token;
}
