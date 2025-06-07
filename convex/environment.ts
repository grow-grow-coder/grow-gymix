/**
 * Environment Configuration for Convex Backend
 * Handles environment variables and configuration for the Convex backend
 */

// Environment types
export type Environment = 'development' | 'staging' | 'production';

// Get the current environment
export const getEnvironment = (): Environment => {
  const env = process.env.CONVEX_ENV || process.env.NODE_ENV || 'development';
  return env as Environment;
};

// Environment configuration
export const config = {
  // Current environment
  environment: getEnvironment(),
  
  // Database configuration
  database: {
    // Convex handles database automatically, but we can configure behavior
    enableDebugLogs: getEnvironment() === 'development',
    maxRetries: getEnvironment() === 'production' ? 5 : 3,
  },
  
  // Authentication configuration
  auth: {
    sessionDuration: getEnvironment() === 'production' ? '7d' : '30d',
    enableGuestAccess: getEnvironment() !== 'production',
  },
  
  // AI Services configuration
  ai: {
    openai: {
      model: getEnvironment() === 'production' ? 'gpt-4' : 'gpt-3.5-turbo',
      maxTokens: 2000,
      temperature: 0.7,
    },
    enableAIFeatures: true,
  },
  
  // Feature flags
  features: {
    enableAnalytics: getEnvironment() === 'production',
    enableExperimentalFeatures: getEnvironment() === 'development',
    enableDebugMode: getEnvironment() === 'development',
  },
  
  // Rate limiting
  rateLimiting: {
    enabled: getEnvironment() === 'production',
    requestsPerMinute: getEnvironment() === 'production' ? 100 : 1000,
  },
  
  // Logging configuration
  logging: {
    level: getEnvironment() === 'production' ? 'error' : 'debug',
    enableConsoleOutput: getEnvironment() !== 'production',
  },
  
  // Augment Remote Agent configuration
  augmentRemoteAgent: {
    enabled: process.env.AUGMENT_REMOTE_AGENT === 'true',
    isCloudEnvironment: process.env.AUGMENT_REMOTE_AGENT === 'true',
    allowedOrigins: getEnvironment() === 'production'
      ? ['https://your-domain.com']
      : ['http://localhost:5173', 'http://localhost:3000', 'https://*.augmentcode.com'],
    maxConcurrentConnections: getEnvironment() === 'production' ? 10 : 5,
    logLevel: process.env.AUGMENT_LOG_LEVEL || 'info',
  },
};

// Helper functions for environment checks
export const isDevelopment = () => getEnvironment() === 'development';
export const isProduction = () => getEnvironment() === 'production';
export const isStaging = () => getEnvironment() === 'staging';

// Validate required environment variables
export const validateEnvironment = () => {
  const required = [];
  const missing = [];
  
  // Add required environment variables based on environment
  if (isProduction()) {
    required.push('CONVEX_DEPLOYMENT');
  }
  
  // Check for missing variables
  for (const variable of required) {
    if (!process.env[variable]) {
      missing.push(variable);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  return true;
};

// Export environment-specific configurations
export const getConfig = () => {
  validateEnvironment();
  return config;
};
