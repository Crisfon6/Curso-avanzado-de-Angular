import {setGlobalOptions} from "firebase-functions/v2";
// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import * as expres from "express";
import * as cors from "cors";
import * as functions from "firebase-functions";
import * as key from "./serviceAccountKey.json";

setGlobalOptions({maxInstances: 10});


admin.initializeApp({
  credential: admin.credential.cert(key as admin.ServiceAccount),
  databaseURL: "https://goty.firebaseio.com",
});
const db = admin.firestore();
// Set the maximum instances to 10 for all functions
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.json({msg: "Hello from Firebase App!"});
// });
// export const getGoty = onRequest(async(request, response) => {
//   const gotyRef = db.collection('goty');
//   const docsSnap = await gotyRef.get();
//   const games = docsSnap.docs.map(doc=>doc.data());
//   response.json({games})
// });

// Express
const app = expres();
app.use(cors({origin: true}));

app.get("/goty", async (req, res)=>{
  const gotyRef = db.collection("goty");
  const docsSnap = await gotyRef.get();
  const games = docsSnap.docs.map((doc)=>doc.data());
  res.json({games});
});

app.post("/goty/:id", async (req, res)=>{
  const id = req.params.id;
  const gameRef = db.collection("goty").doc(id);
  const gameSnap = await gameRef.get();
  if (!gameSnap.exists) {
    return res.status(404).json({
      ok: false,
      msg: "Not exist the game with id: "+id,
    });
  } else {
    const before = gameSnap.data();
    await gameRef.update({
      votes: before!.votes +1,
    });
    return res.json({ok: true, msg: `Thanks for vote to ${before!.name}`});
  }
});

export const api = functions.https.onRequest(app);
