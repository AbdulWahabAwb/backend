// Quick test script for signup and login endpoints
// Run with: node test-auth.js

const baseURL = 'http://localhost:3000';

async function testAuth() {
  console.log('🧪 Testing Authentication Endpoints\n');

  // Test Signup
  console.log('1️⃣ Testing Signup...');
  try {
    const signupResponse = await fetch(`${baseURL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Abdul Wahab',
        email: 'wahab@gmail.com',
        password: '123456'
      })
    });

    const signupData = await signupResponse.json();
    console.log('Status:', signupResponse.status);
    console.log('Response:', JSON.stringify(signupData, null, 2));

    if (signupResponse.ok) {
      console.log('✅ Signup successful!\n');
    } else {
      console.log('⚠️ Signup failed (might be duplicate user)\n');
    }
  } catch (error) {
    console.error('❌ Signup error:', error.message);
    console.log('Make sure the server is running: npm start\n');
    return;
  }

  // Test Login
  console.log('2️⃣ Testing Login...');
  try {
    const loginResponse = await fetch(`${baseURL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'wahab@gmail.com',
        password: '123456'
      })
    });

    const loginData = await loginResponse.json();
    console.log('Status:', loginResponse.status);
    console.log('Response:', JSON.stringify(loginData, null, 2));

    if (loginResponse.ok && loginData.token) {
      console.log('✅ Login successful!');
      console.log('✅ Token received:', loginData.token.substring(0, 20) + '...\n');
      
      // Test protected route
      console.log('3️⃣ Testing Protected Route (Home Feed)...');
      const homeResponse = await fetch(`${baseURL}/api/home`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${loginData.token}`
        }
      });

      const homeData = await homeResponse.json();
      console.log('Status:', homeResponse.status);
      if (homeResponse.ok) {
        console.log('✅ Protected route access successful!');
        console.log('Posts count:', homeData.posts?.length || 0);
      } else {
        console.log('❌ Protected route failed:', homeData);
      }
    } else {
      console.log('❌ Login failed:', loginData.message || 'Unknown error');
    }
  } catch (error) {
    console.error('❌ Login error:', error.message);
  }
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.log('⚠️ This script requires Node.js 18+ for fetch API');
  console.log('Alternatively, use curl or Postman to test the endpoints:');
  console.log('\n📝 Signup:');
  console.log('curl -X POST http://localhost:3000/api/auth/signup \\');
  console.log('  -H "Content-Type: application/json" \\');
  console.log('  -d \'{"name":"Abdul Wahab","email":"wahab@gmail.com","password":"123456"}\'');
  console.log('\n📝 Login:');
  console.log('curl -X POST http://localhost:3000/api/auth/login \\');
  console.log('  -H "Content-Type: application/json" \\');
  console.log('  -d \'{"email":"wahab@gmail.com","password":"123456"}\'');
} else {
  testAuth();
}

