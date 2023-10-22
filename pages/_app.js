import '@/styles/globals.css'

//internal impot 
import {ToDoListProvider} from '../context/ToDolistApp';

const MyApp = ({ Component, pageProps }) => (

  <ToDoListProvider>
    <div> 
      <Component {...pageProps} />;
      </div>
    
  </ToDoListProvider>
  
);

export default MyApp;
