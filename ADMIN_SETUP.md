# Admin Panel Setup Guide

## Overview
Your real estate website now includes a secure admin panel where you can view and manage all property requests submitted through the form.

## Quick Start

### 1. Create Your Admin Account

Go to your Supabase Dashboard:
1. Open [Supabase Dashboard](https://app.supabase.com)
2. Navigate to your project
3. Click **Authentication** → **Users** in the left sidebar
4. Click **"Add user"** button
5. Fill in the form:
   - **Email**: Enter your email (e.g., `you@example.com`)
   - **Password**: Enter a strong password
   - Check **"Auto confirm user"** checkbox (so you don't need email verification)
6. Click **"Create user"**

### 2. Access the Admin Panel

You now have two ways to access the admin panel:

**Option A: Using the Settings Button**
- Go to your website landing page
- Look for the ⚙️ (settings) button in the bottom right corner
- Click it to go to the admin login page

**Option B: Direct URL**
- Add `/#/admin` to your website URL
- Example: `https://yourdomain.com/#/admin`

### 3. Login

1. Enter your admin email
2. Enter your admin password
3. Click "Giriş Yap" (Login)

You'll now see all property requests submitted through your form.

## Admin Panel Features

### Viewing Requests
- **Most recent first**: New submissions appear at the top
- **Auto-refresh**: The list updates every 5 seconds
- **Status badges**: Color-coded labels show request type (Buy/Sell) and property type (Residential/Land)

### Application Details
Each application card displays:
- Property details (type, size, location)
- Contact information (name, phone, WhatsApp)
- Submission date and time
- Any notes/descriptions provided

### Managing Requests

**Delete a Request:**
1. Find the application you want to remove
2. Click the **"Sil" (Delete)** button
3. Confirm in the dialog that appears
4. The request is permanently deleted from the database

### Logout
Click the **"Çıkış" (Logout)** button in the top right corner to return to the landing page.

## Design

The admin panel uses the **same premium, soft UI style** as your main website:
- Clean, bright interface with soft rounded corners
- Light color scheme (white, light gray, soft blue)
- Smooth animations and hover effects
- Fully responsive for mobile devices

## Security

✅ **Your data is secure:**
- Only authenticated admin users can access application data
- Public visitors cannot see submitted requests
- Passwords are encrypted in Supabase
- Database uses Row Level Security (RLS) policies

⚠️ **Security Tips:**
- Don't share your admin login with anyone except trusted staff
- Use a strong, unique password
- Log out when finished
- If you suspect unauthorized access, change your password immediately

## Troubleshooting

### "E-posta veya şifre hatalı" (Incorrect email or password)
- Double-check your email spelling
- Verify caps lock is off
- Ensure you created the user correctly in Supabase

### Blank screen after login
- Your browser may be blocking cookies—check privacy settings
- Try opening in an incognito/private window
- Clear browser cache and try again

### Can't delete an application
- Make sure you have the latest session (refresh the page)
- Check your internet connection
- Try logging out and back in

### Applications not showing up
- Click refresh or wait 5 seconds for auto-refresh
- Check if new applications were actually submitted
- Try logging out and back in

## Advanced

### Multiple Admin Users
You can create multiple admin accounts in Supabase for different team members:
1. Repeat the "Create Your Admin Account" steps for each team member
2. Share only the login details securely
3. Each admin can access the same panel

### Changing Your Password
In Supabase Dashboard → Authentication → Users:
1. Find your user
2. Click the menu (•••)
3. Click "Reset password"
4. Choose your new password

### Monitoring
- Check how many applications you're receiving
- Sort by date to see submission trends
- Use contact information to follow up with interested buyers/sellers

## Need Help?

- **Website issues**: Check browser console (F12 → Console tab)
- **Supabase questions**: Visit [Supabase Docs](https://supabase.com/docs)
- **UI/Design feedback**: The admin panel uses the same design as your main site

---

**Happy managing!** Your admin panel is ready to help you efficiently handle property requests. 🏠
