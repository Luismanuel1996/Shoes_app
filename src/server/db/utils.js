import connection from "./index";

const query = (qryStr, values) => {
  console.log("query string:", qryStr); // Add this line to log the query string
  console.log("values:", values); // Add this line to log the values

  return new Promise((resolve, reject) => {
    connection.query(qryStr, values, (err, results) => {
      if (err) reject(err);
      console.log("query results:", results);
      resolve(results);
    });
  });
};

export default query;
