from gpt_index import SimpleDirectoryReader, GPTListIndex, GPTSimpleVectorIndex, LLMPredictor, PromptHelper
from langchain import OpenAI
import sys
import os

os.environ['OPENAI_API_KEY'] = ''

def createVectorIndex(path):
    tokens = 256
    max_input = 4096
    chunk_size = 600
    max_chunk_overlap = 20

    prompt_helper = PromptHelper(max_input, tokens, max_chunk_overlap, chunk_size_limit=chunk_size)

#     define LLM
    llm_predictor = LLMPredictor(llm=OpenAI(temperature=0, model_name="text-ada-001", max_tokens=tokens))

#     load data
    documents = SimpleDirectoryReader(path).load_data()

#     create vector index
    vectorIndex = GPTSimpleVectorIndex.from_documents(documents)
#     vectorIndex = GPTSimpleVectorIndex(documents,llm_predictor=llm_predictor,prompt_helper=prompt_helper)

    vectorIndex.save_to_disk('vectorIndex.json')

def botReply():
    vectorIndex = createVectorIndex('feedableData')
    vIndex = GPTSimpleVectorIndex.load_from_disk("vectorIndex.json")
    botResponse = vIndex.query(sys.argv[1],response_mode="compact")
    print(botResponse)

botReply()
