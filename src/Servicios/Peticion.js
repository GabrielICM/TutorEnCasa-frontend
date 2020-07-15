
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
			body: datos,
			headers
		};
	}
	else {
		options = {
			method: metodo,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				...headers
			}
		};
		const parametros = Object.keys(datos).map((nombre) => {
			return `${nombre}=${datos[nombre]}`;
		});
		if(metodo == 'GET'){
			path += '?' + parametros.join('&');
		}
		else {
			options.body = parametros.join('&');
		}
	}

	return fetch(`https://tutorencasa.tk/api${path}`, options)
		.then((res) => {
			const contentType = res.headers.get("content-type");
			if(contentType && contentType.indexOf("application/json") !== -1) {
				return res.json();
			}
			else {
				return res;
			}
		});
}

export default api;