// const { CohereRerank } = require("@langchain/cohere");
// const { Document } = require("@langchain/core/documents");

// // Load the top_docs.json file
// const topDocs = require("./top_docs.json");

// // Initialize a CohereRerank instance
// const cohereRerank = new CohereRerank({
//   apiKey: "bZWp1SIPn1T8Z2i5RylAgtvQYb2YpjcmrxTsgk15", // Specify your Cohere API key
//   topN: 5, // Number of documents to return
//   model: "rerank-english-v2.0", // Model to use for reranking
// });

// // Function to apply cohereRerank on each key-value pair
// async function applyCohereRerank() {
//   for (const [origQuestion, docs] of Object.entries(topDocs)) {
//     console.log(`Processing ${origQuestion}`);

//     // Transform each document into a Document object
//     const transformedDocs = docs.map(doc => new Document({ pageContent: doc.page_content }));

//     try {
//       const rerankedDocs = await cohereRerank.compressDocuments(transformedDocs, origQuestion);
//       console.log(`Original Question: ${origQuestion}`);
//       console.log('Top 5 Documents:');
//       rerankedDocs.forEach((doc, index) => {
//         console.log(`Document ${index + 1} Metadata:`, doc.metadata);
//       });
//       // Add code to handle rerankedDocs as needed
//     } catch (error) {
//       console.error("Error applying CohereRerank:", error);
//     }
//   }
// }

// // Call the function to apply cohereRerank
// applyCohereRerank()
//   .then(() => console.log("CohereRerank applied successfully"))
//   .catch((error) => console.error("Error applying CohereRerank:", error));
const { CohereRerank } = require("@langchain/cohere");
const { Document } = require("@langchain/core/documents");
const fs = require("fs");

// Load the top_docs.json file
const topDocs = require("./top_docs.json");

// Initialize a CohereRerank instance
const cohereRerank = new CohereRerank({
  apiKey: "bZWp1SIPn1T8Z2i5RylAgtvQYb2YpjcmrxTsgk15", // Specify your Cohere API key
  topN: 5, // Number of documents to return
  model: "rerank-english-v2.0", // Model to use for reranking
});

// Function to apply cohereRerank on each key-value pair and write to 'response1.txt'
async function applyCohereRerank() {
  const writeStream = fs.createWriteStream('./approach3/response4a.txt');

  for (const [origQuestion, docs] of Object.entries(topDocs)) {
    console.log(`Processing ${origQuestion}`);

    // Transform each document into a Document object
    const transformedDocs = docs.map(doc => new Document({ pageContent: doc.page_content }));

    try {
      const rerankedDocs = await cohereRerank.compressDocuments(transformedDocs, origQuestion);
      console.log(`Original Question: ${origQuestion}`);
      console.log('Top 5 Documents:');

      writeStream.write(`Original Question: ${origQuestion}\n`);
      rerankedDocs.forEach((doc, index) => {
        console.log(`Document ${index + 1} Metadata:`, doc.metadata);
        writeStream.write(`Document ${index + 1} Page Content: ${doc.pageContent}\n`);
      });
      writeStream.write('\n'); // Add a newline gap between each question's documents
    } catch (error) {
      console.error("Error applying CohereRerank:", error);
    }
  }

  writeStream.end();
}

// Call the function to apply cohereRerank
applyCohereRerank()
  .then(() => console.log("CohereRerank applied successfully"))
  .catch((error) => console.error("Error applying CohereRerank:", error));
