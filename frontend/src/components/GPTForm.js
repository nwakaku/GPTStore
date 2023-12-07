import React, { useState } from 'react';
import { NFTStorage } from 'nft.storage';
import { writeContract } from '@wagmi/core'
import { useContract } from '@/app/ContractContext';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Settings2 } from "lucide-react";

const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNERkVGNzkyNEI0MzVBYkY3MzEyRUMxNkMwQ2QyMzQxZDhCYjZGQ0QiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMTg3NzQ2OTcwNywibmFtZSI6IkdQVFN0b3JlIn0.zngtlyyskIZxbxqVUiwK5W0WX4SFzVWVZeY1GUc_Yzw'
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })


const GPTForm = () => {

  const { contractAbi, contractAddress, contract } = useContract();

  const [formData, setFormData] = useState({
    url: "",
    match: "",
    maxPagesToCrawl: 0,
    priceHour: 0,
    file: null,
    name: '',
    description: '',
    assistantID: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);


    // Assuming your server is running on http://localhost:5000
    const response = await fetch(`http://localhost:5000/crawl?url=${formData.url}&match=${formData.match}&maxPagesToCrawl=${formData.maxPagesToCrawl}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    }
    );


    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    const data3 = await response.json();
    //NFTStorage
    try {
      const metadata = await client.store({
        name: formData.name,
        url: formData.url,
        match: formData.match,
        image: formData.file,
        description: formData.description,
        maxPagesToCrawl: formData.maxPagesToCrawl,
        priceHour: formData.priceHour,
        assistantID: data3.id
      })
      console.log(metadata);
    } catch (error) {
      console.log(error);
    }
    
    const { hash } = await writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'setAssistants',
      args: [metadata.url, formData.priceHour],
    })
   }

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="min-h-screen flex flex-row">
        <div className="flex-none w-1/3 p-3 bg-slate-900 rounded-lg my-5 ml-5">
          <div className="text-center">
            <div className="mt-2 flex items-center justify-center">
              <Settings2 className="text-slate-200" />
              <p className="text-slate-200 font-bold text-lg ml-2">Assistant Settings</p>
              
          </div>
          <span className="text-xs text-slate-400">
            {" "}
            Adjust how your assistant works and customize its behavior.{" "}
          </span>
        </div>
        <Card className="bg-slate-900 border-none sm:p-8 rounded-md ">
            <CardContent>
              <CardTitle>
                <span className="text-sm my-3 text-white">URL:</span>
              </CardTitle>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="mb-5 mt-3 p-2 border rounded-md w-full focus:outline-none focus:border-violet-500 bg-opacity-50 text-slate-900"
                required
              />

              <CardTitle>
                <span className="text-sm my-3 text-white">Match Pattern:</span>
              </CardTitle>
              <input
                type="text"
                name="match"
                value={formData.match}
                onChange={handleChange}
                className="mb-5 mt-3 p-2 border rounded-md w-full focus:outline-none focus:border-violet-500 bg-opacity-50 text-slate-900"
                required
              />

              <CardTitle>
                <span className="text-sm my-3 text-white">Max Pages to Crawl:</span>
              </CardTitle>
              <input
                type="number"
                name="maxPagesToCrawl"
                value={formData.maxPagesToCrawl}
                onChange={handleChange}
                className="mb-5 mt-3 p-2 border rounded-md w-full focus:outline-none focus:border-violet-500 bg-opacity-50 text-slate-900"
                required
              />
            </CardContent>

            
          {/* </form> */}
        </Card>
      </div>
      <div className="flex-grow bg-slate-900 rounded-lg mx-5 my-5">
        <div className="mt-5 text-center">
          <div className="flex justify-center items-center space-x-3 rtl:space-x-reverse">
            <img
              src={"/images/logo_Ic.png"}
              className="h-8"
              alt="God help Us"
            />
            <span className=" text-slate-200 text-lg font-bold whitespace-nowrap dark:text-white">
              Create New Assistant
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {" "}
            Customize the look and feel of your assistant, provide details such as name, description, price and assistant image.{" "}
          </span>
        </div>
        <Card className="bg-slate-900 border-none sm:p-8 rounded-md">
            <CardContent>
              <CardTitle>
                <span className="text-sm my-3 text-white">Name:</span>
              </CardTitle>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mb-5 mt-3 p-2 border rounded-md w-full focus:outline-none focus:border-violet-500 bg-opacity-50 text-slate-900"
                required
              />

              <CardTitle>
                <span className="text-sm my-3 text-white">Description:</span>
              </CardTitle>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mb-5 mt-3 p-2 border rounded-md w-full focus:outline-none focus:border-violet-500 bg-opacity-50 text-slate-900"
                required
              />

              <CardTitle>
                <span className="text-sm my-3 text-white">Price Per Hour:</span>
              </CardTitle>
              <input
                type="number"
                name="priceHour"
                value={formData.priceHour}
                onChange={handleChange}
                className="mb-5 mt-3 p-2 border rounded-md w-full focus:outline-none focus:border-violet-500 bg-opacity-50 text-slate-900"
                required
              />

              <CardTitle>
                <span className="text-sm my-3 text-white">Image:</span>
              </CardTitle>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="mb-5 mt-3 p-2 border rounded-md w-full focus:outline-none focus:border-violet-500 bg-opacity-50 text-slate-900"
                required
              />
            </CardContent>

            <CardFooter>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-md"
                >
                  Create Assistant
                </button>
              </div>
            </CardFooter>
        </Card>
      </div>
    </div>
    </form>
  );
};

export default GPTForm;
