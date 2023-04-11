require('dotenv').config()
const express = require('express');
const { PythonShell } = require("python-shell");
const { OpenAI } = require("langchain/llms/openai");

// Required python model
// gpt_index -> (SimpleDirectoryReader, GPTListIndex, GPTSimpleVectorIndex, LLMPredictor, PromptHelper)
// sys

const app = express();
const port = 3000;


const createVectorIndex = (path) => {
    let token = 256;
    let maxInput = 4096;
    let chunkSize = 600;
    let maxChunkOverlap = 20;

    let prompt_helper = '';

    // define LLM
    // llmPredictor = LLMPredictor(llm=OpenAI(temparature=0. model_name="text-ada-001", max_token=tokens))

    // load data
    // docs = SimpleDirectoryReader(path).load_data();

    // create vector index
    // vectorIndex = GPTSimpleVectorIndex(documents=docs,llm_predictor=llmPredictor,prompt_helper=prompt_helper)
    // vectorIndex.save_to_disk('vectorIndex.json');
    // return vectorIndex;
}

// vectorIndex = createVectorIndex('pathToDataDirectory');

const botReply = (vectorIndex) => {
    // vIndex = GPTSimpleVectorIndex.load_from_disk(vectorIndex);
    // take input then do
    // const botResponse = vIndex.query(prompt,response_mode="compact");
    // return botResponse;
}

app.get('/', async (req, res) => {
    try {
        let options = {
            args: [
                req.query.prompt
            ]
        }
        const returnData = await PythonShell.run("src/gptIndex.py", options, function (err, results) {
            if (err) {
                console.log(err)
            }
        })
        console.log(returnData)
        res.send('Hello World!');
    } catch (err) {
        console.log(err)
    }
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
