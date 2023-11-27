import OpenAI from 'openai';
import {Request,Response} from 'express'

const openai = new OpenAI({
  apiKey: process.env.OPENAI
});

export async function main(req:Request,res:Response) {

    const {prompt} = req.params
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt}],
    model: "gpt-3.5-turbo",
  });

  const result = completion.choices[0];
  return res.status(200).send(result)
}

