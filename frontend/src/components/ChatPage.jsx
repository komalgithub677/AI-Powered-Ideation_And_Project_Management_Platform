import { useEffect, useState } from "react";
import axios from "axios";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
} from "lucide-react";

export default function ChatPage() {
  const token = localStorage.getItem("token");
  const myEmail = localStorage.getItem("email");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);

  // =========================
  // LOAD USERS
  // =========================

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/chat/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const filteredUsers = res.data.filter(
        (user) => user.email !== myEmail
      );

      setUsers(filteredUsers);
    } catch (err) {
      console.error("Users Load Error:", err);
    }
  };

  // =========================
  // WEBSOCKET CONNECTION
  // =========================

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () =>
        new SockJS("http://localhost:8080/ws"),

      reconnectDelay: 5000,

      onConnect: () => {
        console.log("WebSocket Connected");

        client.subscribe(
          "/topic/messages",
          (payload) => {
            const incoming = JSON.parse(
              payload.body
            );

            if (
              selectedUser &&
              (
                incoming.senderEmail ===
                  selectedUser.email ||
                incoming.receiverEmail ===
                  selectedUser.email
              )
            ) {
              setMessages((prev) => [
                ...prev,
                incoming,
              ]);
            }
          }
        );
      },

      onStompError: (frame) => {
        console.error(
          "STOMP Error:",
          frame
        );
      },
    });

    client.activate();

    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [selectedUser]);

  // =========================
  // LOAD CHAT HISTORY
  // =========================

  const loadMessages = async (
    receiverEmail
  ) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/chat/history?receiverEmail=${receiverEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(res.data);
    } catch (err) {
      console.error(
        "History Error:",
        err
      );
    }
  };

  // =========================
  // SELECT USER
  // =========================

  const handleUserSelect = (
    user
  ) => {
    setSelectedUser(user);
    loadMessages(user.email);
  };

  // =========================
  // SEND MESSAGE
  // =========================

  const sendMessage = () => {
    if (
      !message.trim() ||
      !selectedUser ||
      !stompClient
    ) {
      return;
    }

    stompClient.publish({
      destination: "/app/chat",
      body: JSON.stringify({
        senderEmail: myEmail,
        receiverEmail:
          selectedUser.email,
        message: message,
      }),
    });

    setMessage("");
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="h-[85vh] bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="flex h-full">

        {/* SIDEBAR */}

        <div className="w-80 border-r bg-slate-50">

          <div className="p-4 border-b">

            <h2 className="text-xl font-bold">
              Live Chat
            </h2>

            <div className="mt-3 relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search members..."
                className="w-full pl-10 pr-4 py-2 border rounded-xl"
              />
            </div>

          </div>

          <div className="p-2">

            <p className="px-3 py-2 text-sm text-gray-500 font-semibold">
              Team Members
            </p>

            {users.map((user) => (

              <div
                key={user.id}
                onClick={() =>
                  handleUserSelect(user)
                }
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer ${
                  selectedUser?.id ===
                  user.id
                    ? "bg-blue-100"
                    : "hover:bg-blue-50"
                }`}
              >

                <div className="relative">

                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}`}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />

                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500" />

                </div>

                <div>
                  <h3 className="font-medium">
                    {user.name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>

              </div>

            ))}

          </div>

        </div>

        {/* CHAT AREA */}

        <div className="flex-1 flex flex-col">

          {/* HEADER */}

          <div className="h-20 border-b flex items-center justify-between px-6">

            {selectedUser ? (
              <>
                <div className="flex items-center gap-3">

                  <img
                    src={`https://ui-avatars.com/api/?name=${selectedUser.name}`}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />

                  <div>
                    <h3 className="font-semibold">
                      {selectedUser.name}
                    </h3>

                    <p className="text-green-500 text-sm">
                      Online
                    </p>
                  </div>

                </div>

                <div className="flex gap-4">
                  <Phone size={20} />
                  <Video size={20} />
                  <MoreVertical size={20} />
                </div>
              </>
            ) : (
              <div className="font-semibold">
                Select User
              </div>
            )}

          </div>

          {/* MESSAGES */}

          <div className="flex-1 overflow-y-auto bg-slate-100 p-6 space-y-4">

            {messages.map((msg) => (

              <div
                key={msg.id}
                className={`flex ${
                  msg.senderEmail ===
                  myEmail
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-md px-4 py-3 rounded-2xl shadow ${
                    msg.senderEmail ===
                    myEmail
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {msg.message}
                </div>

              </div>

            ))}

          </div>

          {/* INPUT */}

          {selectedUser && (

            <div className="border-t p-4 bg-white">

              <div className="flex items-center gap-3">

                <button>
                  <Paperclip size={20} />
                </button>

                <button>
                  <Smile size={20} />
                </button>

                <input
                  type="text"
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter"
                    ) {
                      sendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 border rounded-xl px-4 py-3 outline-none"
                />

                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white p-3 rounded-xl"
                >
                  <Send size={18} />
                </button>

              </div>

            </div>

          )}

        </div>

      </div>
    </div>
  );
}