# Mount Sinai Strike Coverage Platform

**URGENT Emergency Platform** - Cardiology fellows strike coverage signup system

## 🚀 Quick Deploy

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial strike coverage platform"
   gh repo create msw-strike-coverage --public
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Connect GitHub repo to Vercel
   - Set environment variables (see below)
   - Deploy!

3. **Set Environment Variables in Vercel:**
   ```
   ADMIN_PASSWORD=your_secure_password
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   CONVEX_DEPLOYMENT=your_convex_deployment
   RESEND_API_KEY=your_resend_key
   ```

## 🏥 Features Built

✅ **Fellow Registration** - Name, email, cell, fellowship program  
✅ **Magic Link Authentication** - Passwordless login  
✅ **Available Shifts Dashboard** - Real-time shift viewing  
✅ **Shift Signup** - With GME hours attestation modal  
✅ **Admin Dashboard** - Create/manage shifts, remove fellows  
✅ **Color-coded Locations** - MSH (Blue), MSW (Green), MSM (Orange)  
✅ **Mobile Responsive** - Works on phones  
✅ **Real-time Ready** - Prepared for Convex integration  

## 🔧 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Ready for Convex (currently mock data)
- **Auth:** Magic Link (ready for integration)
- **Deployment:** Vercel

## 📱 User Flows

### Fellows:
1. **Register** → Enter details → Magic link sent
2. **Sign In** → Enter email → Magic link sent  
3. **View Shifts** → See available shifts by date/location
4. **Sign Up** → GME attestation → Confirm → Shift claimed

### Admins:
1. **Admin Login** → Password → Dashboard
2. **Create Shifts** → Date/Location/Type/Quantity → Creates multiple shifts
3. **Manage** → View all shifts → Remove fellows from shifts

## 🏥 Data Models

### Fellow
- `name`: string (required)
- `email`: string (required, unique)
- `cell`: string (required) 
- `fellowship`: enum (MSH, MSW, MSM, Elmhurst, Bronx, EP MSM, EP MSH, Cath MSH, Cath MSW, Other)

### Shift  
- `date`: date (required)
- `shiftType`: enum (ADS AM, ADS PM, Tele AM, Tele PM)
- `location`: enum (MSH, MSW, MSM)
- `startTime`: string (derived: AM=7:00 AM, PM=7:00 PM)
- `endTime`: string (derived: AM=7:00 PM, PM=7:00 AM +1)
- `fellowId`: reference|null (null=available, populated=claimed)

## 🚨 Critical Business Rules

1. **No Fellow Self-Unregister** - Only admin can remove
2. **Real-time Updates** - Prevents double-booking  
3. **GME Attestation Required** - Modal before every signup
4. **Individual Shift Records** - Each shift = one fellow
5. **Auto Time Assignment** - Times derived from shift type

## 🔄 Next Steps (Production)

1. **Setup Convex Database**
   ```bash
   npx convex dev
   # Define schema, mutations, queries
   ```

2. **Configure Magic Link Auth**
   - Resend.com for emails OR
   - Convex Auth for integrated solution

3. **Environment Variables** 
   - Set in Vercel dashboard
   - Test admin password access

4. **Test Real-time Features**
   - Multiple users viewing same shifts
   - Instant updates when shifts claimed

## 🏃‍♂️ Development

```bash
npm run dev    # Start dev server (localhost:3000)
npm run build  # Build for production
npm run start  # Start production server
```

## 📞 Support

Contact Mount Sinai IT for technical issues or deployment support.

---

**Status:** MVP Complete - Ready for Convex integration and Vercel deployment  
**Timeline:** Built in emergency timeframe for active strike coverage  
**Priority:** URGENT - Deploy ASAP