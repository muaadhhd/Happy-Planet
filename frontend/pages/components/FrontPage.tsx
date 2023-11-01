import Image from "next/image";

import { useState, useEffect } from "react";
import axios from "axios";

import { NFTStorage, File } from "nft.storage";
import { parseEther } from "ethers";

// ABIs
import NFT from "../abis/NFT.json";

import {
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";

const FrontPage = () => {
  //State constants
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<any | null>(null);
  const [backendData, setBackendData] = useState<any | null>(null);

  //uploading image constants
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectImage] = useState("");
  const [selectedFile, setSelectFile] = useState<File>();

  const [mostRecentImage, setMostRecentImage] = useState("");

  const CONTRACT_ADDRESS = "0x4478dd7baaD16958B400f0C72c8bADa02b2CEa79";

  //Mint Function
  const {
    data: mintData,
    write: purchase,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: NFT,
    functionName: "mint",
  });

  //fetching data from API
  async function fetchMostRecentImage() {
    try {
      const response = await fetch("/api/getMostRecentImage");
      const data = await response.json();
      setMostRecentImage(data.mostRecentImage);
    } catch (error) {
      console.error("Error fetching most recent image:", error);
    }
  }

  //Handles uploaded image
  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/image", formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
    setMessage("Success");
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "" || description === "") {
      setMessage("Please provide a name and description");
      return;
    }

    fetchMostRecentImage();

    // Call AI API to generate a image based on description
    const imageData = await createImage();

    if (imageData !== null) {
      // Upload image to IPFS (NFT.Storage)
      const url = await uploadImage(imageData);

      if (url !== undefined) {
        // Mint NFT
        await mintImage(url);
      }
    }
  };

  //Generates Image with AI API
  const createImage = async () => {
    setMessage("Generating Image...");
    const url = "http://127.0.0.1:12345";

    const data = {
      userimagepath: `/Users/muaadhm/Projects/happy_planet/frontend/userImage/${mostRecentImage}`,
      description: description,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log(response.body);
        const resultData = await response.json();
        const metaData = response.body;

        console.log(resultData);
        console.log(metaData);

        const relativePath = resultData.aiimagepath.replace(
          "/Users/muaadhm/Projects/happy_planet/frontend/public",
          ""
        );

        console.log(relativePath);

        setBackendData(resultData);
        setImage(relativePath);

        setMessage("Image Generated Successfully");

        return metaData;
      } else {
        console.error(`Error: ${response.status}`);
        setMessage("Image generation failed 1, Try again");
        return null;
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Image generation failed 2, Try again");
      return null;
    }
  };

  // Uploading Image to IPFS
  const uploadImage = async (imageData: any) => {
    setMessage("Uploading Image...");

    const API_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;

    // Create instance to NFT.Storage
    if (API_KEY !== undefined) {
      console.log("success");
      const nftStorage = new NFTStorage({ token: API_KEY });

      try {
        // Send request to store image
        const metadata = await nftStorage.store({
          image: new File([imageData], "my-image.png", { type: "image/png" }),
          name: name,
          description: description,
        });

        console.log(`success: ${metadata.url}`);

        //Return token URI
        return metadata.url;
      } catch (error) {
        console.error("Error while storing image:", error);
        // Handle the error as needed, e.g., return a default value or throw a custom error.
      }
    } else {
      console.error("API key is undefined. Handle this case accordingly.");
    }
  };

  //Mint Image
  const mintImage = async (tokenURI: string) => {
    const transaction = async () => {
      purchase({
        args: [tokenURI],
        value: parseEther("1"),
      });
    };

    await transaction();
  };

  // useEffect(() => {}, []);

  return (
    <div className="max-w-4xl mx-auto p-20 space-y-6">
      <div className="form">
        <form onSubmit={submitHandler}>
          <label>
            <input
              type="file"
              hidden
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                  setSelectImage(URL.createObjectURL(file));
                  setSelectFile(file);
                }
              }}
            />
            <div
              className="w-40 aspect-video rounded flex items-center justify-center
          border-2 border-dashed cursor-pointer text-white">
              {selectedImage ? (
                <img src={selectedImage} alt=""></img>
              ) : (
                <span>Select Image</span>
              )}
            </div>
          </label>

          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{ opacity: uploading ? ".5" : "1" }}
            className="bg-red-600 p-3 w-32 text-center rounded-full text-white">
            {uploading ? "Uploading.." : "Upload"}
          </button>

          <input
            type="text"
            placeholder="Create a Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Create a Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="homepage__btn" type="submit">
            Mint
          </button>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </form>
        <div className="card">
          {message}
          <Image
            alt="My Image"
            src="/aiImage/IMG_0754.jpg" // Path relative to the 'public' directory
            width={300} // Set the desired width
            height={200} // Set the desired height
          />
        </div>
      </div>

      {backendData && (
        <div className="text-white">
          <br />
          <br />
          <br />
          <br />
          <h3>Response from Backend:</h3>
          <pre>{JSON.stringify(backendData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FrontPage;
