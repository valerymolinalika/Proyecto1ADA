import React, { useState } from 'react';
import accionesV from './algoritmos/accionesV';
import accionesFB from './algoritmos/accionesFB';
import accionesPD1 from './algoritmos/accionesPD1';
import accionesPD2 from './algoritmos/accionesPD2';
import { FileInput } from 'daisyui';
import { saveAs } from 'file-saver'

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
	const [fileContent, setFileContent] = useState(null)
	console.log(algorithm)


	const [selectedOption2, setSelectedOption2] = useState('');
	const handleOptionChange2 = (event) => {
		setSelectedOption(event.target.value);
	};


	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
		setOfertas([]);

		const reader = new FileReader();
		reader.onload = (e) => {

			const content = e.target.result;
			setFileContent(content)
			const queries = []
			//console.log((content.split('\n').length) - 1);
			if (event.target.files[0].name[event.target.files[0].name.length - 4] + event.target.files[0].name[event.target.files[0].name.length - 3] +
				event.target.files[0].name[event.target.files[0].name.length - 2] + event.target.files[0].name[event.target.files[0].name.length - 1] == "psub") {
				console.log("Entre en paquetes")
				content.split('\n').map((line, index) => {
					const lineArr = line.split(",");
					//console.log(index)
					if (index == 0) {
						setAccionesTotales(Number(lineArr[0]));
					} else if (index == 1) {
						setPrecioMinimo(Number(lineArr[0]));
					} else if (index == 2) {
						setNumeroPersonas(Number(lineArr[0]));
					} else if (index === ((content.split('\n').length) - 1)) {
						setPaquetes(Number(lineArr[0]));
					} else {
						queries.push(lineArr.map(n => {
							return Number(n)
						}))
					}
				});
			} else {
				console.log("Entre en los demas")
				content.split('\n').map((line, index) => {
					const lineArr = line.split(",");
					if (index == 0) {
						setAccionesTotales(Number(lineArr[0]));
					} else if (index == 1) {
						setPrecioMinimo(Number(lineArr[0]));
					} else if (index == 2) {
						setNumeroPersonas(Number(content.split('\n')[2]));
					} else if (index === ((content.split('\n').length) - 1)) {

					} else {
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
		if (selectedOption == 'Fuerza Bruta') {
			const result = accionesFB(accionesTotales, precioMinimio, numeroPersonas, ofertas);
			setAlgorithm(result);
			createFile(result);
		} else if (selectedOption == 'Dinamica') {
			const result = (accionesPD1(accionesTotales, precioMinimio, numeroPersonas, ofertas))
			setAlgorithm(result);
			createFile(result);
		} else if (selectedOption == 'Dinamica Paquetes') {
			const result = (accionesPD2(accionesTotales, precioMinimio, numeroPersonas, ofertas, paquetes))
			setAlgorithm(result);
			createFile(result);
		} else if (selectedOption == 'Voraz') {
			const result = (accionesV(accionesTotales, precioMinimio, numeroPersonas, ofertas))
			setAlgorithm(result);
			createFile(result);
		}
	};


	const createFile = (response) => {
		console.log(response)
		const blob = new Blob([response], { type: 'text/plain;charset=utf-8' });
		saveAs(blob, 'resultado.txt')
	}

	const handleOptionChange = (value) => {
		setSelectedOption(selectedOption === value ? '' : value);
	};


	// async function handleClick() {
	// 	console.log("Handler 1 iniciado");
	// 	await handleSubmission();
	// 	console.log("Handler 1 terminado");

	// 	console.log("Handler 2 iniciado");
	// 	await createFile();
	// 	console.log("Handler 2 terminado");
	//   }

	return (
		<div class="grid grid-cols-2 gap-4 gap-x-20 mt-8" >
			<div class="mt-10">
				<div><input type="file" onChange={changeHandler} className="file-input file-input-bordered file-input-primary w-full max-w-xs my-8 " />
					{isFilePicked ? (
						<div className='mb-8' >
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

						<p className='mb-8'>Aqui apareceran los detalles del Archivo subido</p>
					)}


					<div class="space-y-4">
						<label class="flex items-center space-x-5">
							<input
								type="radio"
								name="radio-1"
								value="Fuerza Bruta"
								className="radio radio-primary"
								checked={selectedOption === 'Fuerza Bruta'}
								onChange={() => handleOptionChange('Fuerza Bruta')}
							/>
							<span>fuerzaBruta</span>
						</label>
						<label class="flex items-center space-x-5">
							<input
								type="radio"
								name="radio-1"
								value="Dinamica"
								className="radio radio-primary"
								checked={selectedOption === 'Dinamica'}
								onChange={() => handleOptionChange('Dinamica')}
							/>
							<span>Algoritmo Dinamico</span>


						</label>
						<label class="flex items-center space-x-5">
							<input
								type="radio"
								name="radio-1"
								value="Dinamica Paquetes"
								className="radio radio-primary"
								checked={selectedOption === 'Dinamica Paquetes'}
								onChange={() => handleOptionChange('Dinamica Paquetes')}
							/>
							<span>Dinamica por Paquetes</span>

						</label>
						<label class="flex items-center space-x-5">
							<input
								type="radio"
								name="radio-1"
								value="Voraz"
								className="radio radio-primary"
								checked={selectedOption === 'Voraz'}
								onChange={() => handleOptionChange('Voraz')}
							/>
							<span>Algoritmo Voraz</span>

						</label>

						<p>Opcion seleccionada: {selectedOption} </p>
					</div>
					<div >
						<button onClick={handleSubmission} className="btn bg-primary my-5" >Subastar</button>
					</div></div>
			</div>
			<div class='my-8  space-y-3'>
			    Datos de entrada:		
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					
					<textarea
						className="textarea textarea-primary center mb-7 mt-3"
						value={fileContent || ''}
						placeholder="Aquí apareceran las entradas de la subasta"
						disabled
						style={{ flex: 1, width: '200%', height: '200px' }}

					/>
				</div>

				Datos de salida:
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					
					<textarea
						className="textarea textarea-primary center mb-7"
						value={algorithm || ''}
						placeholder="Aquí aparecerá el resultado de la subasta"
						disabled
						style={{ flex: 1, width: '200%', height: '200px' }}

					/>
				</div>
			</div>

		</div>

	)
}


