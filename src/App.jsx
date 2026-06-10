import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { GoogleGenAI } from "@google/genai";
import { BeatLoader } from "react-spinners";
import Markdown from 'react-markdown'
import { RiComputerFill } from "react-icons/ri";
import { GiWhiteBook } from "react-icons/gi";
import { GiOpenBook } from "react-icons/gi";
import { FaBloggerB } from "react-icons/fa";


const App = () => {
  const [screens, setScreens] = useState(1);
  const [prompt, setprompt] = useState("");
  const [loading, setLoading] = useState(false);
 const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});
  let messages = [];
  const [data, setData] = useState(messages);
  async function getResponse() {

    if (prompt === "") {
      alert("Please enter a prompt!");
      return;
    }

    setData(prevData => [...prevData, { role: "user", content: prompt }]);
    setScreens(2);

    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    setData(prevData => [...prevData, { role: "ai", content: response.text }]);
    setprompt("");
    setLoading(false);
  }

  return (
    <div>
      <Navbar />

      <div className="screens">
        {screens === 1 ? (
          <div className="screen-1 w-screen h-[65vh] px-[150px] flex items-center justify-center flex-col">
            <h3 className="!text-[40px] font-[700]">
              EDU-<span className="text-purple-500">BOT</span>
            </h3>
            <div className="flex mt-5 items-center gap-[15px]">
              <div className="card w-[200px] h-[fit] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg p-[15px]">
               <i className="text-[30px]"><RiComputerFill /></i> 
               <p className="mt-3">Build a responsive website.</p>
              </div>
              <div className="card w-[200px] h-[fit] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg p-[15px]">
               <i className="text-[30px]"><GiWhiteBook/></i> 
               <p className="mt-3">Explain any topic in simple words.</p>
              </div>
              <div className="card w-[200px] h-[fit] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg p-[15px]">
               <i className="text-[30px]"><GiOpenBook/></i> 
               <p className="mt-3">Get coding help and interview answers.</p>
              </div>
              <div className="card w-[200px] h-[fit] cursor-pointer bg-zinc-800 transition-all hover:bg-gray-800 rounded-lg p-[15px]">
               <i className="text-[30px]"><FaBloggerB /></i> 
               <p className="mt-3">Generate blogs, emails and articles.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="screen-2 w-screen h-[70vh] px-[150px] overflow-y-auto">
            {data.length > 0 ? (
              data.map((item, index) => (
                <div key={index}>
                  {item.role === "user" ? (
                    <div className="user bg-gray-800 ml-auto p-[15px] rounded-lg mb-5 w-fit max-w-[40%]">
                      <p className="text-[14px] text-gray-400">User</p>
                      <p>{item.content}</p>
                    </div>
                  ) : (
                    <div className="ai bg-gray-800 mr-auto p-[15px] rounded-lg mb-5 w-fit max-w-[40%]">
                      <p className="text-[14px] text-gray-400">EDU-BOT</p>
                      <Markdown>
                        {item.content}
                      </Markdown>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No messages yet!</p>
            )}
            {
              loading ?
                <div className="loader"><BeatLoader color="white" /></div> : ""
            }
          </div>
        )}
      </div>

      <div className="inputbox px-[150px] h-[15vh] pt-3">
        <div className="input w-[90%] mx-auto flex items-center gap-[10px] bg-zinc-800 rounded-lg">
          <input onKeyDown={(e) => {
            if (e.key === "Enter") {
              getResponse();
            }
          }} onChange={(e) => setprompt(e.target.value)} value={prompt}
            type="text"
            placeholder="Enter your prompt!"
            className="flex-1 bg-transparent rounded-lg p-[15px] outline-none text-[18px] font-[500]"
          />
        </div>
        <p className="text-center text-gray-500 mt-3">
          EDU-BOT can make mistakes! Cross check it.
        </p>
      </div>
    </div>
  );
};

export default App;