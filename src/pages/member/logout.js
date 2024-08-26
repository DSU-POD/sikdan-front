import { resetAllState } from "@/store/reducers/member.reducer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(resetAllState());
    localStorage.removeItem("token");
    router.push("/");
  }, []);
}
