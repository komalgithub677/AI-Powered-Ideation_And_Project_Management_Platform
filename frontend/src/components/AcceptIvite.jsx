import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AcceptInvite() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Accepting invitation...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setMessage("Invalid invitation link");
      return;
    }

    axios
      .post(
        `http://localhost:8080/api/invite/accept?token=${token}`
      )
      .then(() => {
        setMessage(
          "Invitation accepted successfully. You can now register."
        );

        setTimeout(() => {
          navigate("/signup");
        }, 3000);
      })
      .catch((err) => {
        setMessage(
          err.response?.data ||
          "Failed to accept invitation"
        );
      });
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Team Invitation
        </h2>

        <p>{message}</p>
      </div>
    </div>
  );
}