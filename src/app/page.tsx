import React from "react";

const Page = () => {
  return (
    <div className="h-full w-full">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff89b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-42">
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-red-600 sm:text-7xl">
              On-Chain Video Rental App
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-red-300 sm:text-xl/8">
              Rent a video anonymously, and get paid is SOL. A platform powered
              by Solana blockchain
            </p>
          </div>
        </div>
        <div
          className="fixed inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>
    </div>
  );
};
export default Page;
