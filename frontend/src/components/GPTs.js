"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { readContract, getAccount, writeContract } from '@wagmi/core';
import { useContract } from "@/app/ContractContext";

const GPTCard = ({ item, onRentSuccess }) => {
  const { name, image, description, price } = item;
  const [isRented, setIsRented] = useState(false);

  const handleRentClick = () => {
    setIsRented(true);
    onRentSuccess();
  };

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

        <div className=" flex items-center justify-between mx-3">
          <Input
            type="text"
            name="price"
            className=" mr-3 border rounded-md focus:outline-none focus:border-violet-400 text-white"
            placeholder="Enter amount"
            required
          />
          <Select>
            <SelectTrigger className="w-18 text-white">
              <SelectValue placeholder="USD" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="link">LINK</SelectItem>
                <SelectItem value="dollar">AVAX</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mx-auto">
          <button className="bg-purple-900 hover:bg-purple-800 text-white text-md font-semibold rounded-lg py-2 px-28">
            Rent
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

const GPTs = () => {
  // from
  const [data, setData] = useState(null);
  const { contractAbi, contractAddress, contract } = useContract();


  useEffect(() => {
    const fetchData = async () => {
      const {account} = getAccount()

      try {
        const result = await readContract({
          address: contractAddress,
          abi: contractAbi,
          functionName: 'getAllAssistantDetails',
          account,
        })
        setData(result);
        console.log(result);
        // console.log("result");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Your logic or data fetching for GPT cards
  const gptItems = [
    {
      name: "Chainlink",
      image: "/images/logo.png",
      description:
      "GPT-1 is a powerful language model designed to assist users with natural language understanding and generation.",
      price: "$100 P/hr",
    },
    {
      name: "Avax",
      image: "/images/logo.png",
      description:
        "Another instance of GPT-1, providing users with additional availability and flexibility.",
      price: "$100 P/hr",
    },
    {
      name: "ENS ",
      image: "/images/pego.png",
      description:
        "GPT-2 represents a more advanced iteration of the language model, boasting enhanced capabilities in natural language processing.",
      price: "$150 P/hr",
    },
  ];

  return (
    <div className="flex justify-center p-10">
      {isRented ? (
        <SuccessfulRented />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {gptItems.map((item, index) => (
            <GPTCard
              key={index}
              item={item}
              onRentSuccess={handleRentSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GPTs;
