import React from "react";
import asset1 from "../assets/images/asset1.png";
import asset2 from "../assets/images/asset2.png";
import asset3 from "../assets/images/asset3.png";
import { ArrowUpRight } from 'lucide-react';

function MainPage() {
  return (
    <main className="w-screen h-screen bg-white relative overflow-hidden flex flex-col justify-center items-center gap-16 px-4">

      {/* Floating Background Images */}
      <img
        src={asset1}
        alt="Asset 1"
        className="absolute top-10 left-10 w-24 md:w-56 opacity-40 rotate-6 animate-pulse-slow"
      />
      <img
        src={asset2}
        alt="Asset 2"
        className="absolute top-32 right-16 w-20 md:w-62 opacity-30 -rotate-12 animate-pulse-slow"
      />
      <img
        src={asset3}
        alt="Asset 3"
        className="absolute bottom-20 left-1/3 w-28 md:w-75 opacity-35 rotate-3 animate-pulse-slow"
      />

      <div className="text-center flex flex-col items-center gap-4 z-10">
        <h1 className="text-5xl md:text-6xl text-[#fc6f03] uppercase font-bold drop-shadow-[4px_4px_0_#000]">
          SoloAssets
        </h1>
        <p className="text-xs md:text-sm text-zinc-400">
          The search engine for your game assets...
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md z-10">
        <input
          type="text"
          placeholder="Type an asset keyword..."
          className="px-4 py-3 rounded-full bg-zinc-800 text-white border-2 border-zinc-600 placeholder-zinc-400 focus:outline-none focus:border-[#fc6f03] focus:ring-1 focus:ring-[#fc6f03]"
        />
        <button className="bg-[#fc6f03] shadow-lg shadow-black text-zinc-100 font-bold py-3 rounded-full cursor-pointer hover:bg-[#ff9e03] hover:translate-y-1 hover:rotate-2 transition-all flex items-center justify-center gap-2">
          Find it for me! <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1) rotate(var(--tw-rotate)); }
          50% { transform: scale(1.05) rotate(var(--tw-rotate)); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

export default MainPage;
