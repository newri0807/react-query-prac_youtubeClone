import React from "react";
import useList from "../hooks/useList";
import { useNavigate } from "react-router-dom";

export default function RelatedList({ id }) {
  //   const { isLoading, isError, data, error } =
  //     useList(  `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&key=AIzaSyD-fngmCmRBJ4-u7aNYlPwOhHGzX3IJHvE
  // `);

  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const { isLoading, isError, data, error } = useList([
    `relatedList`,
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&key=${apiKey}`,
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
  //console.log("related", data);
  return (
    <div>
      {data &&
        data.items.map((item) => (
          <div
            id={item.id.videoId}
            key={item.id.videoId}
            className="w-full cursor-pointer mb-2"
            onClick={() => {
              navigate(`/detail/${item.snippet.channelId}/${item.id.videoId}`);
            }}
          >
            <img
              src={item.snippet.thumbnails.standard.url}
              alt="thumbnail"
              className="w-full object-fill"
            />
            <h3 className="mt-2 mb-3 text-xl "> {item.snippet.title}</h3>
            <h5 className="text-gray-400 mt-2">
              {getRelativeTime(item.snippet.publishedAt)}
            </h5>
          </div>
        ))}
    </div>
  );
}
