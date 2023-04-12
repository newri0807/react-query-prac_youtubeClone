/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedList from "../components/RelatedList";
import useList from "../hooks/useList";

export default function Detail() {
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const [channelThumbnail, setChannelThumbnail] = useState("");

  //파라미터
  let { id } = useParams();

  // console.log(channelId);
  // const { isLoading, isError, data, error } = useQuery(
  //   ["detailPage"],
  //   async () => {
  //     const res = await fetch(`data/detailPage.json`);
  //     return await res.json();
  //   },
  //   {
  //     staleTime: 1000 * 60 * 5,
  //   }
  // );

  const { isLoading, isError, data, error, updateData } = useList([
    `detailPage`,
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${apiKey}`,
  ]);

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (data) {
      const channelId = data.items[0].snippet.channelId;
      fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setChannelThumbnail(data.items[0].snippet.thumbnails.default.url);
        })
        .catch((error) => {
          console.error("Error fetching channel thumbnail: ", error);
        });
    }
  }, [data, apiKey]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  //console.log("detail", data);

  function convertLineBreaks(text) {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }

  return (
    <div className="w-full  md:px-1  mx-auto  border-t-[1px] border-gray-700 pt-5 flex justify-between flex-wrap">
      <div className="lg:w-2/3 sm:w-full w-full p-2">
        {data &&
          data.items.map((item) => (
            <div
              key={item.etag}
              className="w-full cursor-pointer relative h-0 pt-[56%]"
            >
              <iframe
                id="player"
                className="w-full h-full absolute top-0 left-0"
                // eslint-disable-next-line no-template-curly-in-string
                src={`https://www.youtube.com/embed/${id}?enablejsapi=1&origin=http://example.com`}
              ></iframe>
              <h2 className="my-3 font-bold text-lg"> {item.snippet.title}</h2>
              <div className="flex justify-start items-center mt-4">
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src={channelThumbnail}
                  alt={`${item.snippet.channelTitle} 프로필 이미지`}
                />
                <h2 className="my-4 text-xl mx-3">
                  {item.snippet.channelTitle}
                </h2>
              </div>

              <p className="text-gray-400 mt-2">
                {new Date(item.snippet.publishedAt).toLocaleString()}
              </p>
              <h6 className="mt-2">
                {convertLineBreaks(item.snippet.description)}
              </h6>
            </div>
          ))}
      </div>
      <div className="lg:w-1/3 sm:w-full w-full p-2">
        <RelatedList id={id} />
      </div>
    </div>
  );
}
