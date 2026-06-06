# 📊 Admin Dashboard Guide

Complete guide for accessing and using the Brno Luggage Storage admin reports system.

---

## 🔑 Quick Start

### Step 1: Access the Admin Page
Add `?admin-reports=true` to your website URL:

```
https://your-website.com?admin-reports=true
```

### Step 2: Enter Password
Default password: `BrnoLuggage2024!`

(See `/ADMIN_PASSWORD.md` for password details)

### Step 3: Access Reports Dashboard
You'll see the full reports dashboard with 5 report types.

---

## 📊 Available Reports

### 1. **Daily Report** 📅
- **What it shows:** Today's performance vs. yesterday
- **Best for:** Daily monitoring and quick checks
- **Includes:**
  - Today's total orders
  - Revenue (CZK + EUR)
  - Comparison to yesterday
  - Peak booking times

### 2. **Weekly Report** 📈
- **What it shows:** Last 7 days performance
- **Best for:** Weekly business review
- **Includes:**
  - 7-day order trends
  - Week-over-week comparison
  - Most popular locker sizes
  - Booking patterns

### 3. **Monthly Report** 📆
- **What it shows:** Current month performance
- **Best for:** Monthly financial review
- **Includes:**
  - Month-to-date revenue
  - Month-over-month growth
  - Customer behavior trends
  - Average order values

### 4. **Quarterly Report** 📊
- **What it shows:** 3-month business insights
- **Best for:** Quarterly planning
- **Includes:**
  - Q1/Q2/Q3/Q4 performance
  - Quarter-over-quarter comparison
  - Seasonal trends
  - Strategic insights

### 5. **Yearly Report** 📑
- **What it shows:** Full year analysis
- **Best for:** Annual review and planning
- **Includes:**
  - Year-over-year growth
  - Annual revenue summary
  - Long-term trends
  - Business performance overview

---

## 📧 Email Reports

All reports are sent to: **brnoluggage@gmail.com**

### What Each Email Contains:

✅ **Executive Summary**
- Total orders with trend indicator (↑↓)
- Revenue breakdown (CZK & EUR)
- Growth percentage vs. previous period

✅ **Performance Metrics**
- Locker performance (S/M/L breakdown)
- Most popular locker size
- Average storage duration
- Average order value

✅ **Customer Insights**
- Peak booking hours (top 5)
- Booking time patterns
- Duration preferences

✅ **Recent Activity**
- Last 10 orders
- Order details (locker, duration, price)
- Customer information

✅ **Comparison Data**
- Period-over-period comparison
- Growth indicators
- Trend analysis

---

## 🎯 How to Use the Dashboard

### Sending Individual Reports

1. **Click on any report card** (Daily, Weekly, Monthly, etc.)
2. **Click "Send [Report Type] Report"** button
3. **Wait for confirmation** (✅ success or ❌ error)
4. **Check your email** at brnoluggage@gmail.com

### Sending All Reports at Once

Perfect for testing or monthly review:

1. **Scroll to "Send All Reports"** section (bottom)
2. **Click "📊 Send All Reports"** button
3. **Wait for all 5 reports** to be sent
4. **Check your inbox** for all reports

---

## 💡 Best Practices

### Daily Operations
- ✅ Check **Daily Report** every morning
- ✅ Monitor peak booking hours
- ✅ Track revenue trends

### Weekly Review
- ✅ Send **Weekly Report** every Monday
- ✅ Compare week-over-week performance
- ✅ Adjust pricing/availability if needed

### Monthly Planning
- ✅ Review **Monthly Report** on 1st of month
- ✅ Analyze customer behavior
- ✅ Plan marketing campaigns

### Quarterly Strategy
- ✅ Send **Quarterly Report** at end of Q1/Q2/Q3/Q4
- ✅ Make strategic decisions
- ✅ Set next quarter goals

### Annual Review
- ✅ Generate **Yearly Report** in January
- ✅ Review full year performance
- ✅ Set annual goals

---

## 🔒 Security & Access

### Password Protection
- Admin page is password-protected
- Password stored in `/src/app/components/AdminReports.tsx`
- See `/ADMIN_PASSWORD.md` for current password
- Change default password immediately

### Who Should Have Access?
- Business owners
- Financial managers
- Operations team
- Authorized personnel only

