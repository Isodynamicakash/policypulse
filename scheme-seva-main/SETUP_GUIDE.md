# PolicyPulse - Government Scheme Management Portal Setup Guide

This guide will help you set up and run the PolicyPulse application locally with Backend on port 5000 and Frontend on port 3000.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Quick Setup

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd scheme-seva-main
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd Backend
npm install
```

#### Environment Configuration
The `.env` file has been created with default values. You need to update the following:

**Required Configuration:**
- `MONGODB_URL`: Your MongoDB connection string
- `ACCESS_TOKEN_SECRET`: Generate a strong secret key
- `REFRESH_TOKEN_SECRET`: Generate another strong secret key

**Optional Configuration:**
- `GEMINI_API_KEY`: For AI chatbot functionality
- `BHASHINI_API_KEY`: For Indian language translation
- `BHASHINI_USER_ID`: Your Bhashini user ID

#### Generate Secret Keys
You can generate secure secret keys using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Update .env File
Edit `Backend/.env`:
```env
# Required - Update these values
MONGODB_URL=mongodb://localhost:27017
# or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net
ACCESS_TOKEN_SECRET=your_generated_access_token_secret
REFRESH_TOKEN_SECRET=your_generated_refresh_token_secret

# Optional - Add if you have these API keys
GEMINI_API_KEY=your_gemini_api_key
BHASHINI_API_KEY=your_bhashini_api_key
BHASHINI_USER_ID=your_bhashini_user_id
```

#### Seed Database
```bash
npm run seed
```

#### Start Backend Server
```bash
npm start
# Backend will run on http://localhost:5000
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../Frontend
npm install
```

#### Environment Configuration
The Frontend `.env` file is already configured for localhost development.

#### Start Frontend Server
```bash
npm start
# Frontend will run on http://localhost:3000
```

## Database Configuration

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   # On Linux/Mac
   sudo systemctl start mongod
   # or
   brew services start mongodb-community
   
   # On Windows
   net start MongoDB
   ```
3. Use connection string: `mongodb://localhost:27017`

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string from Atlas dashboard
4. Update `MONGODB_URL` in `.env` file

## API Configuration Guide

### 1. Gemini AI API (for Chatbot)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Add to `.env` as `GEMINI_API_KEY`

### 2. Language Support
The application now includes built-in multilingual support for 17 Indian languages:
- English, Hindi, Bengali, Telugu, Marathi, Tamil, Urdu
- Gujarati, Kannada, Malayalam, Odia, Punjabi, Assamese
- Sanskrit, Nepali, Sindhi, Kashmiri

Language switching is handled client-side with no external API dependencies.

## Available Schemes Data

The seed file includes comprehensive data for major Indian government schemes:

### Central Schemes (V1 Schema):
- **Pradhan Mantri Jan Aushadhi Yojana (PMJAY)** - Affordable medicines
- **PM-KISAN** - Farmer income support (₹6,000/year)
- **Ayushman Bharat PM-JAY** - Health insurance (₹5 lakh coverage)
- **Pradhan Mantri Awas Yojana - Urban** - Affordable housing
- **MGNREGA** - Rural employment guarantee (100 days)
- **Pradhan Mantri Mudra Yojana** - Micro-finance (up to ₹10 lakh)

### Central Schemes (V2 Schema):
- **National Education Policy 2020** - Education transformation
- **Pradhan Mantri Matru Vandana Yojana** - Maternity benefits (₹5,000)
- **Pradhan Mantri Fasal Bima Yojana** - Crop insurance

## API Endpoints

### Backend API Base URL: `http://localhost:5000/api`

#### Scheme Routes (V1)
- `GET /v1/schemes/get-all-schemes` - Get all schemes
- `GET /v1/schemes/get-scheme-by-id/:id` - Get specific scheme
- `GET /v1/schemes/get-scheme-filtered` - Filter schemes by criteria

#### Scheme Routes (V2) 
- `GET /v2/schemes/get-all-schemes` - Get paginated schemes
- `GET /v2/schemes/get-scheme-by-id/:id` - Get specific scheme
- `GET /v2/schemes/get-scheme-by-category/:category` - Get schemes by category

#### Language Support
- `GET /v1/language/languages` - Get supported Indian languages
- `GET /v1/language/validate/:code` - Validate language code
- `GET /v1/language/health` - Check language service status

#### User Management
- `POST /v1/users/register` - Register new user
- `POST /v1/users/login` - User login
- `GET /v1/users/personalized` - Get personalized recommendations

#### AI Chatbot
- `POST /v1/chatbot` - Get AI responses about schemes

## Testing the Setup

### 1. Test Backend
```bash
curl http://localhost:5000/
# Should return: "API is runningg"

curl http://localhost:5000/api/v1/
# Should return: "API V1 Running"

curl http://localhost:5000/api/v2/schemes/get-all-schemes
# Should return paginated schemes data
```

### 2. Test Frontend
Navigate to `http://localhost:3000` in your browser.

### 3. Test Database
```bash
# In MongoDB shell or Compass
use scheme-seva
db.schemes.count()    # Should show seeded schemes (V1)
db.schemesv2s.count() # Should show seeded schemes (V2)
db.users.count()      # Should show seeded users
```

## Troubleshooting

### Backend Issues
- **MongoDB Connection Error**: Check if MongoDB is running and connection string is correct
- **Port 5000 in use**: Change `PORT` in `.env` file
- **Module not found**: Run `npm install` in Backend directory

### Frontend Issues  
- **Port 3000 in use**: React will automatically suggest port 3001
- **API connection error**: Ensure backend is running on port 5000
- **Build errors**: Clear node_modules and run `npm install` again

### Database Issues
- **Seed fails**: Ensure MongoDB is running and accessible
- **Empty collections**: Run `npm run seed` again
- **Connection timeout**: Check MongoDB service status

## Default Login Credentials

Test users created during seeding:

1. **Regular User**: 
   - Email: `ramesh.kumar@example.com`
   - Password: `password123`

2. **Admin User**:
   - Email: `admin@schemeseva.gov.in`  
   - Password: `admin123`

## Production Deployment Notes

1. **Environment Variables**: Set production values for all API keys and secrets
2. **MongoDB**: Use MongoDB Atlas or dedicated server
3. **CORS**: Update allowed origins in `Backend/app.js`
4. **Security**: Enable HTTPS and update security headers
5. **Performance**: Enable MongoDB indexing and API caching

## Support

For issues and questions:
1. Check MongoDB connection and service status
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check console logs for specific error messages

The application is now ready for development with comprehensive Indian government scheme data and built-in multilingual support for 17 Indian languages!