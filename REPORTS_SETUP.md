# 📊 Automated Business Reports Setup Guide

Your luggage storage website now includes a comprehensive automated reporting system that sends detailed business intelligence emails to **brnoluggage@gmail.com**.

## 📈 What Reports Are Available?

### 1. **Daily Report**
- Sent every day
- Compares today's performance vs. yesterday
- Shows all orders from the current day

### 2. **Weekly Report**
- Sent every week
- Compares this week vs. last week
- Shows 7-day performance trends

### 3. **Monthly Report**
- Sent every month
- Compares this month vs. last month
- Monthly revenue and booking patterns

### 4. **Quarterly Report**
- Sent every quarter (Q1, Q2, Q3, Q4)
- Compares quarter-over-quarter performance
- 3-month business insights

### 5. **Yearly Report**
- Sent annually
- Year-over-year comparison
- Annual business performance summary

## 📊 What's Included in Each Report?

Every report contains:

✅ **Total Orders** - Number of bookings with comparison to previous period
✅ **Revenue Breakdown** - Separate totals for CZK and EUR
✅ **Locker Performance** - Which locker sizes (S/M/L) are most popular
✅ **Peak Booking Hours** - When customers book most frequently
✅ **Average Storage Duration** - How long customers typically store luggage
✅ **Average Order Value** - Mean revenue per booking
✅ **Period Comparison** - % change vs. previous period (growth/decline)
✅ **Recent Orders List** - Last 10 bookings with details
✅ **Revenue by Locker Size** - Which lockers generate most income

## 🔧 How to Activate Automated Reports

### Option 1: GitHub Actions (Recommended)

Create a file `.github/workflows/reports.yml`:

```yaml
name: Send Business Reports

on:
  schedule:
    # Daily at 11:00 PM Brno time (10:00 PM UTC)
    - cron: '0 22 * * *'
    # Weekly on Monday at 8:00 AM Brno time (7:00 AM UTC)
    - cron: '0 7 * * 1'
    # Monthly on 1st at 8:00 AM Brno time
    - cron: '0 7 1 * *'
    # Quarterly on 1st day of Jan, Apr, Jul, Oct
    - cron: '0 7 1 1,4,7,10 *'
    # Yearly on January 1st at 8:00 AM
    - cron: '0 7 1 1 *'

jobs:
  send-reports:
    runs-on: ubuntu-latest
    steps:
      - name: Send Daily Report
        if: github.event.schedule == '0 22 * * *'
        run: |
          curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/send-daily-report \
            -H "Authorization: Bearer YOUR_ANON_KEY"
      
      - name: Send Weekly Report
        if: github.event.schedule == '0 7 * * 1'
        run: |
          curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/send-weekly-report \
            -H "Authorization: Bearer YOUR_ANON_KEY"
      
      - name: Send Monthly Report
        if: github.event.schedule == '0 7 1 * *'
        run: |
          curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/send-monthly-report \
            -H "Authorization: Bearer YOUR_ANON_KEY"
      
      - name: Send Quarterly Report
        if: github.event.schedule == '0 7 1 1,4,7,10 *'
        run: |
          curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/send-quarterly-report \
            -H "Authorization: Bearer YOUR_ANON_KEY"
      
      - name: Send Yearly Report
        if: github.event.schedule == '0 7 1 1 *'
        run: |
          curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/send-yearly-report \
            -H "Authorization: Bearer YOUR_ANON_KEY"
```

### Option 2: Cron-Job.org (Free Service)

1. Go to [cron-job.org](https://cron-job.org)
2. Create a free account
3. Add these cron jobs:

**Daily Report:**
- URL: `https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/send-daily-report`
- Schedule: Every day at 23:00
- Method: POST
- Header: `Authorization: Bearer YOUR_ANON_KEY`

**Weekly Report:**
- URL: `https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/send-weekly-report`
- Schedule: Every Monday at 08:00
- Method: POST
- Header: `Authorization: Bearer YOUR_ANON_KEY`

**Monthly Report:**
- URL: `https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/send-monthly-report`
- Schedule: 1st of every month at 08:00
- Method: POST
- Header: `Authorization: Bearer YOUR_ANON_KEY`

**Quarterly Report:**
- URL: `https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/send-quarterly-report`
- Schedule: Jan 1, Apr 1, Jul 1, Oct 1 at 08:00
- Method: POST
- Header: `Authorization: Bearer YOUR_ANON_KEY`

**Yearly Report:**
- URL: `https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/send-yearly-report`
- Schedule: January 1st at 08:00
- Method: POST
- Header: `Authorization: Bearer YOUR_ANON_KEY`

### Option 3: EasyCron (Alternative Free Service)

Similar to cron-job.org, create accounts and add the same URLs with POST method.

## 🧪 Testing Reports Manually

You can test any report immediately by making a POST request:

```bash
# Test daily report
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/send-daily-report \
  -H "Authorization: Bearer YOUR_ANON_KEY"

# Test ALL reports at once
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/send-all-reports \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

## 📧 Email Configuration

Reports are sent via **Resend** (already configured with your RESEND_API_KEY).

- **From:** Brno Luggage Storage <reports@brnoluggage.com>
- **To:** brnoluggage@gmail.com

## 🎨 Report Format

Reports are sent as beautifully formatted HTML emails with:
- Color-coded statistics (green for positive trends, red for negative)
- Professional tables and charts
- Mobile-responsive design
- Easy-to-read metrics dashboard

## 🔒 Security Notes

- All report endpoints require the Supabase `publicAnonKey` in the Authorization header
- Reports only contain aggregated business data, no customer passwords or payment info
- The RESEND_API_KEY is securely stored in environment variables

## 📝 Available Endpoints

```
POST /make-server-91daaa27/send-daily-report
POST /make-server-91daaa27/send-weekly-report
POST /make-server-91daaa27/send-monthly-report
POST /make-server-91daaa27/send-quarterly-report
POST /make-server-91daaa27/send-yearly-report
POST /make-server-91daaa27/send-all-reports (test all at once)
```

## 💡 Pro Tips

1. **Start with Daily Reports** - Get familiar with the system before adding weekly/monthly
2. **Check Spam Folder** - First reports might land in spam, mark as "Not Spam"
3. **Test First** - Use the `/send-all-reports` endpoint to see all report formats
4. **Adjust Timing** - Schedule reports for times that work best for your business review
5. **Monitor Trends** - Look for patterns in peak booking hours and popular locker sizes

## 🆘 Troubleshooting

**Reports not arriving?**
- Check that RESEND_API_KEY is configured in Supabase
- Verify brnoluggage@gmail.com is correct
- Check spam/junk folder
- Test manually with curl command

**Need to change recipient email?**
- Edit `/supabase/functions/server/reports.tsx`
- Change `const BUSINESS_EMAIL = 'brnoluggage@gmail.com';` to your new email

---

**🎉 Your automated reporting system is ready to go!**
