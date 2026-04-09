# 🖥️ ARRYONA - Essential Commands Reference

## 📍 Location
```
C:\Users\okose\arryona
```

---

## ⚡ IMMEDIATE COMMANDS

### START THE PROJECT
```bash
cd c:\Users\okose\arryona
npm run dev
```
**Result:** Development server starts at http://localhost:3000

### BUILD FOR PRODUCTION
```bash
npm run build
npm start
```
**Result:** Optimized production build runs

### STOP THE SERVER
Press `Ctrl + C` in terminal

---

## 📦 DEPENDENCY COMMANDS

### Install All Dependencies
```bash
npm install
```

### Add New Package
```bash
npm install package-name
```

### Update Dependencies
```bash
npm update
```

### Remove Package
```bash
npm uninstall package-name
```

---

## 🔍 CODE QUALITY

### Check for Lint Errors
```bash
npm run lint
```

### Build Check (TypeScript)
```bash
npm run build
```

---

## 📁 FILE MANAGEMENT

### View Project Structure
```bash
dir
```

### List all files recursively
```bash
tree
```

### Navigate to folder
```bash
cd app
```

### Go back to parent folder
```bash
cd ..
```

### Go to project root
```bash
cd c:\Users\okose\arryona
```

---

## 🔧 CONFIGURATION

### Create Environment File
```bash
copy .env.local.example .env.local
```

### Edit Environment Variables
```bash
# Open .env.local in your code editor and add:
NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain_here
# ... etc
```

---

## 🚀 DEPLOYMENT

### Preview Build Locally
```bash
npm run build
npm start
```

### Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push
```

### Deploy to Vercel
1. Go to https://vercel.com
2. Connect GitHub repository
3. Add environment variables
4. Click Deploy

---

## 🆘 TROUBLESHOOTING COMMANDS

### Port Already in Use
```bash
npm run dev -- -p 3001
```
(Uses port 3001 instead of 3000)

### Clear Cache
```bash
rm -r .next
npm run dev
```

### Reinstall Dependencies
```bash
rm -r node_modules
npm install
npm run dev
```

### Check Node Version
```bash
node --version
```
(Should be 18+)

### Check npm Version
```bash
npm --version
```

---

## 📝 USEFUL FILE LOCATIONS

### Documentation
- Main Guide: `..\README.md`
- Quick Start: `..\QUICKSTART.md`
- Setup Plan: `..\SETUP_CHECKLIST.md`

### Source Code
- Pages: `app/`
- Components: `components/`
- Context: `context/`
- Config: `lib/`

### Configuration
- Environment: `.env.local`
- TypeScript: `tsconfig.json`
- Tailwind: `tailwind.config.ts`
- Next.js: `next.config.ts`

---

## 🔐 FIREBASE SETUP COMMANDS

### After Getting Firebase Credentials:

1. Update .env.local:
```bash
# Edit file and add Firebase keys
code .env.local
```

2. Test Firebase connection:
```bash
npm run dev
# Visit http://localhost:3000/signup and try registering
```

---

## 💳 STRIPE SETUP COMMANDS

### After Getting Stripe Keys:

1. Install Stripe React library:
```bash
npm install @stripe/react-stripe-js @stripe/js
```

2. Update .env.local:
```bash
# Edit file and add Stripe keys
code .env.local
```

---

## 👁️ VIEWING FILES IN TERMINAL

### Open file in default editor
```bash
code filename.txt
```

### Show file contents
```bash
type filename.ts
```

### View JSON formatted
```bash
type package.json
```

---

## 🔗 IMPORTANT URLS

### Local Development
- Main Site: http://localhost:3000
- Shop: http://localhost:3000/shop
- Cart: http://localhost:3000/cart

### External Services
- Firebase: https://console.firebase.google.com
- Stripe: https://dashboard.stripe.com
- Vercel: https://vercel.com/dashboard
- GitHub: https://github.com

---

## 📊 PROJECT STATS COMMAND

### Check project size
```bash
du -sh .
```

### Count lines of code
```bash
find . -name "*.ts" -o -name "*.tsx" -o -name "*.css" | xargs wc -l
```

### List TypeScript files
```bash
dir /s *.ts *.tsx
```

---

## 🎯 COMMON WORKFLOWS

### Full Development Cycle
```bash
# 1. Start dev server
npm run dev

