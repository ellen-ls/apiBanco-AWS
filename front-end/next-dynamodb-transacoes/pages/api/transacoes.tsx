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
    <div>
      <form>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <br />
        <label htmlFor="type">Type:</label>
        <select id="type" value={type} onChange={handleTypeChange}>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        <br />
        <button type="button" onClick={postDataToBackend}>
          Send Data to Backend
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}
