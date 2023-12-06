import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

const GPTCard = ({ item }) => {
  const { name, image, description, price, time, link } = item;

  return (
    <Card className="m-10 w-80 bg-slate-900 rounded-lg border-none">
      <CardHeader className="relative flex items-center justify-center text-center rounded-t-lg">
        {time && (
          <div className="absolute top-2 right-2 bg-black text-white font-bold text-sm p-1 rounded-lg">
            expires in: {time}
          </div>
        )}
        <img
          src={image}
          alt={name}
          className="w-48 h-48 object-cover rounded-md"
        />
      </CardHeader>

      <CardContent className="text-center">
        <div className="mx-3 flex justify-between items-center mb-2">
          <CardTitle className="text-center text-white text-lg font-semibold">
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
          <Link
            href={{
              pathname: "/question",
              query: { name, image, description },
            }}
          >
            <button className="bg-violet-600 hover:bg-violet-800 text-white text-md font-semibold rounded-lg py-2 px-28">
              Interact
            </button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const CreatedGPTs = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

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
    <>
      <div className="my-5 mx-32">
        
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {gptItems.map((item, index) => (
              <GPTCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          {/* <GPTForm /> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatedGPTs;
