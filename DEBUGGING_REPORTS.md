# 🔍 Debugging Reports - Step by Step Guide

## ✅ **STEP 1: Check Browser Console**

1. Open your admin reports page: `https://your-site.com?admin-reports=true`
2. Press **F12** to open Developer Tools
3. Click the **Console** tab
4. Try sending a report
5. Look for red error messages
6. **Copy the entire error message** and check what it says

---

## ✅ **STEP 2: Test the Reports Module**

Visit this URL in your browser to test if the reports module is loaded:

```
https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/test-reports
```

**Expected Result:**
```json
{
  "success": true,
  "data": {
    "reportsModuleLoaded": true,
    "sendDailyReportExists": true,
    "resendKeyConfigured": true,
    "timestamp": "2025-01-29T..."
  }
}
```

**If you see `false` values:**
- `reportsModuleLoaded: false` → Reports module not imported
- `sendDailyReportExists: false` → Function export issue
- `resendKeyConfigured: false` → **RESEND_API_KEY not set** (most common issue!)

---

## ✅ **STEP 3: Check Supabase Environment Variables**

### In Supabase Dashboard:

1. Go to **Supabase Dashboard** → Your Project
2. Click **Settings** (left sidebar)
3. Click **Edge Functions** (under Settings)
4. Scroll to **Environment Variables** section
5. Verify these exist:
   - ✅ `RESEND_API_KEY` → Should have your Resend API key
   - ✅ `SUPABASE_URL`
   - ✅ `SUPABASE_ANON_KEY`
   - ✅ `SUPABASE_SERVICE_ROLE_KEY`

**If RESEND_API_KEY is missing:**
1. Click **Add variable**
2. Name: `RESEND_API_KEY`
3. Value: Your Resend API key (starts with `re_`)
4. Click **Save**
5. **Restart edge functions**

---

## ✅ **STEP 4: Check Supabase Edge Function Logs**

### View Live Logs:

1. Go to **Supabase Dashboard** → Your Project
2. Click **Edge Functions** (left sidebar)
3. Click on **make-server-91daaa27** function
4. Click **Logs** tab
5. Try sending a report
6. Watch for error messages in real-time

**Common Errors:**

### Error: "RESEND_API_KEY environment variable is not set"
**Solution:** Add RESEND_API_KEY in Supabase dashboard (see Step 3)

### Error: "Failed to send email: 403 Forbidden"
**Solution:** Your Resend API key is invalid or expired
- Get a new key from https://resend.com/api-keys
- Update in Supabase environment variables

### Error: "reports.sendDailyReport is not a function"
**Solution:** Reports module not properly imported
- Check `/supabase/functions/server/index.tsx` has: `import * as reports from "./reports.tsx";`
- Redeploy edge function

### Error: "Cannot read properties of undefined"
**Solution:** No orders in database yet
- This is normal if you haven't received any bookings yet
- Reports will work once you have orders

---

## ✅ **STEP 5: Test with Curl (Advanced)**

Open terminal and run:

```bash
# Test the test endpoint
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/test-reports

# Test sending daily report
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-91daaa27/send-daily-report \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json"
```

Replace:
- `YOUR_PROJECT_ID` with your actual Supabase project ID
- `YOUR_ANON_KEY` with your Supabase anon key

---

## ✅ **STEP 6: Verify Resend Configuration**

### Check Resend Dashboard:

1. Go to https://resend.com/domains
2. Verify your domain `brnoluggage.com` is verified
3. Check DNS records are correct
4. Go to https://resend.com/api-keys
5. Verify your API key is active

**If domain not verified:**
- Reports will still work but from `onboarding@resend.dev`
- Add DNS records to verify your domain

---

## 🔧 **STEP 7: Common Fixes**

### Fix 1: Restart Edge Functions
1. Supabase Dashboard → Edge Functions
2. Click on function → **Restart**

### Fix 2: Redeploy Edge Function
If you made code changes, you may need to redeploy:
1. The edge function should auto-deploy
2. If not, check **Deployments** tab in Supabase

### Fix 3: Clear Browser Cache
1. Press **Ctrl + Shift + Delete** (or Cmd + Shift + Delete on Mac)
2. Clear cache and reload

### Fix 4: Check for Typos
Verify in `/supabase/functions/server/index.tsx`:
```typescript
import * as reports from "./reports.tsx";  // ✅ Correct
// NOT: import * as reports from "./report.tsx";  // ❌ Wrong
```

---

## 📋 **Quick Checklist**

Before asking for help, verify:

- [ ] Browser console shows detailed error message
- [ ] Test endpoint shows all `true` values
- [ ] RESEND_API_KEY is set in Supabase
- [ ] Resend API key is valid (not expired)
- [ ] Edge function logs show error details
- [ ] At least one order exists in database (for testing)
- [ ] Email `brnoluggage@gmail.com` is correct

---

## 🆘 **What to Share When Asking for Help**

If still not working, provide:

1. **Browser console error** (copy full error message)
2. **Test endpoint result** (visit the test-reports URL)
3. **Supabase edge function logs** (screenshot or copy text)
4. **RESEND_API_KEY configured?** (yes/no, don't share actual key!)
5. **Any orders in database?** (yes/no)

---

## 📧 **Alternative: Test Email Directly**

If reports still don't work, you can test Resend directly with curl:

```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_RESEND_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Brno Luggage Storage <reports@brnoluggage.com>",
    "to": ["brnoluggage@gmail.com"],
    "subject": "Test Email",
    "html": "<h1>Test</h1><p>If you see this, Resend is working!</p>"
  }'
```

If this fails, the issue is with Resend, not your code.

---

**Now try the steps above and let me know what you find! 🚀**
