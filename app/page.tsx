<<<<<<< HEAD
export default function Home() {
  return (
    <main>
      <h1>품셈 챗봇</h1>
      <p>여기에 챗봇 인터페이스가 들어갑니다.</p>
    </main>
  );
}
=======
'use client'
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setAnswer("");

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  }

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">품셈 GPT 챗봇</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="예: 기초 콘크리트 품셈 알려줘"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "불러오는 중..." : "질문"}
        </button>
      </form>
      {answer && (
        <div className="border rounded p-4 whitespace-pre-wrap bg-gray-50">
          {answer}
        </div>
      )}
    </main>
  );
}
>>>>>>> ff2d3d7acf364cc48a908005fbc51a5ffe040f5e
