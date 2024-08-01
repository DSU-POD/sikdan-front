import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/modules/api.module";
import { showToast } from "./layout/toast";

export default function FindPasswordComponent() {
  const [findData, setFindData] = useState({
    userId: "",
    email: "",
  });

  const setData = (props, value) => {
    setFindData((current) => ({
      ...current,
      [props]: value,
    }));
  };

  const apiFindPassword = async () => {
    const isError = true;
    if (findData.userId === "" || findData.email === "") {
      showToast("아이디 또는 이메일을 입력해주세요.", isError);
    }
    const { userId, email } = findData;
    const result = await api.post("/member/find_password", {
      userId,
      email,
    });

    if (result.result === "success") {
      showToast(
        "회원가입 때 입력하셨던 이메일로 임시 비밀번호를 발송해드렸습니다."
      );
    } else {
      showToast(result.message, isError);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">비밀번호 찾기</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="userId">아이디</Label>
            <Input
              id="userId"
              type="text"
              placeholder="아이디를 입력해주세요"
              onChange={(e) => setData("userId", e.currentTarget.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              onChange={(e) => setData("email", e.currentTarget.value)}
            />
          </div>
          <Button
            type="button"
            className="w-full bg-black text-white"
            onClick={apiFindPassword}
          >
            비밀번호 찾기
          </Button>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="font-medium underline" prefetch={false}>
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
