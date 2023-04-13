import React, { useEffect, useState } from "react";
import useList from "../hooks/useList";
import { useNavigate } from "react-router-dom";
import getRelativeTime from "../func/common";
export default function Home() {
  // const { isLoading, isError, data, error } = useQuery(
  //   ["mostPopular"],
  //   async () => {
  //     const res = await fetch(
  //       `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyD-fngmCmRBJ4-u7aNYlPwOhHGzX3IJHvE`
  //     );
  //     return await res.json();
  //   },
  //   {
  //     staleTime: 1000 * 60 * 5,
  //   }
  // );

  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const navigate = useNavigate();
  const [quotaExceeded, setQuotaExceeded] = useState(false); // API 할당량 초과 여부 상태 추가

  useEffect(() => {
    // API 요청 제한 확인 함수
    async function checkQuota() {
      const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=id&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&maxResults=1&key=${apiKey}`
      );
      const data = await res.json();

      if (data?.error?.errors?.[0]?.reason === "quotaExceeded") {
        setQuotaExceeded(true);
      }
    }

    checkQuota();
  }, [apiKey]);

  const { isLoading, isError, data, error } = useList([
    `mostPopular`,
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=15&key=${apiKey}`,
  ]);

  console.log(quotaExceeded);

  return (
    <>
      {quotaExceeded ? (
        <div className="text-center flex items-center justify-center h-[100vh]">
          API request quota exceeded. Please try again later.
        </div>
      ) : (
        <ul className="grid lg:grid-cols-5 md:grid-cols-2 gap-4 border-t-[1px] border-gray-700 pt-5 ">
          {isLoading && (
            <div className="w-full">
              <span>Loading...</span>
            </div>
          )}

          {isError && (
            <div className="w-full">
              <span>Error: {error.message}</span>
            </div>
          )}

          {data &&
            data.items.map((item) => (
              <li
                id={item.id}
                key={item.id}
                className="p-3 cursor-pointer"
                onClick={() => {
                  navigate(`/detail/${item.snippet.channelId}/${item.id}`);
                }}
              >
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt="thumbnail"
                  className="w-full"
                />
                <h3 className="my-3 font-bold text-lg">
                  {" "}
                  {item.snippet.title}
                </h3>
                <h5 className="text-[1.1em] text-gray-400">
                  {item.snippet.channelTitle}
                </h5>
                <p className="text-gray-400">
                  {getRelativeTime(item.snippet.publishedAt)}
                </p>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
