import React from 'react';
import { Alert } from 'react-bootstrap';
import styles from './Alerta.module.css';

const Alerta = ({ tipo, mensagem, visivel, aoFechar }) => {
    if (!visivel) return null;

    return (
        <Alert
            variant={tipo}
            onClose={aoFechar}
            dismissible
            id={styles.alertaFixo}
        >
            {mensagem}
        </Alert>
    );
};

export default Alerta;
