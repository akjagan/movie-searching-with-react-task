import { FaTimesCircle } from "react-icons/fa";

const Search = ({ search, handleChange }) => {
    return (
        <div className="relative flex justify-center items-center mx-auto mt-2 mb-8 w-full md:w-[80%] xl:w-[60%]">
            <input
                type="text"
                name="search"
                value={search}
                placeholder="search for a Movie..."
                className="block bg-[#120e16] dark:bg-slate-100 bg-none focus:shadow-md focus:shadow-gray-500 p-3 sm:p-4 border-none rounded-lg w-full font-light text-md text-slate-100 sm:text-xl dark:text-[#120e16] transition duration-300 ease-out outline-none pe-[26px] search sm:pe-[32px]"
                onChange={(e) => handleChange(e.target.value)}
            />
            {!!search && (
                <span className="top-[10px] sm:top-[14px] right-[2px] absolute cursor-pointer" onClick={() => handleChange("")}>
                    <FaTimesCircle className="w-5 sm:w-7 h-5 sm:h-7 text-slate-100 dark:text-[#120e16]" />

                </span>

            )}

       
        </div>
    )
}
export default Search;