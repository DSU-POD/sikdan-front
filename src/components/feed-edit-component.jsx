import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { api } from "@/modules/api.module";
import { SunIcon } from "@heroicons/react/24/outline";
import { CloudIcon, MoonIcon } from "@heroicons/react/24/solid";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { showToast } from "./layout/toast";
import { useRouter } from "next/router";

export function FeedEditComponent({ id }) {
  const [feed, setFeed] = useState({});
  const [diet, setDiet] = useState({});
  const router = useRouter();

  const [changeData, setChangeData] = useState({
    dietName: "",
    contents: "",
  });

  const handleGetFeed = async () => {
    const response = await api.get(`/feed/view/${id}`);
    if (response.result === "success") {
      const feed = response.data;
      setFeed(feed);
      setDiet(feed.feedDiet);
      setChangeData({
        dietName: feed.feedDiet?.dietName,
        contents: feed.contents,
      });
    }
  };

  const handleChange = (attr, data) => {
    setChangeData((current) => ({
      ...current,
      [attr]: data,
    }));
  };

  const handleEdit = async () => {
    const { dietName, contents } = changeData;
    const response = await api.patch(`/feed/edit/${id}`, {
      editData: {
        dietName,
        contents,
      },
    });

    if (response.result === "success") {
      showToast("수정 되었습니다.");
      router.push(`/main/feed/${id}`);
    }
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

  useEffect(() => {
    handleGetFeed();
  }, []);
  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg w-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>
              <XIcon className="w-full h-full" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">{feed.memberFeed?.nickname}</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              @{feed.memberFeed?.userId}
            </div>
          </div>
        </div>
      </div>

      <div className="p-0">
        <img
          src={diet.url}
          width={800}
          height={800}
          alt="Post Image"
          className="w-full h-auto object-cover"
          style={{ aspectRatio: "800/800", objectFit: "cover" }}
        />
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">식단정보</h2>
        </div>
        <div className="w-full">{getMealsIcon(diet.meals)}</div>
        <div className="space-y-2">
          {diet.nutrient?.map((food, key) => {
            return (
              <div
                key={key}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm"
              >
                <p className="text-lg font-semibold">{food.name}</p>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="flex flex-col">
                    <p className="text-gray-500 dark:text-gray-400">단백질</p>
                    <div className="flex flex-row items-center">
                      <span>{food.protein} g</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-500 dark:text-gray-400">탄수화물</p>
                    <div className="flex flex-row items-center">
                      <span>{food.carbohydrates}g</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-500 dark:text-gray-400">지방</p>
                    <div className="flex flex-row items-center">
                      <span>{food.fat}g</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                onChange={(e) =>
                  handleChange("dietName", e.currentTarget.value)
                }
                value={changeData?.dietName}
              />
              <Textarea
                onChange={(e) =>
                  handleChange("contents", e.currentTarget.value)
                }
                value={changeData.contents}
              ></Textarea>
            </div>
            <Button
              onClick={handleEdit}
              className={`flex justify-center shadow-md py-6 `}
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookmarkIcon(props) {
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
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function FileWarningIcon(props) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function HeartIcon(props) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MessageCircleIcon(props) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function MoveHorizontalIcon(props) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function SendIcon(props) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
