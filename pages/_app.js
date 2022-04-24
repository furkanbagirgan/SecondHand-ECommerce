import React from 'react';

import { ProductsProvider } from '../contexts/products';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
	return (
		<ProductsProvider>
			<Component {...pageProps} />
		</ProductsProvider>
	);
}

export default MyApp;