import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Container, Arquivos } from './styles';

interface ArquivoProps {
  id: number;
  nome: string;
}

const Dashboard: React.FC = () => {
  const [arquivos, setArquivos] = useState<ArquivoProps[]>([]);
  const { dados } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const { token } = dados;

    if (!token) {
      history.push('/');
    }

    api
      .get('arquivos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setArquivos(response.data);
      });
  }, [dados, history]);

  const handleUploadArquivo = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const formData = new FormData();
        const { token } = dados;

        if (!token) {
          history.push('/');
        }

        formData.append('arquivo', e.target.files[0]);

        await api
          .post('arquivos', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            setArquivos([...arquivos, response.data]);
          });
      }
    },
    [dados, history, arquivos],
  );

  const download = useCallback(arquivo => {
    setTimeout(() => {
      const response = {
        file: `http://localhost:3333/tmp/temp/${arquivo}`,
      };
      window.location.href = response.file;
    }, 100);
  }, []);

  return (
    <Container>
      <label htmlFor="arquivo">
        <span>Upload</span>
        <input type="file" id="arquivo" onChange={handleUploadArquivo} />
      </label>
      <Arquivos>
        {arquivos.map(arquivo => (
          <Link
            key={arquivo.id}
            to={`${arquivo.nome}`}
            onClick={() => download(arquivo.nome)}
          >
            <strong>{arquivo.nome}</strong>
          </Link>
        ))}
      </Arquivos>
    </Container>
  );
};

export default Dashboard;
