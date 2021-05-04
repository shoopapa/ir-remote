import { app } from './server/app'
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;

// start the express server
app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
