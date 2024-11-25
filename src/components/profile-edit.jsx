import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EditPasswordComponent from "./profile-editpassword";
import { api } from "@/modules/api.module";
import { showToast } from "./layout/toast";

export default function ProfileEditComponent() {
  const [info, setInfo] = useState({ nickname: "", email: "", userId: "", gender: "", age: "" });
  const [allergy, setAllergy] = useState(false);
  const [goal, setGoal] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const router = useRouter();

  const goalTranslations = {
    weightdecrease: "체중 감소",
    weightkeep: "체중 유지",
    weightincrease: "체중 증가",
    healthkeep: "건강 유지",
    others: "그 외 기타",
  };

  const isError = true;

  const getInfo = async () => {
    try {
      const response = await api.get("/member/info");
      if (response?.result === "success") {
        const { age, height, weight, goal, allergy, nickname, email, userId, gender } = response.data;
        setInfo({ age, height, weight, nickname, email, userId, gender });
        setGoal(goal);

        const tmpAllergy = allergy ? allergy.split(",") : [];
        setSelectedAllergies(tmpAllergy);
        setAllergy(tmpAllergy.length > 0);
      }
    } catch (error) {
      console.error("회원 정보를 불러오는 중 오류 발생:", error);
      showToast("회원 정보를 불러오는 중 오류가 발생했습니다.", isError);
    }
  };

  useEffect(() => {
    getInfo();

    const { goal: goalFromQuery } = router.query;
    if (goalFromQuery) {
      setGoal(goalFromQuery);
    }

    console.log(info);
  }, [router.query]);

  const handleEditInfo = async () => {
    if (!info.height) {
      showToast("키를 입력해주세요.", isError);
      return false;
    }

    if (!info.weight) {
      showToast("몸무게를 입력해주세요.", isError);
      return false;
    }

    const allergyString = selectedAllergies.length > 0 ? selectedAllergies : [];

    const { age, height, weight, gender } = info;
    try {
      const response = await api.patch("/member/edit", {
        editData: { age, height, weight, gender, allergy: allergyString, goal },
      });

      if (response?.result === "success") {
        showToast("회원 정보가 수정되었습니다.", false);
        await getInfo();
        router.push("/main/feed"); // 수정 성공 시 피드 창으로 이동
      } else {
        showToast("회원 정보 수정에 실패했습니다.", isError);
      }
    } catch (error) {
      console.error("회원 정보 수정 중 오류 발생:", error);
      showToast("회원 정보 수정 중 오류가 발생했습니다.", isError);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    showToast("로그아웃 되었습니다.", false);
    router.push("/member/logout");
  };

  const handleAllergySelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedAllergies((prev) => [...prev, value]);
    } else {
      setSelectedAllergies((prev) => prev.filter((allergy) => allergy !== value));
    }
  };

  const handleAllergyRadioChange = (hasAllergy) => {
    setAllergy(hasAllergy);
    if (!hasAllergy) {
      setSelectedAllergies([]);
    }
  };

  const handleGoalSetting = () => {
    router.push("/member/profile/goal");
  };

  const handleExit = () => {
    router.back();
  };

  const handleAgeChange = (e) => {
    setInfo((prevState) => ({
      ...prevState,
      age: e.target.value,
    }));
  };

  return (
    <div className="max-w-xl w-full mx-auto p-6 bg-white dark:bg-gray-950 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Avatar className="w-16 h-16 border-2 border-gray-300">
          <AvatarFallback>{info.nickname ? info.nickname.substring(0, 2) : "?"}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h2 className="text-xl font-bold">{info.nickname || "닉네임 없음"}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{info.userId || "아이디 없음"}</p>
        </div>
        <Button variant="outline" className="ml-auto" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
      <Separator className="my-6" />
      <p className="mb-4 text-gray-700 dark:text-gray-300">수정하실 정보를 입력해주세요.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            이메일
          </label>
          <Input
            id="email"
            type="email"
            value={info.email || "이메일을 불러오는 중..."}
            className="mt-1 block w-full bg-gray-300"
            readOnly
            disabled
          />
        </div>
        <div className="flex justify-start">
          <Button
            variant="outline"
            className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            onClick={() => setShowPasswordPopup(!showPasswordPopup)}
          >
            비밀번호 변경
          </Button>
        </div>

        {showPasswordPopup && <EditPasswordComponent handlePasswordPopup={() => setShowPasswordPopup(false)} />}

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">성별</label>
          <p className="mt-1 text-gray-700 dark:text-gray-300">
            {info.gender === "man" ? "남성" : info.gender === "woman" ? "여성" : "선택되지 않음"}
          </p>
        </div>

        <div className="mt-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            나이
          </label>
          <Input
            id="age"
            type="number"
            placeholder="나이를 입력하세요."
            className="mt-1 block w-full"
            onChange={handleAgeChange}
            value={info.age || ""}
          />
        </div>

        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            키(cm)
          </label>
          <Input
            id="height"
            type="number"
            placeholder="키를 입력하세요."
            className="mt-1 block w-full"
            onChange={(e) => setInfo({ ...info, height: e.target.value })}
            value={info.height || ""}
          />
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            몸무게(kg)
          </label>
          <Input
            id="weight"
            type="number"
            placeholder="몸무게를 입력하세요."
            className="mt-1 block w-full"
            onChange={(e) => setInfo({ ...info, weight: e.target.value })}
            value={info.weight || ""}
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">알레르기 유무</span>
          <div className="flex items-center mt-2">
            <label className="flex items-center mr-4">
              <input
                type="radio"
                name="allergy"
                value="yes"
                checked={allergy}
                onChange={() => handleAllergyRadioChange(true)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">있음</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="allergy"
                value="no"
                checked={!allergy}
                onChange={() => handleAllergyRadioChange(false)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">없음</span>
            </label>
          </div>

          {allergy && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">알레르기 선택</label>
              <div className="mt-2 space-y-2">
                {[
                  "메밀",
                  "밀",
                  "대두",
                  "땅콩",
                  "호두",
                  "잣",
                  "아황산류",
                  "복숭아",
                  "토마토",
                  "난류",
                  "우유",
                  "새우",
                  "고등어",
                  "오징어",
                  "게",
                  "조개류",
                  "돼지고기",
                  "쇠고기",
                  "닭고기",
                ].map((allergyItem) => (
                  <label key={allergyItem} className="flex items-center">
                    <input
                      type="checkbox"
                      value={allergyItem}
                      checked={selectedAllergies.includes(allergyItem)}
                      onChange={handleAllergySelection}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">{allergyItem}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">선택된 알레르기:</h4>
                <div className="flex flex-wrap mt-2">
                  {selectedAllergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">현재 목표</h3>
          <p className="text-gray-600 dark:text-gray-400">{goalTranslations[goal] || "목표 없음"}</p>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          onClick={handleEditInfo}
        >
          수정
        </Button>
        <Button
          variant="outline"
          className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          onClick={handleGoalSetting}
        >
          목표 설정
        </Button>
        <Button
          variant="outline"
          className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          onClick={handleExit}
        >
          나가기
        </Button>
      </div>
    </div>
  );
}
