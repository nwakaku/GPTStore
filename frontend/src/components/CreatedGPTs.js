"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const GPTCard = ({ item }) => {
  const { name, image, description, price } = item;

  return (
    <Card className="m-10 bg-grey p-4 rounded-lg shadow-md">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={image}
          alt={name}
          className="w-48 h-48 object-cover mb-4 rounded-md"
        />
        <div className="flex justify-between items-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
            Rent
          </button>
          <p className="text-green-600 font-bold mb-2">{price}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const CreatedGPTs = () => {
  // Your logic or data fetching for GPT cards
  const gptItems = [
    {
      name: "GPT-1",
      image: "/images/logo.png",
      description: "Description for GPT-1",
      price: "$100 per hour",
    },
    {
      name: "GPT-1",
      image: "/images/logo.png",
      description: "Description for GPT-1",
      price: "$100 per hour",
    },
    {
      name: "GPT-2",
      image: "/images/pego.png",
      description: "Description for GPT-2",
      price: "$150 per hour",
    },
    {
      name: "GPT-2",
      image: "/images/pego.png",
      description: "Description for GPT-2",
      price: "$150 per hour",
    },
  ];

  return (
    <div className="m-10">
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-lg text-white">GPTs Created</p>
        <a href="/dashboard/create">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
          Create New GPT
        </button>
        </a>
        
      </div>
      <div className="grid grid-cols-3">
        {gptItems.map((item, index) => (
          <GPTCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CreatedGPTs;
