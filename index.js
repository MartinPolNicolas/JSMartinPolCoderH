const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items');

let allProducts = [];
let total = 0;
let totalOfProducts = 0;

const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

// Cargar los productos del carrito desde el Local Storage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
	loadCartProducts();
	showHTML();
});

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;
		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};
		addToCart(infoProduct);
		saveCartProducts();
		showHTML();

		// Muestra SweetAlert para confirmar el agregado al carrito con el nombre del producto
		Swal.fire({
			title: 'Producto agregado al carrito',
			text: `Has agregado 1 ${infoProduct.title} al carrito de compras.`,
			icon: 'success',
			confirmButtonText: 'Aceptar',
		});
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;
		removeFromCart(title);
		saveCartProducts();
		showHTML();
	}
});

// Agregar un producto al carrito
const addToCart = product => {
	const exists = allProducts.some(prod => prod.title === product.title);
	if (exists) {
		allProducts = allProducts.map(prod => {
			if (prod.title === product.title) {
				prod.quantity++;
				return prod;
			} else {
				return prod;
			}
		});
	} else {
		allProducts = [...allProducts, product];
	}
};

// Remover un producto del carrito
const removeFromCart = title => {
	allProducts = allProducts.filter(prod => prod.title !== title);
};

// Función para guardar los productos del carrito en el Local Storage
const saveCartProducts = () => {
	localStorage.setItem('cartProducts', JSON.stringify(allProducts));
};

// Función para cargar los productos del carrito desde el Local Storage
const loadCartProducts = () => {
	const savedCartProducts = localStorage.getItem('cartProducts');
	if (savedCartProducts) {
		allProducts = JSON.parse(savedCartProducts);
	}
};

// Función para mostrar el HTML del carrito
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

	rowProduct.innerHTML = '';

	total = 0;
	totalOfProducts = 0;

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

		total = total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};

// Consumir una API o JSON (En mi caso JSON)
fetch('productos.json')
	.then(response => response.json())
	.then(data => {
		// Aquí puedes procesar los datos de la API o JSON
	})
	.catch(error => console.error('Error fetching data:', error));
