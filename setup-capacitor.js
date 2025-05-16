#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Setting up Capacitor for your Open House App...\n');

// Ask which platform to build for
rl.question('Which platform do you want to build for? (ios/android/both): ', async (platform) => {
  platform = platform.toLowerCase();
  
  if (!['ios', 'android', 'both'].includes(platform)) {
    console.error('Please choose either "ios", "android", or "both"');
    rl.close();
    return;
  }

  try {
    // Build the Next.js app first
    console.log('📦 Building your Next.js app...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Initialize Capacitor if config doesn't exist
    console.log('🔧 Initializing Capacitor...');
    
    // Install required dependencies
    console.log('📥 Installing Capacitor dependencies...');
    execSync('npm install @capacitor/core @capacitor/cli', { stdio: 'inherit' });
    
    if (platform === 'ios' || platform === 'both') {
      console.log('📱 Setting up iOS platform...');
      execSync('npm install @capacitor/ios', { stdio: 'inherit' });
      execSync('npx cap add ios', { stdio: 'inherit' });
    }
    
    if (platform === 'android' || platform === 'both') {
      console.log('🤖 Setting up Android platform...');
      execSync('npm install @capacitor/android', { stdio: 'inherit' });
      execSync('npx cap add android', { stdio: 'inherit' });
    }
    
    // Sync the built web app with Capacitor
    console.log('🔄 Syncing web app with Capacitor...');
    execSync('npx cap sync', { stdio: 'inherit' });
    
    console.log('\n✅ Setup complete! Next steps:');
    
    if (platform === 'ios' || platform === 'both') {
      console.log('- To open in Xcode: npx cap open ios');
      console.log('- Build and run on iOS device or simulator through Xcode');
    }
    
    if (platform === 'android' || platform === 'both') {
      console.log('- To open in Android Studio: npx cap open android');
      console.log('- Build and run on Android device or emulator through Android Studio');
    }
    
  } catch (error) {
    console.error('⚠️ Error setting up Capacitor:', error.message);
  }
  
  rl.close();
}); 