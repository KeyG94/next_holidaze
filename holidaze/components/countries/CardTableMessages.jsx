import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL, MESSAGES } from "../../constants/baseUrl.js";
import AuthContext from "../../context/AuthContext";
import GKLoadingModal from "../global/utills/GKLoadingModal.jsx";

export default function CardTable() {
  // Make api call
  const [auth] = useContext(AuthContext);
  const [messages, setMessages] = useState(false);

  useEffect(() => {
    if (auth) {
      const CONFIG = {
        method: "GET",
        url: BASE_URL + MESSAGES,
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      };
    }
    const getMessages = async () => {
      try {
        const res = await axios(CONFIG);
        setMessages(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, []);

  return (
    <div className="flex flex-col">
      <table className="shadow overflow-hidden rounded divide-y divide-gray-200">
        <thead className="bg-orange">
          <tr>
            <th
              scope="col"
              className="px-2 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              From
            </th>
            <th
              scope="col"
              className="px-2 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              Message
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {!messages ? (
            <GKLoadingModal />
          ) : (
            messages.map(({ attributes, id }) => {
              const NAME = attributes.message_from;
              const EMAIL = attributes.message_email;
              const ID = id;
              const MESSAGE = attributes.message_message;

              return (
                <tr
                  key={ID}
                  className="hover:bg-orange transition duration-200"
                >
                  <td className="px-1 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-bold text-black">
                          {NAME}
                        </div>
                        <div className="text-sm text-black">{EMAIL}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <span className="inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-lightBlack">
                      {MESSAGE}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
