import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [tarea, setTarea] = useState("")
	const [listaTareas, setListaTareas] = useState([])
	console.log(listaTareas)
	function updateList(event) {
		event.preventDefault();


		if (event.key === "Enter") {
			setListaTareas(listaTareas.concat(tarea));
		}
	}

	
	const arrayDetareas = listaTareas.map((item)=><li>{item}</li>)
	

	return (
		<div className="text-center">


			<h1 className="text-center mt-5 text-secondary">Todos</h1>
			

				<input type="text" className="form-control" value={tarea} onChange={(event) => setTarea(event.target.value)} onKeyDown={updateList} />
		
			<ul>
				{arrayDetareas}
			</ul>
		</div>
	);
};

export default Home;

