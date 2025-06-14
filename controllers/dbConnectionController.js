const { Client } = require('pg');
const { encrypt, decrypt } = require('../utils/encryption');
const { DbConnection } = require('../models'); 

const testPostgresConnection = async (uri) => {
  const useSSL = process.env.POSTGRES_SSL === 'true';
  const client = new Client({
    connectionString: uri,
    ssl: useSSL ? { rejectUnauthorized: false } : false
  });

  try {
    await client.connect();
    await client.end();
    return { success: true, message: "Postgres connection successful" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const getPostgresStructure = async (uri) => {
  const useSSL = process.env.POSTGRES_SSL === 'true';
  const client = new Client({
    connectionString: uri,
    ssl: useSSL ? { rejectUnauthorized: false } : false
  });

  try {
    await client.connect();

    const tablesResult = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public';
    `);

    const tables = tablesResult.rows.map(row => row.table_name);
    const structure = {};

    for (const table of tables) {
      const columnsResult = await client.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = $1;
      `, [table]);
      structure[table] = columnsResult.rows;
    }

    await client.end();
    return structure;

  } catch (error) {
    return {};
  }
};

const getPostgresStructureWithData = async (uri) => {
  const useSSL = process.env.POSTGRES_SSL === 'true';
  const client = new Client({
    connectionString: uri,
    ssl: useSSL ? { rejectUnauthorized: false } : false
  });

  try {
    await client.connect();

    const tablesResult = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN ('Customers', 'Workspaces');
    `);

    const tables = tablesResult.rows.map(row => row.table_name);
    const structure = {};

    for (const table of tables) {
      const columnsResult = await client.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = $1;
      `, [table]);

      const dataResult = await client.query(`SELECT * FROM "${table}" LIMIT 10;`);

      structure[table] = {
        columns: columnsResult.rows,
        data: dataResult.rows 
      };
    }

    await client.end();
    return structure;

  } catch (error) {
    console.log("error====", error)
    return {};
  }
};

exports.createDB = async (req, res) => {
  const { userId, connectionURI } = req.body;

  if (!userId || !connectionURI) {
    return res.status(400).json({ success: false, message: 'Missing required fields: userId or connectionURI' });
  }

  const result = await testPostgresConnection(connectionURI);

  if (!result.success) {
    return res.status(400).json({ success: false, message: `Connection failed: ${result.error}` });
  }

  const encryptedURI = encrypt(connectionURI);

  const dbConn = await DbConnection.create({
    userId,
    connectionString: encryptedURI
  });

  const dbStructure = await getPostgresStructureWithData(connectionURI);

  const dbTables = {
    customers: dbConn.Customers,
    workspaces: dbConn.Workspaces,
  };
  res.status(201).json({
    success: true,
    message: 'Connection successful, URI saved securely',
    structure: dbStructure,
    savedConnection: dbTables
  });
};

exports.getDBs = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'Missing userId in query' });
  }

  const connections = await DbConnection.findAll({
    where: { userId }
  });

  const data = connections.map(conn => ({
    id: conn.id,
    userId: conn.userId,
    connectionURI: decrypt(conn.connectionString)
  }));

  res.json({ success: true, data });
};

exports.getPostgresDBStructure = async (req, res) => {
  const { connectionURI } = req.body;

  if (!connectionURI) {
    return res.status(400).json({ success: false, message: 'Missing connectionURI' });
  }

  const structure = await getPostgresStructure(connectionURI);

  res.json({ success: true, data: structure });
};
