import { useState } from "react";
import {
  UserIcon,
  HouseIcon,
  PlusIcon,
  MenuIcon,
  LogOutIcon,
} from "lucide-react";
import { useRouter } from "next/router";

export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setOpen((current) => !current);
  };
  const menuItems = [
    { icon: HouseIcon, name: "홈", link: "/main/feed" },
    { icon: PlusIcon, name: "추가", link: "/main/feed/meal" },
    { icon: UserIcon, name: "마이페이지", link: "/main/feed" },
    { icon: LogOutIcon, name: "로그아웃", link: "/member/logout" },
  ];

  return (
    <div className="fixed bottom-20 right-4">
      <div className="relative">
        {/* 하위 메뉴 */}
        <div
          className={`absolute bottom-full rounded-lg bg-white right-0 mb-2 transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        >
          <div className="flex flex-col items-end space-y-2">
            {menuItems.map((item, index) => (
              <div key={index} className="group relative border-0">
                <button
                  className="text-white border-0 p-3 hover:bg-gray-100 transition-colors duration-300"
                  onClick={() => router.push(item?.link)}
                >
                  <item.icon
                    className="text-black border-0 shadow-0"
                    size={24}
                  />
                </button>
                <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 햄버거 메뉴 버튼 */}
        <button
          onClick={toggleMenu}
          style={{ borderRadius: "9999px" }}
          className="bg-[#D1F1E0] text-black p-4 shadow-lg transition-colors duration-300"
        >
          <MenuIcon />
        </button>
      </div>
    </div>
  );
}
