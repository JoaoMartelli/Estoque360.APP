import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './_loader.module.css';

function Loader() {
    return (
        <div className={styles.loaderOverlay}>
            <Spinner animation="border" variant="success" role="status">
                <span className="visually-hidden">Carregando...</span>
            </Spinner>
        </div>
    );
}

export default Loader;
