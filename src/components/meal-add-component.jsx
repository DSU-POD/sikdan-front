import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { formDataApi } from "@/modules/api.module";
import { showToast } from "./layout/toast";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setPredict, setWriteData } from "@/store/reducers/feed.reducer";
import { useRouter } from "next/router";
import { SunIcon } from "@heroicons/react/24/outline";
import { CloudIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function MealAddComponent() {
  const [dietName, setDietName] = useState("");
  const [meals, setMeals] = useState("");
  const [feedData, setFeedData] = useState([]);
  const [isPredict, setIsPredict] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const fileRef = useRef(null);
  const isError = true;

  const handleUpload = async (e) => {
    if (e.target.files.length === 0) return false;
    setLoading(true);
    const formData = new FormData();

    formData.append("file", e.target.files[0]);

    const response = await formDataApi.post("/feed/predict", formData);
    if (!response.data) {
      showToast("음식이 탐지되지 않았습니다.", isError);
      setIsPredict(false);
    }
    setLoading(false);

    if (response.result === "success") {
      setIsPredict(true);

      const { predict, url } = response.data;
      if (predict.nutrient?.length === 0) {
        showToast("음식이 탐지되지 않았습니다.", isError);
        setIsPredict(false);
      } else {
        setFeedData((current) => ({
          ...current,
          predict,
          url,
        }));
      }
      dispatch(
        setPredict({
          predict,
          url,
        })
      );
    }
  };

  const handleNutrient = (value, name, category) => {
    setFeedData((current) => {
      return {
        ...current,
        predict: {
          ...current.predict,
          nutrient: current.predict.nutrient.map((food, key) => {
            return food.name === name
              ? {
                  ...food,

                  [category]: value === "" ? 0 : parseInt(value),
                }
              : food;
          }),
        },
      };
    });
  };
  const handleSubmit = () => {
    if (dietName === "") {
      showToast("식단 이름을 입력해주세요", isError);
      return false;
    }

    if (meals === "") {
      showToast("아침, 점심, 또는 저녁 중 하나를 선택해주세요.", isError);
      return false;
    }
    if (isPredict === false) {
      showToast("식단 사진 분석을 진행해주세요.", isError);
      return false;
    }
    const { predict, url } = feedData;
    dispatch(
      setPredict({
        predict,
        url,
      })
    );

    dispatch(
      setWriteData({
        dietName,
        contents: "",
        meals,
      })
    );

    router.push(`/main/feed/content`);
  };
  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-md mx-auto grid gap-6">
        <div className="grid gap-6">
          <div className="grid gap-2 py-8 px-4 shadow-md bg-white rounded-lg">
            <h2 className="text-2xl font-bold text-center">식단 등록</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              음식 분석 AI가 식단을 분석해드립니다.
            </p>
          </div>
          <div className="grid gap-4">
            <h2 className="text-2xl font-bold">식단 이름</h2>

            <div className="grid gap-2 py-8 px-4 shadow-md bg-white rounded-lg overflow-hidden">
              <Input
                type="text"
                onChange={(e) => setDietName(e.currentTarget.value)}
              />
            </div>
            <div className="grid gap-4">
              <div className="w-full flex flex-row justify-center items-center grid grid-cols-3 gap-4">
                {/* 아침 */}
                <Button
                  className={`flex items-center shadow-md py-6 ${meals === "아침" ? "bg-yellow-100" : "bg-white"}`}
                  onClick={() => setMeals("아침")}
                >
                  <SunIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-yellow-500" />
                  <p className="ml-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800">
                    아침
                  </p>
                </Button>

                {/* 점심 */}
                <Button
                  className={`flex items-center shadow-md py-6 ${meals === "점심" ? "bg-blue-100" : "bg-white"}`}
                  onClick={() => setMeals("점심")}
                >
                  <CloudIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-400" />
                  <p className="ml-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800">
                    점심
                  </p>
                </Button>

                {/* 저녁 */}
                <Button
                  className={`flex items-center shadow-md py-6 ${meals === "저녁" ? "bg-indigo-100" : "bg-white"}`}
                  onClick={() => setMeals("저녁")}
                >
                  <MoonIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-indigo-600" />
                  <p className="ml-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800">
                    저녁
                  </p>
                </Button>
              </div>
            </div>
            <h2 className="text-2xl font-bold">식단 사진</h2>
            <div className="grid gap-2 py-8 px-4 shadow-md bg-white rounded-lg overflow-hidden">
              {isPredict ? (
                <img
                  src={`${feedData.url}`}
                  alt="Food Image"
                  width={400}
                  height={400}
                  className="rounded-lg w-full max-h-[400px] object-cover"
                  style={{ aspectRatio: "400/400", objectFit: "cover" }}
                />
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <div>
                    <div
                      className="text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center"
                      onClick={() => fileRef.current.click()}
                    >
                      <UploadIcon className="h-8 w-8 mb-2" />
                      <p>사진을 등록해주세요</p>
                      <input
                        type="file"
                        name="file"
                        ref={fileRef}
                        onChange={handleUpload}
                        hidden
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {loading ? (
          <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center bg-gray-700 bg-opacity-50 z-50">
            <ClipLoader loading={loading} color="#ffffff" size={50} />
            <p className="text-white mt-4">
              식단 분석중입니다 잠시만 기다려주세요...
            </p>
          </div>
        ) : (
          ""
        )}

        {isPredict ? (
          <div className="grid gap-6">
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold">탐지된 음식</h2>

              {feedData.predict?.nutrient?.length > 0 ? (
                feedData.predict?.nutrient?.map((data, key) => {
                  return (
                    <div
                      key={key}
                      className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm"
                    >
                      <p className="text-lg font-semibold">{data.name}</p>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div className="flex flex-col">
                          <p className="text-gray-500 dark:text-gray-400">
                            단백질
                          </p>
                          <div className="flex flex-row items-center">
                            <Input
                              className="text-gray-500 dark:text-gray-400"
                              value={
                                typeof data.protein === "number"
                                  ? data.protein
                                  : 0
                              }
                              onChange={(e) =>
                                handleNutrient(
                                  e.currentTarget.value,
                                  data.name,
                                  "protein"
                                )
                              }
                            />
                            <span>g</span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-gray-500 dark:text-gray-400">
                            탄수화물
                          </p>
                          <div className="flex flex-row items-center">
                            <Input
                              className="text-gray-500 dark:text-gray-400"
                              value={
                                typeof data.carbohydrates === "number"
                                  ? data.carbohydrates
                                  : 0
                              }
                              onChange={(e) =>
                                handleNutrient(
                                  e.currentTarget.value,
                                  data.name,
                                  "carbohydrates"
                                )
                              }
                            />
                            <span>g</span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-gray-500 dark:text-gray-400">
                            지방
                          </p>
                          <div className="flex flex-row items-center">
                            {console.log(typeof data.fat)}
                            <Input
                              className="text-gray-500 dark:text-gray-400"
                              value={
                                typeof data.fat === "number" ? data.fat : 0
                              }
                              onChange={(e) =>
                                handleNutrient(
                                  e.currentTarget.value,
                                  data.name,
                                  "fat"
                                )
                              }
                            />
                            <span>g</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">
                    음식 사진이 탐지되지 않았습니다.
                  </h3>
                </div>
              )}
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
              <p className="text-lg font-semibold">
                총 칼로리 : {feedData.predict?.total_calories}kcal
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-black text-white shadow mt-4"
      >
        다음
      </Button>
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
