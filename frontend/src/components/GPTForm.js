import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Settings2 } from "lucide-react";

const GPTForm = () => {
  const [formData, setFormData] = useState({
    url: "",
    match: "",
    maxPagesToCrawl: 0,
    priceHour: 0,
    name: "",
    description: "",
    image: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming your server is running on http://localhost:5000
    const response = await fetch(
      `http://localhost:5000/crawl?url=${formData.url}&match=${formData.match}&maxPagesToCrawl=${formData.maxPagesToCrawl}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    const [account] = await walletClient.getAddresses();

    console.log(account);

    const data3 = await response.json();

    //   const { request } = await publicClient.simulateContract({
    //     address: contractAddress_ZKEvm,
    //     abi: contractAbi,
    //     functionName: 'setAssistants',
    //     args: [data3.id, formData.priceHour],
    //     account
    //   })

    //   await walletClient.writeContract(request)
    //   console.log(data3);
    //   console.log('Form submitted successfully');
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }
  };

  return (
    <div className="min-h-screen flex flex-row">
      <div className="flex-none w-1/3 p-3 bg-slate-900 rounded-lg my-5 ml-5">
        <div className="text-center">
          <div className="mt-2 flex items-center justify-center">
            <Settings2 className="text-slate-200"/>
            <p className="text-slate-200 font-bold text-lg ml-2">Assistant Settings</p>
          </div>
          <span className="text-xs text-slate-400">
            {" "}
            Adjust how your assistant works and customize its behavior.{" "}
          </span>
        </div>
        <Card className="bg-slate-900 border-none sm:p-8 rounded-md ">
          <form onSubmit={handleSubmit} className="text-white">
            <CardContent>
              <CardTitle>
                <span className="text-sm my-3">URL:</span>
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
                <span className="text-sm my-3">Match Pattern:</span>
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
                <span className="text-sm my-3">Max Pages to Crawl:</span>
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

            <CardFooter>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-md"
                >
                  Save
                </button>
              </div>
            </CardFooter>
          </form>
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
          <form onSubmit={handleSubmit} className="text-white">
            <CardContent>
              <CardTitle>
                <span className="text-sm my-3">Name:</span>
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
                <span className="text-sm my-3">Description:</span>
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
                <span className="text-sm my-3">Price Per Hour:</span>
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
                <span className="text-sm my-3">Image:</span>
              </CardTitle>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  handleChange({ name: "image", value: e.target.files[0] })
                }
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
          </form>
        </Card>
      </div>
    </div>
  );
};

export default GPTForm;
