import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useList from "../hooks/useList";
import getRelativeTime from "../func/common";

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

  return (
    <ul className="grid lg:grid-cols-5 md:grid-cols-2 gap-4 border-t-[1px] border-gray-700 pt-5 ">
      {isLoading && (
        <div className="w-full cursor-pointer mb-2">
          <span>Loading...</span>
        </div>
      )}

      {isError && (
        <div className="w-full cursor-pointer mb-2">
          <span>Error: {error.message}</span>
        </div>
      )}

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
