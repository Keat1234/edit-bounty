import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Request Board</h1>
        <p className="text-lg text-gray-600">
          Connect with editors to get your clips polished.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Link href="/creator" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <div className="text-2xl mb-2">🎥</div>
            <h2 className="text-xl font-semibold text-gray-900">I'm a Creator</h2>
            <p className="text-gray-500 text-sm mt-2">Post jobs and get edits</p>
          </Link>

          <Link href="/editor" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <div className="text-2xl mb-2">✂️</div>
            <h2 className="text-xl font-semibold text-gray-900">I'm an Editor</h2>
            <p className="text-gray-500 text-sm mt-2">Claim jobs and earn</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
