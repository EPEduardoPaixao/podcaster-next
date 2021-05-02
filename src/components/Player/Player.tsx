import React from 'react';
import styles from './Player.module.scss'
// import { Container } from './styles';

const Player: React.FC = () => {
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="E Reprodução"/>
        <strong>Em Reprodução</strong>
      </header>
      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>
      <footer>
        
      </footer>
    </div>
  );
}

export default Player;