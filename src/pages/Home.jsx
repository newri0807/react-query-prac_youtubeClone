import React from "react";
import useList from "../hooks/useList";
import { useNavigate } from "react-router-dom";
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
  console.log(apiKey);

  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useList([
    `mostPopular`,
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${apiKey}`,
  ]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  //console.log(data.items[0].id);

  // 시간 계산 함수
  function getRelativeTime(publishedAt) {
    const datePublished = new Date(publishedAt);
    const dateNow = new Date();
    const diff = dateNow - datePublished;
    const seconds = Math.floor(diff / 1000);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }

    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) {
      return `${hours} hours ago`;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 30) {
      return `${days} days ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months} months ago`;
    }

    const years = Math.floor(months / 12);
    return `${years} years ago`;
  }

  console.log(data);
  return (
    <ul className="grid lg:grid-cols-5 md:grid-cols-2 gap-4 border-t-[1px] border-gray-700 pt-5 ">
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
            <h3 className="my-3 font-bold text-lg"> {item.snippet.title}</h3>
            <h5 className="text-[1.1em] text-gray-400">
              {item.snippet.channelTitle}
            </h5>
            <p className="text-gray-400">
              {getRelativeTime(item.snippet.publishedAt)}
            </p>
          </li>
        ))}
    </ul>
  );
}
