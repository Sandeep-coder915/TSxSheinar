# MongoDB Connection Troubleshooting Guide

## Issue: `querySrv ECONNREFUSED _mongodb._tcp.cluster0.kn8e9gi.mongodb.net`

This error occurs when the Node.js application cannot establish a DNS query to MongoDB Atlas.

### Solutions

#### 1. **Check MongoDB Atlas IP Whitelist** (Most Common)
- Go to: https://cloud.mongodb.com
- Select your cluster
- Click "Network Access" → "IP Access List"
- Add your current IP address or allow `0.0.0.0/0` (allows all IPs - only for development)
- Wait 1-2 minutes for changes to apply

#### 2. **Verify Connection String**
Your current `.env` has:
```
MONGODB_URI=mongodb+srv://gitabhagavathq_db_user:l5jrQzPWaiQNanoW@cluster0.kn8e9gi.mongodb.net/typesheinaar?retryWrites=true&w=majority
```

Make sure:
- Username: `gitabhagavathq_db_user`
- Password: `l5jrQzPWaiQNanoW` (no special characters that need URL encoding)
- Cluster: `cluster0.kn8e9gi`
- Database: `typesheinaar`

#### 3. **Use Local MongoDB (Development)**
If you have MongoDB running locally:

```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod

# Update .env to use local MongoDB
MONGODB_URI=mongodb://localhost:27017/typesheinaar?retryWrites=true&w=majority
```

#### 4. **Test Connection**
```bash
# Install MongoDB Shell
npm install -g mongosh

# Test with your connection string
mongosh "mongodb+srv://gitabhagavathq_db_user:l5jrQzPWaiQNanoW@cluster0.kn8e9gi.mongodb.net/typesheinaar"
```

#### 5. **Check Network/Firewall**
- Ensure MongoDB Atlas cluster is accessible from your network
- Check if your ISP/firewall blocks port 27017
- Try using a VPN or different network to test

---

## After Fixing Connection

Once MongoDB connects, you'll see:
```
✓ MongoDB connected successfully
✓ Server running on port 5000
```

Then test the API:
```bash
# Health check
curl http://localhost:5000/health

# Create a product
curl -X POST http://localhost:5000/api/products \
  -F "name=Test Product" \
  -F "slug=test-product" \
  -F "category=couture" \
  -F "price=5000"
```
