# Backend & Database Troubleshooting Guide

If you see "OFFLINE MODE" or "DNS Error" in your server logs, follow these steps to restore connectivity to your MongoDB Atlas database.

## 1. Check Network Connectivity
The error `querySrv ENOTFOUND` means your computer cannot find the MongoDB servers.
- **Internet**: Ensure you have a stable internet connection.
- **VPN/Firewall**: If you are behind a corporate firewall or using a VPN, it might be blocking MongoDB's ports (27017). Try turning off your VPN.
- **DNS Settings**: Try changing your computer's DNS to Google DNS (`8.8.8.8`) or Cloudflare DNS (`1.1.1.1`).

## 2. Whitelist your IP in MongoDB Atlas
Even if you can "reach" the server, MongoDB Atlas will block you if your IP is not whitelisted.
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Go to **Network Access** (under the Security tab on the left).
3. Click **Add IP Address**.
4. Click **Add Current IP Address** or choose **Allow Access from Anywhere** (0.0.0.0/0) for testing.
5. Click **Confirm**.

## 3. Verify DATABASE_URL
Ensure your `.env` file has the correct connection string:
```env
DATABASE_URL="mongodb+srv://velmanian2002_db_user:1122@cluster0.bc2tpng.mongodb.net/indhu_db?retryWrites=true&w=majority&appName=Cluster0"
```
*Note: Ensure there are no special characters in the password that aren't URL-encoded.*

## 4. Testing Connection Manually
You can run the diagnostic script I created:
```powershell
cd server
node diag_db.js
```
If this script fails to resolve the hostname, the problem is definitely your local network environment.

---

### Working in Offline Mode
While the database is disconnected, Indhu Industries API will:
1. **Load products** from `server/src/db/fallbackData.json`.
2. **Save new products** to the same file (via Admin Panel).
3. **Receive enquiries** and log them to the terminal.

Your work will be preserved locally and can be synced once the connection is restored.