### Password Security Tips
- ✅ Use a strong, unique password
- ✅ Don't share password publicly
- ✅ Change password regularly
- ✅ Keep password file secure

---

## 🛠️ Troubleshooting

### Reports Not Arriving?

**Check These:**
1. ✅ Verify email: brnoluggage@gmail.com is correct
2. ✅ Check spam/junk folder
3. ✅ Mark first report as "Not Spam"
4. ✅ Verify RESEND_API_KEY is configured in Supabase
5. ✅ Check internet connection

**Still Not Working?**
- Check browser console for errors (F12)
- Try sending a test report
- Contact technical support

### Login Issues?

**Password Not Working:**
1. Check for typos (case-sensitive!)
2. Remove extra spaces
3. Verify password in `/ADMIN_PASSWORD.md`
4. Check `/src/app/components/AdminReports.tsx`

**Can't Access Admin Page:**
1. Verify URL has `?admin-reports=true`
2. Clear browser cache
3. Try incognito/private mode
4. Check if JavaScript is enabled

### Report Errors?

**"Failed to Send Report":**
1. Check internet connection
2. Verify Supabase is running
3. Check RESEND_API_KEY configuration
4. Try again in a few minutes

---

## 📱 Mobile Access

The admin dashboard works on mobile devices:
- ✅ Responsive design
- ✅ Touch-friendly buttons
- ✅ Works on phones and tablets

**Mobile Tips:**
- Use landscape mode for better view
- Save URL as bookmark for quick access
- Enable password manager for easy login

---

## 🔔 Automated Scheduling (Optional)

Want reports sent automatically? See `/REPORTS_SETUP.md` for:
- GitHub Actions setup
- Cron-job.org configuration
- Scheduling best practices

**Recommended Schedule:**
- **Daily:** 11:00 PM every night
- **Weekly:** Monday 8:00 AM
- **Monthly:** 1st of month, 8:00 AM
- **Quarterly:** Jan 1, Apr 1, Jul 1, Oct 1
- **Yearly:** January 1st, 8:00 AM

---

## 📞 Support

### Need Help?

**Password Issues:**
- See `/ADMIN_PASSWORD.md`

**Report Setup:**
- See `/REPORTS_SETUP.md`

**Technical Issues:**
- Check browser console (F12)
- Review error messages
- Contact developer

---

## 🔄 Updates & Maintenance

### Changing Email Recipient

To send reports to a different email:

1. Edit `/supabase/functions/server/reports.tsx`
2. Find: `const BUSINESS_EMAIL = 'brnoluggage@gmail.com';`
3. Change to your new email
4. Save and deploy

### Customizing Reports

Reports can be customized by editing:
- `/supabase/functions/server/reports.tsx`

Consult with developer for custom metrics.

---

## 📊 Report Data Explained

### Revenue Metrics
- **Total Revenue CZK:** All orders paid in CZK
- **Total Revenue EUR:** All orders paid in EUR
- **Average Order Value:** Mean price per booking

### Locker Metrics
- **Orders by Locker:** Count for S/M/L sizes
- **Revenue by Locker:** Income per locker size
- **Most Popular:** Locker with most bookings

### Time Metrics
- **Average Storage Days:** Mean full days booked
- **Average Storage Hours:** Mean partial hours
- **Peak Hours:** Most common booking times

### Growth Metrics
- **Period Comparison:** Current vs. previous period
- **Percentage Change:** Growth or decline rate
- **Trend Indicators:** ↑ growth, ↓ decline

---

## ✨ Tips for Maximum Insight

### Daily Reports
- Monitor for unusual patterns
- Track daily revenue goals
- Identify peak hours for staffing

### Weekly Reports
- Spot weekly trends
- Plan weekly promotions
- Adjust inventory/availability

### Monthly Reports
- Financial planning
- Marketing effectiveness
- Customer retention analysis

### Quarterly Reports
- Strategic planning
- Seasonal trend analysis
- Budget adjustments

### Yearly Reports
- Annual performance review
- Long-term growth tracking
- Goal setting for next year

---

**🎉 You're all set! Access your admin dashboard anytime with `?admin-reports=true`**

**Current Password:** `BrnoLuggage2024!` (change this in `/ADMIN_PASSWORD.md`)
