import { setloginData } from "@/store/reducers/member.reducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setloginData({
        isLogin: false,
        userId: "",
      })
    );
  }, []);
}
