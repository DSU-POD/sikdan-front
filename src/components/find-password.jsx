import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/modules/api.module";
import { showToast } from "./layout/toast";

export function FindPasswordComponent() {
  const [findInfo, setFindInfo] = useState({
    userId: "",
    email: "",
  });

  const setData = (prop, value) => {
    setFindInfo((current) => ({
      ...current,
      [prop]: value,
    }));
  };

  const handleFind = async () => {
    const result = await api.post("/member/find_password", {
      userId,
      email,
    });

    showToast(result.message);
  };
  return (
    <div className="mx-auto max-w-sm space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">비밀번호 찾기</h1>
        <p className="text-gray-500 dark:text-gray-400"></p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="userId">아이디</Label>
          <Input
            id="userId"
            type="text"
            placeholder="example"
            onChange={(e) => setData("userId", e.currentTarget.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            onChange={(e) => setData("email", e.currentTarget.value)}
            required
          />
        </div>
        <Button
          type="button"
          className="w-full bg-white text-white"
          onClick={handleFind}
        >
          비밀번호 리셋
        </Button>
      </div>
    </div>
  );
}
