import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { api } from "@/modules/api.module";

export default function FoodSearchComponent({ name }) {
  const [searchTerm, setSearchTerm] = useState(name || ""); // 초기 음식명은 URL에서 받아온 name
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 음식 검색 함수
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      setLoading(true); // 로딩 상태 시작
      try {
        // 서버로 GET 요청을 보내 음식 데이터 검색 (여기서는 임시로 직접 설정한 데이터를 사용)
        const response = await api.get(`/food/${searchTerm}`); // 실제 서버 요청
        if (response.result === "success") {
          const { data } = response;
          setSearchResults(data); // 응답 데이터를 결과로 설정
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }
  };

  // 컴포넌트가 처음 로드되면 URL의 음식 이름을 사용하여 검색
  useEffect(() => {
    if (name) {
      setSearchTerm(name);
      handleSearch(); // 자동으로 검색 수행
    }
  }, [name]);

  return (
    <div className="px-4 py-8">
      <div className="flex flex-col items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4">음식 검색</h1>
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <SearchIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              onClick={handleSearch}
            />
            <Input
              type="text"
              placeholder="음식명을 입력해주세요."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full"
            />
          </div>
        </form>
      </div>

      {/* 검색 결과 표시 */}
      <div className="space-y-6">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : searchResults?.length > 0 ? (
          searchResults.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <h3 className="flex flex-row items-center gap-2 text-lg font-bold mb-2">
                  <span> {item.name} </span>
                  <span className="text-sm text-gray-500">{item.kcal} kcal</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <span className="font-medium">탄수화물</span> {item.carb}g
                  </div>
                  <div>
                    <span className="font-medium">단백질</span> {item.protein}g
                  </div>
                  <div>
                    <span className="font-medium">지방</span> {item.fat}g
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12">
            <SearchIcon className="w-12 h-12 mx-auto mb-4" />
            <p>음식명을 입력해주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
