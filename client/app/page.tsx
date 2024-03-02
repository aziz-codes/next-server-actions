import React from "react";

const Home = () => {
  return (
    <div className="flex justify-center my-4 gap-4 px-4">
      <div className="flex-1">
        <div className="w-full max-w-sm flex flex-col gap-3">
          <input
            type="text"
            placeholder="title"
            className="w-full max-w-sm rounded-md outline-none py-1 px-1 border"
          />
          <input
            type="text"
            placeholder="description"
            className="w-full max-w-sm rounded-md outline-none py-1 px-1 border"
          />
          <button className="bg-sky-500 max-w-xs py-2 px-2 rounded-md mx-auto">
            Submit
          </button>
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

export default Home;
