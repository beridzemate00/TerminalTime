#!/bin/bash

# TerminalTime - Quick Start Script

echo "🚀 TerminalTime - Starting Development Environment"
echo "=================================================="
echo ""

# Check if Rust is installed
if ! command -v rustc &> /dev/null; then
    echo "❌ Rust is not installed or not in PATH"
    echo "   Please run: source $HOME/.cargo/env"
    echo "   Then run this script again"
    exit 1
fi

echo "✅ Rust version: $(rustc --version)"
echo "✅ Cargo version: $(cargo --version)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node dependencies..."
    npm install
    echo ""
fi

echo "🔨 Starting Tauri development server..."
echo "   This will compile the Rust backend and start the React frontend"
echo "   First compilation may take a few minutes..."
echo ""

npm run tauri dev
