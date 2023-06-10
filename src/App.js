import {useState, useEffect} from 'react'
import {randomWords} from './RandomWordGenerator'
import { typeImplementation } from '@testing-library/user-event/dist/type/typeImplementation'
import './jaya.css'
const NUMB_OF_WORDS = 10
const SECONDS = 10






function App() {
  const [words, setWords] = useState("")
  const [currentWord,setCurrentWord]=useState("");
  const [timmer,setTimmer]=useState(0);
  const [startTimer,setStartTimmer]=useState(false)
  const [ind,setInd]=useState(0);
  const [wordsCount,setWordCount]=useState(0)
  const [accuracy,setAccuracy]=useState(0)

  useEffect(() => {
    setWords(generateWords())
  },[])

  function generateWords(){
    let str="";
    for(let i=0;i<1;i++){
      str+=randomWords();
    }
    return str
  }


  useEffect(()=>{
    let c;
    setTimmer(60*5);
    c=setInterval(()=>{
      setTimmer(prev=>{
        if(prev-1==0){
          clearInterval(c);
          return 0;
        }
        else{
          return prev-1;
        }
      })
    },1000)

    return ()=>{
      clearInterval(c);
    } 

  },[startTimer])
  
 

  useEffect(()=>{

    console.log(randomWords())


  },[])


  //Ye wala match hogya toh chalega
  useEffect(()=>{

    console.log(300-timmer,wordsCount)
    let temp=(wordsCount/300-timmer)*100;
    setAccuracy(temp)
    
    if(currentWord==words && currentWord!=''){
      alert('Your Value Matched')
      setWords(generateWords())
    setCurrentWord("")
    setTimmer(60*5)
    setInd(0)
    setTimeout(()=>{
      setWordCount(0)
    },1000)
    }

    


  },[ind])


  const handleChange=(event)=>{
    console.log(event.key)
    if(event.key=='Backspace'){
      if(ind==0) return;
      setInd(prev=>prev-1);
      setCurrentWord(currentWord.substr(0,currentWord.length-1))
      return;
    }
    if(event.key==' ') setWordCount(prev=>prev+1);
    setInd(prev=>prev+1);
    setCurrentWord(currentWord+event.key);
    let temp=words.slice(0,ind);

  }


  return (
    <div className="App">
      <div className="section">
        <div className="is-size-1 has-text-centered has-text-primary">
          <h2>{timmer}</h2>
          <h4> Word Accuracy: {wordsCount}</h4>
          </div>
          </div>
      <div className="control is-expanded section">
        <input type="text"  onKeyDown={handleChange} value={currentWord} className='input'/>
      </div>
      <div className="section">
        <button className="button is-info is-fullwidth">Start</button>
        <div className="card">
          <div className="card-content">
          <div className="content">
            {words}
          </div>
          </div>
        </div>
        </div>
    </div>
  );
}



export default App;