# 2. Make code changes
# (Dev server hot-reloads automatically)

# 3. When done, build for production
npm run build

# 4. Test production build
npm start

# 5. Deploy
git push origin main
# (Vercel auto-deploys)
```

### Adding a New Feature
```bash
# 1. Create new file in app/ or components/
mkdir app/new-feature
code app/new-feature/page.tsx

# 2. Code your feature
# (Dev server hot-reloads)

# 3. Test at http://localhost:3000/new-feature

# 4. Commit when done
git add .
git commit -m "Add new feature"
```

### Debugging
```bash
# 1. Open browser DevTools (F12)
# 2. Check Console tab for errors
# 3. Check Network tab for API calls
# 4. Use npm run lint to find code issues
npm run lint
```

---

## 🎓 LEARNING RESOURCES INLINE

### View Next.js Documentation
```bash
# Start dev server with docs
npm run dev
# Visit: https://nextjs.org/docs
```

### View Tailwind Documentation
```bash
# While developing
# Visit: https://tailwindcss.com/docs
```

### Check TypeScript Errors
```bash
npm run build
# Shows all TypeScript errors
```

---

## ✅ QUICK CHECKLIST

### First Time Setup
- [ ] `npm install` - Install packages
- [ ] `npm run dev` - Start server
- [ ] Visit http://localhost:3000
- [ ] Read QUICKSTART.md
- [ ] Explore the site

### Add Firebase
- [ ] Create Firebase project
- [ ] Get credentials
- [ ] Update .env.local
- [ ] Test signup/login
- [ ] Read Firebase docs

### Add Stripe
- [ ] Create Stripe account
- [ ] Get API keys
- [ ] Update .env.local
- [ ] Implement checkout
- [ ] Test payment flow

### Deploy
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Add env variables
- [ ] Deploy
- [ ] Test live site

---

## 💡 PRO TIPS

1. **Use code editor shortcuts**
   - `Ctrl+~` opens terminal in VS Code
   - `Ctrl+Shift+P` opens command palette
   - `Ctrl+B` toggles sidebar

2. **Keep terminal open**
   - See dev server output
   - Quick access to npm commands
   - Watch for hot reload messages

3. **Hot Reload Benefits**
   - Changes appear instantly
   - State usually preserved
   - No need to refresh browser

4. **Use Environment Variables**
   - Never commit secrets
   - Use .env.local for local dev
   - Use Vercel dashboard for production

5. **Enable DevTools**
   - Chrome: F12
   - Firefox: F12
   - Check Console for errors
   - Check Network for API calls

---

## 🆘 WHEN STUCK

### Check Error Message
```bash
npm run dev
# Read error message carefully
# Copy error into search
# Check browser console (F12)
```

### Rebuild Everything
```bash
rm -r node_modules .next
npm install
npm run dev
```

### Check Configuration
```bash
# Verify .env.local exists and has all keys
# Check tsconfig.json is valid
# Check package.json has correct scripts
```

### Read Documentation
```bash
# In project root:
cat README.md
cat QUICKSTART.md
cat ARCHITECTURE.md
```

---

## 📞 COMMAND REFERENCE

| Task | Command |
|------|---------|
| Start Dev | `npm run dev` |
| Build | `npm run build` |
| Start Prod | `npm start` |
| Lint | `npm run lint` |
| Install | `npm install` |
| Add Package | `npm install pkg` |
| Remove Package | `npm uninstall pkg` |
| Update All | `npm update` |
| Go to Folder | `cd folder` |
| Back Folder | `cd ..` |
| Root | `cd c:\Users\okose\arryona` |

---

## 🚀 ONE-LINE QUICKSTARTS

### Clone & Run (if on GitHub)
```bash
git clone https://github.com/yourusername/arryona.git
cd arryona
npm install
npm run dev
```

### Fresh Setup
```bash
cd c:\Users\okose\arryona && npm install && npm run dev
```

### Build & Deploy
```bash
npm run build && npm start
```

---

**Bookmark this file for quick reference while developing!**

**Your development commands are ready to go.** 🚀
