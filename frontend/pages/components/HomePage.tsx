import CardSlider from "./CardSlider";
import Link from "next/link";

const Mint = () => {
  const cars = [
    {
      id: 1,
      name: "Car 1",
      description: "Description for Car 1",
      image: "/../picures/pic1.png",
    },
    {
      id: 2,
      name: "Car 2",
      description: "Description for Car 2",
      image: "/../picures/pic2.png",
    },
    {
      id: 3,
      name: "Car 3",
      description: "Description for Car 2",
      image: "/../picures/pic3.png",
    },
    // Add more cars as needed
  ];
  return (
    <div className="flex flex-col h-screen">
      <div className="m-auto text-center mb-8">
        <p className="text-6xl text-gray-900">
          AI Avatar NFT Generator for web3 people
        </p>
        <p className="text-6xl text-gray-900 p-7">for web3 people</p>
        <p className="text-3xl text-gray-900">Create unique avatars and</p>
        <p className="text-3xl text-gray-900 mb-8">
          mint them on the ethereum chain
        </p>
        <Link href="/Mint">
          <button
            role="button"
            className="hover:bg-black text-black text-sm px-4 py-2 border border-slate-300 hover:border-indigo-500 rounded-full hover:text-white inline-block">
            Mint
          </button>
        </Link>
      </div>
      <div className="flex-grow">
        <CardSlider cars={cars} />
      </div>
    </div>
  );
};

export default Mint;
