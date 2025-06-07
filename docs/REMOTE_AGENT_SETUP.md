# 🤖 Augment Remote Agent Setup Guide

This guide explains how to use **Augment Remote Agents** with the Grow Gymix project. Remote Agents run in secure cloud environments and can perform development tasks autonomously.

## 📋 Prerequisites

1. **Augment VS Code Extension** installed and configured
2. **GitHub account** connected to Augment
3. **Repository access** to `grow-grow-coder/grow-gymix`

## 🚀 Quick Start

### 1. Create a Remote Agent

1. Open VS Code with Augment extension
2. Open the Augment panel (Ctrl/Cmd + Shift + P → "Augment: Open Panel")
3. Select **"Remote Agent"** from the dropdown
4. Configure the agent:
   - **Repository:** `grow-grow-coder/grow-gymix`
   - **Branch:** `main` (or create new branch)
   - **Environment:** Select `grow-gymix-setup.sh`

### 2. Environment Scripts

Choose from available environment scripts:

#### 🔧 Full Setup (`grow-gymix-setup.sh`)
- Complete development environment
- All dependencies and tools
- Development utilities
- Recommended for complex tasks

#### ⚡ Minimal Setup (`minimal-setup.sh`)
- Essential dependencies only
- Faster initialization
- Good for simple tasks

### 3. Agent Initialization

The Remote Agent will automatically:
1. Clone the repository
2. Run the selected environment script
3. Install Node.js dependencies
4. Configure Convex CLI
5. Set up environment variables
6. Create `.env` file from template

## 🛠️ Environment Details

### Base Environment
- **OS:** Ubuntu 22.04
- **Node.js:** v22.x (pre-installed)
- **npm:** Latest (pre-installed)
- **Python:** 3.9-3.12
- **Go:** v1.24.2

### Installed Tools
- Git, curl, wget
- vim, nano, tree, jq
- TypeScript, ESLint, Prettier
- Convex CLI
- npm-run-all

### Environment Variables
```bash
NODE_ENV=development
AUGMENT_REMOTE_AGENT=true
AUGMENT_DEV_MODE=true
VITE_APP_ENV=development
VITE_ENABLE_DEBUG=true
CONVEX_ENV=development
```

## 📝 Available Commands

Once the agent is set up, you can use these commands:

```bash
# Development
npm run dev              # Start full development server
npm run dev:frontend     # Frontend only (Vite)
npm run dev:backend      # Backend only (Convex)

# Convex
npx convex dev          # Start Convex in development mode
npx convex dashboard    # Open Convex dashboard

# Utilities
~/start-dev.sh          # Show environment information
npm run lint            # Run linting
npm run build           # Build for production

# Environment info
node --version          # Check Node.js version
npm list --depth=0      # List installed packages
```

## 🔧 Configuration

### Required Environment Variables

Edit `.env` file with your actual values:

```bash
# Convex (Required)
CONVEX_DEPLOYMENT=your-deployment-name
VITE_CONVEX_URL=https://your-convex-url

# Authentication (Optional)
AUTH_SECRET=your-secret-key
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-secret

# AI Services (Optional)
OPENAI_API_KEY=your-openai-key
```

### GitHub Integration

Remote Agents automatically have GitHub access through Augment's integration:
- Repository cloning
- Branch creation
- Pull request creation
- Commit and push operations

## 🔄 Working with Remote Agents

### Connecting via SSH

1. Install **Remote-SSH** extension in VS Code
2. From Augment panel, click **"SSH to agent"**
3. VS Code will open a new window connected to the agent
4. Work directly in the remote environment

### Monitoring Progress

- View agent status in Augment panel
- See real-time command output
- Review file changes and diffs
- Monitor terminal sessions

### Creating Pull Requests

1. Agent completes the task
2. Click **"Create a PR"** in Augment panel
3. Agent automatically:
   - Creates a new branch
   - Commits changes
   - Opens pull request
   - Adds description

## 🎯 Best Practices

### Task Definition
- Be specific about requirements
- Mention files or components to modify
- Include acceptance criteria
- Reference existing patterns

### Environment Management
- Use `.env.local` for sensitive data
- Keep environment scripts updated
- Test scripts locally when possible

### Code Quality
- Agents automatically run linting
- Follow existing code patterns
- Include tests when appropriate

## 🐛 Troubleshooting

### Common Issues

**Agent fails to start:**
- Check GitHub permissions
- Verify repository access
- Review environment script logs

**Dependencies not installing:**
- Check `package.json` syntax
- Verify npm registry access
- Review network connectivity

**Convex connection issues:**
- Verify `CONVEX_DEPLOYMENT` in `.env`
- Check `VITE_CONVEX_URL` configuration
- Ensure Convex project is active

### Getting Help

1. Check agent logs in Augment panel
2. Use SSH to connect and debug
3. Review environment script output
4. Contact Augment support if needed

## 📚 Additional Resources

- [Augment Remote Agent Documentation](https://docs.augmentcode.com/using-augment/remote-agent)
- [Remote Agent Environments](https://docs.augmentcode.com/using-augment/remote-agent-environment)
- [Convex Documentation](https://docs.convex.dev)
- [Project README](../README.md)

---

**Ready to use Remote Agents with Grow Gymix! 🚀**
