import React, {useState} from 'react';
import Voraz from './algoritmos/voraz';
import fuerzaBruta from './algoritmos/FuerzaBruta';
import Dinamica from './algoritmos/dinamica';
import DinamicaPaquetes from './algoritmos/DinamicaPorPaquetes';

export default function App() {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');
	const [algorithm, setAlgorithm] = useState(null);
	const [accionesTotales, setAccionesTotales] = useState(null)
	const [precioMinimio, setPrecioMinimo] = useState(null)
	const [numeroPersonas, setNumeroPersonas] = useState(null)
	const [ofertas, setOfertas] = useState(null)
	const [paquetes, setPaquetes] = useState(null)
	

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const changeHandler = (event) => { 
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
		setOfertas([]);
	  
		const reader = new FileReader();
		reader.onload = (e) => {
		
		  const content = e.target.result;
		  const queries = []
		  console.log((content.split('\n').length) - 1);
		  if(event.target.files[0].name[event.target.files[0].name.length - 4 ] + event.target.files[0].name[event.target.files[0].name.length - 3] +
			event.target.files[0].name[event.target.files[0].name.length - 2] + event.target.files[0].name[event.target.files[0].name.length - 1] == "psub"){
			console.log("Entre en paquetes")
			content.split('\n').map((line,index) =>{
				const lineArr = line.split(",");
				//console.log(index)
				if (index == 0) {
					setAccionesTotales(Number(lineArr[0]));  
				}else if (index == 1) {
					setPrecioMinimo(Number(lineArr[0]));
				}else if (index == 2) {
					setNumeroPersonas(Number(lineArr[0]));
				}else if (index === ((content.split('\n').length) - 1)){
					setPaquetes(Number(lineArr[0]));
				}else{
					queries.push(lineArr.map(n => {
						return Number(n)
						}))
				}
				});
		  }else{
			console.log("Entre en los demas")
			content.split('\n').map((line,index) =>{
				const lineArr = line.split(",");
				if (index == 0) {
					setAccionesTotales(Number(lineArr[0]));  
				}else if (index == 1) {
					setPrecioMinimo(Number(lineArr[0]));
				}else if (index == 2) {
					setNumeroPersonas(Number(content.split('\n')[2]));
				}else if (index === ((content.split('\n').length) - 1)){

				}else{
					queries.push(lineArr.map(n => {
						return Number(n)
						}))
				}
				});
			}
				setOfertas(queries)
		};
		reader.readAsText(event.target.files[0]);
	  };
	

	const handleSubmission = () => {
		if(selectedOption == 'Fuerza Bruta'){
			setAlgorithm(fuerzaBruta(accionesTotales,precioMinimio,numeroPersonas,ofertas))
		}else if(selectedOption == 'Dinamica'){
			setAlgorithm(Dinamica(accionesTotales,precioMinimio,numeroPersonas,ofertas))
		}else if(selectedOption == 'Dinamica Paquetes'){
			setAlgorithm(DinamicaPaquetes(accionesTotales,precioMinimio,numeroPersonas,ofertas,paquetes))
		}else if(selectedOption == 'Voraz'){
			setAlgorithm(Voraz(accionesTotales,precioMinimio,numeroPersonas,ofertas))
		}
	};
	

	return(
   <div>
			
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Nombre del Archivo: {selectedFile.name}</p>
					<p>Tipo de Archivo: {selectedFile.type}</p>
					<p>Tamaño en bytes: {selectedFile.size}</p>
					<p>
						Ultima Modificacion:{' '}
						{/* {console.log(fuerzaBruta(accionesTotales,precioMinimio,numeroPersonas,ofertas))} */}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Aqui apareceran los detallos del Archivo subido</p>
			)}
			
			
			<div>
				<label>
					<input
					  type="radio"
					  name="option"
					  value="Fuerza Bruta"
					  checked={selectedOption === 'Fuerza Bruta'}
					  onChange={handleOptionChange} 
					/>
					Fuerza Bruta
				</label>
				<label>
					<input
					  type="radio"
					  name="option"
					  value="Dinamica"
					  checked={selectedOption === 'Dinamica'}
					  onChange={handleOptionChange} 
					/>
					Algoritmo Dinamico
				</label>
				<label>
					<input
					  type="radio"
					  name="option"
					  value="Dinamica Paquetes"
					  checked={selectedOption === 'Dinamica Paquetes'}
					  onChange={handleOptionChange} 
					/>
					Dinamica por Paquetes
				</label>
				<label>
					<input
					  type="radio"
					  name="option"
					  value="Voraz"
					  checked={selectedOption === 'Voraz'}
					  onChange={handleOptionChange} 
					/>
					Algoritmo Voraz
				</label>
				<p>Opcion seleccionada: {selectedOption} </p>
			</div>
			<div>
				<button onClick={handleSubmission}>Subastar</button>
			</div>
			<div>
				<p>{algorithm}</p>
			</div>
		</div>
	)
 }


