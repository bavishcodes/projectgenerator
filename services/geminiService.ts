
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedProject } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    projectReport: { 
      type: Type.STRING,
      description: "A comprehensive project report including an overview, assumptions, and explanations of PDDL encodings. Format as Markdown."
    },
    domainPddl: { 
      type: Type.STRING,
      description: "The complete, valid PDDL code for the domain file (domain.pddl)."
    },
    problemPddl: { 
      type: Type.STRING,
      description: "The complete, valid PDDL code for the problem file (problem.pddl)."
    },
    plannerOutput: { 
      type: Type.STRING,
      description: "Sample planner output and an explanation of how to run the planner and interpret its output. Include the Fast Downward command."
    },
  },
  required: ['projectReport', 'domainPddl', 'problemPddl', 'plannerOutput'],
};

export const generatePddlProject = async (prompt: string): Promise<GeneratedProject> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: `You are an expert in classical AI planning and PDDL. Based on the following user request, generate all the components for the described planning project. Ensure the output is a valid JSON object matching the provided schema. The PDDL code must be syntactically correct and complete. The explanations should be clear and well-structured.\n\n--- USER REQUEST ---\n\n${prompt}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    // Basic validation to ensure the parsed object matches the expected structure.
    if (
        typeof parsedJson.projectReport === 'string' &&
        typeof parsedJson.domainPddl === 'string' &&
        typeof parsedJson.problemPddl === 'string' &&
        typeof parsedJson.plannerOutput === 'string'
    ) {
        return parsedJson as GeneratedProject;
    } else {
        throw new Error("API response did not match the expected format.");
    }
  } catch (error) {
    console.error("Error generating PDDL project:", error);
    throw new Error("Failed to generate project. The API returned an invalid response or an error occurred.");
  }
};
