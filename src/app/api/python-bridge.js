// Atualização da API bridge para incluir os novos módulos
"use client";

// Simulação da API bridge para comunicação com o backend Python
export const pythonBridge = {
  // Funções existentes
  listarProcessos: async () => {
    // Simulação de resposta do backend
    return {
      success: true,
      processos: [
        {
          numero: "12345.678901/2023-45",
          assunto: "Solicitação de Licença Ambiental",
          data_recebimento: "10/04/2023",
          tipo_processo: "Licença Ambiental",
          remetente: "Empresa ABC Ltda.",
          status: "Em análise",
          link_detalhes: "/processo/12345",
          urgencia: {
            nivel: "alto",
            pontuacao: 0.75,
            detalhes: {
              prazo: {
                data_prazo: "25/04/2023",
                dias_restantes: 3
              }
            }
          }
        },
        {
          numero: "54321.123456/2023-67",
          assunto: "URGENTE - Processo de Licitação",
          data_recebimento: "15/04/2023",
          tipo_processo: "Processo Licitatório",
          remetente: "Secretaria de Administração",
          status: "Pendente",
          link_detalhes: "/processo/54321",
          urgencia: {
            nivel: "critico",
            pontuacao: 0.95,
            detalhes: {
              prazo: {
                data_prazo: "20/04/2023",
                dias_restantes: -2
              }
            }
          }
        },
        {
          numero: "98765.432109/2023-89",
          assunto: "Comunicação Interna",
          data_recebimento: "12/04/2023",
          tipo_processo: "Comunicação Interna",
          remetente: "Departamento de RH",
          status: "Novo",
          link_detalhes: "/processo/98765",
          urgencia: {
            nivel: "baixo",
            pontuacao: 0.25,
            detalhes: {
              prazo: {
                data_prazo: "12/05/2023",
                dias_restantes: 20
              }
            }
          }
        },
        {
          numero: "11111.222222/2023-33",
          assunto: "Mandado de Segurança - Prazo 48h",
          data_recebimento: "18/04/2023",
          tipo_processo: "Mandado de Segurança",
          remetente: "Tribunal de Justiça",
          status: "Urgente",
          link_detalhes: "/processo/11111",
          urgencia: {
            nivel: "critico",
            pontuacao: 0.98,
            detalhes: {
              prazo: {
                data_prazo: "20/04/2023",
                dias_restantes: 0
              }
            }
          }
        }
      ]
    };
  },
  
  processarProcesso: async (linkDetalhes) => {
    // Simulação de resposta do backend
    return {
      success: true,
      analise: {
        numero: "12345.678901/2023-45",
        assunto: "Solicitação de Licença Ambiental",
        conteudo: "Processo para análise de licença ambiental para operação de empresa...",
        tipo_processo: "Licença Ambiental",
        data_recebimento: "10/04/2023",
        prazo: "25/04/2023",
        remetente: "Empresa ABC Ltda.",
        anexos: ["anexo1.pdf", "anexo2.pdf"],
        historico: [
          { data: "10/04/2023", acao: "Recebimento", usuario: "Sistema" },
          { data: "12/04/2023", acao: "Análise Inicial", usuario: "João Silva" }
        ]
      }
    };
  },
  
  gerarResumo: async (analise) => {
    // Simulação de resposta do backend
    return {
      success: true,
      resumo: {
        texto: "# Resumo do Processo\n\n## Pontos Importantes\n\n- Solicitação de licença ambiental para operação\n- Prazo de resposta: 25/04/2023\n- Empresa já possui licença prévia\n- Documentação técnica completa\n\n## Respostas Anteriores Similares\n\n1. Processo 98765/2022 - Aprovado com condicionantes\n2. Processo 54321/2022 - Solicitado complementação de estudos",
        pontos_chave: [
          "Licença ambiental para operação",
          "Prazo: 25/04/2023",
          "Documentação técnica completa"
        ],
        processos_similares: [
          { numero: "98765/2022", resultado: "Aprovado com condicionantes" },
          { numero: "54321/2022", resultado: "Solicitado complementação de estudos" }
        ]
      }
    };
  },
  
  gerarResposta: async (analise) => {
    // Simulação de resposta do backend
    return {
      success: true,
      resposta: {
        titulo: "Parecer Técnico - Licença de Operação",
        corpo: "Considerando a análise da documentação apresentada pela empresa ABC Ltda., referente ao processo de licenciamento ambiental para operação, e tendo em vista o cumprimento dos requisitos estabelecidos na legislação ambiental vigente, manifesto-me FAVORÁVEL à concessão da Licença de Operação, com as seguintes condicionantes:\n\n1. Realizar monitoramento trimestral dos efluentes líquidos\n2. Apresentar relatório anual de gerenciamento de resíduos sólidos\n3. Manter sistema de controle de emissões atmosféricas\n\nEsta licença tem validade de 4 (quatro) anos a partir da data de sua emissão.",
        tipo_processo: "Licença Ambiental",
        recomendacao: "Aprovação com condicionantes",
        referencias: [
          "Resolução CONAMA 237/1997",
          "Lei Estadual 12.345/2010"
        ]
      }
    };
  },
  
  definirPreferencia: async (categoria, valor) => {
    // Simulação de resposta do backend
    return {
      success: true,
      mensagem: `Preferência ${categoria} definida como ${valor}`
    };
  },
  
  registrarFeedback: async (numeroProcesso, tipoProcesso, resposta, avaliacao, comentario) => {
    // Simulação de resposta do backend
    return {
      success: true,
      mensagem: `Feedback registrado para o processo ${numeroProcesso}`
    };
  },
  
  // Novas funções para os módulos de priorização e banco de dados Excel
  priorizarProcessos: async (processos) => {
    // Simulação de resposta do backend
    return {
      success: true,
      processos_priorizados: processos.sort((a, b) => {
        const pontuacaoA = a.urgencia?.pontuacao || 0;
        const pontuacaoB = b.urgencia?.pontuacao || 0;
        return pontuacaoB - pontuacaoA;
      }),
      processos_por_nivel: {
        critico: processos.filter(p => p.urgencia?.nivel === "critico"),
        alto: processos.filter(p => p.urgencia?.nivel === "alto"),
        medio: processos.filter(p => p.urgencia?.nivel === "medio"),
        baixo: processos.filter(p => p.urgencia?.nivel === "baixo")
      },
      estatisticas: {
        total_processos: processos.length,
        distribuicao: {
          critico: processos.filter(p => p.urgencia?.nivel === "critico").length,
          alto: processos.filter(p => p.urgencia?.nivel === "alto").length,
          medio: processos.filter(p => p.urgencia?.nivel === "medio").length,
          baixo: processos.filter(p => p.urgencia?.nivel === "baixo").length
        }
      },
      relatorio: `# Relatório de Priorização de Processos\n\nData: 22/04/2025\n\n## Resumo\n\nTotal de processos analisados: **${processos.length}**\n\n### Distribuição por Nível de Urgência\n\n- Crítico: ${processos.filter(p => p.urgencia?.nivel === "critico").length}\n- Alto: ${processos.filter(p => p.urgencia?.nivel === "alto").length}\n- Médio: ${processos.filter(p => p.urgencia?.nivel === "medio").length}\n- Baixo: ${processos.filter(p => p.urgencia?.nivel === "baixo").length}\n\n## Processos Críticos\n\n${processos.filter(p => p.urgencia?.nivel === "critico").map((p, i) => `### ${i+1}. Processo ${p.numero}\n\n**Assunto**: ${p.assunto}\n**Recebido em**: ${p.data_recebimento}\n**Prazo**: ${p.urgencia?.detalhes?.prazo?.data_prazo || 'N/A'}\n\n---\n\n`).join('')}`
    };
  },
  
  exportarRelatorioPriorizacao: async () => {
    // Simulação de resposta do backend
    return {
      success: true,
      caminho: "/home/ubuntu/agente_processos/relatorio_priorizacao.md",
      mensagem: "Relatório de priorização exportado com sucesso"
    };
  },
  
  carregarBancoDados: async () => {
    // Simulação de resposta do backend
    return {
      success: true,
      processos: [
        {
          numero_processo: "12345.678901/2023-45",
          data_recebimento: "10/04/2023",
          data_resposta: "15/04/2023",
          assunto: "Solicitação de Licença Ambiental",
          tipo_processo: "Licença Ambiental",
          remetente: "Empresa ABC Ltda.",
          prazo: "25/04/2023",
          status: "Respondido",
          nivel_urgencia: "alto",
          feedback: "5"
        },
        {
          numero_processo: "54321.123456/2023-67",
          data_recebimento: "15/04/2023",
          data_resposta: "18/04/2023",
          assunto: "Processo de Licitação",
          tipo_processo: "Processo Licitatório",
          remetente: "Secretaria de Administração",
          prazo: "20/04/2023",
          status: "Respondido",
          nivel_urgencia: "critico",
          feedback: "4"
        },
        {
          numero_processo: "98765.432109/2023-89",
          data_recebimento: "12/04/2023",
          data_resposta: "20/04/2023",
          assunto: "Comunicação Interna",
          tipo_processo: "Comunicação Interna",
          remetente: "Departamento de RH",
          prazo: "12/05/2023",
          status: "Respondido",
          nivel_urgencia: "baixo",
          feedback: "5"
        }
      ],
      estatisticas: {
        total_processos: 3,
        tempo_medio_resposta: 4.33,
        tipos_processo: {
          "Licença Ambiental": 1,
          "Processo Licitatório": 1,
          "Comunicação Interna": 1
        },
        niveis_urgencia: {
          "critico": 1,
          "alto": 1,
          "baixo": 1
        },
        status: {
          "Respondido": 3
        }
      }
    };
  },
  
  exportarRelatorio: async () => {
    // Simulação de resposta do backend
    return {
      success: true,
      caminho: "/home/ubuntu/agente_processos/relatorio_processos.xlsx",
      mensagem: "Relatório de processos exportado com sucesso"
    };
  }
};
