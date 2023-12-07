import React, { useState } from 'react';
// Use the JWT key
import { NFTStorage } from 'nft.storage';
import { writeContract } from '@wagmi/core'
import { useContract } from '@/app/ContractContext';



const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNERkVGNzkyNEI0MzVBYkY3MzEyRUMxNkMwQ2QyMzQxZDhCYjZGQ0QiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMTg3NzQ2OTcwNywibmFtZSI6IkdQVFN0b3JlIn0.zngtlyyskIZxbxqVUiwK5W0WX4SFzVWVZeY1GUc_Yzw'
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })


const GPTForm = () => {

  const { contractAbi, contractAddress, contract } = useContract();

  const [formData, setFormData] = useState({
    url: '',
    match: '',
    maxPagesToCrawl: 0,
    priceHour: 0,
    file: null,
    name: '',
    description: '',
    assistantID: ''
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

      // Assuming your server is running on http://localhost:5000
      const formDataToSend = new FormData();
      formDataToSend.append('url', formData.url);
      formDataToSend.append('match', formData.match);
      formDataToSend.append('maxPagesToCrawl', formData.maxPagesToCrawl);
      formDataToSend.append('file', formData.file);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);

      // Assuming your server is running on http://localhost:5000
      const response = await fetch(`http://localhost:5000/crawl?url=${formData.url}&match=${formData.match}&maxPagesToCrawl=${formData.maxPagesToCrawl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-r from-purple-800 to-black bg-opacity-70 sm:p-8 rounded-md shadow-md w-full md:w-1/2 lg:w-1/3">
        <form onSubmit={handleSubmit} className="text-black">
          <label className="block mb-4">
            <span className="text-lg">URL:</span>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500 bg-opacity-50"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-lg">Match Pattern:</span>
            <input
              type="text"
              name="match"
              value={formData.match}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500 bg-opacity-50"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-lg">Max Pages to Crawl:</span>
            <input
              type="number"
              name="maxPagesToCrawl"
              value={formData.maxPagesToCrawl}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500 bg-opacity-50"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-lg">Price Per Hour:</span>
            <input
              type="number"
              name="priceHour"
              value={formData.priceHour}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500 bg-opacity-50"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-lg">File:</span>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500 bg-opacity-50"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-lg">Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500 bg-opacity-50"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-lg">Description:</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500 bg-opacity-50"
              required
            />
          </label>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            >
              CreateAssistant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GPTForm;