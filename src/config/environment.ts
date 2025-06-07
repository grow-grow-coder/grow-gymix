/**
 * Frontend Environment Configuration
 * Handles environment variables and configuration for the React frontend
 */

// Environment types
export type Environment = 'development' | 'staging' | 'production';

// Get the current environment
export const getEnvironment = (): Environment => {
  return (import.meta.env.VITE_APP_ENV || import.meta.env.MODE || 'development') as Environment;
};

// Environment configuration
export const config = {
  // Current environment
  environment: getEnvironment(),
  
  // Application URLs
  app: {
    url: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5173/api',
  },
  
  // Convex configuration
  convex: {
    url: import.meta.env.VITE_CONVEX_URL || '',
  },
  
  // Development tools
  dev: {
    showDevTools: import.meta.env.VITE_SHOW_DEV_TOOLS === 'true',
    logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
    enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
    enableHotReload: import.meta.env.VITE_ENABLE_HOT_RELOAD === 'true',
  },
  
  // Feature flags
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableExperimentalFeatures: import.meta.env.VITE_ENABLE_EXPERIMENTAL_FEATURES === 'true',
    enableMockData: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
  },
  
  // Analytics configuration
  analytics: {
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',
    mixpanelToken: import.meta.env.VITE_MIXPANEL_TOKEN || '',
  },
  
  // Remote agent configuration
  remoteAgents: {
    enabled: true,
    devMode: import.meta.env.VITE_AUGMENT_DEV_MODE === 'true',
    logLevel: import.meta.env.VITE_AUGMENT_LOG_LEVEL || 'info',
    enableLiveReload: import.meta.env.VITE_AUGMENT_ENABLE_LIVE_RELOAD === 'true',
  },
  
  // GitHub integration
  github: {
    repo: import.meta.env.VITE_GITHUB_REPO || 'grow-grow-coder/grow-gymix',
    branch: import.meta.env.VITE_GITHUB_BRANCH || 'main',
  },
};

// Helper functions for environment checks
export const isDevelopment = () => getEnvironment() === 'development';
export const isProduction = () => getEnvironment() === 'production';
export const isStaging = () => getEnvironment() === 'staging';

// Validate required environment variables
export const validateEnvironment = () => {
  const required = ['VITE_CONVEX_URL'];
  const missing = [];
  
  // Check for missing variables
  for (const variable of required) {
    if (!import.meta.env[variable]) {
      missing.push(variable);
    }
  }
  
  if (missing.length > 0 && isProduction()) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    // In development, we can continue without some variables
    if (isProduction()) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }
  
  return true;
};

// Initialize environment validation
validateEnvironment();

// Export environment-specific configurations
export const getConfig = () => config;

// Debug helper (only in development)
if (isDevelopment()) {
  console.log('🔧 Environment Configuration:', {
    environment: getEnvironment(),
    convexUrl: config.convex.url ? '✅ Set' : '❌ Missing',
    devTools: config.dev.showDevTools ? '✅ Enabled' : '❌ Disabled',
    features: config.features,
  });
}
