import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  dashboardMetrics: defineTable({
    type: v.string(), // "platform_status", "revenue", "users", "ai_models", "deployments", "support"
    data: v.any(),
    lastUpdated: v.number(),
  }).index("by_type", ["type"]),
  
  aiModels: defineTable({
    name: v.string(),
    version: v.string(),
    status: v.string(), // "Healthy", "Monitoring", "Error"
    accuracy: v.string(),
    lastUpdate: v.string(),
    description: v.optional(v.string()),
    modelType: v.string(), // "study_planner", "grading", "enrollment_prediction"
    deploymentDate: v.number(),
    performanceMetrics: v.any(),
  }),
  
  deployments: defineTable({
    type: v.string(), // "Major Release", "Security Patch", "Feature Update"
    version: v.string(),
    date: v.string(),
    status: v.string(),
    description: v.string(),
    impactedSchools: v.string(),
    deployedBy: v.string(),
    rollbackPlan: v.optional(v.string()),
  }),
  
  supportTickets: defineTable({
    priority: v.string(), // "low", "medium", "high", "critical"
    status: v.string(), // "open", "in_progress", "resolved", "closed"
    schoolId: v.optional(v.string()),
    subject: v.string(),
    description: v.string(),
    createdAt: v.number(),
    resolvedAt: v.optional(v.number()),
    assignedTo: v.optional(v.string()),
    category: v.string(), // "technical", "billing", "feature_request", "bug"
  }).index("by_status", ["status"])
    .index("by_priority", ["priority"])
    .index("by_created_at", ["createdAt"]),

  schools: defineTable({
    name: v.string(),
    subscriptionTier: v.string(), // "basic", "pro", "enterprise"
    status: v.string(), // "active", "suspended", "trial"
    contactEmail: v.string(),
    adminName: v.string(),
    studentCount: v.number(),
    monthlyRevenue: v.number(),
    joinDate: v.number(),
    lastActivity: v.number(),
    features: v.array(v.string()),
  }).index("by_tier", ["subscriptionTier"])
    .index("by_status", ["status"]),

  userRoles: defineTable({
    roleName: v.string(),
    permissions: v.array(v.string()),
    description: v.string(),
    isSystemRole: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  featureFlags: defineTable({
    name: v.string(),
    description: v.string(),
    isEnabled: v.boolean(),
    targetAudience: v.string(), // "all", "beta", "specific_schools"
    rolloutPercentage: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  communications: defineTable({
    type: v.string(), // "announcement", "maintenance", "update"
    title: v.string(),
    content: v.string(),
    targetAudience: v.string(),
    scheduledAt: v.optional(v.number()),
    sentAt: v.optional(v.number()),
    status: v.string(), // "draft", "scheduled", "sent"
    createdBy: v.string(),
  }).index("by_status", ["status"])
    .index("by_type", ["type"]),

  systemLogs: defineTable({
    level: v.string(), // "info", "warning", "error", "critical"
    message: v.string(),
    component: v.string(),
    timestamp: v.number(),
    metadata: v.any(),
  }).index("by_level", ["level"])
    .index("by_timestamp", ["timestamp"]),

  apiKeys: defineTable({
    name: v.string(),
    service: v.string(),
    keyPreview: v.string(), // Only first/last few characters
    status: v.string(), // "active", "revoked", "expired"
    createdAt: v.number(),
    expiresAt: v.optional(v.number()),
    lastUsed: v.optional(v.number()),
    permissions: v.array(v.string()),
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
