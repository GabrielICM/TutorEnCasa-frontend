/**
 * Permite enviar una peticion al servidor API
 * @param string metodo 
 * @param string path 
 * @param any datos 
 */
function api(metodo, path, datos) {
    const parametros = Object.keys(datos).map((nombre) => {
        return `${nombre}=${datos[nombre]}`;
    });
    const opciones = {
        method: metodo,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: parametros.join('&')
    };

    return fetch(`https://tutorencasa.tk/api${path}`, opciones).then((res) => res.json());
}

export default api;

/*const data = {
  email: 'email@email.com',
  password: 'kiakanaqk',
}

peticion('POST', '/api/login', data)
  .then((respuesta) => {
    console.log(respuesta);
  })
  .catch((e) => {
    console.log(e);
  });*/