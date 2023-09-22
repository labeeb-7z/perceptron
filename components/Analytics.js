// components/MyLineChart.tsx
"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Legend,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';



// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  ArcElement,
  LineElement,
  Tooltip,
  Legend
);

const Analytics = ({tweet}) => {
    const [reply_id, setReply_id] = useState(null);
    const sentiments = [
      tweet?.selectedAnalytics[0]?.overall_analysis?.anger*100,
      tweet?.selectedAnalytics[0]?.overall_analysis?.disgust*100,
      tweet?.selectedAnalytics[0]?.overall_analysis?.fear*100,
      tweet?.selectedAnalytics[0]?.overall_analysis?.joy*100,
      tweet?.selectedAnalytics[0]?.overall_analysis?.neutral*100,
      tweet?.selectedAnalytics[0]?.overall_analysis?.sadness*100,
      tweet?.selectedAnalytics[0]?.overall_analysis?.surprise*100,
    ]

    const getSentiment = (id) => {
      const sentiments = [
        tweet?.selectedAnalytics[0]?.reply_analysis[id]?.analysis?.anger*100,
        tweet?.selectedAnalytics[0]?.reply_analysis[id]?.analysis?.disgust*100,
        tweet?.selectedAnalytics[0]?.reply_analysis[id]?.analysis?.fear*100,
        tweet?.selectedAnalytics[0]?.reply_analysis[id]?.analysis?.joy*100,
        tweet?.selectedAnalytics[0]?.reply_analysis[id]?.analysis?.neutral*100,
        tweet?.selectedAnalytics[0]?.reply_analysis[id]?.analysis?.sadness*100,
        tweet?.selectedAnalytics[0]?.reply_analysis[id]?.analysis?.surprise*100,
      ]
      return sentiments
    }
  return (
    <>
    <div className="pt-5 bg-white mx-[2rem] mt-7 rounded border-[#f9aa00] border">
        <div className="w-[100%] flex justify-center items-center">
      <Bar
        data={{
          labels: [
            "anger",
            "disgust",
            "fear",
            "joy",
            "neutral",
            "sadness",
            "surprise",
          ],
          datasets: [
            {
              label: "% of sentiments",
              data: [...sentiments],
              backgroundColor: "#f9aa00",
            },
          ],
        }}
        options={{
            scales: {
                y: {
                  min: 0,
                  max: 100,
                }
            }
        }}
      />
      {/* <Pie 
      data={{
        labels: [
            "Anger",
            "Disgust",
            "Fear",
            "Joy",
            "Neutral",
            "Sadness",
            "Surprise",
        ],
        datasets: [
          {
            label: '% of sentiments',
            data: [...sentiments],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 109, 34, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 100, 24, 1)'
            ],
            borderWidth: 1,
          },
        ],
      }} 
      options={{
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Doughnut Chart'
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
      }}
      /> */}
        </div>
        <div className='flex mt-4 justify-center'>
            {/* <svg className='h-[1.5rem] w-[1.5rem]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 301112 333331" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M301110 291619c124 22886-18333 41521-41206 41644-1700 14-3415-82-5101-288-21227-3140-36776-21611-36256-43057V43342c-507-21474 15084-39944 36324-43057 22721-2660 43304 13602 45964 36324 192 1673 288 3346 274 5032v249977z" fill="#f9ab00"/><path d="M41288 250756c22804 0 41288 18484 41288 41288s-18484 41288-41288 41288S0 314848 0 292044s18484-41288 41288-41288zm108630-125126c-22913 1261-40685 20472-40150 43413v110892c0 30099 13246 48364 32649 52258 22393 4539 44209-9928 48748-32320 562-2743 836-5526 822-8323V167124c41-22886-18470-41467-41356-41507-233 0-480 0-713 14z" fill="#e37400"/></svg> */}
            <h1 className='ml-2 mb-3 text-md font-[300] text-gray-500'>Overall analysis</h1>
        </div>
    </div>
    <h1 className="ml-10 mt-10 text-xl font-[500]">{ tweet?.selectedTweet[0]?.Replies?.length > 0 ? `Replies (${tweet?.selectedTweet[0]?.Replies?.length})` : ''}</h1>
              <div className="min-w-[35rem] px-4 ml-2 max-h-[100vh] rounded mr-3 mt-5">
                      {/* <div className="flex justify-between items-center">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Tweets (20)</h2>
                    </div> */}
                    {tweet?.selectedTweet && tweet?.selectedTweet[0]?.Replies?.map((tweet, index) => {
                        return(
                          <>
                            <div className={`p-5 mb-4 ${tweet?.tweet_id === reply_id ? 'border-2 border-[#F9AA00] min-h-[40rem]' : 'hover:border hover:border-[#F9AA00]'}  rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700`}>
                                {/* <time className="text-lg font-semibold text-gray-900 dark:text-white">{formatDate(tweet?.creation_date)}</time> */}
                                <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                                    <li>
                                        <div className="items-center block p-3 sm:flex ">
                                            {/* <Image src={ profile?.profile_pic_url ||session.user?.image || ''} width={100} height={100} className="w-8 h-8 rounded-full mr-7"  alt="user photo"></Image> */}
                                            <div className="text-gray-600 dark:text-gray-400 max-w-[27rem] pr-2">
                                                <div className="text-base font-normal">{tweet?.text}</div>
                                                <div className="mt-5 flex justify-between w-[25rem]">
                                                {/* <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
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
                                                  </span>  */}
                                                  <span onClick={()=>{
                                                    if(tweet?.tweet_id === reply_id){
                                                      setReply_id(null)
                                                    }else{
                                                      setReply_id(tweet?.tweet_id)
                                                    }
                                                  }} className="inline-flex items-center text-xs font-normal hover:cursor-pointer rounded hover:bg-gray-50 py-2 px-2 text-gray-500 dark:text-gray-400">
                                                    <svg className='h-[1rem] w-[1rem] mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 301112 333331" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M301110 291619c124 22886-18333 41521-41206 41644-1700 14-3415-82-5101-288-21227-3140-36776-21611-36256-43057V43342c-507-21474 15084-39944 36324-43057 22721-2660 43304 13602 45964 36324 192 1673 288 3346 274 5032v249977z" fill="#f9ab00"/><path d="M41288 250756c22804 0 41288 18484 41288 41288s-18484 41288-41288 41288S0 314848 0 292044s18484-41288 41288-41288zm108630-125126c-22913 1261-40685 20472-40150 43413v110892c0 30099 13246 48364 32649 52258 22393 4539 44209-9928 48748-32320 562-2743 836-5526 822-8323V167124c41-22886-18470-41467-41356-41507-233 0-480 0-713 14z" fill="#e37400"/></svg>
                                                       {tweet?.tweet_id === reply_id ? 'Close' : 'Reply analytics'}
                                                  </span> 

                                                </div>
                                            </div>
                                        </div>
                                        {
                                          tweet?.tweet_id === reply_id &&
                                          <div className="bg-gray-100 h-[25rem] w-full block items-center rounded-md">
                                            <div className="w-[90%] ml-3 flex justify-center items-center pt-10">
                                              <Bar
                                                data={{
                                                  labels: [
                                                    "anger",
                                                    "disgust",
                                                    "fear",
                                                    "joy",
                                                    "neutral",
                                                    "sadness",
                                                    "surprise",
                                                  ],
                                                  datasets: [
                                                    {
                                                      label: "% of sentiments",
                                                      data: [...getSentiment(index)],
                                                      backgroundColor: "#f9aa00",
                                                    },
                                                  ],
                                                }}
                                                options={{
                                                    scales: {
                                                        y: {
                                                          min: 0,
                                                          max: 100,
                                                        }
                                                    }
                                                }}
                                              />
                                            </div>
                                          </div>
                                        }
                                    </li>
                                </ol>
                            </div>
                          </>
                        )
                    })}
                  </div>
    </>
  )
}

export default Analytics