import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";

export default function Nav({ quotaExceeded }) {
  // 검색 관련
  const [input, setInput] = useState("");
  const valueHandle = (e) => {
    setInput(e.target.value);
  };

  // 페이지 이동
  const Navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault(); // 새로고침 x

    if (quotaExceeded) {
      alert("API request quota exceeded. Please try again later.");
      return;
    }
    setInput(""); // 초기화
    Navigate(`/video/${input}`);
  };

  return (
    <div className="flex items-center">
      <Link to="/">
        <img src="/YouTube-Logo2.png" alt="logo" className="max-w-[100px] " />
      </Link>
      <form onSubmit={formSubmit} className="flex w-full justify-center my-3 ">
        <input
          type="text"
          placeholder="search here"
          value={input}
          onChange={valueHandle}
          className="pr-2 pl-2 w-[100px] ml-1 lg:w-[450px]  bg-black appearance-none  py-2 px-4 text-gray-300 leading-tight focus:outline-none focus:bg-gray focus:border-gray-500"
        />
        <button className="m-0 min-[40px]; flex justify-center items-center bg-neutral-700 text-slate-100 hover:bg-slate-700 p-2 w-auto">
          <GoSearch />
        </button>
      </form>
    </div>
  );
}
