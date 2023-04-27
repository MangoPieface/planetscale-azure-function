async function main(context, req) {
  context.log(`Http function processed request for url "${req.url}"`);

  const { default: fetch } = await import('node-fetch');
  const config = {
    fetch,
    host: process.env["PLANETSCALEHOST"],
    username: process.env["PLANETSCALEUSERNAME"],
    password: process.env["PLANETSCALEPASSWORD"],
  };

  console.log(***before connect***)

  const { connect } = await import('@planetscale/database');
  const conn = await connect(config);
  const products = await conn.execute('SELECT * FROM products');

  context.log(`product = ${JSON.stringify(products.rows[0])}`);

  context.res = {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(products.rows),
  };
}

module.exports = main;
