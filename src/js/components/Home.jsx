import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	function createUser(){
		fetch('https://playground.4geeks.com/todo/users/jmb', { method: "POST" })// buscar informacion en la url
			.then((response) => {
				if(response.status===201){
					getTodos();
				}
				return response.json()
			}) // si llega una respuesta prometo que la convierto en un formato utilizable JSON
			.then((data) => (data.todos))
			//.then((data)=>setCharacters(data.results)) // Prometo que si el formato a json sale bien lo guardo en un espacio
			.catch((error) => console.log(error)) // si algo sale, lo aviso
	}

	function getTodos() {
		fetch('https://playground.4geeks.com/todo/users/jmb', { method: "GET" })// buscar informacion en la url
			.then((response) => {
				if(response.status === 404){
					createUser();
				}
				else return response.json()
			}) // si llega una respuesta prometo que la convierto en un formato utilizable JSON
			.then((data) => setListaTareas(data.todos))
			//.then((data)=>setCharacters(data.results)) // Prometo que si el formato a json sale bien lo guardo en un espacio
			.catch((error) => console.log(error)) // si algo sale, lo aviso
	}

	function createTask(event) {
		

			if (event.key === "Enter") {
			
				fetch('https://playground.4geeks.com/todo/todos/jmb',{
					method: "POST",
					body: JSON.stringify({
						"label": tarea,
						"is_done": false
					}),
					headers:{
						"Content-Type": "application/json"
					}
				})
				.then((response)=>{
					console.log(response);
					if (response.status === 201) {
						getTodos();
					}
					
					return response.json()})
				.then((data)=>console.log(data))
				.catch((error)=>console.log(error))

				setTarea("")
		}

	}


	const [tarea, setTarea] = useState("")
	const [listaTareas, setListaTareas] = useState([])
	


	function updateList(event) {



		if (event.key === "Enter") {
			setListaTareas(listaTareas.concat(tarea));
			setTarea("")
		}
	}

	function deleteTask(id) {
		console.log(id)

				fetch('https://playground.4geeks.com/todo/todos/'+id,{
			method: "DELETE",
			
		})
		.then((response)=>{
			console.log(response);
			if (response.status === 204) {
				getTodos()
			}
			
			return response.json()})
		.then((data)=>console.log(data))
		.catch((error)=>console.log(error))
	}


	const arrayDetareas = listaTareas.map((item, index, _) => <li className="m-2 d-flex justify-content-between">{item.label} <span className="text-danger " onClick={() => deleteTask(item.id)}>X</span></li>)
	
	useEffect(() => {
		//codigo que queremos que se ejecute cuando se cargue el componente
		getTodos()
		
	}, [])


	return (
		<div className="text-center">


			<h1 className="text-center mt-5 text-secondary">Todos</h1>

			<div className="d-flex justify-content-center">

				<input type="text" className="form-control w-25" value={tarea} onChange={(event) => setTarea(event.target.value)} onKeyDown={createTask} />

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

