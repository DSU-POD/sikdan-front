import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import { Input } from "postcss";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { api } from "@/modules/api.module";
import { useState } from "react";
import { SunIcon } from "@heroicons/react/24/outline";
import { CloudIcon, MoonIcon } from "@heroicons/react/24/solid";

export function FeedContentsComponent() {
  const { predict, writeData } = useSelector((state) => state.feedReducer);
  const [contents, setContents] = useState("");

  const router = useRouter();
  const handleSubmit = async () => {
    const { dietName, meals } = writeData;
    const result = await api.post(`/feed/write`, {
      predict,
      writeData: {
        dietName,
        contents,
        meals,
      },
    });

    router.push(`/main/feed/view/${result.data}`);
  };

  const handleBack = () => {
    router.push(`/main/feed/meal`);
  };
  const getMealsIcon = (meals) => {
    switch (meals) {
      case "아침":
        return (
          <Button
            className={`w-full flex items-center shadow-md py-6 bg-yellow-100`}
          >
            <SunIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-yellow-500" />
            <p className="ml-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800">
              아침
            </p>
          </Button>
        );
      case "점심":
        return (
          <Button
            className={`w-full flex items-center shadow-md py-6 bg-blue-100`}
          >
            <CloudIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-400" />
            <p className="ml-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800">
              점심
            </p>
          </Button>
        );
      case "저녁":
        return (
          <Button
            className={`w-full flex items-center shadow-md py-6 bg-blue-100}`}
          >
            <MoonIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-indigo-600" />
            <p className="ml-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800">
              저녁
            </p>
          </Button>
        );
    }
  };
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
      <div className="flex items-center mb-4">
        <Link
          href="/main/feed/meal"
          className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>식단등록</span>
        </Link>
      </div>
      <div className="flex flex-col gap-4 items-center space-y-6">
        <img
          src={`${predict.url}`}
          alt="Food Image"
          width={400}
          height={400}
          className="rounded-lg w-full max-h-[400px] object-cover"
          style={{ aspectRatio: "400/400", objectFit: "cover" }}
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold">{writeData.dietName}</h2>
        </div>
        <div className="w-full">{getMealsIcon("아침")}</div>
        <div className="w-full">
          <div className="space-y-4"></div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">식단정보</h2>
            <hr />
            {predict?.nutrient?.map((data, key) => {
              return (
                <div
                  key={key}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm"
                >
                  <p className="text-lg font-semibold">{data.name}</p>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="flex flex-col">
                      <p className="text-gray-500 dark:text-gray-400">단백질</p>
                      <div className="flex flex-row items-center">
                        {data.protein}
                        <span>g</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500 dark:text-gray-400">
                        탄수화물
                      </p>
                      <div className="flex flex-row items-center">
                        {data.carbohydrates}
                        <span>g</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-500 dark:text-gray-400">지방</p>
                      <div className="flex flex-row items-center">
                        {data.fat}
                        <span>g</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full">
          <Label htmlFor="description" className="block mb-2">
            내용 (선택)
          </Label>
          <Textarea
            id="description"
            rows={3}
            placeholder=""
            className="w-full"
            onChange={(e) => setContents(e.currentTarget.value)}
            value={contents}
          />
        </div>
        <div className="flex flex-row w-full gap-4">
          <Button
            type="button"
            onClick={handleBack}
            className="w-full bg-white shadow mt-4"
          >
            이전
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-black text-white shadow mt-4"
          >
            등록
          </Button>
        </div>
      </div>
    </div>
  );
}

function ArrowLeftIcon(props) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
