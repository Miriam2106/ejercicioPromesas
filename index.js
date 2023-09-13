//Ejercicio 1: Promesas Encadenadas

const random = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * (100 - 1 + 1)));
    }, 2000);
  });
};

const cuadrado = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 3000);
  });
};

const raizCuadrada = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.sqrt(num));
    }, 1000);
  });
};

random()
  .then((result) => {
    console.log("Número: ", result);
    return cuadrado(result);
  })
  .then((result) => {
    console.log("Cuadrado del número: ", result);
    return raizCuadrada(result);
  })
  .then((result) => {
    console.log("Raíz del número: ", result);
    return raizCuadrada(result);
  })
  .catch((error) => {
    console.log(error);
  });

//Ejercicio 2: Promesa de Múltiples Solicitudes

const urls = [
  "https://reqres.in/api/users?page=1",
  "https://reqres.in/api/users?page=2",
];

const getData = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        resolve(response.json());
      })
      .catch((error) => {
        reject(error);
      });
  });
};

Promise.all(
  urls.map((url) => {
    return getData(url);
  })
)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

//Ejercicio 3: Promesas Paralelas

Promise.all([random(), cuadrado(9), raizCuadrada(36)])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

//Ejercicio 4: Promesas en Cadena con Retraso

//quiero una funcion que ejecute una promesa en n segundos

const promesaConRetraso = (n) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(n);
      resolve(n);
    }, n * 1000);
  });
};

const cadenaConRetraso = (n) => {
  const promesas = [];

  for (let i = 1; i <= n; i++) {
    const promesa = promesaConRetraso(i);
    promesas.push(promesa);
  }

  return Promise.all(promesas).then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Todas las promesas se resolvieron");
        resolve("Todas las promesas se resolvieron");
      }, 1000);
    });
  });
};

cadenaConRetraso(5)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

//Ejercicio 5: Promesa con Cancelación

const promesa = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Promesa resuelta");
    }, 5000);
  });
};

const cancelarPromesa = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Promesa cancelada");
    }, 3000);
  });
};

cancelarPromesa();

promesa()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
