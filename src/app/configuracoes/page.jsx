"use client";

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { pythonBridge } from '../api/python-bridge';

export default function ConfiguracoesPage() {
  const [preferencias, setPreferencias] = useState({
    estilo_resposta: 'formal',
    nivel_detalhe: 'intermediário',
    tom_comunicacao: 'neutro'
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferencias(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSalvar = async () => {
    setLoading(true);
    setSuccess(false);
    setError('');
    
    try {
      // Salvar cada preferência individualmente
      for (const [categoria, valor] of Object.entries(preferencias)) {
        await pythonBridge.definirPreferencia(categoria, valor);
      }
      
      setSuccess(true);
    } catch (err) {
      setError(`Erro ao salvar preferências: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-gray-600">
          Personalize o comportamento do agente de processos administrativos.
        </p>
      </div>
      
      {success && (
        <Alert 
          type="success" 
          title="Preferências salvas" 
          className="mb-6"
          dismissible
          onDismiss={() => setSuccess(false)}
        >
          Suas preferências foram salvas com sucesso.
        </Alert>
      )}
      
      {error && (
        <Alert 
          type="error" 
          title="Erro" 
          className="mb-6"
          dismissible
          onDismiss={() => setError('')}
        >
          {error}
        </Alert>
      )}
      
      <Card title="Preferências de Resposta" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estilo de Resposta
            </label>
            <select
              name="estilo_resposta"
              value={preferencias.estilo_resposta}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="formal">Formal</option>
              <option value="técnico">Técnico</option>
              <option value="simplificado">Simplificado</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Define o nível de formalidade das respostas geradas.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nível de Detalhe
            </label>
            <select
              name="nivel_detalhe"
              value={preferencias.nivel_detalhe}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="básico">Básico</option>
              <option value="intermediário">Intermediário</option>
              <option value="detalhado">Detalhado</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Controla a quantidade de informações incluídas nas respostas.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tom de Comunicação
            </label>
            <select
              name="tom_comunicacao"
              value={preferencias.tom_comunicacao}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="neutro">Neutro</option>
              <option value="assertivo">Assertivo</option>
              <option value="cordial">Cordial</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Define o tom utilizado na comunicação das respostas.
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            onClick={handleSalvar} 
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar Preferências'}
          </Button>
        </div>
      </Card>
      
      <Card title="Estatísticas de Uso" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800 mb-1">42</h3>
            <p className="text-sm text-blue-600">Processos Analisados</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-800 mb-1">12</h3>
            <p className="text-sm text-green-600">Feedback Positivo</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-yellow-800 mb-1">3</h3>
            <p className="text-sm text-yellow-600">Feedback Negativo</p>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-md font-medium mb-2">Tipos de Processo</h3>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span>Processo de Licitação</span>
              <span className="font-medium">18</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '43%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mb-2 mt-4">
              <span>Processo Administrativo</span>
              <span className="font-medium">15</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '36%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mb-2 mt-4">
              <span>Processo de Pagamento</span>
              <span className="font-medium">9</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '21%' }}></div>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
}
