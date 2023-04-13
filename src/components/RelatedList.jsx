import React from "react";
import useList from "../hooks/useList";
import { useNavigate } from "react-router-dom";
import getRelativeTime from "../func/common";

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

  return (
    <div>
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
