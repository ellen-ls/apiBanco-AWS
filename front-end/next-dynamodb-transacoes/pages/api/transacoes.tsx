"use client"

import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

interface TransactionData {
  idempotencyId: number;
  amount: number;
  type: 'credit' | 'debit';
}

export default function Home() {
  const [idempotencyId, setIdempotencyId] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<'credit' | 'debit'>('credit');
  const [message, setMessage] = useState<string>('');

  const generateIdempotencyId = () => {
    return Math.floor(Math.random() * 1000000); // Gerando um idempotencyId de 0 a 999999
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as 'credit' | 'debit');
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const postDataToBackend = async () => {
    const data: TransactionData = {
      idempotencyId: generateIdempotencyId(), // Gerando um idempotencyId automático
      amount,
      type,
    };

    try {
      const response: AxiosResponse<string> = await axios.post('http://localhost:3001/transacoes', data);
      setMessage(response.data);
    } catch (error) {
      setMessage('Error sending data to backend');
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-900 rounded-lg shadow-md">
      <h1 className="text-2xl text-white text-center font-bold mb-4">Trasação</h1>
      <form>
        <label htmlFor="amount" className="block mb-2 text-white">Amount:</label>
        <input
          type="number"
          id="amount"
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
          value={amount}
          onChange={handleAmountChange}
        />
        <p className="text-teal-200 mt-2">Amount: {formatCurrency(amount)}</p>
        <label htmlFor="type" className="block mb-2 text-white">Type:</label>
        <select
          id="type"
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
          value={type}
          onChange={handleTypeChange}
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={postDataToBackend}
        >
          Send Data to Backend
        </button>
      </form>
      {message && <p className='mt-4 text-cyan-100' >{message}</p>}
    </div>
  );
}
