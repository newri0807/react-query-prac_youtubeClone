import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useList from "../hooks/useList";

export default function Video() {
  const navigate = useNavigate();
  //파라미터
  let { id } = useParams();

  //api key
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const { isLoading, isError, data, error } = useList([
    `searchList${id}`,
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${id}&key=${apiKey}`,
  ]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

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
  return (
    <ul className="grid lg:grid-cols-5 md:grid-cols-2 gap-4 border-t-[1px] border-gray-700 pt-5 ">
      {data &&
        data.items.map((item) => (
          <li
            id={item.id.videoId}
            key={item.id.videoId}
            className="p-3 cursor-pointer"
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              navigate(`/detail/${item.snippet.channelId}/${item.id.videoId}`);
            }}
          >
            <img
              src={item.snippet.thumbnails.medium.url}
              alt="thumbnail"
              className="w-full max-h-[200px] object-fit"
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
