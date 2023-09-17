import React from 'react'

const Login = () => {
  return (
    <div>

<div className="h-[100vh] bg-[#E4EAEE] w-full py-2 px-4">
<div className='flex fixed ml-7 mt-4'>
            <svg className='h-[1.5rem] w-[1.5rem]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 301112 333331" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M301110 291619c124 22886-18333 41521-41206 41644-1700 14-3415-82-5101-288-21227-3140-36776-21611-36256-43057V43342c-507-21474 15084-39944 36324-43057 22721-2660 43304 13602 45964 36324 192 1673 288 3346 274 5032v249977z" fill="#f9ab00"/><path d="M41288 250756c22804 0 41288 18484 41288 41288s-18484 41288-41288 41288S0 314848 0 292044s18484-41288 41288-41288zm108630-125126c-22913 1261-40685 20472-40150 43413v110892c0 30099 13246 48364 32649 52258 22393 4539 44209-9928 48748-32320 562-2743 836-5526 822-8323V167124c41-22886-18470-41467-41356-41507-233 0-480 0-713 14z" fill="#e37400"/></svg>
            <h1 className='ml-2 text-lg font-[700]'>Perceptron</h1>
        </div>
            <div className="flex flex-col items-center justify-center scale-90">

                <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-32">
                    <p  className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">Login to your account</p>
                    <p className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">Dont have account? <a href="/signup"   className="hover:text-[#F9AA00] focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-bold leading-none  text-[#E37401] cursor-pointer"> Sign up here</a></p>
                    <div className='mt-6'> 
                            <label id="email" className="text-sm font-medium leading-none text-gray-800">
                                Email
                            </label>
                            <input aria-labelledby="email" type="email" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"/>
                        </div>
                        <div className="mt-6  w-full">
                            <label htmlFor='pass' className="text-sm font-medium leading-none text-gray-800">
                                Password
                            </label>
                           <div className="relative flex items-center justify-center">
                            <input id="pass" type="password" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"/>
                            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg5.svg" alt="viewport"/>                                    
                            </div>
                           </div>
                        </div>
                        <div className="mt-8">
                            <button role="button" className="focus:ring-2 focus:ring-offset-2 focus:ring-[#E37401] text-md font-semibold leading-none text-white focus:outline-none bg-[#E37401] border rounded hover:bg-[#E37401] hover:translate-y-[-2px] transition-all duration-200 py-4 w-full">Login to my account</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login