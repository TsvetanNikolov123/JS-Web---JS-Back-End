let products = [];
let count = 1;

module.exports.products = {};

module.exports.products.getAll = () => {
    return products;
};

module.exports.products.add = (product) => {
    product.id = count++;
    product.push(product);
};

module.exports.products.findByName = () => {
    let product = null;
    for (let p of product) {
        if (p.name === name) {
            return p;
        }
    }

    return product;
};