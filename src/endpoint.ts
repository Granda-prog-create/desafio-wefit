import { Router, Request, Response } from 'express';
import mysql from 'mysql2/promise';

const router = Router();

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
};

router.post('/my-endpoint', async (req: Request, res: Response) => {
  const { campo1, campo2 } = req.body;

  if (!campo1 || !campo2) {
    return res.status(400).send({ message: 'Os campos são obrigatórios.' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'INSERT INTO tabela (campo1, campo2) VALUES (?, ?)', 
      [campo1, campo2]
    );

    const insertId = (result as mysql.ResultSetHeader).insertId;

    await connection.end();
    return res.status(201).send({ message: 'Dados salvos com sucesso!', id: insertId });
  } catch (error) {
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

export default router;
