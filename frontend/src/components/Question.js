import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Question = () => {
  const [formData, setFormData] = useState({
    question: "",
  });
  const [answer, setAnswer] = useState([]);

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
      const response = await fetch(
        `http://localhost:5000/question?ask=${formData.question}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data3 = await response.json();

      //set to state then continue
      setAnswer(data3.content[0].text.value);
      console.log(data3);
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 bg-opacity-70">
      <div className="flex items-center justify-center mb-8">
        <div className="text-center">
          <img
            src="/images/logo.png"
            alt="alt"
            className="w-32 h-32 object-cover rounded-md mx-auto"
          />
          <div className="bg-black text-white font-bold text-sm p-2 rounded-lg mt-5 mx-6 sm:mx-72">
            Another instance of GPT-1, providing users with additional
            availability and flexibility. Like the original, it is proficient in
            understanding and generating human-like text across diverse domains.
          </div>
        </div>
      </div>

      <div className="overflow-y-auto h-48 max-h-400 mx-6 sm:mx-20">
        <div className="font-inter text-sm font-semibold leading-6 break-words whitespace-pre-wrap mb-15">
          {answer}
        </div>
      </div>

      <div className="flex w-full max-w-lg items-center space-x-2 mx-2 sm:mx-0">
        <Input
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-violet-400 bg-opacity-50"
          placeholder="Ask me anything..."
          required
        />
        <Button className="rounded-md bg-violet-800 hover:bg-violet-950" onSubmit={handleSubmit} type="submit">
          Send
        </Button>
      </div>
    </div>
  );
};

export default Question;
