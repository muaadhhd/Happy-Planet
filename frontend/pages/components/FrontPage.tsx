import { useState, useEffect } from "react";
import axios from "axios";

const FrontPage = () => {
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const submitHandler = async () => {
    await createImage();
  };

  const createImage = async () => {
    setMessage("Generating Image...");

    // Define the request data
    const requestData = {
      description: "Colourful butterfly with wings of fire",
      //the path of the picture uploaded by the user
      userImagePath: "../../userImage/NFT.png",
    };

    try {
      // Send the request to the local server
      const response = await axios.post("http://127.0.0.1:7860", requestData);

      if (
        response.status === 200 &&
        response.data &&
        response.data.AIimagePath
      ) {
        // If the response is successful and contains the AI image path
        // AIimagePath: The location of the image path generated by ai
        const aiImagePath = response.data.AIimagePath;
        setImage(aiImagePath);
        setMessage("Image Generated Successfully");
      } else {
        // Handle an unsuccessful response here
        setMessage("Image generation failed");
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error generating image:", error);
      setMessage("Image generation failed");
    }
  };
  return (
    <div className="">
      <div className="form">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Create a description..."
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
        <div className="card">lksaf;ld</div>
      </div>
    </div>
  );
};

export default FrontPage;