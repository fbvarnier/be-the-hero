import React, {useState} from 'react';
import './styles.css';
import { Link,useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        };
        try {
            await api.post('incidents', data,{
                headers: {
                    Authorization: ongId,
                }
            });
            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadasrar caso');
        }

    }

    return ( 
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro Novo Caso</h1>
                    <p>Descreva o detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        />
                    <input 
                        placeholder="valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}