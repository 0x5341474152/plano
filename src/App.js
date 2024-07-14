import './App.css';
import { images } from './database/images';
import { Home ,Task} from './pages';
import { useBro } from './context/brocon';

import { useEffect } from 'react';
const index = Math.floor(Math.random() * images.length);
const bg = images[index].image;
function App() {
  
  const { name, Brodispatch } = useBro();

  useEffect(() => {
    const userName = localStorage.getItem("name");
    if (userName) {
      Brodispatch({
        type: "NAME",
        payload: userName,
      });
    }
  }, [Brodispatch]);

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      
      { name ? <Task /> : <Home />}
    </div>
  );
}

export default App;
