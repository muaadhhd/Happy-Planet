import { useState, useEffect } from "react";
import axios from "axios";

// import { NFTStorage, File } from "nft.storage";

// import fs from "fs";
// import path from "path";

const FrontPage = () => {
  //State constants
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<any | null>(null);

  //uploading image constants
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectImage] = useState("");
  const [selectedFile, setSelectFile] = useState<File>();

  const [mostRecentImage, setMostRecentImage] = useState("");

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
    if (description === "") {
      setMessage("Please provide a name and description");
      return;
    }

    // Call AI API to generate a image based on description
    const imageData = await createImage();

    // Upload image to IPFS (NFT.Storage)
    // const url = await uploadImage(imageData);

    // Mint NFT
    // await mintImage(url);
  };

  //Generates Image with AI API
  const createImage = async () => {
    setMessage("Generating Image...");
    const url = "http://127.0.0.1:12345";

    const data = {
      userimagepath: mostRecentImage,
      description: description,
    };
    //NEED HELP IN THIS AREA
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const resultData = await response.json();
        setImage(resultData);

        setMessage("Image Generated Successfully");
      } else {
        console.error(`Error: ${response.status}`);
        setMessage("Image generation failed 1");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Image generation failed 2");
    }
  };

  // Uploading Image to IPFS
  // const uploadImage = async (imageData: any) => {
  //   setMessage("Uploading Image...");

  //   // Create instance to NFT.Storage
  //   const nftstorage = new NFTStorage({
  //     token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
  //   });
  // };

  // //Mint Image
  // const mintImage = async (tokenURI) => {
  //   setMessage("Waiting for Mint...");

  //   //Gets signer
  //   const signer = await provider.getSigner();

  //   try {
  //     //Minting
  //     const transaction = await nft
  //       .connect(signer)
  //       .mint(tokenURI, { value: ethers.utils.parseEther("0.001") });

  //     //waiting for transaction
  //     await transaction.wait();
  //     setIsWaiting(false);

  //     //Getting NFT ID
  //     const amount = await nft.totalSupply();
  //     const result = parseInt(amount._hex).toString();
  //     SetNFTID(result);
  //   } catch (error) {
  //     warning("Transaction Cancelled");
  //     setIsWaiting(true);
  //   }
  //   setMessage("Transaction Cancelled");
  // };

  useEffect(() => {
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

    fetchMostRecentImage();
  }, []);

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

          {/* <input
            type="text"
            placeholder="Create a Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> */}

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
        <div className="card">{message}</div>
      </div>

      {image && (
        <div className="text-white">
          <br />
          <br />
          <br />
          <br />
          <h3>Response from Backend:</h3>
          <pre>{JSON.stringify(image, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FrontPage;
