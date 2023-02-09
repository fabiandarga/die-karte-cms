export function getShops(req, res) {
    Shops.find({}, (err, shops) => {
      if (err) {
        res.status(401).send({ message: 'Shop not found' });
      } else {
        res.status(200).send(shops);
      }
    });
  }
  
  export default { getShops };
  