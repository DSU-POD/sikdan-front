import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MealAddComponent() {
  const [mealName, setMealName] = useState("");
  const [mealPhoto, setMealPhoto] = useState(null);
  const [nutritionInfo, setNutritionInfo] = useState(null);

  const handlePhotoUpload = (e) => {
    setMealPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mealName || !mealPhoto) {
      alert("식단 이름과 사진을 모두 입력해주세요.");
      return;
    }

    // 가짜 API 호출을 사용한 영양 성분 분석 로직 (실제 API 사용 시 이 부분을 수정)
    const formData = new FormData();
    formData.append("name", mealName);
    formData.append("photo", mealPhoto);

    try {
      // 실제 API URL로 변경
      const response = await fetch("YOUR_API_URL", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      // 가짜 데이터
      const fakeData = {
        protein: "20g",
        carbs: "30g",
        fat: "15g",
      };

      setNutritionInfo(fakeData); // 실제 API 데이터를 사용할 경우 data로 변경
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-md mx-auto grid gap-6">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold">식단 등록</h2>
            <p className="text-gray-500 dark:text-gray-400">
              음식 분석 AI가 식단을 분석해드립니다.
            </p>
          </div>
          <form
            className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm grid gap-4"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="meal-name">식단 이름</Label>
                <Input
                  id="meal-name"
                  placeholder="식단 이름을 입력해주세요"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meal-photo">식단 사진</Label>
                <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <div>
                    <input
                      id="meal-photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="meal-photo"
                      className="text-center text-gray-500 dark:text-gray-400 cursor-pointer"
                    >
                      <UploadIcon className="h-8 w-8 mb-2" />
                      <p>사진을 등록해주세요</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <Button type="submit" className="justify-self-end">
              식단 등록
            </Button>
          </form>
        </div>
        {nutritionInfo && (
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold">영양분 정보</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Here s a breakdown of the key nutrients in your diet.
            </p>
            <div className="grid gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold">단백질</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Helps build and repair tissues.
                </p>
                <div className="text-gray-500 dark:text-gray-400">
                  {nutritionInfo.protein}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold">탄수화물</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Provides energy for your body.
                </p>
                <div className="text-gray-500 dark:text-gray-400">
                  {nutritionInfo.carbs}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold">지방</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Supports cell growth and hormone production.
                </p>
                <div className="text-gray-500 dark:text-gray-400">
                  {nutritionInfo.fat}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
