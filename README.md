# FreshGuard AI - Food Wastage Reduction System

AI-Powered IoT solution for reducing food waste in cold storage facilities using multi-sensor data and deep learning ensemble models.

## 🌟 Features

- **Multi-Sensor IoT Integration**: DHT22, MQ-3 ethylene sensors, and camera modules
- **AI Ensemble Model**: LSTM, Random Forest, Isolation Forest, and CNN combined
- **Real-time Dashboard**: Live monitoring with Grafana integration
- **95.6% Accuracy**: Ensemble prediction model for spoilage detection
- **68% Waste Reduction**: Proven results in cold storage optimization

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run serve
```

## 🌐 Deployment to Internet (Google Searchable)

### Option 1: GitHub Pages (Free & Easy)

1. **Create GitHub Repository**
   - Go to https://github.com
   - Create new repository: `freshguard-ai`
   - Make it public

2. **Update Repository Name**
   - In `package.json`, change homepage to your actual GitHub username:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/freshguard-ai"
   ```

3. **Deploy to GitHub Pages**
   ```bash
   npm run build
   npm run deploy
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `gh-pages` → `/ (root)`

5. **Your site will be live at:** `https://YOUR_USERNAME.github.io/freshguard-ai`

### Option 2: Vercel (Recommended for React)

1. **Connect to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Deploy automatically

2. **Custom Domain (Optional)**
   - Buy domain from Namecheap/GoDaddy
   - Connect domain in Vercel settings

### Option 3: Netlify

1. **Deploy to Netlify**
   - Go to https://netlify.com
   - Drag & drop the `dist` folder
   - Or connect GitHub repository

## 🔍 Make it Findable on Google

### SEO Optimization

1. **Update Meta Tags** (in `index.html`):
```html
<meta name="description" content="FreshGuard AI - AI-powered food wastage reduction in cold storage using IoT sensors and deep learning">
<meta name="keywords" content="AI, IoT, food waste, cold storage, machine learning, FreshGuard">
```

2. **Add Structured Data** for rich search results

3. **Submit to Google Search Console**
   - Go to https://search.google.com/search-console
   - Add your domain
   - Submit sitemap

4. **Social Media Sharing**
   - Add Open Graph meta tags
   - Share on LinkedIn, Twitter, academic forums

## 📊 System Architecture

- **Sensing Layer**: DHT22, MQ-3, Camera Module on Raspberry Pi 4
- **Communication Layer**: MQTT protocol with Mosquitto broker
- **Intelligence Layer**: 4 AI models in parallel processing
- **Presentation Layer**: Grafana dashboard with automated alerts

## 🏆 Results

- **95.6%** Ensemble Accuracy
- **68%** Waste Reduction
- **22%** Energy Savings
- **<2 hours** Detection Time

## 👥 Team

- **Shreya Singh** - AI & ML Development
- **Shreyansh Shekhar Singh** - IoT & System Architecture

*Under supervision of Prof. Pooja Tiwari, BBDU Lucknow*

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **AI/ML**: Python, TensorFlow, Scikit-learn
- **IoT**: Raspberry Pi, MQTT, Sensors
- **Visualization**: Grafana, InfluxDB
- **Deployment**: GitHub Pages / Vercel / Netlify

## 📝 License

ISC License

---

**B.Tech Minor Project 2025-26**
**Department of Computer Science & Engineering**
**Babu Banarasi Das University, Lucknow**