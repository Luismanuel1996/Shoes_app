import query from "../db/utils";

export async function findAll() {
  try {
    const [rows, fields] = await query('SELECT * FROM shoes');
    console.log('Raw rows from findAll():', rows); // Add this line to log the raw results
    console.log('Raw fields from findAll():', fields); // Add this line to log the raw fields
    return rows;
  } catch (error) {
    throw error;
  }
}



export async function findOne(shoeId) {
  const [rows] = await query('SELECT * FROM shoes WHERE shoeId = ?', [shoeId]);
  return rows[0];
}

export async function findColor(color) {
  const [rows] = await query('SELECT * FROM shoes WHERE color = ?', [color]);
  return rows;
}

export async function addOne(newShoe) {
  const { brand, style, size, color, description, image } = newShoe;

  const [result] = await query(
    'INSERT INTO shoes (brand, style, size, color, description, image) VALUES (?, ?, ?, ?, ?, ?)',
    [brand, style, size, color, description, image],
  );

  return result.insertId;
}

export async function updateOne(updatedShoe, shoeId) {
  const { brand, style, size, color, description, image } = updatedShoe;
  const [result] = await query(
    'UPDATE shoes SET brand=?, style=?, size=?, color=?, description=?, image=? WHERE shoeId = ?',
    [brand, style, size, color, description, image, shoeId],
  );
  return result.affectedRows;
}

export async function remove(shoeId) {
  const [result] = await query('DELETE FROM shoes WHERE shoeId = ?', [shoeId]);
  return result.affectedRows;
}
