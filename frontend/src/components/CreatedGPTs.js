import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";


const GPTCard = ({ item }) => {
  const { name, image, description, price } = item;

  return (
    <Card className="m-10 w-80 bg-slate-900 rounded-lg border-none">
      <CardHeader className="flex items-center justify-center text-center">
        <img
          src={image}
          alt={name}
          className="w-48 h-48 object-cover rounded-md"
        />
      </CardHeader>

      <CardContent className="text-center">
        <div className="mx-3 flex justify-between items-center mb-2">
          <CardTitle className="text-center text-white text-lg font-semibold ">
            {name}
          </CardTitle>
          <CardTitle className="text-center text-[#FFD700] text-lg font-semibold ">
            {price}
          </CardTitle>
        </div>

        <CardDescription className="text-center text-slate-500 text-base font-normal mb-4">
          {description}
        </CardDescription>

        <div className="mx-auto">
          <button className="bg-violet-600 hover:bg-violet-800 text-white text-md font-semibold rounded-lg py-2 px-28">
            Edit
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

const CreatedGPTs = () => {


  const gptItems = [
    {
      name: "Chainlink",
      image: "/images/logo.png",
      description:
        "GPT-1 is a powerful language model designed to assist users with natural language understanding and generation. It excels in various applications, including text completion, summarization, and conversation generation.",
      price: "$100 P/Hr",
    },
    {
      name: "Avax",
      image: "/images/logo.png",
      description:
        "Another instance of GPT-1, providing users with additional availability and flexibility. Like the original, it is proficient in understanding and generating human-like text across diverse domains.",
      price: "$100 P/Hr",
    },
    {
      name: "ENS ",
      image: "/images/pego.png",
      description:
        "GPT-2 represents a more advanced iteration of the language model, boasting enhanced capabilities in natural language processing. With improved performance and understanding, it is well-suited for complex tasks and demanding applications.",
      price: "$150 P/Hr",
    },
  ];

  return (
    <div className="my-5 mx-32">
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-lg text-white">My Models</p>
        {/* <CreateDialog /> */}
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {gptItems.map((item, index) => (
            <GPTCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatedGPTs;
