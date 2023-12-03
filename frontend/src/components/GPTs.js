"use client"
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

const GPTCard = ({ item }) => {
  const { name, image, description, price } = item;

  return (
    <Card className="m-10 bg-grey p-4 rounded-lg shadow-md">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={image} alt={name} className="w-full h-32 object-cover mb-4 rounded-md" />
        <p className="text-green-600 font-bold mb-2">{price}</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
          Rent
        </button>
      </CardContent>
    </Card>
  );
};

const GPTs = () => {
  // Your logic or data fetching for GPT cards
  const gptItems = [
    { name: 'GPT-1', image: '/images/logo.png', description: 'Description for GPT-1', price: '$100' },
    { name: 'GPT-1', image: '/images/logo.png', description: 'Description for GPT-1', price: '$100' },
    { name: 'GPT-2', image: '/images/pego.png', description: 'Description for GPT-2', price: '$150' },
    { name: 'GPT-2', image: '/images/pego.png', description: 'Description for GPT-2', price: '$150' },
   
  ];

  return (
    <div className="grid grid-cols-3">
      {gptItems.map((item, index) => (
        <GPTCard key={index} item={item} />
      ))}
    </div>
  );
};

export default GPTs;

