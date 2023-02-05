import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

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
            const response = await fetch('http://localhost:3000/links', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                url: url,
              }),
            });
            const data = await response.json();
            setShortenedUrl(data['shortenedUrl']);
          }}
        >
          <input
            className="border w-full h-12 px-2 rounded-lg mb-4"
            type="text"
            placeholder="Enter the URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="bg-black text-white font-medium rounded-md h-9"
            type="submit"
          >
            Convert
          </button>
        </form>
        {shortenedUrl && (
          <div
            className="flex items-center gap-2 border rounded-lg px-3 py-2"
            onClick={() => {
              navigator.clipboard.writeText(shortenedUrl);
            }}
          >
            {shortenedUrl}
            <span className="material-symbols-outlined text-gray-700">
              content_copy
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
