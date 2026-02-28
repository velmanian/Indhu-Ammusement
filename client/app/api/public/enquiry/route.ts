import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward to your backend server
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/public/enquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { message: 'Error processing enquiry' },
      { status: 500 }
    );
  }
}