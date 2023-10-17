import { useQuery } from "@tanstack/react-query";

export const useRandom = () => {
    
    const getRandomNumberFromAPi = async():Promise<number> => {
        const rest = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
        const numberString = await rest.text()
        //throw new Error('AUXILIO');
        return +numberString;
      }

    const query = useQuery(
        ['randomNumber'],
        getRandomNumberFromAPi,
       
      );

  return query;
}
