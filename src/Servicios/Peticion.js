
/**
 * Permite enviar una peticion al servidor API
 * @param string metodo 
 * @param string path 
 * @param any datos 
 */
function api(metodo, path, datos, headers = {}) {
	let options = {};
	if(datos instanceof FormData) {
		options = {
			method: metodo,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				...headers
			},
			body: datos
		};
	}
	else {
		const parametros = Object.keys(datos).map((nombre) => {
			return `${nombre}=${datos[nombre]}`;
		});
		options = {
			method: metodo,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				...headers
			},
			body: parametros.join('&')
		};
	}

	return fetch(`https://tutorencasa.tk/api${path}`, options).then((res) => res.json());
}

export default api;