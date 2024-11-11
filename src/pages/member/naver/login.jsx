import { api } from "@/modules/api.module";
import {
  setLoginData,
  setRegisterStep1Data,
  setRegisterStep2Data,
  setSocialLoginData,
} from "@/store/reducers/member.reducer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

export default function NaverLogin({ code, state }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleNaverLogin = async () => {
    if (code && state) {
      const { data } = await api.post(`/member/getNaverInfo`, {
        code: code,
        state: state,
      });
      const { isRegister, naver_id, age, gender, email, nickname } = data;

      if (isRegister === true) {
        dispatch(
          setSocialLoginData({
            naver_id,
          })
        );

        dispatch(
          setRegisterStep1Data({
            userId: `naver-${naver_id.substring(0, 5)}`,
            password: "",
            nickname,
            email,
          })
        );
        dispatch(
          setRegisterStep2Data({
            age,
            gender,
          })
        );
        setLoading(true);

        router.push(`/member/register/step2`);
      } else {
        const { nickname, token, trainerYn, userId } = data;
        dispatch(
          setLoginData({
            isLogin: true,
            nickname,
            trainerYn,
            userId,
          })
        );
        localStorage.setItem("token", token);
        setLoading(false);
        router.push("/main/feed/");
      }
    }
  };
  useEffect(() => {
    handleNaverLogin().then((result) => {});
  }, [code, state]);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <ClipLoader loading={loading} color="#ffffff" size={50} />
          <p className="text-white mt-4">
            로그인 중입니다 잠시만 기다려주세요...
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export const getServerSideProps = (context) => {
  const { code, state } = context.query;
  return {
    props: {
      code,
      state,
    },
  };
};
