const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]');
    }
  }

  readProductsFromFile() {
    const data = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(data);
  }

  writeProductsToFile(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
  }

  addProduct(product) {
    const products = this.readProductsFromFile();
    const newProduct = {
      id: products.length + 1,
      ...product,
    };
    products.push(newProduct);
    this.writeProductsToFile(products);
  }

  getProducts() {
    return this.readProductsFromFile();
  }

  getProductById(id) {
    const products = this.readProductsFromFile();
    const product = products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Not found');
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const products = this.readProductsFromFile();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Not found');
    }

    products[index] = { ...products[index], ...updatedFields, id };
    this.writeProductsToFile(products);
  }

  deleteProduct(id) {
    const products = this.readProductsFromFile();
    const updatedProducts = products.filter((p) => p.id !== id);
    if (products.length === updatedProducts.length) {
      throw new Error('Product not found');
    }
    this.writeProductsToFile(updatedProducts);
  }
}


const productManager = new ProductManager('productos.json');

console.log(productManager.getProducts());

productManager.addProduct({
    title: "Pizza Muzzarella",
    description: "Muzarella salsa y oregano",
    price: 6000,
    thumbnail: "image",
    code: "P1",
    stock: 250,
});
productManager.addProduct({
    title: "Pizza Cuatroquesos",
    description: "Cubierta con 4 deliciosos quesos",
    price: 7000,
    thumbnail: "image",
    code: "P2",
    stock: 130,
});
productManager.addProduct({
    title: "Pizza Fugazzeta",
    description: "Con oregano y cebolla",
    price: 6500,
    thumbnail: "image",
    code: "P3",
    stock: 150,
});
productManager.addProduct({
    title: "Pizza Fugazzeta rellena",
    description: "Rellena de jamon y queso",
    price: 8000,
    thumbnail: "image",
    code: "P4",
    stock: 100,
});


console.log(productManager.getProducts()); 

console.log(productManager.getProductById(1));

productManager.updateProduct(1, { price: 2.55 });

console.log(productManager.getProductById(1)); 

productManager.deleteProduct(4);

try {
  console.log(productManager.getProductById(1));
} catch (error) {
  console.error(error.message);
}