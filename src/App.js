import TaskProvider from './contexts/TaskContext';
import TaskApp from './components/TaskApp';
import styles from './App.module.css';
import './App.css';

const App = () => {
  return (
    <>
      <TaskProvider>
        <TaskApp />
      </TaskProvider>
      <section className={styles.description}>
        <div>
          <h1 className="title">O que é o Pomodoro Task?</h1>
          <p>
            O Pomodoro Task é um aplicativo organizador e gerenciador de tarefas
            e tempo baseado na{' '}
            <a
              href="https://francescocirillo.com/products/the-pomodoro-technique"
              target="_blank"
              rel="noreferrer"
            >
              Técnica Pomodoro
            </a>{' '}
            .
          </p>
        </div>
        <div>
          <h1 className="title">O que é a Técnica Pomodoro?</h1>
          <p>
            A Técnica Pomodoro é um método de gerenciamento de tempo
            desenvolvido por Francesco Cirillo no final dos anos 80. É um método
            estruturado composto por processos, ferramentas, princípios e
            valores para aprender a lidar com o tempo e transformá-lo de
            predador vicioso em aliado para aumentar a produtividade. Baseia-se
            em uma série de princípios construídos na auto-observação e
            consciência. Desenvolver essas habilidades possibilita mudar a
            relação com o tempo e alcançar nossos objetivos com menos esforço e
            ansiedade.
          </p>
        </div>
        <div className={styles.func}>
          <h1 className="title">Como funciona?</h1>
          <p>
            Atividade <span>(25min padrão)</span>
          </p>
          <p>-</p>
          <p>
            Pausa Curta <span>(05min padrão)</span>
          </p>
          <p>-</p>
          <p>
            Atividade <span>(25min padrão)</span>
          </p>
          <p>-</p>
          <p>
            Pausa Curta <span>(05min padrão)</span>
          </p>
          <p>-</p>
          <p>
            Atividade <span>(25min padrão)</span>
          </p>
          <p>-</p>
          <p>
            Pausa Curta <span>(05min padrão)</span>
          </p>
          <p>-</p>
          <p>
            Atividade <span>(25min padrão)</span>
          </p>
          <p>-</p>
          <p>
            Pausa Longa <span>(15min padrão)</span>
          </p>
        </div>
      </section>
    </>
  );
};

export default App;
