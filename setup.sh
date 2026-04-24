#!/bin/bash

# THE VOICE OF ISLAMABAD - ONE-COMMAND SETUP
# Run this script to set everything up automatically

echo "🚀 Voice of Islamabad - Setup Script"
echo "======================================"
echo ""

# Check if we have Node
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if we have Git
if ! command -v git &> /dev/null; then
    echo "❌ Git not found. Install from: https://git-scm.com"
    exit 1
fi

echo "✅ Git found: $(git --version)"
echo ""

# Create .env.local
echo "📝 Setting up environment variables..."
if [ ! -f ".env.local" ]; then
    cat > .env.local << 'EOF'
# ⚠️ REPLACE WITH YOUR ACTUAL API KEYS
# Get keys from:
# - NewsData.io: https://newsdata.io (FREE)
# - OpenAI: https://platform.openai.com (PAID)
# - OpenRouter: https://openrouter.ai (FREE/PAID)

NEWSDATA_API_KEY=your_newsdata_key_here
OPENAI_API_KEY=your_openai_key_here
OPENROUTER_API_KEY=your_openrouter_key_here

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_REVALIDATE_INTERVAL=300
NEXT_PUBLIC_WHATSAPP_NUMBER=923554776466
EOF
    echo "✅ Created .env.local"
    echo "⚠️  ADD YOUR API KEYS to .env.local before running!"
else
    echo "✅ .env.local already exists"
fi

echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your API keys"
echo "2. Run: npm run dev"
echo "3. Visit: http://localhost:3000"
echo ""
echo "For detailed guide, see README_DEPLOYMENT.md"
