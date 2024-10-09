import { api } from "@/modules/api.module";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const EditPasswordComponent = ({ handlePasswordPopup }) => {
  const { userId } = useSelector((state) => state.memberReducer.loginData || {});
  const [newPassword, setNewpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleEditPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await api.patch("/member/editPassword", {
        newPassword,
      });

      if (response?.result === "success") {
        // 비밀번호가 성공적으로 변경되면 모달을 닫음
        handlePasswordPopup();
      } else {
        setError("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생:", error);
      setError("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  비밀번호 변경
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">새 비밀번호를 입력하세요.</p>
                  <input
                    type="password"
                    className="mt-2 border border-gray-300 p-2 w-full"
                    placeholder="새 비밀번호"
                    onChange={(e) => setNewpassword(e.currentTarget.value)}
                  />
                  <input
                    type="password"
                    className="mt-2 border border-gray-300 p-2 w-full"
                    placeholder="비밀번호 확인"
                    onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                  />
                  {error && <p className="mt-2 text-red-500">{error}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handlePasswordPopup}
            >
              취소
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={handleEditPassword}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPasswordComponent;
