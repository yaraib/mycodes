import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const initial_data = [
    {
      id: 1,
      fname: "john",
      gender: "m",
      age:112
    },
    {
      id: 2,
      fname: "mary",
      gender: "f",
    },
  ];

  const [news, setNews] = useState([]);
  const [steps, setSteps] = useState({});
  const[loading,setloading]=useState(false);
  const[news2,setNews2]=useState(0);


  const [a, b] = useState(0);
  const [oid, nid] = useState(0);
  const [oname, nname] = useState(0);
  const [oiage, uiage] = useState(0);
  const [oiname, uiname] = useState(0);

  var insrt=0,upd=0;

  function insertion()
  {
    insrt=1;
    upd=0;
  }

  // test
  useEffect(() => {
    fetchData();
  }, []);

  var usn=0;
  var idc=0,idc2=0,flg=0, age2=0, del=0;
  function myfunc(i,id,age)
  {
    
    usn=i;
    idc=id;
    age2=age;
    fetchData();
    
  }

  function mydel(id)
  {
    
    
    idc=id;
    del=1;
    fetchData();
    
  }
  
  const fetchData = () => {
    axios
      .get(
        `http://localhost:2001/data/${idc}/${usn}/${age2}/${del}/${insrt}/${oiname}/${oiage}`
        // /${oiage}/${oiname}/${bcv}/${oid}/${oname}/${a}/${insrt}/${upd}/${srch}
      )
      .then((res) => {
        setNews(res.data.userData);

        console.log(news);
      });
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  return (
    
    <div>
      <input
        placeholder="Enter Age"
        type="text"
        name="uiage"
        id="uiage"
        onChange={(e) => {
          uiage(e.target.value);
        }}
      />
      <input
        placeholder="Enter Name"
        type="text"
        name="uiname"
        id="uiname"
        onChange={(e) => {
          uiname(e.target.value);
        }}
      />

      <button onClick={() => {
                  insertion();
                  fetchData();
                }}>Insert</button>

  
      {news.map((data,index) => (
        <li key={index}>
          <input
            
            type="text"
            value={data.id}
            onChange={(e) => {
              data.id = e.target.value;
              setNews([...news]);
            }
             
            }
          />
          <input
            type="text"
            value={data.fname}
            onChange={(e) => {
              data.fname = e.target.value;
              setNews([...news]);
            }
             
            }
          />
          <input
            type="text"
            value={data.age}
            onChange={(e) => {
              data.age = e.target.value;
              setNews([...news]);
            }
             
            }
          />
          <button onClick={()=>{
            myfunc(data.fname,data.id,data.age);
            
          }}>Edit</button>
          <button onClick={()=>{
            mydel(data.id);
            
          }}>Delete</button>
          
          
        </li>
      ))}
{/* <button onClick={()=>{
            myfunc();
            fetchData();
          }}>CLick me 2</button>
           */}
         </div>
  );
}
