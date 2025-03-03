import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
                    <div className='overflow-hidden'>
    <div className="mx-auto max-w-screen-xl px-6 lg:px-8 relative">
        <div className="relative flex h-16 space-x-10 w-full">
        <div className="flex justify-start"><a className="flex flex-shrink-0 items-center" href="/">
            {/* <img className="block h-8 w-auto" height="32" src="https://www.svgrepo.com/show/303650/neo-logo.svg" /> */}
            {/* <img className="block h-16 w-auto" height="32" src="https://cdn-icons-png.flaticon.com/512/7988/7988956.png" /> */}
            <img className="block h-24 w-auto" height="32" src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01125830/1651.png" />
            </a>
        </div>
        <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8 flex-1 justify-end justify-self-end "><a
            className="text-white bg-gray-800 hover:bg-gray-900 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm" href="/login">Login</a>
            <Link to="/register"className="text-white bg-gray-800 hover:bg-gray-900 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ">Register</Link>
        </div>
        </div>
    </div>

    <div className="max-w-7xl mx-auto relative py-20">
        <div className="relative flex justify-center px-4 sm:px-0">
        <section className="py-8 z-10 font-serif">
  <div className="flex flex-col md:flex-row items-center max-w-6xl px-6 py-8 mx-auto">
    <div className="w-full md:w-1/2 py-8">
      <h1 className=" text-7xl font-semibold leading-[1.3] uppercase">
        <span className='bg-[#fe6546] p-2 text-white'>Optimize </span><br/><span className="text-black bg-[#c8c8c8] p-2"> Your <br/></span> <span className='text-white bg-blue-600 p-2'>Daily Task.</span>
      </h1>
    </div>
    <div className="w-full md:w-1/2 py-8">
      <img src="https://cdn.dribbble.com/userupload/23354595/file/original-78ffb18e44d3c68ed444e15628f07894.gif" className="g-image"/>
    </div>
  </div>
</section>

        </div>
    </div>
    </div>

        </div>
    );
};

export default Home;