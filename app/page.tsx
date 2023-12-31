'use client';

import styles from './page.module.css'
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);


  const getResponseFromOpenAI = async () => {
    setResponse("");
    setIsLoading(true);
    console.log(prompt);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: `${prompt}` }),
      });
      const data = await response.json();
      setResponse(data.text);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  }

  return (
    <main className={styles.main}>

      <div className={styles.center}>
      <div className={styles.description}>
        <h1 className={styles.title}>Next.js & PaLM Sample Application</h1>
      </div>
        <textarea
          className={styles.textarea}
          rows={5}
          name="prompt"
          onChange={handleInputChange}
          value={prompt}
          placeholder='Ask me anything!'
          />

          <button
            className={styles.button}
            onClick={getResponseFromOpenAI}>
            Get Response
          </button>

          <div className={styles.response}>
            {isLoading ? (
              <div>Waiting for response ...</div>
            ) : error ? (
              <div className={styles.error}> error! try again later</div>
            ) : (
              <div>{response}</div>
            )}
          </div>
        </div>
    </main>
  )
}
