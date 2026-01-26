export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Left section */}
        <div className="text-center md:text-left">
          <h1 className="text-[#1877f2] text-5xl font-bold mb-4">facebook</h1>
          <p className="text-2xl text-gray-800">
            Facebook helps you connect and share with the people in your life.
          </p>
        </div>

        {/* Right section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Email address or phone number"
            className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#1877f2]"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#1877f2]"
          />

          <button className="w-full bg-[#1877f2] text-white py-3 rounded-md font-bold text-lg hover:bg-[#166fe5] transition">
            Log In
          </button>

          <div className="text-center mt-4">
            <a href="#" className="text-sm text-[#1877f2] hover:underline">
              Forgotten password?
            </a>
          </div>

          <hr className="my-5" />

          <div className="flex justify-center">
            <button className="bg-[#42b72a] text-white px-6 py-3 rounded-md font-bold hover:bg-[#36a420] transition">
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
