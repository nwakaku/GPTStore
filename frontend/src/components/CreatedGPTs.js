import React, { useEffect, useState } from "react";
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
import { useContract } from "@/app/ContractContext";
import { readContract, getAccount } from '@wagmi/core';


const GPTCard = ({ item, index }) => {
  const { URI, assistantNo, payment, timeRequested, user } = item;
  
  console.log(URI, assistantNo, payment, timeRequested, user);

  async function fetchDataFromUrl(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}`);
        }

        const data = await response.json();

        console.log(data);
        return data
      } catch (error) {
        console.error(error.message);
      }
  }

  const [cardData, setCardData] = useState({
    name: '',
    image: '',
    match: '',
    description: '',
    priceHour: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromUrl(URI);

      if (data) {
        // Update the component state with the fetched data
        const ipfsUrl = data.image;

        const cleanedUrl = ipfsUrl.replace(/^ipfs:\/\//, '');

        setCardData({
          name: data.name,
          image: cleanedUrl,
          match: data.match,
          description: data.description,
          priceHour: data.priceHour,
        });
      }
    };

    fetchData();
  }, [URI]);


  return (
    <Card className="m-10 w-80 bg-slate-900 rounded-lg border-none">
      <CardHeader className="relative flex items-center justify-center text-center rounded-t-lg">
        {timeRequested && (
          <div className="absolute top-2 right-2 bg-black text-white font-bold text-sm p-1 rounded-lg">
            expires in: {timeRequested}
          </div>
        )}
        
        <img
          src={`https://ipfs.io/ipfs/${cardData.image}`}
          alt={cardData.name}
          className="w-48 h-48 object-cover rounded-md"
        />
      </CardHeader>

      <CardContent className="text-center">
        <div className="mx-3 flex justify-between items-center mb-2">
          <CardTitle className="text-center text-white text-lg font-semibold">
            {cardData.name}
          </CardTitle>
          <CardTitle className="text-center text-[#FFD700] text-lg font-semibold ">
            {cardData.priceHour}
          </CardTitle>
        </div>

        <CardDescription className="text-center text-slate-500 text-base font-normal mb-4">
          {cardData.description}
        </CardDescription>

        <div className="mx-auto">
          <Link
            href={{
              pathname: "/question",
              // query: { cardData.name, image, description },
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
  const { contractAbi, contractAddress, contract } = useContract();
  const [cid, setCid] = useState();
  const account = getAccount()
  
  useEffect(() => {
    // Reading from Contracts
    const fetchResults = async () => {
      const results = await readContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getUserRentedAssistants',
        account,
      })
      // returns an array of results
      setCid(results);
      console.log(results)
    }

    fetchResults()

  }, []);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <div className="my-5 mx-32">
        
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cid && cid.map((item, index) => (
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
