#!/bin/bash
# ARRYONA Project - Quick Commands Reference

# Development
npm run dev              # Start development server at http://localhost:3000
npm run build            # Build for production
npm start                # Run production server
npm run lint             # Check code quality

# Dependencies
npm install              # Install all packages
npm install [package]    # Install specific package
npm update               # Update all packages

# Testing
npm test                 # Run test suite (when configured)

# Deployment
git push                 # Push to GitHub
# Then deploy to Vercel via dashboard

# Environment Setup
cp .env.local.example .env.local  # Create env file

# Firebase Setup (do this in Firebase Console)
# 1. Go to console.firebase.google.com
# 2. Create project "arryona"
# 3. Enable Email/Password auth
# 4. Create Firestore database
# 5. Get credentials and add to .env.local

# Stripe Setup (do this in Stripe Dashboard)
# 1. Go to dashboard.stripe.com
# 2. Get test API keys
# 3. Add to .env.local

# Environment Variables to Configure
# NEXT_PUBLIC_FIREBASE_API_KEY=
# NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
# NEXT_PUBLIC_FIREBASE_PROJECT_ID=
# NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
# NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
# NEXT_PUBLIC_FIREBASE_APP_ID=
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
# STRIPE_SECRET_KEY=

echo "ARRYONA Project is ready! 🚀"
echo "Run 'npm run dev' to start developing"
echo ""
echo "Documentation files:"
echo "  - README.md               - Full setup guide"
echo "  - QUICKSTART.md           - Quick start guide"
echo "  - SETUP_CHECKLIST.md      - Implementation phases"
echo "  - ARCHITECTURE.md         - Technical architecture"
echo "  - IMPLEMENTATION_SUMMARY.md - What's been built"
echo ""
echo "Next steps:"
echo "  1. Configure Firebase"
echo "  2. Configure Stripe"
echo "  3. Run npm run dev"
echo "  4. Test all pages at http://localhost:3000"
