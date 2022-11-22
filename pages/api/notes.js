
import { sql_query } from "../../lib/db";
import NextCors from 'nextjs-cors';

const handler = async (req, res) => {

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });



    if (req.method === "POST") {
        try {
            const results = await sql_query(`
                INSERT INTO notes (title, content) VALUES ("${req.body.title}", "${req.body.content}");
          `);
            return res.status(200).json({message: "Nota incluida com sucesso!"});
          } catch (e) {
            res.status(500).json({ message: e.message });
          }
    }else if (req.method === "GET") {
        
        try {
            const results = await sql_query(`
                SELECT * FROM notes
        
            `);
            return res.status(200).json(results);
            } catch (e) {
            res.status(500).json({ message: e.message });
            }
        }
    else if (req.method === "DELETE") {

        try {
            const results = await sql_query(`
                DELETE FROM notes WHERE id = ${req.body.id}
            `);
            return res.status(200).json({results,message: "Excluido com sucesso"});
            } catch (e) {
            res.status(500).json({ message: e.message });
            }
        }
        else if (req.method === "PUT") {

            try {
                const results = await sql_query(`
                UPDATE notes SET title = "${req.query.title}", content = '${req.query.content}' WHERE (id = '${req.query.id}');
      
                `);
                return res.status(200).json({results,message: "Excluido com sucesso"});
                } catch (e) {
                res.status(500).json({ message: e.message });
                }
            }
    else{
        res.status(404).json({ message: "Sao apenas aceitos metodos POST, GET, DELETE" });

    }
};

export default handler;