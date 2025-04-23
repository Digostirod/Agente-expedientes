"use client";

import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import ProcessoDetail from '../../components/ProcessoDetail';
import { pythonBridge } from '../api/python-bridge';

export default function ProcessosPage() {
  const [processos, setProcessos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processoSelecionado, setProcessoSelecionado] = useState(null);
  
  useEffect(() => {
    carregarProcessos();
  }, []);
  
  const carregarProcessos = async () => {
    setLoading(true);
    setError('');
    
    try {
      const resultado = await pythonBridge.listarProcessos();
      
      if (resultado.success && resultado.processos) {
        setProcessos(resultado.processos);
      } else {
        setError('Erro ao carregar processos.');
      }
    } catch (err) {
      setError(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerProcesso = (processo) => {
    setProcessoSelecionado(processo);
  };
  
  const handleVoltarLista = () => {
    setProcessoSelecionado(null);
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Processos Administrativos</h1>
        <p className="text-gray-600">
          Visualize, analise e gere respostas para processos administrativos.
        </p>
      </div>
      
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
      
      {processoSelecionado ? (
        <ProcessoDetail 
          processo={processoSelecionado} 
          onBack={handleVoltarLista}
        />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Lista de Processos</h2>
            <Button 
              onClick={carregarProcessos} 
              disabled={loading}
              variant="outline"
            >
              {loading ? 'Carregando...' : 'Atualizar'}
            </Button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Carregando processos...</p>
            </div>
          ) : processos.length === 0 ? (
            <Card className="text-center py-8">
              <p className="text-gray-600">Nenhum processo encontrado.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {processos.map((processo, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-medium">{processo.numero}</h3>
                      <p className="text-gray-600">{processo.assunto}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-500 mr-4">
                          Data: {processo.data}
                        </span>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          processo.status === 'Em análise' ? 'bg-blue-100 text-blue-800' :
                          processo.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                          processo.status === 'Concluído' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {processo.status}
                        </span>
                      </div>
                    </div>
                    <Button onClick={() => handleVerProcesso(processo)}>
                      Ver Detalhes
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
