import { useState } from "react";
import { useRouter } from "next/router";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProfileEditComponent() {
  const [allergy, setAllergy] = useState(false);
  const [profileImage, setProfileImage] = useState("/placeholder-user.jpg");
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const router = useRouter();

  const allergiesList = ["땅콩", "우유", "계란", "생선", "밀"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setShowUploadButton(false);
    }
  };

  const handleAllergySelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedAllergies((prev) => [...prev, value]);
    } else {
      setSelectedAllergies((prev) => prev.filter((allergy) => allergy !== value));
    }
  };

  const handleSave = () => {
    // Save logic here (e.g., API call to save user profile)
    console.log("Selected allergies:", selectedAllergies);

    // Navigate to profile-component page
    router.push("/components/profile-component");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-950 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Avatar
            className="w-16 h-16 border-2 border-gray-300 cursor-pointer"
            onClick={() => setShowUploadButton(!showUploadButton)}
          >
            <AvatarImage src={profileImage} alt="shadcn" />
            <AvatarFallback>SY</AvatarFallback>
          </Avatar>
          {showUploadButton && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              <label className="text-white text-xl cursor-pointer">
                +
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center ml-4">
          <h2 className="text-xl font-bold">shadcn</h2>
          <p className="text-gray-600 dark:text-gray-400">changyong@naver.com</p>
        </div>
        <Button variant="outline" size="sm" className="self-start">
          로그아웃
        </Button>
      </div>
      <Separator className="my-6" />
      <p className="mb-4 text-gray-700 dark:text-gray-300">수정하실 정보를 입력해주세요.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">비밀번호</label>
          <Input id="password" type="password" placeholder="비밀번호를 입력하세요." className="mt-1 block w-full" />
        </div>
        <div>
          <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">비밀번호 확인</label>
          <Input id="password-confirm" type="password" placeholder="비밀번호를 한번 더 입력하세요." className="mt-1 block w-full" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">이메일</label>
          <Input id="email" type="email" value="changyong@example.com" className="mt-1 block w-full" readOnly />
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300">키(cm)</label>
          <Input id="height" type="number" placeholder="키를 입력하세요." className="mt-1 block w-full" />
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">몸무게(kg)</label>
          <Input id="weight" type="number" placeholder="몸무게를 입력하세요." className="mt-1 block w-full" />
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
                onChange={() => setAllergy(true)}
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
                onChange={() => setAllergy(false)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">없음</span>
            </label>
          </div>
          {allergy && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">알레르기 선택</label>
              <div className="mt-2 space-y-2">
                {allergiesList.map((allergyItem) => (
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
            </div>
          )}
        </div>
        {selectedAllergies.length > 0 && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">선택된 알레르기:</label>
            <div className="mt-2 space-x-2">
              {selectedAllergies.map((allergy) => (
                <span
                  key={allergy}
                  className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                >
                  {allergy}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <Separator className="my-6" />
      <div className="flex justify-between mt-6">
        <Button
          variant="solid"
          size="md"
          className="bg-blue-600 text-white"
          onClick={handleSave}
        >
          수정
        </Button>
        <Button variant="solid" size="md" className="bg-green-600 text-white">
          목표 설정
        </Button>
      </div>
    </div>
  );
}
