//import { v4 as uuidv4 } from 'uuid';
import { app } from '@azure/functions';
import { connect }  from '@planetscale/database';

app.http('planetscale', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const config = {
            host: process.env["HOST"],
            username: process.env["USERNAME"],
            password: process.env["PASSWORD"]
        }

        const conn = await connect(config);
        const products = await conn.execute('SELECT * FROM products')
      
    
        context.log(`product = ${JSON.stringify(products.rows[0])}`)
        
        const name = request.query.get('name') || products.rows[0] || 'world';

        return { 
            status: 200,
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products.rows)
        };
    }
});
 