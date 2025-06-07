import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Dashboard Overview
export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Mock data for dashboard stats
    return {
      totalSchools: 2847,
      totalUsers: 126000,
      monthlyRevenue: 1830000,
      activeModules: 12
    };
  },
});

export const getRecentActivity = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [
      {
        _id: "1",
        type: "school_signup",
        description: "New school registration: Riverside Elementary",
        timestamp: Date.now() - 1000 * 60 * 30,
        user: "System"
      },
      {
        _id: "2",
        type: "module_update",
        description: "AI Study Planner module updated to v2.1.0",
        timestamp: Date.now() - 1000 * 60 * 60 * 2,
        user: "Admin"
      }
    ];
  },
});

// Schools Management
export const getSchools = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [
      {
        _id: "school1",
        name: "Riverside Elementary",
        location: "California, USA",
        studentCount: 450,
        teacherCount: 25,
        status: "active" as const,
        tier: "Professional",
        monthlyRevenue: 2250,
        lastActivity: "2 hours ago"
      },
      {
        _id: "school2",
        name: "Metro High School",
        location: "New York, USA",
        studentCount: 1200,
        teacherCount: 80,
        status: "active" as const,
        tier: "Enterprise",
        monthlyRevenue: 5400,
        lastActivity: "1 hour ago"
      }
    ];
  },
});

export const createSchool = mutation({
  args: {
    name: v.string(),
    location: v.string(),
    contactEmail: v.string(),
    tier: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // In a real app, you'd insert into a schools table
    return { success: true, schoolId: "new_school_id" };
  },
});

// User Roles Management
export const getUserRoles = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [
      {
        _id: "role1",
        name: "Super Admin",
        description: "Full system access with all permissions",
        type: "system" as const,
        level: "admin" as const,
        permissions: ["all_access", "user_management", "school_management"],
        userCount: 3
      },
      {
        _id: "role2",
        name: "School Manager",
        description: "Manage school-specific settings and users",
        type: "custom" as const,
        level: "manager" as const,
        permissions: ["school_management", "user_management"],
        userCount: 45
      }
    ];
  },
});

// Modules Management
export const getModules = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [
      {
        _id: "mod1",
        name: "AI Study Planner",
        description: "Intelligent study planning and scheduling system",
        category: "ai" as const,
        version: "2.1.0",
        status: "active" as const,
        schools: 67
      },
      {
        _id: "mod2",
        name: "Smart Gradebook",
        description: "Advanced gradebook with analytics and insights",
        category: "core" as const,
        version: "1.8.3",
        status: "active" as const,
        schools: 89
      }
    ];
  },
});

// AI Models Management
export const getAIModels = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [
      {
        _id: "model1",
        name: "Student Performance Predictor",
        version: "1.2.0",
        accuracy: "89.3%",
        status: "Healthy" as const,
        lastUpdate: "2 days ago"
      },
      {
        _id: "model2",
        name: "Content Recommendation Engine",
        version: "2.0.1",
        accuracy: "92.7%",
        status: "Monitoring" as const,
        lastUpdate: "1 week ago"
      }
    ];
  },
});

// Feature Flags
export const getFeatureFlags = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [
      {
        _id: "flag1",
        name: "new_dashboard_ui",
        description: "Enable the new dashboard user interface",
        enabled: true,
        environment: "production" as const,
        rolloutPercentage: 100,
        createdAt: "2024-01-10",
        targetingRules: [
          { condition: "user_type", value: "admin" }
        ]
      },
      {
        _id: "flag2",
        name: "ai_content_generation",
        description: "Enable AI-powered content generation features",
        enabled: false,
        environment: "beta" as const,
        rolloutPercentage: 25,
        createdAt: "2024-01-12",
        targetingRules: [
          { condition: "school_tier", value: "enterprise" }
        ]
      }
    ];
  },
});

export const createFeatureFlag = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    environment: v.string(),
    rolloutPercentage: v.number()
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return { success: true, flagId: "new_flag_id" };
  },
});

export const toggleFeatureFlag = mutation({
  args: { flagId: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return { success: true };
  },
});

// Service Tiers & Billing
export const getServiceTiers = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [];
  },
});

export const getBillingData = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [];
  },
});

export const createServiceTier = mutation({
  args: {
    name: v.string(),
    price: v.number(),
    features: v.array(v.string())
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return { success: true, tierId: "new_tier_id" };
  },
});

export const updateBilling = mutation({
  args: {
    customerId: v.string(),
    amount: v.number()
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return { success: true };
  },
});

// Communication Hub
export const getConversations = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [
      {
        _id: "conv1",
        title: "Q1 Planning Discussion",
        lastMessage: "Let's schedule the quarterly review meeting",
        participants: ["admin", "manager1", "manager2"],
        unreadCount: 2,
        lastActivity: "2 hours ago",
        messages: [
          {
            id: "msg1",
            content: "Let's schedule the quarterly review meeting",
            isOwn: false,
            timestamp: "2:30 PM"
          },
          {
            id: "msg2",
            content: "Sounds good! How about next Tuesday?",
            isOwn: true,
            timestamp: "2:35 PM"
          }
        ]
      }
    ];
  },
});

export const getAnnouncements = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [
      {
        _id: "ann1",
        title: "System Maintenance Scheduled",
        content: "Scheduled maintenance on Sunday 2-4 AM EST",
        priority: "medium" as const,
        date: "2024-01-15"
      },
      {
        _id: "ann2",
        title: "New Feature Release",
        content: "AI Content Generator is now available in beta",
        priority: "high" as const,
        date: "2024-01-14"
      }
    ];
  },
});

export const sendMessage = mutation({
  args: {
    conversationId: v.string(),
    content: v.string(),
    type: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return { success: true, messageId: "new_message_id" };
  },
});

export const createAnnouncement = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    priority: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return { success: true, announcementId: "new_announcement_id" };
  },
});

// Creative Studio
export const getCreativeProjects = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [
      {
        _id: "proj1",
        title: "5th Grade Math Curriculum",
        description: "Comprehensive math curriculum for 5th grade students",
        type: "curriculum",
        lastModified: "2 days ago"
      },
      {
        _id: "proj2",
        title: "Science Quiz Template",
        description: "Interactive quiz template for science subjects",
        type: "assessment",
        lastModified: "1 week ago"
      }
    ];
  },
});

export const getCreativeTemplates = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [
      {
        _id: "temp1",
        name: "Lesson Plan Template",
        description: "Standard lesson plan template for all subjects",
        category: "curriculum",
        downloads: 1247
      },
      {
        _id: "temp2",
        name: "Quiz Template",
        description: "Multiple choice quiz template",
        category: "assessment",
        downloads: 892
      }
    ];
  },
});

export const createCreativeProject = mutation({
  args: {
    title: v.string(),
    type: v.string(),
    description: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return { success: true, projectId: "new_project_id" };
  },
});

export const getCommunications = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [
      {
        _id: "comm1",
        title: "System Maintenance Notice",
        content: "Scheduled maintenance on Sunday 2-4 AM EST",
        type: "maintenance",
        status: "sent",
        priority: "high",
        targetAudience: "all",
        scheduledAt: Date.now() - 1000 * 60 * 60 * 24,
        sentAt: Date.now() - 1000 * 60 * 60 * 24,
        recipients: 2847,
        openRate: 89.5
      }
    ];
  },
});

// AI Assistant
export const getAIConversations = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [];
  },
});

export const getAIAssistants = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return [];
  },
});
