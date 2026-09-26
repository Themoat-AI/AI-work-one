# AI Work One - Intelligent AI Assistant

A full-stack AI assistant application that combines OpenAI's GPT-4 with real-time web search capabilities through Tavily API.

## Features

✨ **Modern UI** - Clean, aesthetic, dark-themed interface built with Next.js and Tailwind CSS

🤖 **AI-Powered** - Leverages OpenAI's GPT-4 for intelligent responses

🔍 **Real-Time Web Search** - Integrated Tavily API for current information

📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

✨ **Smooth Animations** - Framer Motion for elegant transitions

💬 **Rich Message Formatting** - Markdown support with syntax highlighting

📚 **Source Attribution** - Displays sources for web search results

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-4
- **Search**: Tavily API
- **Language**: TypeScript

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Themoat-AI/AI-work-one.git
cd AI-work-one
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

**Getting API Keys:**

- **OpenAI**: [platform.openai.com](https://platform.openai.com/api-keys)
- **Tavily**: [tavily.com](https://tavily.com)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build & Deploy

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
.
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chat API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main chat page
├── components/
│   └── Message.tsx               # Message component
├── lib/
│   ├── openai.ts                 # OpenAI integration
│   └── tavily.ts                 # Tavily API integration
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Usage

1. **Type your question** in the input field
2. **Click Send** or press Enter
3. The AI will:
   - Decide if web search is needed
   - Search the web if relevant
   - Generate an intelligent response
   - Display sources if applicable

## Features Explained

### Smart Search Detection

The application automatically detects queries that benefit from web search, such as:
- Current events and news
- Latest prices and stocks
- Real-time information
- Recent developments

### Source Attribution

When web search is used, sources are displayed at the bottom of AI responses for transparency and fact-checking.

### Responsive UI

- Desktop optimized
- Mobile friendly
- Touch-friendly buttons
- Smooth animations

## API Reference

### POST /api/chat

**Request:**
```json
{
  "message": "What is the latest news about AI?"
}
```

**Response:**
```json
{
  "message": "AI response text...",
  "sources": [
    {
      "title": "Source Title",
      "url": "https://example.com"
    }
  ]
}
```

## Troubleshooting

### API Keys Not Working

- Verify keys are correctly set in `.env.local`
- Ensure API keys have necessary permissions
- Check API key expiration dates

### No Web Search Results

- Tavily API might be rate limited
- Check internet connection
- Verify Tavily API key is valid

### Application Won't Start

- Ensure Node.js version is 18+
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for port conflicts (default: 3000)

## Performance Tips

- Use `npm run build` to create optimized production builds
- Enable caching headers for static assets
- Consider using a CDN for deployment
- Monitor API usage to optimize costs

## Security Best Practices

- Never commit `.env.local` to version control
- Rotate API keys regularly
- Use HTTPS in production
- Implement rate limiting on production
- Validate all user inputs on the server

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project as you wish.

## Support

For issues, questions, or suggestions, please create an issue on GitHub.

## Roadmap

- [ ] Multi-language support
- [ ] Chat history persistence
- [ ] User authentication
- [ ] Custom AI model selection
- [ ] Conversation export (PDF, JSON)
- [ ] Voice input/output
- [ ] Dark/Light theme toggle
- [ ] Advanced search filters

---

**Built with ❤️ by the AI Work One team**
