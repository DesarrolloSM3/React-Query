import './App.css'
import {useEffect,useState,useReducer} from 'react'

const getRandomNumberFromAPi = async():Promise<number> => {
  const rest = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
  const numberString = await rest.text()
  //throw new Error('AUXILIO');
  return +numberString;
}

export const App =() => {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(); //numero que cambie cada vez que doy clic
  
  const [key, forceRefetch] = useReducer((x)=> x + 1,0)

  useEffect(() => {
    setIsLoading(true)
    getRandomNumberFromAPi()
    .then(num => setNumber(num))
    .catch(error => setError(error.message));
  }, [key])
  
  useEffect(() => {
    if(number) setIsLoading(false); 
  }, [number])

  useEffect(() => {
    if(error) setIsLoading(false)
  }, [error])
  
  
  return (
    <div className='App App-header'>
      {isLoading ? ( <h2>Cargando...</h2>) : !error &&(<h2>Numero aletorio: {number}</h2>)}
      {!isLoading && error && (<h3>{error}</h3>)}
    <button onClick={forceRefetch} disabled={isLoading}>
      {isLoading ? '...' : 'Nuevo número'}
      
    </button>

    </div>

  );
}

export default App
