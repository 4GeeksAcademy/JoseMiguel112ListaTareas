import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	function getTodos() {
		fetch('https://playground.4geeks.com/todo/users/jmb', { method: "GET" })// buscar informacion en la url
			.then((response) => {
				return response.json()
			}) // si llega una respuesta prometo que la convierto en un formato utilizable JSON
			.then((data) => setListaTareas(data.todos))
			//.then((data)=>setCharacters(data.results)) // Prometo que si el formato a json sale bien lo guardo en un espacio
			.catch((error) => console.log(error)) // si algo sale, lo aviso
	}

	

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

		setListaTareas(listaTareas.filter((_, index) => index !== id))
	}

	useEffect(() => {
		//codigo que queremos que se ejecute cuando se cargue el componente
		getTodos()
	}, [])

	const arrayDetareas = listaTareas.map((item, index, _) => <li className="m-2 d-flex justify-content-between">{item.label} <span className="text-danger " onClick={() => deleteTask(index)}>X</span></li>)
	console.log(arrayDetareas)

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

