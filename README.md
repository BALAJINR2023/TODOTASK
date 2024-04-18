# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
  <br>DATA FETCH<br>
import React from 'react'
import PropTypes from "prop-types"

const Datafetch = ({id,title,description,status,deletecard,editcard}) => {
  return (
    <>  
<div className="card cardbody">
  <div className="card-body">
  <div>NAME:{title}</div>
   <div>DESCRIPTION:{description}</div>
   <div>STATUS:{status}</div>
   <div>
    <button className='ebtn'onClick={()=>editcard(id)}>EDIT</button>
    <button className='dbtn' onClick={()=>deletecard(id)}>DELETE</button>
   </div>
  </div>
</div>
    </>
  )
}

Datafetch.propTypes={
  id:PropTypes.string,
  title:PropTypes.string,
  description:PropTypes.string,
  Status:PropTypes.string,
  deletecard:PropTypes.func,
  editcard:PropTypes.func,
}
export default Datafetch

<br>APP.JSX<br>

import { useState } from 'react'
import './App.css'
import Datafetch from './Datafetch'

function App() {
  const [Content, setContent] = useState([]);
  const [Formstate, setFormstate]=useState({});
  const [filterStatus, setFilterStatus] = useState('All');
  const handlesubmit=(e)=>{
    e.preventDefault();
    console.log(Formstate);
    if(Formstate.id){
      Updatecard();
    }else{
      Creatcard();
    }
  };
  const Creatcard=()=>{
    const tempCard={...Formstate};
    tempCard.id=Date.now().toString();
    setContent([...Content,tempCard])
  };
  const handlechange=(e)=>{
    setFormstate({
      ...Formstate, 
      [e.target.name]:e.target.value})
  };
  const Deletecard=(cardid)=>{
setContent(Content.filter(({id})=>cardid !== id));
  };
  const Updatecard=()=>{
    const index = Content.findIndex(card => card.id===Formstate.id);
    const tempProds = [...Content];
    tempProds[index] = Formstate;
    setContent(tempProds);
  };
  const Editcard=(cardid)=>{
    const cdata=Content.find(card => card.id===cardid);
    setFormstate(cdata);
  };
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };
  return (
    <>
  <div className='Title'>MY TODO</div>
  <form onSubmit={handlesubmit}>
  <div className="row">
    <div className="col">
      <input type="text" name="title" className="form-control" placeholder="TODO NAME" onChange={handlechange} value={Formstate.title}/>
    </div>
    <div className="col">
      <input type="text" name="description" className="form-control" placeholder="TODO DESCRIPTION" onChange={handlechange} value={Formstate.description}/>
    </div>
    <div className="col">
    <select name="status" className="form-control" onChange={handlechange} value={Formstate.status}>
    <option>NOT COMPLETED</option>
    <option>COMPLETED</option>
    </select>
    </div>
    <div>
    <button type="submit" className="btn btn-primary">SUBMIT</button>
    </div>
  </div>
</form>
<div>
  <div className='Title'>MY TODOS</div>
<div className='Filtercnt'>
<div className='Filter'>STATUS FILTER :</div>
  <div className="col">
  <select className="form-control" value={filterStatus} onChange={handleFilterChange}>
  <option>ALL</option>
  <option>NOT COMPLETED</option>
  <option>COMPLETED</option>
  </select>
</div>
</div>
</div>
<div className='cardflex'>{Content.filter(data => {
    if (filterStatus === 'ALL') {
      return true; // Show all todos
    } else if (filterStatus === 'COMPLETED') {
      return data.status === 'COMPLETED'; // Show completed todos
    } else {
      return data.status === 'NOT COMPLETED'; // Show not completed todos
    }
  }).map(data => (
    <Datafetch {...data} key={data.id} deletecard={Deletecard} editcard={Editcard} />
  ))}</div>
  </>
  )
}

export default App
