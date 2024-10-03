import React from 'react';
import { FaTimes } from "react-icons/fa";

const Details = ({ selected, closeDetail }) => {
    return (
        <div className="p-4 container detail">
            <div className="block top-0 left-0 fixed bg-slate-100 dark:bg-[#120e16] p-8 w-full h-screen text-[#120e16] dark:text-slate-100 overflow-y-scroll content">
                <h2 className="p-8 pt-0 pb-2 font-semibold text-4xl sm:text-5xl">
                    {selected.Title}
                </h2>
                <span className="mb-12 ml-8 font-light text-xl sm:text-2xl">
                    {selected.Year} 
                    </span>
                
                
                <p className="mt-4 mb-8 ml-8 font-light text-xl sm:text-2xl rating">
                    Rating: {selected.imdbRating}
                </p>

                <div className="mt-8 sm:mt-0 w-full sm:w-1/2 lg:w-[60%]">
                    <p className="font-light text-xl sm:text-2xl">{selected.Plot}</p>
                </div>
            </div>
            
            <button 
                className="top-2 float-right right-2 absolute flex justify-center items-center m-auto border-none font-bold text-xl cursor-pointer appearance-none outline-none"
                onClick={closeDetail}
            >
                <FaTimes
                    className="text-[#120e16] dark:text-slate-100"
                    size={24}
                    style={{
                        '@media (min-width: 640px)': {
                            fontSize: '32px'
                        }
                    }} 
                />
            </button>
        </div>
    );
}

export default Details;