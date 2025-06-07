export interface DashboardMetrics {
  platform_status: {
    sessionInfo: string;
    systemHealth: string;
    activeSchools: string;
    criticalAlerts: string;
  };
  revenue: {
    mrr: string;
    mrrTrend: string;
    arr: string;
    arrTrend: string;
    avgLtv: string;
    ltvTrend: string;
  };
  users: {
    dailyActiveUsers: string;
    dauTrend: string;
    avgSession: string;
    featureAdoption: string;
  };
  support: {
    slaCompliance: string;
    newTickets24h: string;
    openHighPriority: string;
    avgResolutionTime: string;
  };
}

export interface School {
  _id: string;
  name: string;
  subscriptionTier: 'basic' | 'pro' | 'enterprise';
  studentCount: number;
  monthlyRevenue: number;
  status: 'active' | 'trial' | 'suspended';
  joinDate: string;
  lastActivity: string;
}

export interface AIModel {
  _id: string;
  name: string;
  version: string;
  accuracy: string;
  status: 'Healthy' | 'Monitoring' | 'Issues';
  lastUpdate: string;
}

export interface Deployment {
  _id: string;
  type: string;
  version: string;
  date: string;
  description: string;
  status: string;
  impactedSchools: string;
}

export interface Module {
  _id: string;
  name: string;
  description: string;
  category: 'core' | 'ai' | 'analytics' | 'custom';
  version: string;
  status: 'active' | 'inactive' | 'maintenance';
  schools: number;
}

export interface FeatureFlag {
  _id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  rolloutPercentage: number;
  targetAudience: 'all' | 'beta' | 'specific_schools' | 'enterprise';
  createdAt: string;
}

export interface Communication {
  _id: string;
  title: string;
  content: string;
  type: 'announcement' | 'maintenance' | 'update' | 'alert';
  status: 'draft' | 'scheduled' | 'sent';
  targetAudience: string;
  createdBy: string;
  scheduledAt?: string;
  sentAt?: string;
}

export interface UserRole {
  _id: string;
  name: string;
  description: string;
  level: 'admin' | 'manager' | 'user';
  type: 'system' | 'custom';
  permissions: string[];
  userCount: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
  path?: string;
}
