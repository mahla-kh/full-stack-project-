// // import { MongoClient } from "mongodb";

// // const connectionURL = "mongodb://127.0.0.1:27017";
// // const dataBaseName = "task-manager";

// // const client = new MongoClient(connectionURL);

// // async function run() {
// //   try {
// //     await client.connect();
// //     console.log("Connected to MongoDB!");

// //     const db = client.db(dataBaseName);

// //     // نمونه: اضافه کردن یک دیتا
// //     const result = await db.collection("users").insertOne({
// //       name: "Mahla",
// //       age: 19,
// //     });

// //     console.log("Inserted:", result);
// //   } catch (error) {
// //     console.error("Connection failed:", error);
// //   } finally {
// //     await client.close();
// //   }
// // }

// // run();

// import { MongoClient, ObjectId } from "mongodb";

// async function run() {
//   const client = new MongoClient("mongodb://localhost:27017");
//   try {
//     await client.connect();
//     const db = client.db("task-manager");
//     const result = await db.collection("users").updateMany(
//       { age: 19 },
//       {
//         $set: { updated: true },
//       }
//     );
//     console.log(result.matchedCount, result.modifiedCount);
//   } catch (err) {
//     console.log("err", err);
//   } finally {
//     client.close();
//   }
// }

// run();

import { MongoClient } from "mongodb";

async function run() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  try {
    await client.connect();
    const db = client.db("task-manager");
    const result = db.collection("users").deleteOne({ age: 17 });
    console.log(result);
  } catch (err) {
    console.log("err", err);
  } finally {
    client.close;
  }
}

run();
