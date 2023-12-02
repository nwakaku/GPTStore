import React, { useState } from 'react';


const Question = () => {
  const [formData, setFormData] = useState({
    question: '',
  });
  const [answer, setAnswer] = useState("")

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
      const response = await fetch(`http://localhost:5000/question?ask=${formData.question}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data3 = await response.json();

      //set to state then continue
      setAnswer(data3.content[0].text.value);
      console.log(data3);
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-800 to-black bg-opacity-70">
  <div className="sm:p-8 rounded-md shadow-md w-full md:w-1/2 lg:w-1/3 mb-8">
    <form onSubmit={handleSubmit} className="text-white">
      <label className="block mb-4">
        <span className="text-lg">Question:</span>
        <input
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500 bg-opacity-50"
          placeholder="Ask me anything..."
          required
        />
      </label>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          ASK
        </button>
      </div>
    </form>
  </div>
  <div className="bg-gradient-to-r from-purple-800 to-black bg-opacity-70 sm:p-8 rounded-md shadow-md w-full md:w-1/2 lg:w-1/3">
    <label className="block mb-4 text-white">
      <span className="text-lg">Answer:</span>
      <textarea
        className="mt-1 p-2 border rounded-md w-full h-40 focus:outline-none focus:border-blue-500 bg-opacity-50"
        readOnly
      >
        {answer}
      </textarea>
    </label>
  </div>
</div>

  );
};

export default Question;
