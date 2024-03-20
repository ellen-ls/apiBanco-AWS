"use client"

import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';


interface TransactionData {
  dataRecebimento: string | number | Date;
  idempotencyId: number;
  amount: number;
  type: 'credit' | 'debit';
}

interface ApiResponse {
  Messages?: {
    Body: string;
  }[];
}

export default function Home() {
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<'credit' | 'debit'>('credit');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  
  

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch('http://localhost:3001/api/infoTransacoes');
        const data = await response.json();
        
        // Verifica se a resposta possui uma lista de mensagens válida
        if (data.Messages && Array.isArray(data.Messages)) {
          setMessages(data.Messages.map((message: { Body: string; }) => JSON.parse(message.Body)));
        } else {
          console.error('Resposta inválida da API:', data);
        }
      } catch (error) {
        console.error('Erro ao recuperar mensagens:', error);
      }
    }

    fetchMessages();
  }, []);

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
      dataRecebimento: ''
    };

    try {
      const response: AxiosResponse<string> = await axios.post('http://localhost:3001/transacoes', data);
      setMessage(response.data);
    } catch (error) {
      setMessage('Error sending data to backend');
      console.error('Error sending data to backend:', error);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>('http://localhost:3001/api/infoTransacoes');
      const data = response.data;

      // Verifica se a resposta possui uma lista de mensagens válida
      if (data.Messages && Array.isArray(data.Messages)) {
        const parsedTransactions = data.Messages
          .map(message => JSON.parse(message.Body))
          .filter((transaction: TransactionData) => {
            return transaction.idempotencyId && transaction.amount && transaction.type;
          });

        // Ordena as transações pela data de recebimento (se houver um campo de data na transação)
        parsedTransactions.sort((a: TransactionData, b: TransactionData) => {
          // Substitua 'dataRecebimento' pelo nome do campo que indica a data de recebimento na transação
          return new Date(b.dataRecebimento).getTime() - new Date(a.dataRecebimento).getTime();
        });

        // Limita a exibição para as últimas 10 transações
        const limitedTransactions = parsedTransactions.slice(0, 100);
        setTransactions(limitedTransactions);
      } else {
        console.error('Resposta inválida da API:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

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
          className="bg-cyan-900 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
          onClick={postDataToBackend}
        >
          Send Data to Backend
        </button>
        <button
            type="button"
            onClick={fetchTransactions}
            className="bg-cyan-900 hover:bg-cyan-700 text-white rounded px-4 py-2"
          >
            Pegar Transações
          </button>
      </form>
      {message && <p className='mt-4 text-cyan-100' >{message}</p>}

      <h1 className="text-white">Messages from SQS</h1>
      {loading ? (
          <p className='text-cyan-100'>Carregando transações...</p>
        ) : (
          <ul className="text-white">
            {transactions.map((transaction, index) => (
              <li key={index}>
                Idempotency ID: {transaction.idempotencyId}, Valor: {transaction.amount}, Tipo: {transaction.type}
              </li>
            ))}
          </ul>
        )}
              
 </div>
 );
 }