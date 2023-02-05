import { useState } from 'react';
import { isValidUrl } from '../utils/is-valid-url';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="container flex flex-col items-center p-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-8">
          Paste your URL to be shortened
        </h1>
        <form
          className="flex flex-col w-full max-w-xl mb-8"
          onSubmit={async (e) => {
            e.preventDefault();

            if (url.length === 0) {
              setError('Please enter the URL');
              return;
            } else if (!isValidUrl(url)) {
              setError('Invalid URL format');
              return;
            } else {
              setError(null);
            }

            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/links`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  url: url,
                }),
              },
            );
            const data = await response.json();

            setShortenedUrl(data['shortenedUrl']);
          }}
        >
          <input
            className="border w-full h-12 px-2 rounded-lg"
            type="text"
            placeholder="Enter the URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="text-red-400 text-sm px-2 mt-1">{error}</div>
          <button
            className="bg-black text-white font-medium rounded-md h-9 mt-4"
            type="submit"
          >
            Convert
          </button>
        </form>
        {shortenedUrl && (
          <button
            className="flex items-center gap-2 border rounded-lg px-3 py-2 hover:bg-gray-200"
            onClick={() => {
              navigator.clipboard.writeText(shortenedUrl);
            }}
          >
            {shortenedUrl}
            <span className="material-symbols-outlined text-gray-700">
              content_copy
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
