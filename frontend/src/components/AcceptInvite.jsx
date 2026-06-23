
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AcceptInvite() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(
    "Accepting invitation..."
  );

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setMessage("❌ Invalid invitation link.");
      setLoading(false);
      return;
    }

    const acceptInvitation = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8080/api/invite/accept?token=${token}`
        );

        const invitedEmail =
          res?.data?.email || "";

        localStorage.setItem(
          "inviteAccepted",
          "true"
        );

        localStorage.setItem(
          "inviteToken",
          token
        );

        localStorage.setItem(
          "invitedEmail",
          invitedEmail
        );

        setMessage(
          "✅ Invitation accepted successfully. Redirecting to signup..."
        );

        setLoading(false);

        setTimeout(() => {
          // Clear any currently logged-in session
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate(
            `/signup?email=${encodeURIComponent(
              invitedEmail
            )}`
          );
        }, 2000);

      } catch (err) {
        console.error(
          "Invitation Accept Error:",
          err
        );

        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data ||
          "❌ Failed to accept invitation.";

        setMessage(errorMessage);
        setLoading(false);
      }
    };

    acceptInvitation();

  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-6">
          Team Invitation
        </h1>

        {loading ? (
          <div className="text-center">
            <div className="animate-pulse text-blue-600 font-medium">
              Processing Invitation...
            </div>
          </div>
        ) : (
          <div className="text-center">

            <p className="text-gray-700 mb-5">
              {message}
            </p>

            {!message.includes("successfully") && (
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Go To Login
              </button>
            )}

          </div>
        )}

      </div>

    </div>
  );
}

