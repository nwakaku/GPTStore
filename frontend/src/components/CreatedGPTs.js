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
import { readContract, getAccount } from "@wagmi/core";
import { useFetchData } from "./hooks/useFetchData";
import { useRouter } from 'next/navigation';


const GPTCard = ({ item, index }) => {
  const { URI, assistantNo, payment, timeRequested, user } = item;

  const cardData = useFetchData(URI);

  return (
    <Card className="m-10 w-72 bg-slate-900 rounded-lg border-none">
      <CardHeader className="bg-slate-700 rounded-lg m-4 flex items-center justify-center text-center">
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
        <div className="mx-1 flex justify-center items-center mb-2">
          <CardTitle className="text-center text-white text-lg font-semibold">
            {cardData.name}
          </CardTitle>
        </div>

        <CardDescription className="text-center text-slate-500 text-base font-normal mb-4">
          {cardData.description}
        </CardDescription>

        <div className="mx-auto">
          <Link
            href={{
              pathname: "/question",
              query: { uri: item.URI },
            }}
          >
            <button className="bg-violet-600 hover:bg-violet-800 text-white text-md font-semibold rounded-lg py-2 px-8">
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
  const account = getAccount();

  useEffect(() => {
    // Reading from Contracts
    const fetchResults = async () => {
      const results = await readContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "getUserRentedAssistants",
        account,
      });
      // returns an array of results
      setCid(results);
      console.log(results);
    };

    fetchResults();
  }, []);

  return (
    <>
      <div className="my-5 mx-32">
        <div className="flex justify-center">
          {cid && cid.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {cid.map((item, index) => (
                <GPTCard key={index} item={item} />
              ))}
            </div>
          ) : (
            <div className="mt-14 flex flex-col items-center">
              <p className="text-center text-gray-500 text-3xl font-semibold mb-4">
                You don't have any created or rented GPTs yet.
              </p>
              <img
                src={"/images/empty.png"}
                alt={"empty"}
                className="w-80 h-80 object-cover rounded-md mb-6"
              />
              {/* <div className="flex space-x-4 mt-4">
                <p
                  className="text-lg text-gray-500 cursor-pointer"
                  onClick={() => router.push("/creator")}
                >
                  Create your own GPT
                </p>
                <p
                  className="text-lg text-gray-500 cursor-pointer"
                  onClick={() => router.push("/marketplace")}
                >
                  Visit our marketplace to rent a GPT
                </p>
              </div> */}
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default CreatedGPTs;
