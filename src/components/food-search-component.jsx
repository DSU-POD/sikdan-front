import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function FoodSearchComponent({ name }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async (e) => {
    e.preventDefault();
    if (name) {
      try {
        const response = await fetch("YOUR_API_URL");
        const data = await response.json();
        setSearchResults([
          {
            id: 1, // 아이템에 고유 ID를 추가합니다.
            calories: 300,
            name: "test",
            fat: 10,
            carbs: 10,
            protein: 10,
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (name) {
      setSearchTerm(name);
    }
  }, [name]);

  return (
    <div className="px-4 py-8">
      <div className="flex flex-col items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4">Nutrition Information</h1>
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search for a food item"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full"
            />
          </div>
        </form>
      </div>
      <div className="space-y-6">
        {searchResults?.length > 0 &&
          searchResults.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src="/placeholder.svg"
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium">
                  {item.calories} kcal
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <span className="font-medium">탄수화물</span> {item.carbs}g
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
          ))}
      </div>
      {searchResults.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <SearchIcon className="w-12 h-12 mx-auto mb-4" />
          <p>Search for a food item to see its nutrition information.</p>
        </div>
      )}
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
