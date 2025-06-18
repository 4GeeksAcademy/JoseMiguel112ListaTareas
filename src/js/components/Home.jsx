import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [tarea, setTarea] = useState("")
	const [listaTareas, setListaTareas] = useState([])
	console.log(listaTareas)


	function updateList(event) {



		if (event.key === "Enter") {
			setListaTareas(listaTareas.concat(tarea));
			setTarea("")
		}
	}

	function deleteTask(id) {

		setListaTareas(listaTareas.filter((_, index) => index !==id))
	}

	const arrayDetareas = listaTareas.map((item, index, _) => <li className="m-2 d-flex justify-content-between">{item} <span className="text-danger " onClick={() => deleteTask(index)}>X</span></li>)


	return (
		<div className="text-center">


			<h1 className="text-center mt-5 text-secondary">Todos</h1>

			<div className="d-flex justify-content-center">

				<input type="text" className="form-control w-25" value={tarea} onChange={(event) => setTarea(event.target.value)} onKeyDown={updateList} />

			</div>
			<div className="d-flex justify-content-center text-start mt-3">

				<ul className="w-25">
					{arrayDetareas}
				</ul>

				
			</div>
			<p>
					{listaTareas.length} tasks to do

				</p>
		</div>
	);
};

export default Home;

