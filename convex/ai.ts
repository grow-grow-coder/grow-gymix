"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.CONVEX_OPENAI_BASE_URL,
  apiKey: process.env.CONVEX_OPENAI_API_KEY,
});

export const sendMessage = action({
  args: {
    message: v.string(),
    assistantId: v.string(),
    context: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const systemPrompts = {
        general: "You are a helpful AI assistant for an educational platform admin dashboard. Provide clear, concise, and professional responses.",
        curriculum: "You are a curriculum design specialist. Help create educational content, lesson plans, and learning objectives.",
        analytics: "You are a data analyst specializing in educational metrics. Help interpret data and provide actionable insights.",
        support: "You are a technical support specialist. Help troubleshoot issues and provide clear solutions."
      };

      const systemPrompt = systemPrompts[args.assistantId as keyof typeof systemPrompts] || systemPrompts.general;

      const completion = await openai.chat.completions.create({
        model: "gpt-4.1-nano",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: args.message }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      return {
        response: completion.choices[0].message.content,
        usage: completion.usage
      };
    } catch (error) {
      console.error("AI message error:", error);
      throw new Error("Failed to process AI message");
    }
  },
});

export const generateCreativeContent = action({
  args: {
    prompt: v.string(),
    type: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const contentPrompts = {
        content_generator: "Generate educational content based on the following prompt. Make it engaging and age-appropriate:",
        lesson_planner: "Create a detailed lesson plan with objectives, activities, and assessments for:",
        quiz_builder: "Generate quiz questions with multiple choice answers for the topic:",
        image_creator: "Describe a detailed educational image or infographic for:",
        style_transfer: "Suggest creative styling and formatting approaches for:",
        voice_synthesis: "Create a script for educational narration about:"
      };

      const systemPrompt = contentPrompts[args.type as keyof typeof contentPrompts] || contentPrompts.content_generator;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: args.prompt }
        ],
        max_tokens: 1000,
        temperature: 0.8
      });

      return {
        content: completion.choices[0].message.content,
        type: args.type,
        usage: completion.usage
      };
    } catch (error) {
      console.error("Content generation error:", error);
      throw new Error("Failed to generate creative content");
    }
  },
});

export const analyzeData = action({
  args: {
    data: v.string(),
    analysisType: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4.1-nano",
        messages: [
          { 
            role: "system", 
            content: "You are a data analyst. Analyze the provided educational data and provide insights, trends, and recommendations." 
          },
          { 
            role: "user", 
            content: `Analyze this ${args.analysisType} data: ${args.data}` 
          }
        ],
        max_tokens: 800,
        temperature: 0.3
      });

      return {
        analysis: completion.choices[0].message.content,
        type: args.analysisType,
        usage: completion.usage
      };
    } catch (error) {
      console.error("Data analysis error:", error);
      throw new Error("Failed to analyze data");
    }
  },
});
