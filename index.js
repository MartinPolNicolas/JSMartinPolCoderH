const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});


/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}
		
		showHTML();
		productsList.addEventListener('click', e => {
			if (e.target.classList.contains('btn-add-cart')) {
				const product = e.target.parentElement;
		
				const infoProduct = {
					quantity: 2,
					title: product.querySelector('h2').textContent,
					price: product.querySelector('p').textContent,
				};
		
				const exits = allProducts.some(
					product => product.title === infoProduct.title
				);
		
				if (exits) {
					const products = allProducts.map(product => {
						if (product.title === infoProduct.title) {
							product.quantity;
							return product;
						} else {
							return product;
						}
					});
					allProducts = [...products];
				} else {
					allProducts = [...allProducts, infoProduct];
				}
				
		
				// Muestra SweetAlert para confirmar el agregado al carrito con el nombre del producto
				Swal.fire({
					title: 'Producto agregado al carrito',
					text: `Has agregado 1 ${infoProduct.title} al carrito de compras.`,
					icon: 'success',
					confirmButtonText: 'Aceptar',
				});
				
		
				showHTML();
				const showHTML = () => {
									  
					if (!allProducts.length) {
					  cartEmpty.classList.remove('hidden');
					  rowProduct.classList.add('hidden');
					  cartTotal.classList.add('hidden');
					} else {
					  cartEmpty.classList.add('hidden');
					  rowProduct.classList.remove('hidden');
					  cartTotal.classList.remove('hidden');
					  
					  

					  // Mostrar mensaje Toastify
					  Toastify({
						text: 'Has agregado un producto al carrito de compras.',
						duration: 5000,
						newWindow: true,
						close: true,
						gravity: 'right', // Puedes cambiar la posición del mensaje (top, bottom, left, right)
						position: 'center', // Puedes cambiar la posición del mensaje (top, bottom, center, left, right)
						backgroundColor: 'blue', // Cambiar el color de fondo a azul
						className: 'toastify-text-white', // Agregar una clase para que el texto sea blanco
					  }).showToast();
					  
					  
					}
				  };
				  
			}
		});
		
	}
});

// Evento que se ejecuta al cargar la página para cargar los productos del carrito desde el Web Storage (si existen)
document.addEventListener('DOMContentLoaded', () => {
	loadCartProducts();
	showHTML(); // Llamamos a showHTML() también aquí para que se actualice el número al cargar la página
  
});
  
  productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
	  // ... (Código para agregar un producto al carrito)
	  // showHTML(); // Eliminamos esta llamada a showHTML() de aquí
	}
  });
  
// Función para guardar los productos del carrito en el Web Storage
const saveCartProducts = () => {
	localStorage.setItem('cartProducts', JSON.stringify(allProducts));
};

// Función para cargar los productos del carrito desde el Web Storage
const loadCartProducts = () => {
	const savedCartProducts = localStorage.getItem('cartProducts');
	if (savedCartProducts) {
		allProducts = JSON.parse(savedCartProducts);
		showHTML();
	}
};

// Evento que se ejecuta al cargar la página para cargar los productos del carrito desde el Web Storage (si existen)
document.addEventListener('DOMContentLoaded', () => {
	loadCartProducts();
});


rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

// Funcion para mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};
