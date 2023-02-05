import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  return (
    <>
      <h1>Paste your URL to be shortened</h1>
      <form
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
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Convert</button>
      </form>
      <div>{shortenedUrl}</div>
    </>
  );
}
