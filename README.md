# 🛍️ ARRYONA - E-commerce Platform

A full-stack e-commerce website built with **Next.js**, **Firebase**, and **Stripe**. Features a complete seller marketplace with media uploads and Firebase integration.

## 🚀 Features

- ✅ **User Authentication** - Sign up, login, and logout with Firebase
- ✅ **Seller System** - Complete seller onboarding, dashboard, and product management
- ✅ **Media Uploads** - Sellers can upload product images and videos to Firebase Storage
- ✅ **Product Catalog** - Browse products by category with seller marketplace
- ✅ **Shopping Cart** - Add/remove items and manage quantities
- ✅ **Cart Persistence** - Cart saved in localStorage
- ✅ **Product Details** - Detailed product pages with media galleries
- ✅ **Responsive Design** - Beautiful UI with Tailwind CSS
- 🔄 **Coming Soon**: Stripe payment integration

## 📋 Tech Stack

- **Frontend**: Next.js 16+, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage (for media uploads)
- **Payments**: Stripe (setup in progress)
- **Deployment**: Vercel (free tier)

## 🛠️ Project Structure

```
arryona/
├── app/
│   ├── page.tsx              # Homepage with featured products
│   ├── layout.tsx            # Root layout with navbar & cart provider
│   ├── signup/page.tsx       # User sign up
│   ├── login/page.tsx        # User login
│   ├── shop/page.tsx         # All products (Arryona + Seller marketplace)
│   ├── product/[id]/page.tsx # Individual product page with media
│   ├── cart/page.tsx         # Shopping cart
│   ├── seller/               # Seller hub and onboarding
│   │   ├── page.tsx          # Seller landing
│   │   ├── signup/           # Seller registration with media upload
│   │   ├── login/            # Seller authentication
│   │   └── dashboard/        # Seller management dashboard
│   └── globals.css           # Tailwind styles
│
├── components/
│   ├── Navbar.tsx            # Navigation bar with auth
│   └── ProductCard.tsx       # Reusable product card with media support
│
├── context/
│   └── CartContext.tsx       # Cart state management
│
├── lib/
│   ├── firebase.ts           # Firebase configuration with env vars
│   ├── firestore/            # Database helpers
│   │   ├── seller.ts         # Seller profile management
│   │   ├── marketplace.ts    # Product/order management
│   │   └── media.ts          # File upload utilities
│   └── stripe.ts             # Stripe configuration
│
├── vercel.json               # Vercel deployment config
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## 🚀 Deployment to Vercel (FREE)

### Prerequisites
1. **GitHub Repository**: Create a repo for your project
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free)
3. **Firebase Project**: Set up Firebase with Auth, Firestore, and Storage

### Quick Deploy Steps

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/arryona.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js
   - Click "Deploy"

3. **Add Environment Variables** in Vercel project settings:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### Firebase Setup
1. Create project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Set up Storage bucket
5. Copy config values to Vercel environment variables

## 📦 Installation & Setup

### 1. Prerequisites
- Node.js 18+ installed
- npm or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Update `.env.local` with your actual credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe Configuration (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
```

## 🔐 Setting Up Firebase

### 1. Create a Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com)
- Click "Create a new project" → "Arryona"
- Enable Analytics (optional)

### 2. Enable Authentication
- In your Firebase project, go to **Build** → **Authentication**
- Click **Get Started**
- Enable **Email/Password** provider

### 3. Create Firestore Database
- Go to **Build** → **Firestore Database**
- Click **Create Database**
- Choose **Start in test mode** (for development)
- Select a region close to you

### 4. Set Up Storage
- Go to **Build** → **Storage**
- Click **Get Started**
- Set up storage bucket for media uploads

### 5. Get Your API Keys
- Go to **Project Settings** (⚙️ icon)
- Under **SDK setup and configuration**, select **Web**
- Copy the configuration and update environment variables

## 🚀 Running the Project

### Development Mode
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## 🎯 Features Walkthrough

### Homepage
- Displays featured products
- Links to shop, cart, login, and signup
- Beautiful hero section with category previews

### Seller System
- **Seller Landing**: Dedicated seller hub
- **Seller Signup**: Onboarding with brand media uploads
- **Seller Dashboard**: Product management, order tracking, analytics
- **Media Uploads**: Images and videos for products and brand profiles

### Product Catalog
- Browse all products on `/shop`
- Click product card to view details with media galleries
- See related products on product pages

### Shopping Cart
- Add items from product cards or product pages
- View/modify quantities
- Remove items
- See order summary with total
- Login required for checkout

## 📝 Next Steps

### 1. Deploy to Vercel
- Follow the deployment steps above
- Your Arryona marketplace will be live and free!

### 2. Complete Stripe Integration
- Implement Stripe Checkout session
- Add payment webhook handling
- Create orders in database after payment

### 3. Add Order History
- Create orders page for logged-in users
- Display past purchases
- Add order tracking

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify environment variables are set correctly
- Check that Firebase project is active
- Ensure authentication, Firestore, and Storage are enabled

### Vercel Deployment Issues
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify GitHub repository is connected

---

Built with ❤️ using Next.js, Firebase, and Tailwind CSS
- Click **Create Database**
- Choose **Start in test mode** (for development)
- Select a region close to you

### 4. Get Your API Keys
- Go to **Project Settings** (⚙️ icon)
- Under **SDK setup and configuration**, select **Web**
- Copy the configuration and update `.env.local`

## 💳 Setting Up Stripe

### 1. Create a Stripe Account
- Go to [Stripe Dashboard](https://stripe.com)
- Create a new account

### 2. Get API Keys
- Go to **Developers** → **API Keys**
- Copy **Publishable Key** (pk_test_...)
- Copy **Secret Key** (sk_test_...)
- Update `.env.local` with these keys

### 3. (Future) Setup Stripe Checkout
- We'll integrate Stripe Checkout in the next phase
- For now, the cart system is ready to receive payment data

## 🚀 Running the Project

### Development Mode
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## 🎯 Features Walkthrough

### Homepage
- Displays featured products
- Links to shop, cart, login, and signup
- Beautiful hero section with category previews

### Authentication
- **Sign Up**: Create new account with email/password
- **Login**: Existing users can log in
- **Logout**: Users can logout from navbar
- Auth state persists across page refreshes

### Product Catalog
- Browse all products on `/shop`
- Click product card to view details
- See related products on product pages

### Shopping Cart
- Add items from product cards or product pages
- View/modify quantities
- Remove items
- See order summary with total
- Login required for checkout
- **Note**: Checkout payment processing coming soon

## 📝 Next Steps to Deploy

### 1. Update Product Database
- Add real products to your data source
- Currently using hardcoded product arrays
- Integrate with Firestore for dynamic products

### 2. Complete Stripe Integration
- Implement Stripe Checkout session
- Add payment webhook handling
- Create orders in database after payment

### 3. Add Order History
- Create orders page for logged-in users
- Display past purchases
- Add order tracking

### 4. Deploy to Vercel
```bash
# Push to GitHub
git push

# Deploy to Vercel
# Go to vercel.com, connect your GitHub repo
# Environment variables will be set in Vercel dashboard
```

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify `.env.local` has correct credentials
- Check that Firebase project is active
- Ensure authentication and Firestore are enabled

### Cart Not Persisting
- Check browser's localStorage is enabled
- Clear cache and reload

### Stripe Not Working
- Verify keys are in `.env.local`
- Check Stripe account is in test mode
- Review browser console for errors

## 📚 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📧 Support

For issues or questions, refer to the documentation links above or check the browser console for error messages.

---

**Built with ❤️ using Next.js, Firebase, and Stripe**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
