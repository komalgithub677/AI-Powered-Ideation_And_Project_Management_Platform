// src/components/Profile.jsx
export default function Profile() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p className="text-gray-600 mb-4">
        Manage your account details, settings, and preferences here.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value="John Doe"
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value="johndoe@example.com"
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
