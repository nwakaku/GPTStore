import React, { useState } from 'react';
import { account, contractAbi, contractAddress_ZKEvm, walletClient } from '../utils/config'
// import { wagmiAbi } from './abi';



const GPTForm = () => {
  const [formData, setFormData] = useState({
    url: '',
    match: '',
    maxPagesToCrawl: 0,
    priceHour: 0
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

    try {
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

      const { request } = await publicClient.simulateContract({
        address: contractAddress_ZKEvm,
        abi: contractAbi,
        functionName: 'setAssistants',
        args: [data3.id, formData.priceHour],
        account
      })

      await walletClient.writeContract(request)
      console.log(data3);
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

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

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            >
              CreateGPT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GPTForm;