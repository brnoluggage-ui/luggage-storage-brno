# 🔐 Admin Reports Password

## Current Password

```
BrnoLuggage2024!
```

---

## How to Access Admin Reports

1. **Visit your website with the admin parameter:**
   ```
   https://your-website.com?admin-reports=true
   ```

2. **Enter the password above**

3. **Access the reports dashboard**

---

## How to Change the Password

### Option 1: Edit the Component File (Simple)

1. Open the file: `/src/app/components/AdminReports.tsx`
2. Find this line near the top (around line 6):
   ```typescript
   const ADMIN_PASSWORD = 'BrnoLuggage2024!';
   ```
3. Change `'BrnoLuggage2024!'` to your new password
4. Save the file

### Option 2: Use Environment Variable (Advanced - More Secure)

Coming soon - for production use, consider storing the password in an environment variable.

---

## Security Notes

⚠️ **Important Security Information:**

- This is a **client-side password check** (the password is visible in the source code)
- It's designed to prevent casual/accidental access
- For production use with sensitive data, consider implementing server-side authentication
- Currently suitable for internal use and protecting against non-technical users

**Best Practices:**
- Don't share the password publicly
- Change the default password immediately
- Use a strong, unique password
- Consider setting up IP restrictions for extra security

---

## Password Requirements

When creating a new password, we recommend:
- ✅ At least 12 characters
- ✅ Mix of uppercase and lowercase letters
- ✅ Include numbers
- ✅ Include special characters (!@#$%^&*)
- ✅ Avoid common words or patterns

---

## Example Strong Passwords

```
Brno#Luggage$2024!Storage
SecureReports@Brno2024!
BrnoStation#Reports$2024
```

---

## Troubleshooting

**Forgot the password?**
1. Open `/src/app/components/AdminReports.tsx`
2. Look for the `ADMIN_PASSWORD` constant
3. The current password is shown there

**Password not working?**
1. Make sure there are no extra spaces
2. Password is case-sensitive
3. Check that you saved the file after changing it
4. Try refreshing the page

---

**Last Updated:** January 2025
**Default Password:** `BrnoLuggage2024!`
