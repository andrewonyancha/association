import Link from 'next/link';

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center space-y-4">
        <h1 className="text-lg md:text-2xl font-bold text-purple-900">
          Marketplace Coming Soon
        </h1>

        <p className="text-gray-700 leading-relaxed">
          Trader registration and verification is currently in progress.<br />
          Product listings will begin once verification is complete.
        </p>

        <div className="pt-6">
          <Link
            href="https://www.tmxglobalfreightnetwork.com/join"
            target="_blank"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg px-10 py-4 rounded-full transition shadow-lg"
          >
            Join the Network
          </Link>
        </div>
      </div>
    </div>
  );
}