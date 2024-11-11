import { useState } from "react";
import { Label } from "../components/ui/label"; // 상대 경로로 변경
import { Input } from "../components/ui/input"; // 상대 경로로 변경
import { Button } from "../components/ui/button"; // 상대 경로로 변경
import Link from "next/link";
import { api } from "@/modules/api.module";
import { showToast } from "./layout/toast";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setLoginData } from "@/store/reducers/member.reducer";
import { SiNaver } from "react-icons/si"; // Naver 아이콘 추가
import crypto from "crypto";

export function LoginComponent() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const isError = true;
  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("/member/login", {
        userId,
        password,
      });
      if (response?.result === "success") {
        const token = response.data;
        localStorage.setItem("token", token);
        dispatch(
          setLoginData({
            isLogin: true,
            userId,
          })
        );
        router.push("/main/feed");
      }
    } catch (err) {
      showToast("로그인에 실패했습니다. 다시 시도해주세요.", isError);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    router.push("/member/register/step1"); // Navigate to /member/register/step1
  };

  const handleNaverLogin = async () => {
    const STATE = crypto.randomBytes(32).toString("base64");
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${`${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}`}`;

    router.push(NAVER_AUTH_URL);
  };

  return (
    <div className="bg-[#73A556]">
      <div className="flex flex-col items-center mb-8">
        <img
          src="/new_logo.png"
          alt="MealMate Logo"
          wuserIdth={60}
          height={60}
          className="mb-2"
        />
      </div>
      <div className="w-full max-w-md p-6 text-black bg-white shadow-md rounded-lg dark:bg-gray-800">
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="userId">아이디</Label>
              <Input
                userId="userId"
                type="userId"
                value={userId}
                className="shadow-md text-black"
                onChange={(e) => setUserId(e.target.value)}
                placeholder="아이디를 입력하세요"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                userId="password"
                type="password"
                value={password}
                className="shadow-md text-black"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            type="submit"
            className="w-full bg-white mt-4 text-black shadow-md"
            onClick={handleLogin}
          >
            로그인
          </Button>
        </form>
        <div
          className="flex flex-row items-center bg-[#02C75A] p-3 justify-center space-x-4 mt-4 shadow-md"
          onClick={handleNaverLogin}
        >
          <SiNaver className="text-white" />
          <span className="text-white font-bold">네이버 로그인</span>
        </div>

        <div className="flex justify-between mt-4 text-sm dark:text-gray-400">
          <Link
            href="#"
            className="hover:underline text-black"
            prefetch={false}
            onClick={() => router.push("/member/find-id")}
          >
            아이디/비밀번호 찾기
          </Link>
          <Link
            href="#"
            className="hover:underline text-black"
            prefetch={false}
            onClick={handleRegister}
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
