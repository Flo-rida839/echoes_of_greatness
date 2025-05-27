import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ name, email, password });
    } catch (err) {
      // Error handled in context
    }
  };

  return (
    <div className="min-h-screen bg-[url('/parchment-bg.jpg')] bg-cover flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-[#fef3c7]/80 shadow-xl p-8 rounded-2xl border-4 border-[#9c7b3e] w-full max-w-md font-serif">
        <h1 className="text-3xl text-center text-[#6b4c1e] font-bold mb-6">📜 Ancient Signup Scroll</h1>
        <input
          type="text"
          placeholder="Name to inscribe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl border-2 border-[#d6b760] bg-[#fff9e6] placeholder:text-[#9c7b3e]"
          required
        />
        <input
          type="email"
          placeholder="Scroll of Contact (Email)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl border-2 border-[#d6b760] bg-[#fff9e6] placeholder:text-[#9c7b3e]"
          required
        />
        <input
          type="password"
          placeholder="Sacred Key (Password)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded-xl border-2 border-[#d6b760] bg-[#fff9e6] placeholder:text-[#9c7b3e]"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#9c7b3e] text-white font-semibold py-2 rounded-xl hover:bg-[#b08948] transition duration-300"
        >
          📝 Inscribe
        </button>
        <p className="mt-4 text-center text-[#6b4c1e]">
          Already have a scroll? <Link to="/login" className="underline">Enter here</Link>
        </p>
      </form>
    </div>
  );
}
