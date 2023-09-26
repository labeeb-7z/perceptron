"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Analytics from "../components/Analytics";
import YtAnalytics from "../components/YtAnalytics";
import SearchAnalytics from "../components/SearchAnalytics";
import AlertAnalytics from "../components/AlertAnalytics";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status }: any = useSession();
  const [tweet_id, setTweet_id] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [tweetAnalytics, setTweetAnalytics] = useState([]);
  const [profile, setProfile] = useState<any>(null);

  const getSelectedTweet: any = () => {
    const selectedTweet = tweets?.filter((tweet: any) => {
      return tweet?.tweet_id === tweet_id;
    });
    const selectedAnalytics = tweetAnalytics?.filter((tweet: any) => {
      return tweet?.tweet_id === tweet_id;
    });
    console.log({
      selectedTweet,
      selectedAnalytics,
    });

    return {
      selectedTweet,
      selectedAnalytics,
    };
  };

  async function registerTwitter(userId: string) {
    if (!userId || userId === "") {
      console.error("no user id");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/registerTwitter",
        {
          user_id: "828894693463359489",
        }
      );
      console.log(res.data);
      setProfile(res.data?.profile);
      setTweets(res.data?.profile?.tweets || []);
      setTweetAnalytics(res?.data?.profile?.tweet_analysis || []);
    } catch (error: any) {
      if (error.response?.status === 409) {
        console.log(error.response.data);
      }
    }
  }

  console.log(tweetAnalytics);

  useEffect(() => {
      registerTwitter('kjbj');
  }, []);

  const formatDate: any = (dateStr: string): string => {
    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  // yt
  const [video_id, setVideo_id] = useState(null);
  const [videos, setVideos] = useState([]);
  const [videoAnalytics, setVideoAnalytics] = useState([]);
  const [channel, setChannel] = useState<any>(null);

  const getSelectedVideo: any = () => {
    const selectedVideo = videos?.filter((video: any) => {
      return video?.id1?.videoId === video_id;
    });

    const selectedAnalytics = videoAnalytics?.filter((video: any) => {
      return video?.video_id === video_id;
    });
    console.log({
      selectedVideo,
      selectedAnalytics,
    });

    return {
      selectedVideo,
      selectedAnalytics,
    };
  };

  async function getYoutubeAnalytics() {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/getAnalyticsfromChannelId",
        {
          channel_id: "UCY6N8zZhs2V7gNTUxPuKWoQ",
        }
      );
      setVideos(res.data?.channel?.videos || []);
      setVideoAnalytics(res.data?.channel?.video_analysis || []);
    } catch (error: any) {
      if (error?.response) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    }
  }

  const [socialMedia, setSocialMedia] = useState("tw");
  useEffect(() => {
    const url = window.location.href;
    const urlSplit = url.split("?=")[1];
    if (urlSplit) {
      if (urlSplit === "tw") {
        setSocialMedia("tw");
      }

      if (urlSplit === "yt") {
        setSocialMedia("yt");
        getYoutubeAnalytics();
      }
      if (urlSplit === "ws") {
        setSocialMedia("ws");
      }
      if (urlSplit === "alerts") {
        setSocialMedia("alerts");
      }
      if (urlSplit === "rec") {
        setSocialMedia("rec");
      }
    }
  }, []);

  console.log(videos);

  //// ws //////
  const [searchText, setSearchText] = useState<string>("");
  const [searchTweets, setSearchTweets] = useState<any>([]);
  const [searchTweetAnalytics, setSearchTweetAnalytics] = useState<any>([]);
  const [searchTweet_id, setSearchTweet_id] = useState(null);

  async function getWordSearchAnalytics() {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/displayJSONWord",
        {
          word: searchText,
        }
      );
      console.log(res.data);
      setSearchTweets(res.data?.tweets_and_analysis?.tweets || []);
      setSearchTweetAnalytics(
        res.data?.tweets_and_analysis?.tweet_analysis || []
      );
    } catch (error: any) {
      if (error?.response) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    }
  }

  const getSelectedSearchTweet: any = () => {
    const selectedTweet = searchTweets?.filter((tweet: any) => {
      return tweet?.tweet_id === searchTweet_id;
    });
    const selectedAnalytics = searchTweetAnalytics?.filter((tweet: any) => {
      return tweet?.tweet_id === searchTweet_id;
    });
    console.log({
      selectedTweet,
      selectedAnalytics,
    });

    return {
      selectedTweet,
      selectedAnalytics,
    };
  };

  //// alert///
  const [alert, setAlert] = useState<number>(0);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-[100vh] pl-[14rem]">
          <Navbar />
          {socialMedia === "tw" ? (
            <section className="bg-white mt-5 flex justify-between dark:bg-gray-900">
              <div className="min-w-[35rem] px-4 ml-2 max-h-[100vh] overflow-y-scroll scroll rounded mr-3">
                {tweets &&
                  tweets.map((tweet: any) => {
                    return (
                      <>
                        <div
                          className={`p-5 mb-4 ${
                            tweet?.tweet_id === tweet_id
                              ? "border-[#f9aa00] border-2"
                              : "border-gray-100 border"
                          } rounded-lg bg-gray-50  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700`}
                        >
                          <time className="text-lg font-semibold text-gray-900 dark:text-white">
                            {formatDate(tweet?.creation_date)}
                          </time>
                          <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                            <li>
                              <div className="items-center block p-3 sm:flex ">
                                <Image
                                  src={
                                    profile?.profile_pic_url ||
                                    session.user?.image ||
                                    ""
                                  }
                                  width={100}
                                  height={100}
                                  className="w-8 h-8 rounded-full mr-7"
                                  alt="user photo"
                                ></Image>
                                <div className="text-gray-600 dark:text-gray-400 max-w-[27rem] pr-2">
                                  <div className="text-base font-normal">
                                    {tweet?.text}
                                  </div>
                                  <div className="mt-5 flex justify-between w-[25rem]">
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                      </svg>
                                      {tweet?.favorite_count}
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                        />
                                      </svg>
                                      {tweet?.reply_count}
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                        />
                                      </svg>
                                      {tweet?.bookmark_count}
                                    </span>
                                    <span
                                      onClick={() => {
                                        setTweet_id(tweet?.tweet_id);
                                      }}
                                      className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400"
                                    >
                                      <svg
                                        className="h-[1rem] w-[1rem] mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 301112 333331"
                                        shape-rendering="geometricPrecision"
                                        text-rendering="geometricPrecision"
                                        image-rendering="optimizeQuality"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                      >
                                        <path
                                          d="M301110 291619c124 22886-18333 41521-41206 41644-1700 14-3415-82-5101-288-21227-3140-36776-21611-36256-43057V43342c-507-21474 15084-39944 36324-43057 22721-2660 43304 13602 45964 36324 192 1673 288 3346 274 5032v249977z"
                                          fill="#f9ab00"
                                        />
                                        <path
                                          d="M41288 250756c22804 0 41288 18484 41288 41288s-18484 41288-41288 41288S0 314848 0 292044s18484-41288 41288-41288zm108630-125126c-22913 1261-40685 20472-40150 43413v110892c0 30099 13246 48364 32649 52258 22393 4539 44209-9928 48748-32320 562-2743 836-5526 822-8323V167124c41-22886-18470-41467-41356-41507-233 0-480 0-713 14z"
                                          fill="#e37400"
                                        />
                                      </svg>
                                      {tweet?.tweet_id === tweet_id
                                        ? "Viewing"
                                        : "View analytics"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </>
                    );
                  })}
              </div>
              {tweet_id && (
                <div className="max-h-[100vh] w-[100%] mr-5 overflow-y-scroll scroll bg-gray-50 rounded border">
                  <Analytics tweet={getSelectedTweet()} />
                </div>
              )}
            </section>
          ) : socialMedia === "yt" ? (
            <section className="bg-white mt-5 flex justify-between dark:bg-gray-900">
              <div className="min-w-[42rem] px-4 ml-2 max-h-[100vh] overflow-y-scroll scroll rounded mr-3">
                {videos &&
                  videos.map((video: any) => {
                    return (
                      <>
                        <div
                          className={`p-5 mb-4 rounded-lg bg-gray-50 ${
                            video?.id1?.videoId === video_id
                              ? "border-[#f9aa00] border-2"
                              : "border-gray-100 border"
                          } hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700`}
                        >
                          <time className="text-lg font-semibold text-gray-900 dark:text-white">
                            {formatDate(video?.snippet?.publishTime)}
                          </time>
                          <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                            <li>
                              <div className="items-center block p-3 sm:flex ">
                                {/* <Image src={video?.snippet?.thumbnails?.default?.url} width={100} height={100} className="w-[6rem] h-[3rem] mr-4 mt-[-4rem]"  alt="user photo"></Image> */}
                                <iframe
                                  width="168"
                                  height="94"
                                  className="mr-5 rounded-md ml-[-0.75rem]"
                                  src={`https://www.youtube.com/embed/${
                                    video?.id1?.videoId || "LYiTHzyP-Xw"
                                  }?si=x8z3RTs_SFQlPVzw`}
                                  title="YouTube video player"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                ></iframe>
                                <div className="text-gray-600 dark:text-gray-400 max-w-[27rem] pr-2">
                                  <div className="text-base font-normal">
                                    {video?.snippet?.description}
                                  </div>
                                  <div className="mt-5 flex justify-between w-[25rem]">
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                      </svg>
                                      {video?.favorite_count}
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                        />
                                      </svg>
                                      {video?.reply_count}
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                        />
                                      </svg>
                                      {video?.bookmark_count}
                                    </span>
                                    <span
                                      onClick={() => {
                                        setVideo_id(video?.id1?.videoId);
                                      }}
                                      className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400"
                                    >
                                      <svg
                                        className="h-[1rem] w-[1rem] mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 301112 333331"
                                        shape-rendering="geometricPrecision"
                                        text-rendering="geometricPrecision"
                                        image-rendering="optimizeQuality"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                      >
                                        <path
                                          d="M301110 291619c124 22886-18333 41521-41206 41644-1700 14-3415-82-5101-288-21227-3140-36776-21611-36256-43057V43342c-507-21474 15084-39944 36324-43057 22721-2660 43304 13602 45964 36324 192 1673 288 3346 274 5032v249977z"
                                          fill="#f9ab00"
                                        />
                                        <path
                                          d="M41288 250756c22804 0 41288 18484 41288 41288s-18484 41288-41288 41288S0 314848 0 292044s18484-41288 41288-41288zm108630-125126c-22913 1261-40685 20472-40150 43413v110892c0 30099 13246 48364 32649 52258 22393 4539 44209-9928 48748-32320 562-2743 836-5526 822-8323V167124c41-22886-18470-41467-41356-41507-233 0-480 0-713 14z"
                                          fill="#e37400"
                                        />
                                      </svg>
                                      {video?.id1?.videoId === video_id
                                        ? "Viewing"
                                        : "View analytics"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </>
                    );
                  })}
              </div>
              {video_id && (
                <div className="max-h-[100vh] w-[100%] mr-5 overflow-y-scroll overflow-x-hidden scroll bg-gray-50 rounded border">
                  <YtAnalytics video={getSelectedVideo()} />
                </div>
              )}
            </section>
          ) : socialMedia === "ws" ? (
            <section className="bg-white mt-5 flex justify-between">
              <div className="min-w-[42rem] px-4 ml-2 max-h-[100vh] overflow-y-scroll scroll rounded mr-3">
                <div className="mb-3">
                  <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <input
                      type="search"
                      className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="button-addon1"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                      onClick={() => getWordSearchAnalytics()}
                      className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg bg-[#f9aa00] focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                      type="button"
                      id="button-addon1"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="min-w-[35rem] px-4 ml-2 max-h-[100vh] overflow-y-scroll scroll rounded mr-3">
                  {searchTweets &&
                    searchTweets.map((tweet: any) => {
                      return (
                        <>
                          <div
                            className={`p-5 mb-4 ${
                              tweet?.tweet_id === tweet_id
                                ? "border-[#f9aa00] border-2"
                                : "border-gray-100 border"
                            } rounded-lg bg-gray-50  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700`}
                          >
                            <time className="text-lg font-semibold text-gray-900 dark:text-white">
                              {formatDate(tweet?.creation_date)}{" "}
                              {tweet?.user && `By ${tweet?.user?.name}`}
                            </time>
                            <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                              <li>
                                <div className="items-center block p-3 sm:flex ">
                                  {tweet?.user && (
                                    <Image
                                      src={tweet?.user?.profile_pic_url}
                                      width={100}
                                      height={100}
                                      className="w-8 h-8 rounded-full mr-7"
                                      alt="user photo"
                                    ></Image>
                                  )}
                                  <div className="text-gray-600 dark:text-gray-400 max-w-[27rem] pr-2">
                                    <div className="text-base font-normal">
                                      {tweet?.text}
                                    </div>
                                    <div className="mt-5 flex justify-between w-[25rem]">
                                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-4 h-4 mr-2"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                          />
                                        </svg>
                                        {tweet?.favorite_count}
                                      </span>
                                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-4 h-4 mr-2"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                          />
                                        </svg>
                                        {tweet?.reply_count}
                                      </span>
                                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="1.5"
                                          stroke="currentColor"
                                          className="w-4 h-4 mr-2"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                          />
                                        </svg>
                                        {tweet?.bookmark_count}
                                      </span>
                                      <span
                                        onClick={() => {
                                          setSearchTweet_id(tweet?.tweet_id);
                                        }}
                                        className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400"
                                      >
                                        <svg
                                          className="h-[1rem] w-[1rem] mr-2"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 301112 333331"
                                          shape-rendering="geometricPrecision"
                                          text-rendering="geometricPrecision"
                                          image-rendering="optimizeQuality"
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                        >
                                          <path
                                            d="M301110 291619c124 22886-18333 41521-41206 41644-1700 14-3415-82-5101-288-21227-3140-36776-21611-36256-43057V43342c-507-21474 15084-39944 36324-43057 22721-2660 43304 13602 45964 36324 192 1673 288 3346 274 5032v249977z"
                                            fill="#f9ab00"
                                          />
                                          <path
                                            d="M41288 250756c22804 0 41288 18484 41288 41288s-18484 41288-41288 41288S0 314848 0 292044s18484-41288 41288-41288zm108630-125126c-22913 1261-40685 20472-40150 43413v110892c0 30099 13246 48364 32649 52258 22393 4539 44209-9928 48748-32320 562-2743 836-5526 822-8323V167124c41-22886-18470-41467-41356-41507-233 0-480 0-713 14z"
                                            fill="#e37400"
                                          />
                                        </svg>
                                        {tweet?.tweet_id === searchTweet_id
                                          ? "Viewing"
                                          : "View analytics"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ol>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
              {searchTweet_id && (
                <div className="max-h-[100vh] w-[100%] mr-5 overflow-y-scroll scroll bg-gray-50 rounded border">
                  <SearchAnalytics tweet={getSelectedSearchTweet()} />
                </div>
              )}
            </section>
          ) : socialMedia === "rec" ? (
            <>
              <section className="bg-white mt-5 flex justify-between dark:bg-gray-900">
                <section className="mb-32 mx-10">
                  <h2 className="mb-6 pl-0 text-2xl font-bold">
                    Suggested actions based on your Account
                  </h2>

                  <div id="accordionFlushExample">
                    <div className="rounded-none border border-t-0 border-l-0 border-r-0 border-neutral-200">
                      <h2 className="mb-0" id="flush-headingOne">
                        <button
                          className="group relative flex w-full items-center rounded-none border-0 py-4 px-3 text-left text-base font-bold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:text-primary-400"
                          type="button"
                          data-te-collapse-init
                          data-te-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          <span className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 mr-2 text-green-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                              />
                            </svg>
                            Promotable Tweets on your account:
                          </span>
                          {/* <span
              className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-[#8FAEE0] dark:group-[[data-te-collapse-collapsed]]:fill-[#eee]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </span> */}
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        className="!visible border-0"
                        data-te-collapse-item
                        data-te-collapse-show
                        aria-labelledby="flush-headingOne"
                        data-te-parent="#accordionFlushExample"
                      >
                        <div
                          className={`p-5 mb-4 ${"border-green-500 border-2"} rounded-lg bg-gray-50  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700`}
                        >
                          <time className="text-lg font-semibold text-gray-900 dark:text-white">
                            {"14 September 2023 at 21:52"}
                          </time>
                          <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                            <li>
                              <div className="items-center block p-3 sm:flex ">
                                <Image
                                  src={profile?.profile_pic_url || ""}
                                  width={100}
                                  height={100}
                                  className="w-8 h-8 rounded-full mr-7"
                                  alt="user photo"
                                ></Image>
                                <div className="text-gray-600 dark:text-gray-400 max-w-[27rem] pr-2">
                                  <div className="text-base font-normal">
                                    I surprised a subscriber with an all paid
                                    trip to Bangalore!🤩 And THIS is how it
                                    went. What should i giveaway next?👀
                                    https://t.co/qHiqjTLClh
                                  </div>
                                  <div className="mt-5 flex justify-between w-[25rem]">
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                      </svg>
                                      256
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                        />
                                      </svg>
                                      45
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                        />
                                      </svg>
                                      25
                                    </span>
                                    <span
                                      onClick={() => {
                                        setAlert(1);
                                      }}
                                      className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400"
                                    >
                                      <svg
                                        className="h-[1rem] w-[1rem] mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 301112 333331"
                                        shape-rendering="geometricPrecision"
                                        text-rendering="geometricPrecision"
                                        image-rendering="optimizeQuality"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                      >
                                        <path
                                          d="M301110 291619c124 22886-18333 41521-41206 41644-1700 14-3415-82-5101-288-21227-3140-36776-21611-36256-43057V43342c-507-21474 15084-39944 36324-43057 22721-2660 43304 13602 45964 36324 192 1673 288 3346 274 5032v249977z"
                                          fill="#f9ab00"
                                        />
                                        <path
                                          d="M41288 250756c22804 0 41288 18484 41288 41288s-18484 41288-41288 41288S0 314848 0 292044s18484-41288 41288-41288zm108630-125126c-22913 1261-40685 20472-40150 43413v110892c0 30099 13246 48364 32649 52258 22393 4539 44209-9928 48748-32320 562-2743 836-5526 822-8323V167124c41-22886-18470-41467-41356-41507-233 0-480 0-713 14z"
                                          fill="#e37400"
                                        />
                                      </svg>
                                      {/* {tweet?.tweet_id === tweet_id ? 'Viewing' : 'View analytics'} */}
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400 text-green-500">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 mr-1"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                                        />
                                      </svg>
                                      Promote
                                      {/* {tweet?.tweet_id === tweet_id ? 'Viewing' : 'View analytics'} */}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200">
                      <h2 className="mb-0" id="flush-headingTwo">
                        <button
                          className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:text-primary-400"
                          type="button"
                          data-te-collapse-init
                          data-te-collapse-collapsed
                          data-te-target="#flush-collapseTwo"
                          aria-expanded="false"
                          aria-controls="flush-collapseTwo"
                        >
                          <span className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 mr-2 text-red-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                            Deletable Tweets on your account:
                          </span>
                          {/* <span
              className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-[#8FAEE0] dark:group-[[data-te-collapse-collapsed]]:fill-[#eee]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </span> */}
                        </button>
                      </h2>
                      <div
                        id="flush-collapseTwo"
                        className="!visible border-0"
                        data-te-collapse-item
                        aria-labelledby="flush-headingTwo"
                        data-te-parent="#accordionFlushExample"
                      >
                        <div
                          className={`p-5 mb-4 ${"border-red-500 border-2"} rounded-lg bg-gray-50  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700`}
                        >
                          <time className="text-lg font-semibold text-gray-900 dark:text-white">
                            {"14 September 2023 at 20:13"}
                          </time>
                          <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                            <li>
                              <div className="items-center block p-3 sm:flex ">
                                <Image
                                  src={profile?.profile_pic_url || ""}
                                  width={100}
                                  height={100}
                                  className="w-8 h-8 rounded-full mr-7"
                                  alt="user photo"
                                ></Image>
                                <div className="text-gray-600 dark:text-gray-400 max-w-[27rem] pr-2">
                                  <div className="text-base font-normal">
                                    Coming to VNIT Nagpur on 17th Sept for an
                                    EPIC event!🚀 For the first time, I'm
                                    opening the event for anyone who wants to
                                    attend it. Learn about:​- Upskilling​-
                                    Freelancing in College - ​AI tools​-
                                    LinkedIn 101 and Personal Branding​- Career
                                    Advice for Students​And a…
                                    https://t.co/9MP3PWZtQh
                                  </div>
                                  <div className="mt-5 flex justify-between w-[25rem]">
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                      </svg>
                                      129
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                        />
                                      </svg>
                                      16
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                        />
                                      </svg>
                                      8
                                    </span>
                                    <span
                                      onClick={() => {
                                        setAlert(2);
                                      }}
                                      className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400"
                                    >
                                      <svg
                                        className="h-[1rem] w-[1rem] mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 301112 333331"
                                        shape-rendering="geometricPrecision"
                                        text-rendering="geometricPrecision"
                                        image-rendering="optimizeQuality"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                      >
                                        <path
                                          d="M301110 291619c124 22886-18333 41521-41206 41644-1700 14-3415-82-5101-288-21227-3140-36776-21611-36256-43057V43342c-507-21474 15084-39944 36324-43057 22721-2660 43304 13602 45964 36324 192 1673 288 3346 274 5032v249977z"
                                          fill="#f9ab00"
                                        />
                                        <path
                                          d="M41288 250756c22804 0 41288 18484 41288 41288s-18484 41288-41288 41288S0 314848 0 292044s18484-41288 41288-41288zm108630-125126c-22913 1261-40685 20472-40150 43413v110892c0 30099 13246 48364 32649 52258 22393 4539 44209-9928 48748-32320 562-2743 836-5526 822-8323V167124c41-22886-18470-41467-41356-41507-233 0-480 0-713 14z"
                                          fill="#e37400"
                                        />
                                      </svg>
                                      {/* {tweet?.tweet_id === tweet_id ? 'Viewing' : 'View analytics'} */}
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400 text-red-500">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 mr-1"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                      </svg>
                                      Delete
                                      {/* {tweet?.tweet_id === tweet_id ? 'Viewing' : 'View analytics'} */}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {alert !== 0 && (
                  <div className="max-h-[100vh] w-[40%] mr-5 overflow-y-scroll overflow-x-hidden scroll bg-gray-50 rounded border">
                    <AlertAnalytics alert={alert} />
                  </div>
                )}
              </section>
            </>
          ) : socialMedia === "alerts" ? (
            <>
              <section className="bg-white mt-5 flex justify-between dark:bg-gray-900">
                <section className="mb-32 mx-10">

                  <div id="accordionFlushExample">
                    <div className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200">
                      <h2 className="mb-0" id="flush-headingTwo">
                        <button
                          className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:text-primary-400"
                          type="button"
                          data-te-collapse-init
                          data-te-collapse-collapsed
                          data-te-target="#flush-collapseTwo"
                          aria-expanded="false"
                          aria-controls="flush-collapseTwo"
                        >
                          <span className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 mr-2 text-red-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                            Please delete the following tweet from your account:
                          </span>
                          {/* <span
              className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-[#8FAEE0] dark:group-[[data-te-collapse-collapsed]]:fill-[#eee]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </span> */}
                        </button>
                      </h2>
                      <div
                        id="flush-collapseTwo"
                        className="!visible border-0"
                        data-te-collapse-item
                        aria-labelledby="flush-headingTwo"
                        data-te-parent="#accordionFlushExample"
                      >
                        <div
                          className={`p-5 mb-4 ${"border-red-500 border-2"} rounded-lg bg-gray-50  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700`}
                        >
                          <time className="text-lg font-semibold text-gray-900 dark:text-white">
                            {"14 September 2023 at 20:13"}
                          </time>
                          <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                            <li>
                              <div className="items-center block p-3 sm:flex ">
                                <Image
                                  src={profile?.profile_pic_url || ""}
                                  width={100}
                                  height={100}
                                  className="w-8 h-8 rounded-full mr-7"
                                  alt="user photo"
                                ></Image>
                                <div className="text-gray-600 dark:text-gray-400 max-w-[27rem] pr-2">
                                  <div className="text-base font-normal">
                                    Coming to VNIT Nagpur on 17th Sept for an
                                    EPIC event!🚀 For the first time, I'm
                                    opening the event for anyone who wants to
                                    attend it. Learn about:​- Upskilling​-
                                    Freelancing in College - ​AI tools​-
                                    LinkedIn 101 and Personal Branding​- Career
                                    Advice for Students​And a…
                                    https://t.co/9MP3PWZtQh
                                  </div>
                                  <div className="mt-5 flex justify-between w-[25rem]">
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                      </svg>
                                      129
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                        />
                                      </svg>
                                      16
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                        />
                                      </svg>
                                      8
                                    </span>
                                    <span
                                      onClick={() => {
                                        setAlert(2);
                                      }}
                                      className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400"
                                    >
                                      <svg
                                        className="h-[1rem] w-[1rem] mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 301112 333331"
                                        shape-rendering="geometricPrecision"
                                        text-rendering="geometricPrecision"
                                        image-rendering="optimizeQuality"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                      >
                                        <path
                                          d="M301110 291619c124 22886-18333 41521-41206 41644-1700 14-3415-82-5101-288-21227-3140-36776-21611-36256-43057V43342c-507-21474 15084-39944 36324-43057 22721-2660 43304 13602 45964 36324 192 1673 288 3346 274 5032v249977z"
                                          fill="#f9ab00"
                                        />
                                        <path
                                          d="M41288 250756c22804 0 41288 18484 41288 41288s-18484 41288-41288 41288S0 314848 0 292044s18484-41288 41288-41288zm108630-125126c-22913 1261-40685 20472-40150 43413v110892c0 30099 13246 48364 32649 52258 22393 4539 44209-9928 48748-32320 562-2743 836-5526 822-8323V167124c41-22886-18470-41467-41356-41507-233 0-480 0-713 14z"
                                          fill="#e37400"
                                        />
                                      </svg>
                                      {/* {tweet?.tweet_id === tweet_id ? 'Viewing' : 'View analytics'} */}
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400 text-red-500">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 mr-1"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                      </svg>
                                      Delete
                                      {/* {tweet?.tweet_id === tweet_id ? 'Viewing' : 'View analytics'} */}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200">
                      <h2 className="mb-0" id="flush-headingTwo">
                        <button
                          className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:text-primary-400"
                          type="button"
                          data-te-collapse-init
                          data-te-collapse-collapsed
                          data-te-target="#flush-collapseTwo"
                          aria-expanded="false"
                          aria-controls="flush-collapseTwo"
                        >
                          <span className="flex">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-red-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
</svg>

                            Following twitter user account is recommended to be blocked:
                          </span>
                          {/* <span
              className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-[#8FAEE0] dark:group-[[data-te-collapse-collapsed]]:fill-[#eee]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </span> */}
                        </button>
                      </h2>
                      <div
                        id="flush-collapseTwo"
                        className="!visible border-0"
                        data-te-collapse-item
                        aria-labelledby="flush-headingTwo"
                        data-te-parent="#accordionFlushExample"
                      >
                        <div
                          className={`p-2 mb-4 ${"border-red-500 border-2"} rounded-lg bg-gray-50  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700`}
                        >
                          {/* <time className="text-lg font-semibold text-gray-900 dark:text-white">
                            {"14 September 2023 at 20:13"}
                          </time> */}
                          <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                            <li>
                              <div className="items-center block p-3 sm:flex ">
                                <Image
                                  src={"https://pbs.twimg.com/profile_images/1676833772782903296/Y05qjKse_normal.jpg"}
                                  width={100}
                                  height={100}
                                  className="w-8 h-8 rounded-full mr-7"
                                  alt="user photo"
                                ></Image>
                                <div className="text-gray-600 dark:text-gray-400 max-w-[27rem] pr-2">
                                  <div className="text-base font-normal">
                                    PuNsTer
                                  </div>
                                  <div className="mt-5 flex justify-between w-[25rem]">
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                      </svg>
                                      129
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                        />
                                      </svg>
                                      16
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                        />
                                      </svg>
                                      8
                                    </span>

                                    <span className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400 text-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-red-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
</svg>
                                      Block
                                      {/* {tweet?.tweet_id === tweet_id ? 'Viewing' : 'View analytics'} */}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {alert !== 0 && (
                  <div className="max-h-[100vh] w-[40%] mr-5 overflow-y-scroll overflow-x-hidden scroll bg-gray-50 rounded border">
                    <AlertAnalytics alert={alert} />
                  </div>
                )}
              </section>
            </>
          ) : (
            <section className="bg-white mt-5 flex justify-between dark:bg-gray-900">
              <div className="min-w-[42rem] px-4 ml-2 max-h-[100vh] overflow-y-scroll scroll rounded mr-3">
                {videos &&
                  videos.map((video: any) => {
                    return (
                      <>
                        <div
                          className={`p-5 mb-4 rounded-lg bg-gray-50 ${
                            video?.id1?.videoId === video_id
                              ? "border-[#f9aa00] border-2"
                              : "border-gray-100 border"
                          } hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700`}
                        >
                          <time className="text-lg font-semibold text-gray-900 dark:text-white">
                            {formatDate(video?.snippet?.publishTime)}
                          </time>
                          <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                            <li>
                              <div className="items-center block p-3 sm:flex ">
                                {/* <Image src={video?.snippet?.thumbnails?.default?.url} width={100} height={100} className="w-[6rem] h-[3rem] mr-4 mt-[-4rem]"  alt="user photo"></Image> */}
                                <iframe
                                  width="168"
                                  height="94"
                                  className="mr-5 rounded-md ml-[-0.75rem]"
                                  src={`https://www.youtube.com/embed/${
                                    video?.id1?.videoId || "LYiTHzyP-Xw"
                                  }?si=x8z3RTs_SFQlPVzw`}
                                  title="YouTube video player"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                ></iframe>
                                <div className="text-gray-600 dark:text-gray-400 max-w-[27rem] pr-2">
                                  <div className="text-base font-normal">
                                    {video?.snippet?.description}
                                  </div>
                                  <div className="mt-5 flex justify-between w-[25rem]">
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                      </svg>
                                      {video?.favorite_count}
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                        />
                                      </svg>
                                      {video?.reply_count}
                                    </span>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4 mr-2"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                        />
                                      </svg>
                                      {video?.bookmark_count}
                                    </span>
                                    <span
                                      onClick={() => {
                                        setVideo_id(video?.id1?.videoId);
                                      }}
                                      className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400"
                                    >
                                      <svg
                                        className="h-[1rem] w-[1rem] mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 301112 333331"
                                        shape-rendering="geometricPrecision"
                                        text-rendering="geometricPrecision"
                                        image-rendering="optimizeQuality"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                      >
                                        <path
                                          d="M301110 291619c124 22886-18333 41521-41206 41644-1700 14-3415-82-5101-288-21227-3140-36776-21611-36256-43057V43342c-507-21474 15084-39944 36324-43057 22721-2660 43304 13602 45964 36324 192 1673 288 3346 274 5032v249977z"
                                          fill="#f9ab00"
                                        />
                                        <path
                                          d="M41288 250756c22804 0 41288 18484 41288 41288s-18484 41288-41288 41288S0 314848 0 292044s18484-41288 41288-41288zm108630-125126c-22913 1261-40685 20472-40150 43413v110892c0 30099 13246 48364 32649 52258 22393 4539 44209-9928 48748-32320 562-2743 836-5526 822-8323V167124c41-22886-18470-41467-41356-41507-233 0-480 0-713 14z"
                                          fill="#e37400"
                                        />
                                      </svg>
                                      {video?.id1?.videoId === video_id
                                        ? "Viewing"
                                        : "View analytics"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </>
                    );
                  })}
              </div>
              {video_id && (
                <div className="max-h-[100vh] w-[100%] mr-5 overflow-y-scroll overflow-x-hidden scroll bg-gray-50 rounded border">
                  <YtAnalytics video={getSelectedVideo()} />
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </>
  );
}
