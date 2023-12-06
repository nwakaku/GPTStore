import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const SuccessfulRented = () => (
  <div className="text-white text-center p-4 bg-green-500 rounded-md">
    Successfully Rented! Redirecting...
  </div>
);

const GPTCard = ({ item, onRentSuccess }) => {
  const { name, image, description, price } = item;
  const [isRented, setIsRented] = useState(false);

  const handleRentClick = () => {
    setIsRented(true);
    onRentSuccess();
  };

  return (
    <Card className="m-10 w-72 bg-slate-900 rounded-lg border-none">
      <CardHeader className="bg-slate-700 rounded-lg m-4 flex items-center justify-center text-center">
        <img
          src={image}
          alt={name}
          className="w-36 h-36 object-cover rounded-md"
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
          <button
            onClick={handleRentClick}
            className="bg-violet-600 hover:bg-violet-800 text-white text-md font-semibold rounded-lg py-2 px-24 mt-4"
          >
            Rent
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

const GPTs = () => {
  const [isRented, setIsRented] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isRented) {
      const redirectTimer = setTimeout(() => {
        router.push("/dashboard");
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [isRented]);

  const handleRentSuccess = () => {
    setIsRented(true);
  };

  // Your logic or data fetching for GPT cards
  const gptItems = [
    {
      name: "Chainlink",
      image: "/images/logo.png",
      description:
        "GPT-1 is a powerful language model designed to assist users with natural language understanding and generation. It excels in various applications, including text completion, summarization.",
      price: "$100 p/hr",
    },
    {
      name: "Avax",
      image: "/images/logo.png",
      description:
        "Another instance of GPT-1, providing users with additional availability and flexibility. Like the original, it is proficient in understanding and generating human-like text across diverse domains.",
      price: "$100 p/hr",
    },
    {
      name: "ENS ",
      image: "/images/pego.png",
      description:
        "GPT-2 represents a more advanced iteration of the language model, boasting enhanced capabilities in natural language processing. With improved performance and understanding, it is well-suited fors.",
      price: "$150 p/hr",
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
