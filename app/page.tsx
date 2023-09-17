"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import Image from "next/image"

export default function Home() {
  const { data: session, status } = useSession()

    console.log(session);
    
    return (
      <>
        <div className='flex'>
            <Sidebar/>
            <div className='w-full h-[100vh] pl-[14rem]'>
                <Navbar/>
                <div className='flex flex-wrap items-center mt-5 ml-10'>
                    <div className='h-[8rem] w-[15rem] border p-5 rounded-lg mx-5 my-5 justify-center items-center'>
                      {
                        status === 'authenticated' ? (
                          <>
                            <div className="flex">
                            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                              <Image src={session.user?.image || ''} width={100} height={100} className="w-8 h-8 rounded-full"  alt="user photo"></Image>
                            </button>
                             <p className="ml-3 mt-1 flex">
                              {session.user?.name} 
                              <svg className="h-5 w-5 mt-0 ml-3" viewBox="328 355 335 276" xmlns="http://www.w3.org/2000/svg">
                                <path d="
                                  M 630, 425
                                  A 195, 195 0 0 1 331, 600
                                  A 142, 142 0 0 0 428, 570
                                  A  70,  70 0 0 1 370, 523
                                  A  70,  70 0 0 0 401, 521
                                  A  70,  70 0 0 1 344, 455
                                  A  70,  70 0 0 0 372, 460
                                  A  70,  70 0 0 1 354, 370
                                  A 195, 195 0 0 0 495, 442
                                  A  67,  67 0 0 1 611, 380
                                  A 117, 117 0 0 0 654, 363
                                  A  65,  65 0 0 1 623, 401
                                  A 117, 117 0 0 0 662, 390
                                  A  65,  65 0 0 1 630, 425
                                  Z"
                                  fill="#3BA9EE"/>
                              </svg>
                            </p>
                            </div>
                            <div className="flex justify-center items-center">
                              <button role="button" className="focus:ring-2 focus:ring-offset-2 focus:ring-[#E37401] text-md font-semibold leading-none text-white focus:outline-none bg-[#E37401] border rounded hover:bg-[#E37401] hover:translate-y-[-2px] transition-all duration-200 py-4 w-full scale-75 mt-3">View analytics</button>
                              <svg onClick={()=>{
                                signOut();
                              }} className="w-5 h-5 mt-2 hover:cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            </div>
                          </>
                        ) : status === 'loading' ? (
                        <div className="flex justify-center items-center mt-5">
                          <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        </div>):(
                          <button onClick={()=>{
                            signIn();
                          }} type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
                            <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                              <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                            </svg>
                            Connect Twitter
                          </button>
                        )
                      }
                    </div>
                    <div className='h-[8rem] w-[15rem] border p-5 rounded-lg mx-5 my-5 flex justify-center items-center'>
                        {/* <PieChart/> */}
                    </div>
                    <div className='h-[8rem] w-[15rem] border p-5 rounded-lg mx-5 my-5 flex justify-center items-center'>
                        {/* <BarChart/> */}
                    </div>
                    <div className='h-[8rem] w-[15rem] border p-5 rounded-lg mx-5 my-5 flex justify-center items-center'>
                        {/* <AreaChart/> */}
                    </div>
                </div>
                <div className='flex flex-wrap items-center ml-5'>
                    <div className='h-[15rem] w-[30rem] border p-5 rounded-lg mx-10 my-10 flex justify-center items-center'>
                        {/* <LineChart/> */}
                    </div>
                    <div className='h-[15rem] w-[30rem] border p-5 rounded-lg flex justify-center items-center'>
                        {/* <PieChart/> */}
                    </div>
                    <div className='h-[15rem] w-[30rem] border p-5 rounded-lg mx-10 flex justify-center items-center'>
                        {/* <BarChart/> */}
                    </div>
                    <div className='h-[15rem] w-[30rem] border p-5 rounded-lg flex justify-center items-center'>
                        {/* <AreaChart/> */}
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}