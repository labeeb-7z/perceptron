import React from 'react'
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

const SearchAnalytics = ({tweet}) => {
    const sentiments = [
        tweet?.selectedAnalytics[0]?.analysis?.anger*100,
        tweet?.selectedAnalytics[0]?.analysis?.disgust*100,
        tweet?.selectedAnalytics[0]?.analysis?.fear*100,
        tweet?.selectedAnalytics[0]?.analysis?.joy*100,
        tweet?.selectedAnalytics[0]?.analysis?.neutral*100,
        tweet?.selectedAnalytics[0]?.analysis?.sadness*100,
        tweet?.selectedAnalytics[0]?.analysis?.surprise*100,
      ]
  return (
    <div>
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
        </div>
        <div className='flex mt-4 justify-center'>
            {/* <svg className='h-[1.5rem] w-[1.5rem]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 301112 333331" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M301110 291619c124 22886-18333 41521-41206 41644-1700 14-3415-82-5101-288-21227-3140-36776-21611-36256-43057V43342c-507-21474 15084-39944 36324-43057 22721-2660 43304 13602 45964 36324 192 1673 288 3346 274 5032v249977z" fill="#f9ab00"/><path d="M41288 250756c22804 0 41288 18484 41288 41288s-18484 41288-41288 41288S0 314848 0 292044s18484-41288 41288-41288zm108630-125126c-22913 1261-40685 20472-40150 43413v110892c0 30099 13246 48364 32649 52258 22393 4539 44209-9928 48748-32320 562-2743 836-5526 822-8323V167124c41-22886-18470-41467-41356-41507-233 0-480 0-713 14z" fill="#e37400"/></svg> */}
            <h1 className='ml-2 mb-3 text-md font-[300] text-gray-500'>Overall analysis</h1>
        </div>
    </div>
    </div>
  )
}

export default SearchAnalytics