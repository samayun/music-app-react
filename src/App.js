
import './styles/card.css';
import React,{useState,useEffect} from 'react'


const styleHeader = {
  backgroundColor: '#282c34',
  minHeight: "10vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "calc(10px + 2vmin)",
  color: "white"
}
const container = { width: "90%", margin: "auto" }
const card = {
  listStyle: "none",
  padding: "10px 15px",
  background: "#f0f0f0",
  margin: "1px",
  columnCount: "2"
}


function App() {
  const [appName,setAppName] = useState("My React Application");
  const [students,setStudents] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(res => res.json())
    .then(students => {
      setIsLoading(false);
      setStudents(students);
    })
    .catch(err => {
      setIsLoading(false);
      setAppName(err.message);
    })
  }, [])
  
  return (
   <React.Fragment>
     { isLoading ? <Loading />  : <div >
      <header style={styleHeader}>
        {appName} 
        <span> <button className="btn btn-success" onClick={ () => setAppName("React Application") }> Change Name </button> </span>
      </header>
     { students.length &&  <section style={{display:'grid',...container}}  >
        {students.map(st => <Student student={st} key={st.id} />)}
      </section> }
    </div>}
   </React.Fragment>
  );
}

function Student(props) {
  let {name,phone,age,username,email,website} = props.student;
  return <div className="card" style={card}>
            <div className="left">
                <h2>{name} <sup style={{color:'#000',fontSize:'0.8rem'}}> [{username}] </sup></h2>
                {email && <h4> Email :  {email} </h4>}
            </div>
            <div className="right">
              { phone && <p>Phone : {phone}</p>}
              { website && <p>website : <a target="_blank" rel="noreferrer"  href={`http://${website}`}>{website}</a> </p>}
              { age && <p>Age : {age}</p>}
            </div>
        </div>
      }

function Loading(){
  return <div className="loading" style={container}> <h2>Loading.......</h2></div>
}

export default App;

