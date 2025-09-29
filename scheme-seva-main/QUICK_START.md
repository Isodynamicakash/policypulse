# 🚀 PolicyPulse - Quick Start Guide

## What You Need to Fill in Your .env Files

### Backend/.env File
```env
# ✅ REQUIRED - Update these values before running
MONGODB_URL=your_mongodb_connection_string_here
ACCESS_TOKEN_SECRET=generate_a_32_character_secret_key
REFRESH_TOKEN_SECRET=generate_another_32_character_secret_key

# 🔧 OPTIONAL - Add if you want full functionality  
GEMINI_API_KEY=your_gemini_api_key_for_chatbot
BHASHINI_API_KEY=your_bhashini_api_key_for_translation
BHASHINI_USER_ID=your_bhashini_user_id
```

### How to Fill Required Values:

#### 1. MongoDB Connection String
**Option A: Local MongoDB**
```
MONGODB_URL=mongodb://localhost:27017
```

**Option B: MongoDB Atlas (Cloud)**
```
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net
```

#### 2. Generate Secret Keys
Run this command to generate secure keys:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and use it for `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`

#### 3. API Keys (Optional but recommended)

**Gemini API Key** (for AI chatbot):
1. Visit: https://makersuite.google.com/app/apikey  
2. Create API key
3. Add to `GEMINI_API_KEY`

**Bhashini API** (for Indian language translation):
1. Visit: https://bhashini.gov.in/
2. Register for developer access
3. Get API key and User ID
4. Add to `BHASHINI_API_KEY` and `BHASHINI_USER_ID`

## 🏃‍♂️ Quick Start (3 Steps)

### 1. Setup Backend
```bash
cd scheme-seva-main/Backend
npm install
# Edit .env file with your values
npm run seed    # Populate database with schemes
npm start       # Starts on port 5000
```

### 2. Setup Frontend  
```bash
cd ../Frontend
npm install
npm start       # Starts on port 3000
```

### 3. Test the Application
- Backend API: http://localhost:5000
- Frontend App: http://localhost:3000
- Test login: `ramesh.kumar@example.com` / `password123`

## 📊 What's Included in the Database

### Government Schemes (Total: 9 schemes)
1. **Pradhan Mantri Jan Aushadhi Yojana** - Affordable medicines
2. **PM-KISAN** - ₹6,000/year farmer support  
3. **Ayushman Bharat PM-JAY** - ₹5 lakh health insurance
4. **Pradhan Mantri Awas Yojana** - Affordable housing
5. **MGNREGA** - 100 days employment guarantee
6. **Pradhan Mantri Mudra Yojana** - Business loans up to ₹10 lakh
7. **National Education Policy 2020** - Education transformation
8. **Pradhan Mantri Matru Vandana Yojana** - ₹5,000 maternity benefit
9. **Pradhan Mantri Fasal Bima Yojana** - Crop insurance

### Test Users
- **Regular User**: `ramesh.kumar@example.com` / `password123`
- **Admin User**: `admin@policypulse.gov.in` / `admin123`

## 🌐 API Endpoints Ready to Use

### Schemes
- `GET /api/v2/schemes/get-all-schemes` - All schemes (paginated)
- `GET /api/v2/schemes/get-scheme-by-category/health` - Health schemes
- `GET /api/v1/schemes/get-scheme-filtered?tags=agriculture` - Filter schemes

### Language Support (Bhashini)
- `GET /api/v1/bhashini/languages` - Supported languages
- `POST /api/v1/bhashini/translate` - Translate text
- `GET /api/v1/bhashini/health` - Service status

### User Management
- `POST /api/v1/users/register` - Register
- `POST /api/v1/users/login` - Login  
- `GET /api/v1/users/personalized` - Personalized recommendations

### AI Chatbot
- `POST /api/v1/chatbot` - Ask about schemes

## 🛠️ Troubleshooting

**Backend won't start?**
- Check MongoDB is running: `mongod` or use MongoDB Atlas
- Verify `.env` file has correct values
- Check port 5000 is free: `lsof -i :5000`

**Database empty?**
- Run: `npm run seed` in Backend directory
- Check MongoDB connection string in `.env`

**Frontend can't connect to API?**
- Ensure Backend is running on port 5000
- Check `REACT_APP_API_BASE_URL` in Frontend/.env

## 📚 Full Documentation
See `SETUP_GUIDE.md` for complete setup instructions and troubleshooting.

---
🎉 **You're all set!** Your PolicyPulse application is ready with comprehensive Indian government schemes data and multi-language support.