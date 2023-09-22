"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import Image from "next/image"
import axios from "axios"
import { useEffect, useState } from "react"
import Analytics from "../components/Analytics"
import YtAnalytics from "../components/YtAnalytics"
import { useRouter } from "next/navigation"

export default function Home() {
  const { data: session, status }: any = useSession();
  const [tweet_id, setTweet_id] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [tweetAnalytics, setTweetAnalytics] = useState([]);
  const [profile, setProfile] = useState<any>(null);

  const getSelectedTweet: any = () => {
    const selectedTweet = tweets?.filter((tweet: any)=> {
      return tweet?.tweet_id === tweet_id
    })
    const selectedAnalytics = tweetAnalytics?.filter((tweet: any)=> {
      return tweet?.tweet_id === tweet_id
    })
    console.log({
      selectedTweet,
      selectedAnalytics
    });
    
    return {
      selectedTweet,
      selectedAnalytics
    };
  }

  async function registerTwitter(userId: string) {
    if(!userId || userId === ''){
      console.error('no user id');
      return;
    };
    try {
      const res = await axios.post('http://localhost:4000/api/v1/registerTwitter', {
        user_id: '828894693463359489',
      });
      console.log(res.data)
      setProfile(res.data?.profile);
      setTweets(res.data?.profile?.tweets || []);
      setTweetAnalytics(res?.data?.profile?.tweet_analysis || []);
    } catch (error: any) {
      if(error.response?.status === 409){
        console.log(error.response.data)
      }
    }
  }

  console.log(tweetAnalytics);
  

    useEffect(() => {
      if(status === 'authenticated'){
        registerTwitter(session.user?.id);
      }
    }, [status])
    

    const formatDate: any = (dateStr: string): string => {
      const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    };


    // yt
    const [video_id, setVideo_id] = useState(null);
    const [videos, setVideos] = useState([]);
    const [videoAnalytics, setVideoAnalytics] = useState([]);
    const [channel, setChannel] = useState<any>(null);

    const getSelectedVideo: any = () => {
      const selectedVideo = videos?.filter((video: any)=> {
        return video?.id1?.videoId === video_id
      })
      
      const selectedAnalytics = videoAnalytics?.filter((video: any)=> {
        return video?.video_id === video_id
      })
      console.log({
        selectedVideo,
        selectedAnalytics
      });
      
      return {
        selectedVideo,
        selectedAnalytics
      };
    }
    

    async function getYoutubeAnalytics() {
      try {
        const res = await axios.post('http://localhost:4000/api/v1/getAnalyticsfromChannelId', 
          {
            "channel_id":"UCY6N8zZhs2V7gNTUxPuKWoQ"
          }
        );
        setVideos(res.data?.channel?.videos || []);
        setVideoAnalytics(res.data?.channel?.video_analysis || []);
      } catch (error: any) {
        if(error?.response){
          console.log(error.response?.data)
        }else{
          console.log(error);
          
        }
      }
    }


    const [socialMedia, setSocialMedia] = useState('tw');
    useEffect(() => {
      const url = window.location.href;
      const urlSplit = url.split('?=')[1];
      if(urlSplit){
        if(urlSplit === 'tw'){
          setSocialMedia('tw');
        }

        if(urlSplit === 'yt'){
          setSocialMedia('yt');
          getYoutubeAnalytics();
        }
        if(urlSplit === 'ws'){
          setSocialMedia('ws');
        }
      } 
    }, [])

    console.log(videos);
    
    
    return (
      <>
        <div className='flex'>
            <Sidebar/>
            <div className='w-full h-[100vh] pl-[14rem]'>
                <Navbar/>
               { socialMedia === 'tw' ? <section className="bg-white mt-5 flex justify-between dark:bg-gray-900">
                    <div className="min-w-[35rem] px-4 ml-2 max-h-[100vh] overflow-y-scroll scroll rounded mr-3">
                    {tweets && tweets.map((tweet: any) => {
                        return(
                          <>
                            <div className={`p-5 mb-4 ${ tweet?.tweet_id === tweet_id ? 'border-[#f9aa00] border-2' : 'border-gray-100 border' } rounded-lg bg-gray-50  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700`}>
                                <time className="text-lg font-semibold text-gray-900 dark:text-white">{formatDate(tweet?.creation_date)}</time>
                                <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                                    <li>
                                        <div className="items-center block p-3 sm:flex ">
                                            <Image src={ profile?.profile_pic_url ||session.user?.image || ''} width={100} height={100} className="w-8 h-8 rounded-full mr-7"  alt="user photo"></Image>
                                            <div className="text-gray-600 dark:text-gray-400 max-w-[27rem] pr-2">
                                                <div className="text-base font-normal">{tweet?.text}</div>
                                                <div className="mt-5 flex justify-between w-[25rem]">
                                                <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                    </svg>
                                                       {tweet?.favorite_count}
                                                  </span> 
                                                  <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                                    </svg>
                                                       {tweet?.reply_count}
                                                  </span> 
                                                  <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                                                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                                    </svg>
                                                       {tweet?.bookmark_count}
                                                  </span> 
                                                  <span onClick={()=>{
                                                    setTweet_id(tweet?.tweet_id)
                                                  }} className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400">
                                                    <svg className='h-[1rem] w-[1rem] mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 301112 333331" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M301110 291619c124 22886-18333 41521-41206 41644-1700 14-3415-82-5101-288-21227-3140-36776-21611-36256-43057V43342c-507-21474 15084-39944 36324-43057 22721-2660 43304 13602 45964 36324 192 1673 288 3346 274 5032v249977z" fill="#f9ab00"/><path d="M41288 250756c22804 0 41288 18484 41288 41288s-18484 41288-41288 41288S0 314848 0 292044s18484-41288 41288-41288zm108630-125126c-22913 1261-40685 20472-40150 43413v110892c0 30099 13246 48364 32649 52258 22393 4539 44209-9928 48748-32320 562-2743 836-5526 822-8323V167124c41-22886-18470-41467-41356-41507-233 0-480 0-713 14z" fill="#e37400"/></svg>
                                                       {tweet?.tweet_id === tweet_id ? 'Viewing' : 'View analytics'}
                                                  </span> 

                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                          </>
                        )
                    })}
                  </div>
                  {
                    tweet_id &&
                    <div className="max-h-[100vh] w-[100%] mr-5 overflow-y-scroll scroll bg-gray-50 rounded border">
                      <Analytics tweet={getSelectedTweet()}/>
                    </div>
                  }
                </section> 
                : socialMedia === 'yt' ?
                <section className="bg-white mt-5 flex justify-between dark:bg-gray-900">
                <div className="min-w-[42rem] px-4 ml-2 max-h-[100vh] overflow-y-scroll scroll rounded mr-3">
                {videos && videos.map((video: any) => {
                    return(
                      <>
                        <div className={`p-5 mb-4 rounded-lg bg-gray-50 ${ video?.id1?.videoId === video_id ? 'border-[#f9aa00] border-2' : 'border-gray-100 border' } hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700`}>
                            <time className="text-lg font-semibold text-gray-900 dark:text-white">{formatDate(video?.snippet?.publishTime)}</time>
                            <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                                <li>
                                    <div className="items-center block p-3 sm:flex ">
                                        {/* <Image src={video?.snippet?.thumbnails?.default?.url} width={100} height={100} className="w-[6rem] h-[3rem] mr-4 mt-[-4rem]"  alt="user photo"></Image> */}
                                        <iframe width="168" height="94" className="mr-5 rounded-md ml-[-0.75rem]" src={`https://www.youtube.com/embed/${ video?.id1?.videoId  || 'LYiTHzyP-Xw'}?si=x8z3RTs_SFQlPVzw`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                        <div className="text-gray-600 dark:text-gray-400 max-w-[27rem] pr-2">
                                            <div className="text-base font-normal">{video?.snippet?.description}</div>
                                            <div className="mt-5 flex justify-between w-[25rem]">
                                            <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>
                                                   {video?.favorite_count}
                                              </span> 
                                              <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                                </svg>
                                                   {video?.reply_count}
                                              </span> 
                                              <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                                                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                                </svg>
                                                   {video?.bookmark_count}
                                              </span> 
                                              <span onClick={()=>{
                                                setVideo_id(video?.id1?.videoId)
                                              }} className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400">
                                                <svg className='h-[1rem] w-[1rem] mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 301112 333331" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M301110 291619c124 22886-18333 41521-41206 41644-1700 14-3415-82-5101-288-21227-3140-36776-21611-36256-43057V43342c-507-21474 15084-39944 36324-43057 22721-2660 43304 13602 45964 36324 192 1673 288 3346 274 5032v249977z" fill="#f9ab00"/><path d="M41288 250756c22804 0 41288 18484 41288 41288s-18484 41288-41288 41288S0 314848 0 292044s18484-41288 41288-41288zm108630-125126c-22913 1261-40685 20472-40150 43413v110892c0 30099 13246 48364 32649 52258 22393 4539 44209-9928 48748-32320 562-2743 836-5526 822-8323V167124c41-22886-18470-41467-41356-41507-233 0-480 0-713 14z" fill="#e37400"/></svg>
                                                   {video?.id1?.videoId === video_id ? 'Viewing' : 'View analytics'}
                                              </span> 
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                      </>
                    )
                })} 
              </div>
              {
                video_id &&
                <div className="max-h-[100vh] w-[100%] mr-5 overflow-y-scroll overflow-x-hidden scroll bg-gray-50 rounded border">
                  <YtAnalytics video={getSelectedVideo()}/>
                </div>
              } 
                </section>
                : 
                <section className="bg-white mt-5 flex justify-between dark:bg-gray-900">
                <div className="min-w-[42rem] px-4 ml-2 max-h-[100vh] overflow-y-scroll scroll rounded mr-3">
                {videos && videos.map((video: any) => {
                    return(
                      <>
                        <div className={`p-5 mb-4 rounded-lg bg-gray-50 ${ video?.id1?.videoId === video_id ? 'border-[#f9aa00] border-2' : 'border-gray-100 border' } hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700`}>
                            <time className="text-lg font-semibold text-gray-900 dark:text-white">{formatDate(video?.snippet?.publishTime)}</time>
                            <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                                <li>
                                    <div className="items-center block p-3 sm:flex ">
                                        {/* <Image src={video?.snippet?.thumbnails?.default?.url} width={100} height={100} className="w-[6rem] h-[3rem] mr-4 mt-[-4rem]"  alt="user photo"></Image> */}
                                        <iframe width="168" height="94" className="mr-5 rounded-md ml-[-0.75rem]" src={`https://www.youtube.com/embed/${ video?.id1?.videoId  || 'LYiTHzyP-Xw'}?si=x8z3RTs_SFQlPVzw`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                        <div className="text-gray-600 dark:text-gray-400 max-w-[27rem] pr-2">
                                            <div className="text-base font-normal">{video?.snippet?.description}</div>
                                            <div className="mt-5 flex justify-between w-[25rem]">
                                            <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>
                                                   {video?.favorite_count}
                                              </span> 
                                              <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                                </svg>
                                                   {video?.reply_count}
                                              </span> 
                                              <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                                                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                                </svg>
                                                   {video?.bookmark_count}
                                              </span> 
                                              <span onClick={()=>{
                                                setVideo_id(video?.id1?.videoId)
                                              }} className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400">
                                                <svg className='h-[1rem] w-[1rem] mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 301112 333331" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M301110 291619c124 22886-18333 41521-41206 41644-1700 14-3415-82-5101-288-21227-3140-36776-21611-36256-43057V43342c-507-21474 15084-39944 36324-43057 22721-2660 43304 13602 45964 36324 192 1673 288 3346 274 5032v249977z" fill="#f9ab00"/><path d="M41288 250756c22804 0 41288 18484 41288 41288s-18484 41288-41288 41288S0 314848 0 292044s18484-41288 41288-41288zm108630-125126c-22913 1261-40685 20472-40150 43413v110892c0 30099 13246 48364 32649 52258 22393 4539 44209-9928 48748-32320 562-2743 836-5526 822-8323V167124c41-22886-18470-41467-41356-41507-233 0-480 0-713 14z" fill="#e37400"/></svg>
                                                   {video?.id1?.videoId === video_id ? 'Viewing' : 'View analytics'}
                                              </span> 
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                      </>
                    )
                })} 
              </div>
              {
                video_id &&
                <div className="max-h-[100vh] w-[100%] mr-5 overflow-y-scroll overflow-x-hidden scroll bg-gray-50 rounded border">
                  <YtAnalytics video={getSelectedVideo()}/>
                </div>
              } 
                </section>
              }
            </div>
        </div>
      </>
    )
}